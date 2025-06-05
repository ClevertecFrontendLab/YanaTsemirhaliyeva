import { Button, SimpleGrid, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { HorizontalCard } from '~/components/horizontal-card/HorizontalCard';
import { DataTestId } from '~/consts/consts';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import { Recipe } from '~/types/recipe';

const DEFAULT_RECIPES_DISPLAY_COUNT = 8;

type UserRecipesTypes = {
    list: Recipe[];
};

export const UserRecipes = ({ list }: UserRecipesTypes) => {
    const categories = useAppSelector(categoriesSelector);
    const [isDisplayAllRecipes, setIsDisplayAllRecipes] = useState(false);
    const recipesToDisplay = isDisplayAllRecipes
        ? list
        : list.slice(0, DEFAULT_RECIPES_DISPLAY_COUNT);

    const handleLoadMore = () => setIsDisplayAllRecipes(true);

    return (
        <VStack as='section'>
            <SimpleGrid
                data-test-id={DataTestId.RecipeCardList}
                columns={{ base: 1, '2xs': 2 }}
                spacing={4}
                alignItems='stretch'
                autoRows='1fr'
                w='100%'
                mb={2}
            >
                {recipesToDisplay.map((recipe, i) => (
                    <HorizontalCard
                        item={recipe}
                        index={i}
                        categories={categories}
                        key={recipe._id}
                    />
                ))}
            </SimpleGrid>
            {!isDisplayAllRecipes && list.length > DEFAULT_RECIPES_DISPLAY_COUNT && (
                <Button
                    data-test-id={DataTestId.BtnLoadMore}
                    onClick={handleLoadMore}
                    bgColor='lime.400'
                    size='md'
                    m='0 auto'
                    variant='solid'
                    colorScheme='lime'
                    color='black'
                >
                    Загрузить еще
                </Button>
            )}
        </VStack>
    );
};
