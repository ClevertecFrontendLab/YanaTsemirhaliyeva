import { Recipe } from '~/types/recipe';

export type RecipeResponse = {
    data: Recipe[];
    meta: { total: number; page: number; limit: number; totalPages: number };
};

export type BaseRecipeQueryParams = {
    searchString: string;
    allergens: string[];
    meat: string[];
    garnish: string[];
    subcategoriesIds: string[];
    sortBy: 'createdAt' | 'likes';
    sortOrder: 'asc' | 'desc';
    page: number;
    limit: number;
};

export type GetRecipesByCategoryParams = {
    subCategoryId: string;
} & Partial<Pick<BaseRecipeQueryParams, 'searchString' | 'allergens' | 'page' | 'limit'>>;

export type GetRecipesParams = Partial<BaseRecipeQueryParams>;

export type GetPaginatedRecipesParams = {
    page: number;
} & Partial<Omit<BaseRecipeQueryParams, 'page'>>;

export type GetRecipesByCategoryWithPaginateParams = {
    page: number;
    subCategoryId: string;
} & Partial<Pick<BaseRecipeQueryParams, 'searchString' | 'allergens' | 'limit'>>;

export type GetRecipesWithFiltersAndPaginateParams = {
    page: number;
} & Partial<
    Pick<
        BaseRecipeQueryParams,
        'searchString' | 'allergens' | 'meat' | 'garnish' | 'subcategoriesIds' | 'limit'
    >
>;

export type QueryParams = Partial<BaseRecipeQueryParams>;
