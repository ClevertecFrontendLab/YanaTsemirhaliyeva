import { Box, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { CaloricContent } from '~/components/caloric-content/CaloricContent';
import { CookSteps } from '~/components/cook-steps/CookSteps';
import { FullSizeCard } from '~/components/full-size-card/FullSizeCard';
import { Ingredients } from '~/components/ingredients/Ingredients';
import { NewRecipes } from '~/components/new-recipes/NewRecipes';
import { RecipeAuthor } from '~/components/recipe-author/RecipeAuthor';
import { ALL_RECIPES } from '~/consts/all-recipes';

export const RecipePage = () => {
    const { id } = useParams<{ id: string }>();

    const recipe = ALL_RECIPES.find((r) => r.id === id);

    if (!recipe) {
        return <Text>Рецепт не найден</Text>;
    }

    return (
        <Box>
            <Box pl={{ base: 4, md: '26px' }} pr={18}>
                <Box mb={{ base: 6, md: 10 }} pt={{ md: 7 }} pr={{ md: 9 }}>
                    <FullSizeCard {...recipe} />
                </Box>
                <Box pr={{ md: 10 }}>
                    <VStack
                        spacing={{ base: 6, md: 10 }}
                        alignItems='stretch'
                        maxW={{ md: '578px', xl: '668px' }}
                        m={{ base: '0 auto 40px' }}
                    >
                        <CaloricContent {...recipe} />
                        <VStack
                            px={{ '2xs': '60px', md: 0 }}
                            spacing={{ base: 6, md: 10 }}
                            alignItems='stretch'
                        >
                            <Ingredients
                                portions={recipe.portions!}
                                ingredients={recipe.ingredients}
                            />
                            <CookSteps {...recipe} />
                            <RecipeAuthor />
                        </VStack>
                    </VStack>
                </Box>
            </Box>
            <Box pl={{ base: 4, xl: 6 }} pr={{ xl: 12 }}>
                <NewRecipes />
            </Box>
        </Box>
    );
};
