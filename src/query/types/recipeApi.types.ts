import { Recipe } from '~/types/recipe';

export type RecipeResponse = {
    data: Recipe[];
    meta: { total: number; page: number; limit: number; totalPages: number };
};

export type GetRecipesByCategoryParams = {
    subCategoryId: string;
    searchString?: string;
    allergens?: string[];
    page?: number;
    limit?: number;
};

export type GetRecipesParams = {
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

export type GetPaginatedRecipesParams = {
    page: number;
    searchString?: string;
    allergens?: string[];
    meat?: string[];
    garnish?: string[];
    subcategoriesIds?: string[];
    sortBy?: 'createdAt' | 'likes';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
};

export type GetRecipesByCategoryWithPaginateParams = {
    page: number;
    subCategoryId: string;
    searchString?: string;
    allergens?: string[];
    limit?: number;
};

export type GetRecipesWithFiltersAndPaginateParams = {
    page: number;
    searchString?: string;
    allergens?: string[];
    meat?: string[];
    garnish?: string[];
    subcategoriesIds?: string[];
    limit?: number;
};
