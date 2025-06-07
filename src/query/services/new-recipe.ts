import { TOKEN_NAME } from '~/consts/consts';
import { MeasureUnit, NewRecipeRequest } from '~/types/recipe';

import { baseApiSlice } from '../base-api';
import { ApiEndpoints } from '../constants/api';
import { Tags } from '../constants/tags';
import { handleApiError } from './utils';

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
                transformErrorResponse: (error) =>
                    handleApiError(error, 'Ошибка публикации рецепта'),
                invalidatesTags: [{ type: Tags.RECIPES, id: 'LIST' }],
            }),
            saveDraft: builder.mutation<{ draftId: string }, Partial<NewRecipeRequest>>({
                query: (draft) => ({
                    url: ApiEndpoints.RECIPE_DRAFT,
                    method: 'POST',
                    body: draft,
                }),
                transformErrorResponse: (error) =>
                    handleApiError(error, 'Ошибка сохранения черновика'),
            }),
            deleteRecipe: builder.mutation<{ message: string }, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}`,
                    method: 'DELETE',
                }),
                transformErrorResponse: (error) => ({
                    message: handleApiError(error, 'Неизвестная ошибка').message,
                }),
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
                transformErrorResponse: (error) =>
                    handleApiError(error, 'Ошибка публикации рецепта'),
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
