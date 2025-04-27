import {
    Box,
    Heading,
    HStack,
    ListItem,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spacer,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Ingredient } from '~/types/recipe';

type IngredientsProps = {
    portions: number;
    ingredients: Ingredient[];
};

export const Ingredients = ({ portions = 1, ingredients }: IngredientsProps) => {
    const [currentPortions, setCurrentPortions] = useState(portions);

    // Функция для перерасчёта количества ингредиентов
    const calculateIngredientCount = (count: string) => {
        const baseCount = parseFloat(count);
        if (isNaN(baseCount)) return count;
        const scaledCount = (baseCount / portions) * currentPortions;
        return Number.isInteger(scaledCount) ? scaledCount.toString() : scaledCount.toFixed(1);
    };

    return (
        <Box>
            <HStack
                color='lime.600'
                textTransform='uppercase'
                fontSize={12}
                fontWeight={700}
                p={{ base: '8px 0 8px 5px', md: '8px 0 8px 32px' }}
            >
                <Heading as='h3' fontSize='inherit'>
                    Ингредиенты
                </Heading>
                <Spacer />
                <HStack>
                    <Text>порций</Text>
                    <NumberInput
                        color='black'
                        size='sm'
                        maxW={20}
                        value={currentPortions}
                        min={1}
                        max={10}
                        onChange={(valueString) => setCurrentPortions(Number(valueString))} // Устанавливаем новое значение
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper data-test-id='increment-stepper' />
                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
            </HStack>
            <UnorderedList
                listStyleType='none'
                marginInlineStart={0}
                sx={{
                    '& li:nth-of-type(odd)': {
                        bg: 'blackAlpha.100',
                    },
                }}
            >
                {ingredients.map((item, i) => (
                    <ListItem
                        data-test-id={`ingredient-quantity-${i}`}
                        key={i}
                        display='flex'
                        alignItems='center'
                        p={{ base: '9px', md: '16px 24px' }}
                        fontSize={{ base: 12, md: 14 }}
                    >
                        <Text>{item.title}</Text>
                        <Spacer />
                        <Text>
                            {item.count !== '0' && calculateIngredientCount(item.count)}{' '}
                            {item.measureUnit}
                        </Text>
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    );
};
