import { DEFAULT_CARDS_PER_PAGE, DEFAULT_PAGE } from '~/consts/consts';
import { Recipe } from '~/types/recipe';

import { baseApiSlice } from '../base-api';
import { ApiEndpoints } from '../constants/api';
import { Tags } from '../constants/tags';
import {
    GetPaginatedRecipesParams,
    GetRecipesByCategoryParams,
    GetRecipesByCategoryWithPaginateParams,
    GetRecipesParams,
    GetRecipesWithFiltersAndPaginateParams,
    RecipeResponse,
} from '../types/recipeApi.types';

type QueryParamsOptions = {
    searchString?: string;
    allergens?: string[];
    meat?: string[];
    garnish?: string[];
    subcategoriesIds?: string[];
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
};

const buildQueryParams = (options: QueryParamsOptions) => {
    const {
        searchString,
        allergens,
        meat,
        garnish,
        subcategoriesIds,
        page = DEFAULT_PAGE,
        limit = DEFAULT_CARDS_PER_PAGE,
        sortBy,
        sortOrder,
    } = options;

    return {
        page,
        limit,
        ...(searchString ? { searchString } : {}),
        ...(allergens?.length ? { allergens: allergens.join(',') } : {}),
        ...(meat?.length ? { meat: meat.join(',') } : {}),
        ...(garnish?.length ? { garnish: garnish.join(',') } : {}),
        ...(subcategoriesIds?.length ? { subcategoriesIds: subcategoriesIds.join(',') } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortOrder ? { sortOrder } : {}),
    };
};

const handlePaginationMerge = (
    currentCache: RecipeResponse,
    newData: RecipeResponse,
    { arg }: { arg: { page: number } },
) => {
    if (arg.page === DEFAULT_PAGE || arg.page === 1) {
        return newData;
    }
    currentCache.data.push(...newData.data);
    currentCache.meta = newData.meta;
    return currentCache;
};

type ArgValue = string | number | boolean | string[] | number[] | undefined;

type ForceRefetchArg = {
    currentArg: Record<string, ArgValue> | undefined;
    previousArg: Record<string, ArgValue> | undefined;
};

const createForceRefetchHandler =
    (fields: string[]) =>
    ({ currentArg, previousArg }: ForceRefetchArg): boolean => {
        if (!currentArg || !previousArg) return true;

        return fields.some((field) => {
            if (field === 'page') {
                return currentArg.page !== previousArg.page;
            }
            if (field === 'subCategoryId') {
                return currentArg.subCategoryId !== previousArg.subCategoryId;
            }
            if (field === 'searchString') {
                return currentArg.searchString !== previousArg.searchString;
            }
            return JSON.stringify(currentArg[field]) !== JSON.stringify(previousArg[field]);
        });
    };

export const recipeApiSlice = baseApiSlice
    .enhanceEndpoints({ addTagTypes: [Tags.RECIPES] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipesByCategory: builder.query<RecipeResponse, GetRecipesByCategoryParams>({
                query: ({ subCategoryId, ...rest }) => ({
                    url: `${ApiEndpoints.RECIPES}/category/${subCategoryId}`,
                    params: buildQueryParams(rest),
                }),
                forceRefetch: createForceRefetchHandler(['searchString', 'allergens']),
            }),

            getRecipes: builder.query<RecipeResponse, GetRecipesParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    params: buildQueryParams({
                        ...params,
                        sortBy: params.sortBy || 'createdAt',
                        sortOrder: params.sortOrder || 'desc',
                    }),
                }),
                forceRefetch: createForceRefetchHandler(['searchString', 'subcategoriesIds']),
            }),

            getRecipeById: builder.query<Recipe, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}`,
                }),
            }),

            getPaginatedRecipes: builder.query<RecipeResponse, GetPaginatedRecipesParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    params: buildQueryParams({
                        ...params,
                        sortBy: params.sortBy || 'createdAt',
                        sortOrder: params.sortOrder || 'desc',
                    }),
                }),
                serializeQueryArgs: ({ endpointName }) => endpointName,
                merge: handlePaginationMerge,
                forceRefetch: createForceRefetchHandler([
                    'page',
                    'searchString',
                    'allergens',
                    'meat',
                    'garnish',
                    'subcategoriesIds',
                ]),
            }),

            getRecipesByCategoryWithPaginate: builder.query<
                RecipeResponse,
                GetRecipesByCategoryWithPaginateParams
            >({
                query: ({ subCategoryId, ...rest }) => ({
                    url: `${ApiEndpoints.RECIPES}/category/${subCategoryId}`,
                    params: buildQueryParams({ ...rest, limit: rest.limit || 8 }),
                }),
                serializeQueryArgs: ({ endpointName }) => endpointName,
                merge: handlePaginationMerge,
                forceRefetch: createForceRefetchHandler([
                    'subCategoryId',
                    'searchString',
                    'allergens',
                ]),
            }),

            getRecipesWithFiltersAndPaginate: builder.query<
                RecipeResponse,
                GetRecipesWithFiltersAndPaginateParams
            >({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    params: buildQueryParams(params),
                }),
                serializeQueryArgs: ({ queryArgs }) =>
                    `${queryArgs.subcategoriesIds?.[0] || 'all'}-${queryArgs.searchString || ''}`,
                merge: (currentCache, newData, { arg }) => {
                    if (arg.page === 1) {
                        return newData;
                    }
                    currentCache.data.push(...newData.data);
                    currentCache.meta = newData.meta;
                    return currentCache;
                },
                forceRefetch: createForceRefetchHandler([
                    'searchString',
                    'allergens',
                    'meat',
                    'garnish',
                    'subcategoriesIds',
                ]),
            }),
        }),
    });

export const {
    useGetRecipesByCategoryQuery,
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useGetPaginatedRecipesQuery,
    useGetRecipesByCategoryWithPaginateQuery,
    useGetRecipesWithFiltersAndPaginateQuery,
} = recipeApiSlice;
