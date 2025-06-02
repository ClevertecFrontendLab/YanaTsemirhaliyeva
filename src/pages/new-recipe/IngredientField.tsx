import { Flex, IconButton, Input, Select } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { DataTestId } from '~/consts/consts';
import { PlusIcon, WastebasketIcon } from '~/shared/custom-icons';
import { NewRecipeRequest } from '~/types/recipe';
import { generateTestId } from '~/utils';

import { getFieldStyles } from './styles';

const DEFAULT_INGREDIENT_VALUE = 100;

type IngredientFieldProps = {
    index: number;
    measureUnits: { _id: string; name: string }[];
    removeIngredient: (index: number) => void;
    addIngredient: () => void;
};

export const IngredientField = ({
    index,
    measureUnits,
    removeIngredient,
    addIngredient,
}: IngredientFieldProps) => {
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext<NewRecipeRequest>();

    return (
        <Flex w='100%' gap={3} flexWrap={{ base: 'wrap', '2xs': 'nowrap' }} alignItems='center'>
            <Controller
                name={`ingredients.${index}.title`}
                control={control}
                render={({ field }) => (
                    <Input
                        data-test-id={generateTestId(DataTestId.RecipeIngredientTitle, index)}
                        w={{ base: '100%', '2xs': 240, sm: 295 }}
                        placeholder='Ингредиент'
                        id={`ingredients-${index}-title`}
                        {...field}
                        {...getFieldStyles(!!errors.ingredients?.[index]?.title, 'blackAlpha.200')}
                    />
                )}
            />
            <Controller
                name={`ingredients.${index}.count`}
                control={control}
                render={({ field }) => (
                    <Input
                        data-test-id={generateTestId(DataTestId.RecipeIngredientCount, index)}
                        w={{ base: '20%', '2xs': 20 }}
                        placeholder={DEFAULT_INGREDIENT_VALUE.toString()}
                        id={`ingredients-${index}-count`}
                        step='1'
                        min='1'
                        pattern='\d*'
                        inputMode='numeric'
                        type='number'
                        {...field}
                        {...getFieldStyles(!!errors.ingredients?.[index]?.count, 'blackAlpha.200')}
                        onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : '');
                        }}
                    />
                )}
            />
            <Controller
                name={`ingredients.${index}.measureUnit`}
                control={control}
                render={({ field }) => (
                    <Select
                        flex='1'
                        w={{ base: '61%', '2xs': 215 }}
                        id={`ingredients-${index}-measureUnit`}
                        {...field}
                        {...getFieldStyles(
                            !!errors.ingredients?.[index]?.measureUnit,
                            'blackAlpha.200',
                        )}
                        isTruncated
                        data-test-id={generateTestId(DataTestId.RecipeIngredientMeasureUnit, index)}
                        value={watch(`ingredients.${index}.measureUnit`)}
                    >
                        <option value=''>Единица измерения</option>
                        {measureUnits.map((item) => (
                            <option key={item._id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                )}
            />
            {index < watch('ingredients').length - 1 ? (
                <IconButton
                    data-test-id={generateTestId(DataTestId.RecipeIngredientRemove, index)}
                    onClick={() => removeIngredient(index)}
                    color='lime.600'
                    bgColor='transparent'
                    boxSize={8}
                    minW={8}
                    aria-label='удалить ингредиент'
                    icon={<WastebasketIcon boxSize='14px' />}
                />
            ) : (
                <IconButton
                    data-test-id={DataTestId.RecipeIngredientAdd}
                    onClick={addIngredient}
                    color='lime.50'
                    bgColor='black'
                    borderRadius='50%'
                    boxSize={8}
                    minW={8}
                    aria-label='добавить ингредиент'
                    _hover={{
                        bgColor: 'black',
                    }}
                    icon={<PlusIcon boxSize='14px' />}
                />
            )}
        </Flex>
    );
};
