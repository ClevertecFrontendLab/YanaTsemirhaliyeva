import { NewRecipeRequest } from '~/types/recipe';

export const cleanRecipeFormData = (recipe: NewRecipeRequest): Partial<NewRecipeRequest> => {
    const result: Partial<NewRecipeRequest> = {};

    if (recipe.title && recipe.title.trim() !== '') result.title = recipe.title;
    if (recipe.description && recipe.description.trim() !== '')
        result.description = recipe.description;
    if (recipe.time) result.time = recipe.time;
    if (recipe.portions) result.portions = recipe.portions;
    if (recipe.image && recipe.image.trim() !== '') result.image = recipe.image;

    if (recipe.categoriesIds && recipe.categoriesIds.length > 0) {
        result.categoriesIds = recipe.categoriesIds;
    }

    if (recipe.steps && recipe.steps.length > 0) {
        result.steps = recipe.steps
            .map((step) => ({
                stepNumber: step.stepNumber,
                description:
                    step.description && step.description.trim() !== '' ? step.description : '',
                image:
                    step.image && typeof step.image === 'string' && step.image.trim() !== ''
                        ? step.image
                        : null,
            }))
            .filter((step) => step.description !== '' || step.image !== null);
    }

    if (recipe.ingredients && recipe.ingredients.length > 0) {
        result.ingredients = recipe.ingredients
            .map((ingredient) => ({
                title: ingredient.title && ingredient.title.trim() !== '' ? ingredient.title : '',
                count: Math.round(Number(ingredient.count)) || 0,
                measureUnit:
                    ingredient.measureUnit && ingredient.measureUnit.trim() !== ''
                        ? ingredient.measureUnit
                        : '',
            }))
            .filter((ingredient) => ingredient.title !== '' && ingredient.measureUnit !== '');
    }

    return result;
};
