import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { AddImgModal } from '~/components/new-recipe-modals/AddImgModal';
import { ConfirmFormModal } from '~/components/new-recipe-modals/ConfirmFormModal';
import { ALERT_MESSAGES, AppRoute, DataTestId } from '~/consts/consts';
import { ErrorCodes } from '~/consts/errors';
import { useBlockNavigation } from '~/hooks/use-block-navigation';
import {
    useCreateRecipeMutation,
    useSaveDraftMutation,
    useUpdateRecipeMutation,
} from '~/query/services/new-recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';
import { currentSubcategorySelector, setCategory } from '~/store/slices/recipes-slice';
import { NewRecipeRequest } from '~/types/recipe';
import { cleanRecipeFormData } from '~/utils/clean-data';

import { DEFAULT_INGREDIENT_VALUE } from './consts';
import { useRecipeFormMethods } from './hooks/use-recipe-form-method';
import { useRecipeModals } from './hooks/use-recipe-modals';
import { RecipeForm } from './RecipeForm';

export const NewRecipe = () => {
    const { id } = useParams();
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
    const [updateRecipe] = useUpdateRecipeMutation();
    const currentSubcategory = useAppSelector(currentSubcategorySelector);

    const recipeId = id ?? '';
    const isEditing = !!id;

    const {
        methods,
        isDirty,
        trigger,
        watch,
        setValue,
        getValues,
        fields,
        append,
        remove,
        update,
        ingredientFields,
        appendIngredient,
        removeIngredient,
    } = useRecipeFormMethods(isEditing, recipeId);

    const {
        isModalOpen,
        modalType,
        currentStepIndex,
        imgPreview,
        handleOpenModal,
        handleCloseModal,
        handleDeleteImage,
    } = useRecipeModals(watch, fields, setValue, update, setIsFormDirty);

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
            if (status === ErrorCodes.Conflict) {
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
            if (status === ErrorCodes.Conflict) {
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

    const handleImageModalClose = (imageUrl?: string) => {
        handleCloseModal();
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
                onClose={handleImageModalClose}
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
