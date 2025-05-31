import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category, SubCategory } from '~/types/category';
import { Recipe } from '~/types/recipe';
import { formatAllergensForUrl } from '~/utils';

import { ApplicationState } from '../configure-store';

// Типы для фильтров
export type FilterTypes = 'meatTypes' | 'garnishTypes' | 'allergens' | 'categories' | 'authors';

// Типизация параметров поиска
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

// Типизация фильтров
export type FiltersMap = {
    meatTypes?: string[];
    garnishTypes?: string[];
    allergens?: string[];
    categories?: string[];
    authors?: string[];
};

// Типизация состояния рецептов
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
};

// Дефолтные значения для параметров поиска
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

// Начальное состояние
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
};

// Вспомогательные функции
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
        resetState: () => initialState,
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
    setIsSearchTriggered,
    setIsSliderFetching,
    setIsJuiciestFetching,
    setIsRelevantFetching,
    applyIntroAllergens,
    resetState,
} = recipeSlice.actions;

// Селекторы сгруппированные по типу данных
export const selectors = {
    // Данные рецептов
    recipes: (state: ApplicationState) => state.recipes.filteredRecipes,

    // Категории и рецепты
    currentCategory: (state: ApplicationState) => state.recipes.currentCategory,
    currentSubcategory: (state: ApplicationState) => state.recipes.currentSubcategory,
    currentRecipeTitle: (state: ApplicationState) => state.recipes.currentRecipeTitle,
    currentRecipeId: (state: ApplicationState) => state.recipes.currentRecipeId,

    // Фильтры и аллергены
    allergens: (state: ApplicationState) => state.recipes.allergens,
    isFilterActive: (state: ApplicationState) => state.recipes.isFilterAllergenActive,
    isIntroActive: (state: ApplicationState) => state.recipes.isIntroAllergenActive,
    selectedFilters: (state: ApplicationState) => state.recipes.selectedFilters,

    // Поиск
    searchQuery: (state: ApplicationState) => state.recipes.searchQuery,
    searchParams: (state: ApplicationState) => state.recipes.searchQueryParams,
    isSearchTriggered: (state: ApplicationState) => state.recipes.isSearchTriggered,

    // UI состояние
    drawerStatus: (state: ApplicationState) => state.recipes.isDrawerOpen,
    isSliderFetching: (state: ApplicationState) => state.recipes.isSliderFetching,
    isJuiciestFetching: (state: ApplicationState) => state.recipes.isJuiciestFetching,
    isRelevantFetching: (state: ApplicationState) => state.recipes.isRelevantFetching,
};

// Для обратной совместимости - индивидуальные селекторы
export const recipesSelector = selectors.recipes;
export const allergensSelector = selectors.allergens;
export const currentCategorySelector = selectors.currentCategory;
export const currentSubcategorySelector = selectors.currentSubcategory;
export const currentRecipeTitleSelector = selectors.currentRecipeTitle;
export const currentRecipeIdSelector = selectors.currentRecipeId;
export const isFilterActiveSelector = selectors.isFilterActive;
export const isIntroActiveSelector = selectors.isIntroActive;
export const selectedFiltersSelector = selectors.selectedFilters;
export const serchInputSelector = selectors.searchQuery;
export const drawerStatusSelector = selectors.drawerStatus;
export const searchParamsSelector = selectors.searchParams;
export const isSearchTriggeredSelector = selectors.isSearchTriggered;
export const isSliderFetchingSelector = selectors.isSliderFetching;
export const isJuiciestFetchingSelector = selectors.isJuiciestFetching;
export const isRelevantFetchingSelector = selectors.isRelevantFetching;

// Редьюсер
export default recipeSlice.reducer;
