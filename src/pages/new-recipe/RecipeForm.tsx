import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import { SubcategorySelect } from '~/components/subcategories-select/SubcategoriesSelect';
import { API_IMG, DataTestId } from '~/consts/consts';
import { INPUT_STYLES } from '~/consts/styles';
import { useGetMeasureUnitsQuery } from '~/query/services/new-recipe';
import { UploadImg } from '~/shared/custom-icons';
import { NewRecipeRequest } from '~/types/recipe';

import { ActionFormBtns } from './ActionFormBtns';
import { DEFAULT_PORTIONS_VALUE, DEFAULT_TIME_VALUE } from './consts';
import { IngredientField } from './IngredientField';
import { IngredientsHeader } from './IngredientHeader';
import { RecipeSteps } from './RecipeSteps';
import { FORM_NEW_RECIPE_STYLES, getFieldStyles } from './styles';

type RecipeFormProps = {
    methods: UseFormReturn<NewRecipeRequest>;
    isModalOpen: boolean;
    onOpenModalClick: (type: 'main' | 'step', index?: number) => void;
    onDeleteImageClick: () => void;
    addStep: () => void;
    removeStep: (index: number) => void;
    addIngredient: () => void;
    removeIngredient: (index: number) => void;
    onSaveDraftClick: () => void;
    onValidateFormClick: () => void;
    isSavingDraft: boolean;
    hasTitle: boolean;
    onSubmit: (data: NewRecipeRequest) => Promise<void>;
    ingredientFields: FieldArrayWithId<NewRecipeRequest, 'ingredients'>[];
};

export const RecipeForm = ({
    methods,
    onOpenModalClick,
    addStep,
    addIngredient,
    removeStep,
    removeIngredient,
    ingredientFields,
    onSaveDraftClick,
    onValidateFormClick,
    isSavingDraft,
    hasTitle,
    onSubmit,
}: RecipeFormProps) => {
    const measureUnits = useGetMeasureUnitsQuery();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = methods;

    return (
        <form onSubmit={handleSubmit(onSubmit)} data-test-id='recipe-form'>
            <Flex
                gap={{ base: 3, sm: 6 }}
                mb={{ base: '30px', sm: 10 }}
                flexDir={{ base: 'column', '2xs': 'row' }}
                pr={{ xl: 168 }}
            >
                <Box
                    w={{ base: '100%', '2xs': '33%', sm: '32%', md: '38%', xl: '45%' }}
                    h={{ base: '224px', md: '410px' }}
                >
                    <Input type='file' accept='image/*' hidden id='image' {...register('image')} />
                    <Box
                        data-test-id={DataTestId.RecipeImageBlock}
                        {...FORM_NEW_RECIPE_STYLES.imgBlock}
                        onClick={() => onOpenModalClick('main')}
                        border={errors.image ? '2px solid' : 'none'}
                        borderColor='red.500'
                    >
                        {watch('image') ? (
                            <Image
                                data-test-id={DataTestId.RecipeImageBlockPreview}
                                src={`${API_IMG}${watch('image')}`}
                                alt='Загруженное изображение'
                                w='100%'
                                h='100%'
                                objectFit='cover'
                            />
                        ) : (
                            <UploadImg w='33px' h='32px' />
                        )}
                    </Box>
                </Box>
                <VStack
                    w={{ base: '100%', '2xs': '67%', sm: '68%', md: '62%', xl: '54%' }}
                    gap={{ base: '14px', sm: '26px' }}
                >
                    <FormControl
                        display='flex'
                        mb={{ base: 1, sm: 2 }}
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <FormLabel
                            htmlFor='tags'
                            fontWeight={600}
                            fontSize={{ base: 14, md: 16 }}
                            m={0}
                            lineHeight='1.5'
                        >
                            Выберите не менее 3-х тегов
                        </FormLabel>
                        <SubcategorySelect name='categoriesIds' hasError={!!errors.categoriesIds} />
                    </FormControl>
                    <FormControl>
                        <Input
                            data-test-id={DataTestId.RecipeTitle}
                            {...INPUT_STYLES}
                            color='blackAlpha.900'
                            id='title'
                            type='text'
                            placeholder='Название рецепта'
                            _placeholder={{
                                color: 'blackAlpha.700',
                            }}
                            {...register('title')}
                            {...getFieldStyles(!!(errors.title || !hasTitle), 'lime.150')}
                        />
                    </FormControl>
                    <FormControl mb={{ '2xs': 1, sm: 0 }}>
                        <Textarea
                            data-test-id={DataTestId.RecipeDescription}
                            id='description'
                            placeholder='Краткое описание рецепта'
                            size='sm'
                            _placeholder={{
                                color: 'blackAlpha.700',
                            }}
                            fontSize={14}
                            {...register('description')}
                            {...getFieldStyles(!!errors.description, 'blackAlpha.200')}
                            borderRadius={8}
                        />
                    </FormControl>
                    <FormControl display='flex' alignItems='center' gap={3}>
                        <FormLabel
                            htmlFor='portions'
                            fontWeight={600}
                            fontSize={{ base: 14, md: 16 }}
                            m={0}
                            lineHeight='1.5'
                        >
                            На сколько человек ваш рецепт?
                        </FormLabel>
                        <NumberInput id='portions' min={1} maxW={90}>
                            <NumberInputField
                                data-test-id={DataTestId.RecipePortions}
                                placeholder={DEFAULT_PORTIONS_VALUE.toString()}
                                {...register('portions', { valueAsNumber: true })}
                                {...getFieldStyles(!!errors.portions, 'blackAlpha.200')}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl display='flex' alignItems='center' gap={3}>
                        <FormLabel
                            htmlFor='time'
                            fontWeight={600}
                            fontSize={{ base: 14, md: 16 }}
                            m={0}
                            lineHeight='1.5'
                        >
                            Сколько времени готовить в минутах?
                        </FormLabel>
                        <NumberInput min={0} max={10000} id='time' maxW={90}>
                            <NumberInputField
                                placeholder={DEFAULT_TIME_VALUE.toString()}
                                data-test-id={DataTestId.RecipeTime}
                                {...register('time', { valueAsNumber: true })}
                                {...getFieldStyles(!!errors.time, 'blackAlpha.200')}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </VStack>
            </Flex>
            <VStack
                alignItems='flex-start'
                w={{ base: '100%', '2xs': '604px', md: '658px', lg: '668px' }}
                gap={{ base: '10px', '2xs': 4 }}
                m='0 auto'
            >
                <IngredientsHeader />
                {ingredientFields.map((field, index) => (
                    <IngredientField
                        key={field.id}
                        index={index}
                        measureUnits={measureUnits.data ?? []}
                        removeIngredient={removeIngredient}
                        addIngredient={addIngredient}
                    />
                ))}
                <RecipeSteps
                    handleOpenModal={onOpenModalClick}
                    addStep={addStep}
                    removeStep={removeStep}
                />
                <ActionFormBtns
                    onSaveDraftClick={onSaveDraftClick}
                    onPublishBtnClick={onValidateFormClick}
                    isDataSaveDraftLoading={isSavingDraft}
                />
            </VStack>
        </form>
    );
};
