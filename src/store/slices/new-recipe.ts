import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SubCategory } from '~/types/category';
import { Ingredient, NewRecipeRequest, Step } from '~/types/recipe';

import { ApplicationState } from '../configure-store';

const initialState: NewRecipeRequest & { selectedSubCategories: SubCategory[] } = {
    title: '',
    description: '',
    time: 30,
    categoriesIds: [],
    portions: 4,
    image: '',
    steps: [],
    ingredients: [],
    selectedSubCategories: [],
};

export const newRecipeSlice = createSlice({
    name: 'newRecipe',
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
        setTime(state, action: PayloadAction<number>) {
            state.time = action.payload;
        },
        setPortions(state, action: PayloadAction<number>) {
            state.portions = action.payload;
        },
        setImage(state, action: PayloadAction<string>) {
            state.image = action.payload;
        },
        updateSteps(state, action: PayloadAction<{ index?: number; value?: Step | null }>) {
            const { index, value } = action.payload;
            if (value === null && index !== undefined) {
                state.steps = state.steps
                    .filter((_, i) => i !== index)
                    .map((step, i) => ({ ...step, stepNumber: i + 1 }));
                if (state.steps.length === 0) {
                    state.steps.push({ stepNumber: 1, description: '', image: null });
                }
            } else if (index !== undefined && state.steps[index]) {
                state.steps[index] = { ...state.steps[index], ...value };
            } else {
                state.steps.push({
                    stepNumber: state.steps.length + 1,
                    description: '',
                    image: null,
                });
            }
        },
        updateIngredients(
            state,
            action: PayloadAction<{ index?: number; value?: Ingredient | null }>,
        ) {
            const { index, value } = action.payload;

            if (value === null && index !== undefined) {
                state.ingredients = state.ingredients.filter((_, i) => i !== index);
            } else if (index !== undefined && state.ingredients[index]) {
                state.ingredients[index] = { ...state.ingredients[index], ...value };
            } else {
                state.ingredients.push({ title: '', count: 0, measureUnit: '' });
            }
        },
        updateCategories(state, action: PayloadAction<{ categoryId: string; remove?: boolean }>) {
            const { categoryId, remove } = action.payload;
            if (remove) {
                state.categoriesIds = state.categoriesIds.filter((id) => id !== categoryId);
            } else if (!state.categoriesIds.includes(categoryId)) {
                state.categoriesIds.push(categoryId);
            }
        },
        addSubCategory(state, action: PayloadAction<SubCategory>) {
            const { _id } = action.payload;
            if (!state.categoriesIds.includes(_id)) {
                state.categoriesIds.push(_id);
                state.selectedSubCategories.push(action.payload);
            }
        },
        removeSubCategory(state, action: PayloadAction<string>) {
            state.categoriesIds = state.categoriesIds.filter((id) => id !== action.payload);
            state.selectedSubCategories = state.selectedSubCategories.filter(
                (sub) => sub._id !== action.payload,
            );
        },
        clearSubCategories(state) {
            state.categoriesIds = [];
            state.selectedSubCategories = [];
        },
    },
});

// Экшены
export const {
    setTitle,
    setTime,
    setDescription,
    setPortions,
    setImage,
    updateCategories,
    updateSteps,
    updateIngredients,
    addSubCategory,
    removeSubCategory,
    clearSubCategories,
} = newRecipeSlice.actions;

// Селекторы
export const selectors = {
    title: (state: ApplicationState) => state.newRecipe.title,
    time: (state: ApplicationState) => state.newRecipe.time,
    description: (state: ApplicationState) => state.newRecipe.description,
    portions: (state: ApplicationState) => state.newRecipe.portions,
    image: (state: ApplicationState) => state.newRecipe.image,
    categoriesIds: (state: ApplicationState) => state.newRecipe.categoriesIds,
    steps: (state: ApplicationState) => state.newRecipe.steps,
    ingredients: (state: ApplicationState) => state.newRecipe.ingredients,
    selectedSubCategories: (state: ApplicationState) => state.newRecipe.selectedSubCategories,
};

// Для обратной совместимости - индивидуальные селекторы
export const titleSelector = selectors.title;
export const descriptionSelector = selectors.description;
export const timeSelector = selectors.time;
export const portionsSelector = selectors.portions;
export const imageSelector = selectors.image;
export const categoriesIdsSelector = selectors.categoriesIds;
export const stepsSelector = selectors.steps;
export const ingredientsSelector = selectors.ingredients;
export const selectedSubCategoriesSelector = selectors.selectedSubCategories;

// Редьюсер
export default newRecipeSlice.reducer;
