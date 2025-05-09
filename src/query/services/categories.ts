import { Category, SubCategory } from '~/types/category';
import { transformCategoryResponse } from '~/utils';

import { baseApiSlice } from '../base-api';
import { ApiEndpoints } from '../constants/api';
import { Tags } from '../constants/tags';

type GroupedCategories = { categories: Category[]; subCategories: SubCategory[] };

export const categoryApiSlice = baseApiSlice
    .enhanceEndpoints({ addTagTypes: [Tags.CATEGORIES] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategories: builder.query<GroupedCategories, void>({
                query: () => ({ url: ApiEndpoints.CATEGORIES }),
                transformResponse: transformCategoryResponse,
            }),
            getCategoryById: builder.query<Category, string>({
                query: (id) => ({ url: `${ApiEndpoints.CATEGORIES}/${id}` }),
            }),
        }),
    });

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApiSlice;
