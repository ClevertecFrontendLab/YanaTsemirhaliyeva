import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category, SubCategory } from '~/types/category';
import { Recipe } from '~/types/recipe';

import { ApplicationState } from '../configure-store';

export type FilterTypes = 'meatTypes' | 'garnishTypes' | 'allergens' | 'categories' | 'authors';
const formatAllergensForUrl = (allergens: string[]) =>
    allergens
        .map((allergen) =>
            allergen.includes('(') ? allergen.replace(/\(|\)/g, '').split(' ') : [allergen],
        )
        .flat();

export type RecipeState = {
    recipes: Recipe[];
    filteredRecipes: Recipe[];
    allergens: string[];
    currentCategory: Category | null;
    currentSubcategory: SubCategory | null;
    currentRecipeTitle: string | null;
    currentRecipeId: string | null;
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
    searchQueryParams: {
        searchString?: string;
        allergens?: string[];
        meat?: string[];
        garnish?: string[];
        subcategoriesIds?: string[];
        sortBy?: 'createdAt' | 'likes';
        sortOrder?: 'asc' | 'desc';
        page?: number;
        limit?: number;
    };
    isError: boolean;
    isSearchTriggered: boolean;
    isFetching: boolean;
};

const initialState: RecipeState = {
    recipes: [],
    filteredRecipes: [],
    allergens: [],
    currentCategory: null,
    currentSubcategory: null,
    currentRecipeTitle: null,
    currentRecipeId: null,
    isFilterAllergenActive: false,
    isIntroAllergenActive: false,
    selectedFilters: {},
    appliedFilters: {},
    searchQuery: '',
    isDrawerOpen: false,
    searchQueryParams: {
        searchString: '',
        allergens: [],
        meat: [],
        garnish: [],
        subcategoriesIds: [],
        sortBy: undefined,
        sortOrder: undefined,
        page: 1,
        limit: 8,
    },
    isError: false,
    isSearchTriggered: false,
    isFetching: false,
};

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes(state, action: PayloadAction<Recipe[]>) {
            state.recipes = action.payload;
        },
        setCategory(state, action: PayloadAction<Category | null>) {
            state.currentCategory = action.payload;
            state.currentSubcategory = null;
        },
        setSubcategory(state, action: PayloadAction<SubCategory | null>) {
            state.currentSubcategory = action.payload;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.searchQueryParams.searchString = action.payload;
        },
        toggleFilterAllergen(state) {
            state.isFilterAllergenActive = !state.isFilterAllergenActive;
        },
        toggleIntroAllergen(state) {
            state.isIntroAllergenActive = !state.isIntroAllergenActive;
        },
        addAllergen(state, action: PayloadAction<string>) {
            const allergen = action.payload;
            if (!state.allergens.includes(allergen)) {
                state.allergens.push(allergen);
            }
        },
        removeAllergen(state, action: PayloadAction<string>) {
            const allergen = action.payload;
            state.allergens = state.allergens.filter((item) => item !== allergen);
        },
        applyIntroAllergens(state) {
            state.searchQueryParams.allergens = formatAllergensForUrl([...state.allergens]);
        },
        clearAllergens(state) {
            state.allergens = [];
            state.searchQueryParams.allergens = [];
        },
        updateSelectedFilters(
            state,
            action: PayloadAction<{ type: FilterTypes; value: string[] }>,
        ) {
            const { type, value } = action.payload;
            state.selectedFilters[type] = value;
        },
        applyFilters(state) {
            state.appliedFilters = JSON.parse(JSON.stringify(state.selectedFilters));
            state.searchQueryParams = {
                ...state.searchQueryParams,
                searchString: state.searchQuery || '',
                allergens: formatAllergensForUrl([
                    ...state.allergens,
                    ...(state.appliedFilters.allergens || []),
                ]),
                garnish: state.appliedFilters.garnishTypes || [],
                meat: state.appliedFilters.meatTypes || [],
                subcategoriesIds: state.appliedFilters.categories || [],
            };
        },
        clearFilters(state) {
            state.selectedFilters = {};
            state.appliedFilters = {};
            state.allergens = [];
            state.searchQueryParams = {
                searchString: state.searchQuery,
                allergens: [],
                meat: [],
                garnish: [],
                subcategoriesIds: [],
                sortBy: undefined,
                sortOrder: undefined,
                page: 1,
                limit: 8,
            };
            state.isFilterAllergenActive = false;
        },
        clearSearch(state) {
            state.searchQuery = '';
            state.searchQueryParams.searchString = '';
        },
        updateSearchParams(
            state,
            action: PayloadAction<Partial<RecipeState['searchQueryParams']>>,
        ) {
            state.searchQueryParams = {
                ...state.searchQueryParams,
                ...action.payload,
                allergens: formatAllergensForUrl(
                    action.payload.allergens || state.searchQueryParams.allergens || [],
                ),
            };
        },
        setRecipeTitle(state, action: PayloadAction<string | null>) {
            state.currentRecipeTitle = action.payload;
        },
        setRecipeId(state, action: PayloadAction<string | null>) {
            state.currentRecipeId = action.payload;
        },
        setDrawerStatus(state, action: PayloadAction<boolean>) {
            state.isDrawerOpen = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        clearError: (state) => {
            state.isError = false;
        },
        setIsSearchTriggered: (state, action: PayloadAction<boolean>) => {
            state.isSearchTriggered = action.payload;
        },
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
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
    setRecipeId,
    updateSelectedFilters,
    clearFilters,
    applyFilters,
    setSearchQuery,
    clearSearch,
    setDrawerStatus,
    updateSearchParams,
    setError,
    clearError,
    setIsSearchTriggered,
    setIsFetching,
    applyIntroAllergens,
} = recipeSlice.actions;

// Селекторы
export const recipesSelector = (state: ApplicationState) => state.recipes.filteredRecipes;
export const allergensSelector = (state: ApplicationState) => state.recipes.allergens;
export const currentCategorySelector = (state: ApplicationState) => state.recipes.currentCategory;
export const currentSubcategorySelector = (state: ApplicationState) =>
    state.recipes.currentSubcategory;
export const currentRecipeTitleSelector = (state: ApplicationState) =>
    state.recipes.currentRecipeTitle;
export const currentRecipeIdSelector = (state: ApplicationState) => state.recipes.currentRecipeId;
export const isFilterActiveSelector = (state: ApplicationState) =>
    state.recipes.isFilterAllergenActive;
export const isIntroActiveSelector = (state: ApplicationState) =>
    state.recipes.isIntroAllergenActive;
export const selectedFiltersSelector = (state: ApplicationState) => state.recipes.selectedFilters;
export const serchInputSelector = (state: ApplicationState) => state.recipes.searchQuery;
export const drawerStatusSelector = (state: ApplicationState) => state.recipes.isDrawerOpen;

export const searchParamsSelector = (state: ApplicationState) => state.recipes.searchQueryParams;
export const isErrorSelector = (state: ApplicationState) => state.recipes.isError;
export const isSearchTriggeredSelector = (state: ApplicationState) =>
    state.recipes.isSearchTriggered;
export const isFetching = (state: ApplicationState) => state.recipes.isFetching;

// Редьюсер
export default recipeSlice.reducer;
