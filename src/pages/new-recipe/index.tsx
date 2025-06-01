import { Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { AddImgModal } from '~/components/new-recipe-modals/AddImgModal';
import { ConfirmFormModal } from '~/components/new-recipe-modals/ConfirmFormModal';
import { ALERT_MESSAGES, AppRoute, DataTestId } from '~/consts/consts';
import { useBlockNavigation } from '~/hooks/use-block-navigation';
import {
    useCreateRecipeMutation,
    useSaveDraftMutation,
    useUpdateRecipeMutation,
} from '~/query/services/new-recipe';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { recipeSchema } from '~/schemas/recipe.schema';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';
import { currentSubcategorySelector, setCategory } from '~/store/slices/recipes-slice';
import { NewRecipeRequest } from '~/types/recipe';
import { cleanRecipeFormData } from '~/utils/clean-data';

import { RecipeForm } from './RecipeForm';

const DEFAULT_PORTIONS_VALUE = 4;
const DEFAULT_TIME_VALUE = 30;
const DEFAULT_INGREDIENT_VALUE = 100;

export const NewRecipe = () => {
    const { id } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'main' | 'step'>('main');
    const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
    const [hasTitle, setHasTitle] = useState(true);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
    const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [createRecipe] = useCreateRecipeMutation();
    const [saveDraft, { isLoading: isSavingDraft }] = useSaveDraftMutation();
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);
    const savedSuccessfullyRef = useRef(false);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [updateRecipe] = useUpdateRecipeMutation();
    const currentSubcategory = useAppSelector(currentSubcategorySelector);

    const recipeId = id ?? '';
    const isEditing = !!id;

    const { data: recipeData } = useGetRecipeByIdQuery(recipeId, { skip: !isEditing });

    const methods = useForm<NewRecipeRequest>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            title: '',
            description: '',
            time: DEFAULT_TIME_VALUE,
            categoriesIds: [],
            portions: DEFAULT_PORTIONS_VALUE,
            image: '',
            steps: [{ stepNumber: 1, description: '', image: null }],
            ingredients: [{ title: '', count: DEFAULT_INGREDIENT_VALUE, measureUnit: '' }],
        },
        mode: 'onSubmit',
        shouldUnregister: false,
    });

    const {
        control,
        formState: { isDirty },
        trigger,
        watch,
        setValue,
        getValues,
        reset,
    } = methods;

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'steps',
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
        replace,
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    useEffect(() => {
        if (recipeData) {
            reset(recipeData);
            replace(recipeData.ingredients || []);
        }
    }, [recipeData, replace, reset]);

    useEffect(() => {
        if (recipeData?.ingredients) {
            recipeData.ingredients.forEach((ingredient, index) => {
                setValue(`ingredients.${index}.measureUnit`, ingredient.measureUnit ?? '');
            });
        }
    }, [recipeData, setValue]);

    const onSubmit = async (data: NewRecipeRequest) => {
        try {
            const matchedSubCategory = subCategories.find(
                (sub) => sub._id === data.categoriesIds[0],
            );
            const parentCategory = categories.find(
                (cat) => cat._id === matchedSubCategory?.rootCategoryId,
            );
            const cleanedIngredients = data.ingredients.map((ing) => ({
                ...ing,
                count: Math.round(Number(ing.count)),
            }));

            const formData = { ...data, ingredients: cleanedIngredients };
            let response;
            if (isEditing) {
                response = await updateRecipe({ recipeId, data: formData }).unwrap();
            } else {
                response = await createRecipe(formData).unwrap();
            }
            setIsFormDirty(false);
            savedSuccessfullyRef.current = true;
            setIsSavedSuccessfully(true);
            dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_POST_SUCCESS));

            setTimeout(() => {
                if (matchedSubCategory && parentCategory) {
                    navigate(
                        `/${parentCategory.category}/${matchedSubCategory.category}/${response._id}`,
                    );
                }
            }, 10);
        } catch (err) {
            const status = (err as { statusCode?: number })?.statusCode;
            if (status === 409) {
                dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_TITLE_CONFLICT));
            } else {
                dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_POST_ERROR));
            }
        }
    };

    const handleValidate = async () => {
        await trigger();
    };

    useEffect(() => {
        setIsFormDirty(isDirty);
    }, [isDirty]);

    useBlockNavigation({
        isFormDirty,
        setPendingNavigation,
        setModalOpen: setIsModalConfirmOpen,
        savedSuccessfullyRef,
        isSavedSuccessfully,
    });

    const handleSaveDraft = async () => {
        try {
            const rawFormData = getValues();
            const formData = cleanRecipeFormData(rawFormData);
            setHasTitle(true);

            if (!formData.title) {
                setHasTitle(false);
                return;
            }
            await saveDraft(formData).unwrap();
            savedSuccessfullyRef.current = true;
            setIsSavedSuccessfully(true);
            setIsFormDirty(false);

            dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_SAVE_DRAFT_SUCCESS));
            setIsModalConfirmOpen(false);

            navigate(AppRoute.Index);
        } catch (err) {
            const status = (err as { statusCode?: number })?.statusCode;
            if (status === 409) {
                dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_TITLE_CONFLICT));
            } else {
                dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_SAVE_DRAFT_ERROR));
            }
        }
    };

    const onSaveDraft = () => {
        handleSaveDraft();
        setIsModalConfirmOpen(false);
    };

    const handleLeaveWithoutSaving = () => {
        const navigateTo = pendingNavigation;

        setIsFormDirty(false);
        setIsModalConfirmOpen(false);
        setPendingNavigation(null);

        if (navigateTo) {
            setTimeout(() => {
                navigate(navigateTo);
            }, 0);
        }
    };

    const handleOpenModal = (type: 'main' | 'step', index?: number) => {
        setModalType(type);
        setCurrentStepIndex(index ?? null);
        if (type === 'main') {
            setImgPreview(watch('image') || null);
        } else if (type === 'step' && index !== undefined) {
            setImgPreview(fields[index]?.image || null);
        } else {
            setImgPreview(null);
        }
        setModalOpen(true);
    };

    const handleCloseModal = (imageUrl?: string) => {
        setModalOpen(false);
        if (imageUrl) {
            if (modalType === 'main') {
                setValue('image', imageUrl || '');
                setIsFormDirty(true);
            } else if (modalType === 'step' && currentStepIndex !== null) {
                const currentStep = getValues(`steps.${currentStepIndex}`);
                update(currentStepIndex, {
                    ...currentStep,
                    image: imageUrl || null,
                });
                setIsFormDirty(true);
            }
        }
    };

    const dataTestId =
        modalType === 'main'
            ? DataTestId.RecipeImageBlockInputFile
            : `recipe-steps-image-block-${currentStepIndex}-input-file`;

    const removeStep = (index: number) => {
        remove(index);
        if (fields.length === 1) {
            append({ stepNumber: 1, description: '', image: null });
        }
        const updatedSteps = getValues('steps').map((step, i) => ({
            ...step,
            stepNumber: i + 1,
        }));
        setValue('steps', updatedSteps);
        setIsFormDirty(true);
    };

    const addStep = () => {
        append({ stepNumber: fields.length + 1, description: '', image: null });
        setIsFormDirty(true);
    };

    const addIngredient = () => {
        appendIngredient({ title: '', count: DEFAULT_INGREDIENT_VALUE, measureUnit: '' });
        setIsFormDirty(true);
    };

    const handleDeleteImage = () => {
        if (modalType === 'main') {
            setValue('image', '');
        } else if (modalType === 'step' && currentStepIndex !== null) {
            update(currentStepIndex, {
                ...fields[currentStepIndex],
                image: null,
            });
        }
        setIsFormDirty(true);
        setImgPreview(null);
        setModalOpen(false);
    };

    const handleConfirmModalClose = () => {
        if (currentSubcategory) {
            dispatch(setCategory(null));
        }
        setIsModalConfirmOpen(false);
    };

    return (
        <Box pl={{ base: 4, '2xs': 5, md: 6 }} pr={{ base: 4, '2xs': 5, md: 0 }} pt={{ sm: 7 }}>
            <FormProvider {...methods}>
                <RecipeForm
                    methods={methods}
                    isModalOpen={isModalOpen}
                    onOpenModalClick={handleOpenModal}
                    onDeleteImageClick={handleDeleteImage}
                    addStep={addStep}
                    removeStep={removeStep}
                    addIngredient={addIngredient}
                    removeIngredient={removeIngredient}
                    onSaveDraftClick={handleSaveDraft}
                    onValidateFormClick={handleValidate}
                    isSavingDraft={isSavingDraft}
                    hasTitle={hasTitle}
                    onSubmit={onSubmit}
                    ingredientFields={ingredientFields}
                />
            </FormProvider>
            <AddImgModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                imgPreview={imgPreview}
                onDelete={handleDeleteImage}
                index={currentStepIndex || 0}
                dataTestId={dataTestId}
            />
            <ConfirmFormModal
                isOpen={isModalConfirmOpen}
                onClose={handleConfirmModalClose}
                onSaveDraft={onSaveDraft}
                onLeaveWithoutSaving={handleLeaveWithoutSaving}
            />
        </Box>
    );
};
