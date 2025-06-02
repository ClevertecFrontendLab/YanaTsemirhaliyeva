import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category, SubCategory } from '~/types/category';
import { Recipe } from '~/types/recipe';
import { formatAllergensForUrl } from '~/utils';

import { ApplicationState } from '../configure-store';

export type FilterTypes = 'meatTypes' | 'garnishTypes' | 'allergens' | 'categories' | 'authors';

export type SearchQueryParams = {
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

export type FiltersMap = {
    meatTypes?: string[];
    garnishTypes?: string[];
    allergens?: string[];
    categories?: string[];
    authors?: string[];
};

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
    selectedFilters: FiltersMap;
    appliedFilters: FiltersMap;
    searchQuery: string;
    isDrawerOpen: boolean;
    searchQueryParams: SearchQueryParams;
    isSearchTriggered: boolean;
    isSliderFetching: boolean;
    isJuiciestFetching: boolean;
    isRelevantFetching: boolean;
    isCategoryCuisineDataFetching: boolean;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;

const defaultSearchParams: SearchQueryParams = {
    searchString: '',
    allergens: [],
    meat: [],
    garnish: [],
    subcategoriesIds: [],
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
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
    searchQueryParams: defaultSearchParams,
    isSearchTriggered: false,
    isSliderFetching: false,
    isJuiciestFetching: false,
    isRelevantFetching: false,
    isCategoryCuisineDataFetching: false,
};

const getAllergens = (state: RecipeState): string[] => [
    ...state.allergens,
    ...(state.appliedFilters.allergens || []),
];

const resetFilters = (state: RecipeState, keepSearchQuery = true): void => {
    state.selectedFilters = {};
    state.appliedFilters = {};
    state.allergens = [];
    state.searchQueryParams = {
        ...defaultSearchParams,
        searchString: keepSearchQuery ? state.searchQuery : '',
    };
    state.isFilterAllergenActive = false;
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
            const allergens = formatAllergensForUrl(getAllergens(state));

            state.searchQueryParams = {
                ...state.searchQueryParams,
                searchString: state.searchQuery || '',
                allergens,
                garnish: state.appliedFilters.garnishTypes || [],
                meat: state.appliedFilters.meatTypes || [],
                subcategoriesIds: state.appliedFilters.categories || [],
            };
        },
        clearFilters(state) {
            resetFilters(state);
        },
        clearSearch(state) {
            state.searchQuery = '';
            state.searchQueryParams.searchString = '';
        },
        updateSearchParams(state, action: PayloadAction<Partial<SearchQueryParams>>) {
            const allergens = action.payload.allergens || state.searchQueryParams.allergens || [];

            state.searchQueryParams = {
                ...state.searchQueryParams,
                ...action.payload,
                allergens: formatAllergensForUrl(allergens),
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
        setIsSearchTriggered: (state, action: PayloadAction<boolean>) => {
            state.isSearchTriggered = action.payload;
        },
        setIsSliderFetching: (state, action: PayloadAction<boolean>) => {
            state.isSliderFetching = action.payload;
        },
        setIsJuiciestFetching: (state, action: PayloadAction<boolean>) => {
            state.isJuiciestFetching = action.payload;
        },
        setIsRelevantFetching: (state, action: PayloadAction<boolean>) => {
            state.isRelevantFetching = action.payload;
        },
        setIsCategoryCuisineDataFetching: (state, action: PayloadAction<boolean>) => {
            state.isCategoryCuisineDataFetching = action.payload;
        },
        resetState: () => initialState,
    },
});

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
    setIsSearchTriggered,
    setIsSliderFetching,
    setIsJuiciestFetching,
    setIsRelevantFetching,
    setIsCategoryCuisineDataFetching,
    applyIntroAllergens,
    resetState,
} = recipeSlice.actions;

export const recipesSelector = (state: ApplicationState) => state.recipes.filteredRecipes;
export const currentCategorySelector = (state: ApplicationState) => state.recipes.currentCategory;
export const currentSubcategorySelector = (state: ApplicationState) =>
    state.recipes.currentSubcategory;
export const currentRecipeTitleSelector = (state: ApplicationState) =>
    state.recipes.currentRecipeTitle;
export const currentRecipeIdSelector = (state: ApplicationState) => state.recipes.currentRecipeId;

export const allergensSelector = (state: ApplicationState) => state.recipes.allergens;
export const isFilterActiveSelector = (state: ApplicationState) =>
    state.recipes.isFilterAllergenActive;
export const isIntroActiveSelector = (state: ApplicationState) =>
    state.recipes.isIntroAllergenActive;
export const selectedFiltersSelector = (state: ApplicationState) => state.recipes.selectedFilters;

export const serchInputSelector = (state: ApplicationState) => state.recipes.searchQuery;
export const searchParamsSelector = (state: ApplicationState) => state.recipes.searchQueryParams;
export const isSearchTriggeredSelector = (state: ApplicationState) =>
    state.recipes.isSearchTriggered;

export const drawerStatusSelector = (state: ApplicationState) => state.recipes.isDrawerOpen;
export const isSliderFetchingSelector = (state: ApplicationState) => state.recipes.isSliderFetching;
export const isJuiciestFetchingSelector = (state: ApplicationState) =>
    state.recipes.isJuiciestFetching;
export const isRelevantFetchingSelector = (state: ApplicationState) =>
    state.recipes.isRelevantFetching;
export const isCategoryCuisineDataFetchingSelector = (state: ApplicationState) =>
    state.recipes.isCategoryCuisineDataFetching;

export default recipeSlice.reducer;
