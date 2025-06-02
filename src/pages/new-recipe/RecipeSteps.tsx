import {
    Box,
    Button,
    Flex,
    FormControl,
    HStack,
    IconButton,
    Image,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { API_IMG, DataTestId } from '~/consts/consts';
import { PlusIcon, UploadImg, WastebasketIcon } from '~/shared/custom-icons';
import { NewRecipeRequest } from '~/types/recipe';
import { generateTestId } from '~/utils';

import { FORM_NEW_RECIPE_STYLES, getFieldStyles } from './styles';

type RecipeStepsProps = {
    handleOpenModal: (type: 'step', index: number) => void;
    addStep: () => void;
    removeStep: (index: number) => void;
};

export const RecipeSteps = ({ handleOpenModal, addStep, removeStep }: RecipeStepsProps) => {
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext<NewRecipeRequest>();

    const { fields } = useFieldArray({
        control,
        name: 'steps',
    });

    const steps = watch('steps');

    return (
        <>
            <Text
                fontWeight={600}
                fontSize={{ base: 14, md: 16 }}
                pt={{ base: 5, '2xs': 3, sm: 6 }}
            >
                Добавьте шаги приготовления
            </Text>
            <Flex w='100%' flexDir='column' mb={{ base: '22px', '2xs': '14px', sm: 5 }}>
                <VStack mb={4} gap={4}>
                    {steps.map((step, index) => (
                        <HStack
                            border='1px solid'
                            borderColor='gray.200'
                            borderRadius={8}
                            gap={0}
                            w='100%'
                            key={`${fields[index]?.id ? fields[index].id : index}`}
                            minH='160px'
                            alignItems='stretch'
                            flexDir={{ base: 'column', '2xs': 'row' }}
                        >
                            <Box
                                data-test-id={generateTestId(DataTestId.RecipeStepsImage, index)}
                                {...FORM_NEW_RECIPE_STYLES.stepImgBlock}
                                onClick={() => handleOpenModal('step', index)}
                            >
                                {step.image ? (
                                    <Image
                                        src={`${API_IMG}${step.image as string}`}
                                        alt='Загруженное изображение'
                                        w='100%'
                                        h='100%'
                                        objectFit='cover'
                                        pos='absolute'
                                        data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                                    />
                                ) : (
                                    <UploadImg w='33px' h='32px' />
                                )}
                            </Box>
                            <VStack
                                alignItems='flex-start'
                                p={5}
                                gap={4}
                                w={{ base: '100%', '2xs': '43%', sm: '48%' }}
                            >
                                <HStack justifyContent='space-between' w='100%'>
                                    <Text
                                        bgColor='blackAlpha.100'
                                        color='black'
                                        px={2}
                                        borderRadius={4}
                                        fontSize={12}
                                        fontWeight={600}
                                    >
                                        Шаг {index + 1}
                                    </Text>
                                    {(step.image ||
                                        steps.length > 1 ||
                                        step.description.length > 0) &&
                                        step.stepNumber !== 1 && (
                                            <IconButton
                                                data-test-id={generateTestId(
                                                    DataTestId.RecipeStepRemoveBtn,
                                                    index,
                                                )}
                                                onClick={() => removeStep(index)}
                                                icon={<WastebasketIcon />}
                                                color='lime.600'
                                                bgColor='transparent'
                                                boxSize={8}
                                                minW={8}
                                                aria-label='Удалить шаг'
                                            />
                                        )}
                                </HStack>
                                <FormControl>
                                    <Controller
                                        name={`steps.${index}.description`}
                                        control={control}
                                        render={({ field }) => (
                                            <Textarea
                                                data-test-id={generateTestId(
                                                    DataTestId.RecipeStepDescription,
                                                    index,
                                                )}
                                                placeholder='Шаг'
                                                _placeholder={{
                                                    color: 'blackAlpha.500',
                                                }}
                                                fontSize={14}
                                                {...field}
                                                {...getFieldStyles(
                                                    !!errors.steps?.[index]?.description,
                                                    'blackAlpha.200',
                                                )}
                                                minH={{ base: '114px', '2xs': '84px' }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </VStack>
                        </HStack>
                    ))}
                </VStack>
                <Button
                    rightIcon={
                        <PlusIcon
                            color='white'
                            backgroundColor='blackAlpha.800'
                            borderRadius='50%'
                            boxSize='14px'
                            padding='3px'
                        />
                    }
                    {...FORM_NEW_RECIPE_STYLES.newStepBtn}
                    onClick={addStep}
                >
                    Новый шаг
                </Button>
            </Flex>
        </>
    );
};
