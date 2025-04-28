import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ALL_RECIPES } from '~/consts/all-recipes';
import { Recipe } from '~/types/recipe';
import { filterRecipes } from '~/utils';

import { ApplicationState } from '../configure-store';

export type FilterTypes = 'meatTypes' | 'garnishTypes' | 'allergens' | 'categories' | 'authors';

export type RecipeState = {
    recipes: Recipe[];
    filteredRecipes: Recipe[];
    allergens: string[];
    currentCategory: string | null;
    currentSubcategory: string | null;
    currentRecipeTitle: string | null;
    isFilterAllergenActive: boolean;
    isIntroAllergenActive: boolean;
    selectedFilters: {
        meatTypes?: string[];
        garnishTypes?: string[];
        allergens?: string[];
        categories?: string[];
        authors?: string[];
    };
    appliedFilters: {
        meatTypes?: string[];
        garnishTypes?: string[];
        allergens?: string[];
        categories?: string[];
        authors?: string[];
    };
    searchQuery: string;
    isDrawerOpen: boolean;
};

const initialState: RecipeState = {
    recipes: ALL_RECIPES,
    filteredRecipes: ALL_RECIPES,
    allergens: [],
    currentCategory: null,
    currentSubcategory: null,
    currentRecipeTitle: null,
    isFilterAllergenActive: false,
    isIntroAllergenActive: false,
    selectedFilters: {},
    appliedFilters: {},
    searchQuery: '',
    isDrawerOpen: false,
};

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes(state, action: PayloadAction<Recipe[]>) {
            state.recipes = action.payload;
            state.filteredRecipes = filterRecipes(state);
        },
        setCategory(state, action: PayloadAction<string | null>) {
            state.currentCategory = action.payload;
            state.currentSubcategory = null;
            state.filteredRecipes = filterRecipes(state);
        },
        setSubcategory(state, action: PayloadAction<string | null>) {
            state.currentSubcategory = action.payload;
            state.filteredRecipes = filterRecipes(state);
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.filteredRecipes = filterRecipes(state);
        },
        toggleFilterAllergen(state) {
            state.isFilterAllergenActive = !state.isFilterAllergenActive;
            state.filteredRecipes = filterRecipes(state);
        },
        toggleIntroAllergen(state) {
            state.isIntroAllergenActive = !state.isIntroAllergenActive;
            state.filteredRecipes = filterRecipes(state);
        },
        addAllergen(state, action: PayloadAction<string>) {
            const allergen = action.payload;
            if (!state.allergens.includes(allergen)) {
                state.allergens.push(allergen);
                state.filteredRecipes = filterRecipes(state);
            }
        },
        removeAllergen(state, action: PayloadAction<string>) {
            const allergen = action.payload;
            state.allergens = state.allergens.filter((item) => item !== allergen);
            state.filteredRecipes = filterRecipes(state);
        },
        clearAllergens(state) {
            state.allergens = [];
            state.filteredRecipes = filterRecipes(state);
        },
        updateSelectedFilters(
            state,
            action: PayloadAction<{ type: FilterTypes; value: string[] }>,
        ) {
            const { type, value } = action.payload;
            state.selectedFilters[type] = value;
            // state.filteredRecipes = filterRecipes(state);
        },
        applyFilters(state) {
            state.appliedFilters = JSON.parse(JSON.stringify(state.selectedFilters));
            state.filteredRecipes = filterRecipes(state);
        },
        clearFilters(state) {
            state.selectedFilters = {};
            state.appliedFilters = {};
            state.allergens = [];
            state.filteredRecipes = filterRecipes(state);
        },
        clearSearch(state) {
            state.searchQuery = '';
            state.filteredRecipes = filterRecipes(state);
        },
        setRecipeTitle(state, action: PayloadAction<string | null>) {
            state.currentRecipeTitle = action.payload;
        },
        setDrawerStatus(state, action: PayloadAction<boolean>) {
            state.isDrawerOpen = action.payload;
        },
    },
});

// Экшены
export const {
    setRecipes,
    toggleFilterAllergen,
    toggleIntroAllergen,
    addAllergen,
    removeAllergen,
    clearAllergens,
    setCategory,
    setSubcategory,
    setRecipeTitle,
    updateSelectedFilters,
    clearFilters,
    applyFilters,
    setSearchQuery,
    clearSearch,
    setDrawerStatus,
} = recipeSlice.actions;

// Селекторы
export const recipesSelector = (state: ApplicationState) => state.recipes.filteredRecipes;
export const allergensSelector = (state: ApplicationState) => state.recipes.allergens;
export const currentCategorySelector = (state: ApplicationState) => state.recipes.currentCategory;
export const currentSubcategorySelector = (state: ApplicationState) =>
    state.recipes.currentSubcategory;
export const currentRecipeTitleSelector = (state: ApplicationState) =>
    state.recipes.currentRecipeTitle;
export const isFilterActiveSelector = (state: ApplicationState) =>
    state.recipes.isFilterAllergenActive;
export const isIntroActiveSelector = (state: ApplicationState) =>
    state.recipes.isIntroAllergenActive;
export const selectedFiltersSelector = (state: ApplicationState) => state.recipes.selectedFilters;
export const serchInputSelector = (state: ApplicationState) => state.recipes.searchQuery;
export const drawerStatusSelector = (state: ApplicationState) => state.recipes.isDrawerOpen;

// Редьюсер
export default recipeSlice.reducer;
