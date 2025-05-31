import { DEFAULT_CARDS_PER_PAGE, DEFAULT_PAGE } from '~/consts/consts';
import { Recipe } from '~/types/recipe';

import { baseApiSlice } from '../base-api';
import { ApiEndpoints } from '../constants/api';
import { Tags } from '../constants/tags';
import {
    BaseRecipeQueryParams,
    GetPaginatedRecipesParams,
    GetRecipesByCategoryParams,
    GetRecipesByCategoryWithPaginateParams,
    GetRecipesParams,
    GetRecipesWithFiltersAndPaginateParams,
    RecipeResponse,
} from '../types/recipeApi.types';

type QueryParamsOptions = Partial<BaseRecipeQueryParams>;

const buildQueryParams = (options: QueryParamsOptions) => {
    const {
        searchString,
        allergens,
        meat,
        garnish,
        subcategoriesIds,
        sortBy,
        sortOrder,
        page,
        limit,
    } = options;

    return {
        ...(searchString ? { searchString } : {}),
        ...(allergens?.length ? { allergens: allergens.join(',') } : {}),
        ...(meat?.length ? { meat: meat.join(',') } : {}),
        ...(garnish?.length ? { garnish: garnish.join(',') } : {}),
        ...(subcategoriesIds?.length ? { subcategoriesIds: subcategoriesIds.join(',') } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortOrder ? { sortOrder } : {}),
        ...(page !== undefined ? { page } : {}),
        ...(limit !== undefined ? { limit } : {}),
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

type ArgKey = keyof BaseRecipeQueryParams | 'subCategoryId';
type ArgValue = string | number | boolean | string[] | number[] | undefined;

type ForceRefetchArg = {
    currentArg: Partial<Record<ArgKey, ArgValue>> | undefined;
    previousArg: Partial<Record<ArgKey, ArgValue>> | undefined;
};

const createForceRefetchHandler =
    (fields: ArgKey[]) =>
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
                providesTags: (result) =>
                    result
                        ? [
                              ...result.data.map(({ _id }) => ({
                                  type: Tags.RECIPES as const,
                                  id: _id,
                              })),
                              { type: Tags.RECIPES, id: 'LIST' },
                          ]
                        : [{ type: Tags.RECIPES, id: 'LIST' }],
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
                providesTags: (result) =>
                    result
                        ? [
                              ...result.data.map(({ _id }) => ({
                                  type: Tags.RECIPES as const,
                                  id: _id,
                              })),
                              { type: Tags.RECIPES, id: 'LIST' },
                          ]
                        : [{ type: Tags.RECIPES, id: 'LIST' }],
            }),

            getRecipeById: builder.query<Recipe, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}`,
                }),
                providesTags: (result, _error, arg) =>
                    result
                        ? [{ type: Tags.RECIPES, id: arg }]
                        : [{ type: Tags.RECIPES, id: 'LIST' }],
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
                    params: buildQueryParams({
                        ...rest,
                        limit: rest.limit || DEFAULT_CARDS_PER_PAGE,
                    }),
                }),
                serializeQueryArgs: ({ queryArgs }) =>
                    `category-${queryArgs.subCategoryId}-${queryArgs.searchString || ''}-${queryArgs.allergens?.join(',') || ''}`,
                merge: (currentCache, newData, { arg }) => {
                    if (arg.page === 1) {
                        return newData;
                    }
                    currentCache.data.push(...newData.data);
                    currentCache.meta = newData.meta;
                    return currentCache;
                },
                forceRefetch: createForceRefetchHandler([
                    'subCategoryId',
                    'searchString',
                    'allergens',
                    'page',
                ]),
                providesTags: (result) =>
                    result
                        ? [
                              ...result.data.map(({ _id }) => ({
                                  type: Tags.RECIPES as const,
                                  id: _id,
                              })),
                              { type: Tags.RECIPES, id: 'LIST' },
                          ]
                        : [{ type: Tags.RECIPES, id: 'LIST' }],
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
                providesTags: (result) =>
                    result
                        ? [
                              ...result.data.map(({ _id }) => ({
                                  type: Tags.RECIPES as const,
                                  id: _id,
                              })),
                              { type: Tags.RECIPES, id: 'LIST' },
                          ]
                        : [{ type: Tags.RECIPES, id: 'LIST' }],
            }),
            likeRecipe: builder.mutation<{ message: string; likes: number }, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}/like`,
                    method: 'POST',
                }),
                transformErrorResponse: (error) =>
                    typeof error.data === 'object' && error.data !== null
                        ? (error.data as { message?: string })
                        : { message: 'Неизвестная ошибка' },
                invalidatesTags: (_result, _error, arg) => [{ type: Tags.RECIPES, id: arg }],
            }),

            bookmarkRecipe: builder.mutation<{ message: string; bookmarks: number }, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}/bookmark`,
                    method: 'POST',
                }),
                transformErrorResponse: (error) =>
                    typeof error.data === 'object' && error.data !== null
                        ? (error.data as { message?: string })
                        : { message: 'Неизвестная ошибка' },
                invalidatesTags: (_result, _error, arg) => [{ type: Tags.RECIPES, id: arg }],
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
    useBookmarkRecipeMutation,
    useLikeRecipeMutation,
} = recipeApiSlice;
