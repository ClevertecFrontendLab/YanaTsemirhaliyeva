import { Recipe } from '~/types/recipe';

import { baseApiSlice } from '../base-api';
import { ApiEndpoints } from '../constants/api';
import { Tags } from '../constants/tags';

type RecipeResponse = {
    data: Recipe[];
    meta: { total: number; page: number; limit: number; totalPages: number };
};

export const recipeApiSlice = baseApiSlice
    .enhanceEndpoints({ addTagTypes: [Tags.RECIPES] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipesByCategory: builder.query<
                RecipeResponse,
                {
                    subCategoryId: string;
                    searchString?: string;
                    allergens?: string[];
                    page?: number;
                    limit?: number;
                }
            >({
                query: ({ subCategoryId, searchString, allergens, page = 1, limit = 8 }) => ({
                    url: `${ApiEndpoints.RECIPES}/category/${subCategoryId}`,
                    params: {
                        page,
                        limit,
                        ...(searchString ? { searchString } : {}),
                        ...(allergens?.length ? { allergens: allergens.join(',') } : {}),
                    },
                }),
            }),
            getRecipes: builder.query<
                RecipeResponse,
                {
                    searchString?: string;
                    allergens?: string[];
                    meat?: string[];
                    garnish?: string[];
                    subcategoriesIds?: string[];
                    sortBy?: 'createdAt' | 'likes';
                    sortOrder?: 'asc' | 'desc';
                    page?: number;
                    limit?: number;
                }
            >({
                query: ({
                    searchString,
                    allergens,
                    meat,
                    garnish,
                    subcategoriesIds,
                    sortBy = 'createdAt',
                    sortOrder = 'desc',
                    page = 1,
                    limit = 8,
                }) => ({
                    url: `${ApiEndpoints.RECIPES}`,
                    params: {
                        page,
                        limit,
                        ...(searchString ? { searchString } : {}),
                        ...(allergens?.length ? { allergens: allergens.join(',') } : {}),
                        ...(meat?.length ? { meat: meat.join(',') } : {}),
                        ...(garnish?.length ? { garnish: garnish.join(',') } : {}),
                        ...(subcategoriesIds?.length
                            ? { subcategoriesIds: subcategoriesIds.join(',') }
                            : {}),
                        sortBy,
                        sortOrder,
                    },
                }),
            }),
            getRecipeById: builder.query<Recipe, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}`,
                }),
            }),
            getPaginatedRecipes: builder.query<
                RecipeResponse,
                {
                    searchString?: string;
                    allergens?: string[];
                    meat?: string[];
                    garnish?: string[];
                    subcategoriesIds?: string[];
                    sortBy?: 'createdAt' | 'likes';
                    sortOrder?: 'asc' | 'desc';
                    page: number;
                    limit?: number;
                }
            >({
                query: ({
                    searchString,
                    allergens,
                    meat,
                    garnish,
                    subcategoriesIds,
                    sortBy = 'createdAt',
                    sortOrder = 'desc',
                    page,
                    limit = 8,
                }) => ({
                    url: ApiEndpoints.RECIPES,
                    params: {
                        page,
                        limit,
                        ...(searchString ? { searchString } : {}),
                        ...(allergens?.length ? { allergens: allergens.join(',') } : {}),
                        ...(meat?.length ? { meat: meat.join(',') } : {}),
                        ...(garnish?.length ? { garnish: garnish.join(',') } : {}),
                        ...(subcategoriesIds?.length
                            ? { subcategoriesIds: subcategoriesIds.join(',') }
                            : {}),
                        sortBy,
                        sortOrder,
                    },
                }),
                serializeQueryArgs: ({ endpointName }) => endpointName,
                merge: (currentCache, newData) => {
                    currentCache.data.push(...newData.data);
                    return currentCache;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg?.page !== previousArg?.page;
                },
            }),
            getRecipesByCategoryWithPaginate: builder.query<
                RecipeResponse,
                {
                    subCategoryId: string;
                    searchString?: string;
                    allergens?: string[];
                    page: number;
                    limit?: number;
                }
            >({
                query: ({ subCategoryId, searchString, allergens, page, limit = 8 }) => ({
                    url: `${ApiEndpoints.RECIPES}/category/${subCategoryId}`,
                    params: {
                        page,
                        limit,
                        ...(searchString ? { searchString } : {}),
                        ...(allergens?.length ? { allergens: allergens.join(',') } : {}),
                    },
                }),
                serializeQueryArgs: ({ endpointName }) => endpointName,
                merge: (currentCache, newData, { arg }) => {
                    if (arg.page === 1) {
                        return newData; // ✅ Очищаем кеш при смене категории
                    }
                    currentCache.data.push(...newData.data); // ✅ Добавляем новые рецепты при загрузке
                    currentCache.meta = newData.meta;
                    return currentCache;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return (
                        currentArg?.subCategoryId !== previousArg?.subCategoryId ||
                        currentArg?.searchString !== previousArg?.searchString ||
                        JSON.stringify(currentArg?.allergens) !==
                            JSON.stringify(previousArg?.allergens)
                    );
                },
            }),
            getRecipesWithFiltersAndPaginate: builder.query<
                RecipeResponse,
                {
                    searchString?: string;
                    allergens?: string[];
                    meat?: string[];
                    garnish?: string[];
                    subcategoriesIds?: string;
                    page: number;
                    limit?: number;
                }
            >({
                query: ({
                    searchString,
                    allergens,
                    meat,
                    garnish,
                    subcategoriesIds,
                    page,
                    limit = 8,
                }) => ({
                    url: ApiEndpoints.RECIPES, // ✅ Обновляем эндпоинт
                    params: {
                        page,
                        limit,
                        ...(searchString ? { searchString } : {}),
                        ...(allergens?.length ? { allergens: allergens.join(',') } : {}),
                        ...(meat?.length ? { meat: meat.join(',') } : {}),
                        ...(garnish?.length ? { garnish: garnish.join(',') } : {}),
                        ...(subcategoriesIds ? { subcategoriesIds } : {}),
                    },
                }),
                serializeQueryArgs: ({ endpointName }) => endpointName,
                merge: (currentCache, newData, { arg }) => {
                    if (arg.page === 1) {
                        return newData;
                    }
                    currentCache.data.push(...newData.data);
                    currentCache.meta = newData.meta;
                    return currentCache;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return (
                        currentArg?.searchString !== previousArg?.searchString ||
                        JSON.stringify(currentArg?.allergens) !==
                            JSON.stringify(previousArg?.allergens) ||
                        JSON.stringify(currentArg?.meat) !== JSON.stringify(previousArg?.meat) ||
                        JSON.stringify(currentArg?.garnish) !==
                            JSON.stringify(previousArg?.garnish) ||
                        JSON.stringify(currentArg?.subcategoriesIds) !==
                            JSON.stringify(previousArg?.subcategoriesIds)
                    );
                },
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
