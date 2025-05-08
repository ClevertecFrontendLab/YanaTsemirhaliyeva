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

export const recipeApiSlice = baseApiSlice
    .enhanceEndpoints({ addTagTypes: [Tags.RECIPES] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipesByCategory: builder.query<RecipeResponse, GetRecipesByCategoryParams>({
                query: ({
                    subCategoryId,
                    searchString,
                    allergens,
                    page = DEFAULT_PAGE,
                    limit = DEFAULT_CARDS_PER_PAGE,
                }) => ({
                    url: `${ApiEndpoints.RECIPES}/category/${subCategoryId}`,
                    params: {
                        page,
                        limit,
                        ...(searchString ? { searchString } : {}),
                        ...(allergens?.length ? { allergens: allergens.join(',') } : {}),
                    },
                }),
                forceRefetch({ currentArg, previousArg }) {
                    return (
                        currentArg?.searchString !== previousArg?.searchString ||
                        JSON.stringify(currentArg?.allergens) !==
                            JSON.stringify(previousArg?.allergens)
                    );
                },
            }),
            getRecipes: builder.query<RecipeResponse, GetRecipesParams>({
                query: ({
                    searchString,
                    allergens,
                    meat,
                    garnish,
                    subcategoriesIds,
                    sortBy = 'createdAt',
                    sortOrder = 'desc',
                    page = DEFAULT_PAGE,
                    limit = DEFAULT_CARDS_PER_PAGE,
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
                forceRefetch({ currentArg, previousArg }) {
                    return (
                        currentArg?.searchString !== previousArg?.searchString ||
                        JSON.stringify(currentArg?.subcategoriesIds) !==
                            JSON.stringify(previousArg?.subcategoriesIds)
                    );
                },
            }),
            getRecipeById: builder.query<Recipe, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}`,
                }),
            }),
            getPaginatedRecipes: builder.query<RecipeResponse, GetPaginatedRecipesParams>({
                query: ({
                    searchString,
                    allergens,
                    meat,
                    garnish,
                    subcategoriesIds,
                    sortBy = 'createdAt',
                    sortOrder = 'desc',
                    page,
                    limit = DEFAULT_CARDS_PER_PAGE,
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
                        currentArg?.page !== previousArg?.page ||
                        JSON.stringify(currentArg?.searchString) !==
                            JSON.stringify(previousArg?.searchString) ||
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
            getRecipesByCategoryWithPaginate: builder.query<
                RecipeResponse,
                GetRecipesByCategoryWithPaginateParams
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
                    if (arg.page === DEFAULT_PAGE) {
                        return newData; // Очищаем кеш при смене категории
                    }
                    currentCache.data.push(...newData.data); // Добавляем новые рецепты при загрузке
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
                GetRecipesWithFiltersAndPaginateParams
            >({
                query: ({
                    searchString,
                    allergens,
                    meat,
                    garnish,
                    subcategoriesIds,
                    page,
                    limit = DEFAULT_CARDS_PER_PAGE,
                }) => ({
                    url: ApiEndpoints.RECIPES,
                    params: {
                        page,
                        limit,
                        ...(searchString ? { searchString } : {}),
                        ...(allergens?.length ? { allergens: allergens.join('') } : {}),
                        ...(meat?.length ? { meat: meat.join('') } : {}),
                        ...(garnish?.length ? { garnish: garnish.join('') } : {}),
                        ...(subcategoriesIds?.length
                            ? { subcategoriesIds: subcategoriesIds.join(',') }
                            : {}),
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
