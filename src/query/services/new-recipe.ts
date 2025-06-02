import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { TOKEN_NAME } from '~/consts/consts';
import { MeasureUnit, NewRecipeRequest } from '~/types/recipe';

import { baseApiSlice } from '../base-api';
import { ApiEndpoints } from '../constants/api';
import { Tags } from '../constants/tags';

export const newRecipeApiSlice = baseApiSlice
    .enhanceEndpoints({ addTagTypes: [Tags.RECIPES] })
    .injectEndpoints({
        endpoints: (builder) => ({
            createRecipe: builder.mutation<{ _id: string }, NewRecipeRequest>({
                query: (newRecipe) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'POST',
                    body: newRecipe,
                }),
                transformErrorResponse: (error) => {
                    if (typeof error === 'object' && error !== null) {
                        return {
                            statusCode:
                                (error as FetchBaseQueryError)?.status ??
                                (error.data as { statusCode?: number })?.statusCode,
                            message:
                                (error.data as { message?: string })?.message ??
                                'Ошибка публикации рецепта',
                        };
                    }
                    return { statusCode: 500, message: 'Неизвестная ошибка' };
                },
                invalidatesTags: [{ type: Tags.RECIPES, id: 'LIST' }],
            }),
            saveDraft: builder.mutation<{ draftId: string }, Partial<NewRecipeRequest>>({
                query: (draft) => ({
                    url: ApiEndpoints.RECIPE_DRAFT,
                    method: 'POST',
                    body: draft,
                }),
                transformErrorResponse: (error) => {
                    if (typeof error === 'object' && error !== null) {
                        return {
                            statusCode:
                                (error as FetchBaseQueryError)?.status ??
                                (error.data as { statusCode?: number })?.statusCode,
                            message:
                                (error.data as { message?: string })?.message ??
                                'Ошибка сохранения черновика',
                        };
                    }
                    return { statusCode: 500, message: 'Неизвестная ошибка' };
                },
            }),
            deleteRecipe: builder.mutation<{ message: string }, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}`,
                    method: 'DELETE',
                }),
                transformErrorResponse: (error) =>
                    typeof error.data === 'object' && error.data !== null
                        ? (error.data as { message?: string })
                        : { message: 'Неизвестная ошибка' },
                invalidatesTags: () => [{ type: Tags.RECIPES, id: 'LIST' }],
            }),
            updateRecipe: builder.mutation<
                { _id: string },
                { recipeId: string; data: Partial<NewRecipeRequest> }
            >({
                query: ({ recipeId, data }) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}`,
                    method: 'PATCH',
                    body: data,
                }),
                transformErrorResponse: (error) => {
                    if (typeof error === 'object' && error !== null) {
                        return {
                            statusCode:
                                (error as FetchBaseQueryError)?.status ??
                                (error.data as { statusCode?: number })?.statusCode,
                            message:
                                (error.data as { message?: string })?.message ??
                                'Ошибка публикации рецепта',
                        };
                    }
                    return { statusCode: 500, message: 'Неизвестная ошибка' };
                },
                invalidatesTags: (_result, _error, arg) => [
                    { type: Tags.RECIPES, id: arg.recipeId },
                ],
            }),
            uploadFile: builder.mutation<{ url: string }, File>({
                query: (file) => {
                    const formData = new FormData();
                    formData.append('file', file);

                    return {
                        url: ApiEndpoints.UPLOAD_FILE,
                        method: 'POST',
                        body: formData,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`,
                        },
                    };
                },
                transformErrorResponse: (error) => error.data as { message?: string },
            }),
            getMeasureUnits: builder.query<MeasureUnit[], void>({
                query: () => ({ url: ApiEndpoints.MEASURE_UNITS }),
            }),
        }),
    });

export const {
    useCreateRecipeMutation,
    useUploadFileMutation,
    useGetMeasureUnitsQuery,
    useSaveDraftMutation,
    useDeleteRecipeMutation,
    useUpdateRecipeMutation,
} = newRecipeApiSlice;
