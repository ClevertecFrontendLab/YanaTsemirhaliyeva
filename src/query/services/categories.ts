import { Category, SubCategory } from '~/types/category';

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
                transformResponse: (
                    response: Array<Category | SubCategory>,
                ): { categories: Category[]; subCategories: SubCategory[] } => {
                    console.log('📌 API Response:', response);

                    const subCategorySet = new Set();

                    return response.reduce<{
                        categories: Category[];
                        subCategories: SubCategory[];
                    }>(
                        (acc, item) => {
                            if ('subCategories' in item && Array.isArray(item.subCategories)) {
                                acc.categories.push({
                                    _id: item._id,
                                    title: item.title,
                                    category: item.category,
                                    icon: item.icon,
                                    description: item.description,
                                    subCategories: item.subCategories,
                                });

                                item.subCategories.forEach((sub) => {
                                    if (!subCategorySet.has(sub._id)) {
                                        subCategorySet.add(sub._id);
                                        acc.subCategories.push({
                                            _id: sub._id,
                                            title: sub.title,
                                            category: sub.category,
                                            rootCategoryId: item._id,
                                        });
                                    }
                                });
                            } else if ('rootCategoryId' in item) {
                                if (!subCategorySet.has(item._id)) {
                                    subCategorySet.add(item._id);
                                    acc.subCategories.push({
                                        _id: item._id,
                                        title: item.title,
                                        category: item.category,
                                        rootCategoryId: item.rootCategoryId,
                                    });
                                }
                            } else {
                                console.warn(`⚠️ Неизвестный формат объекта:`, item);
                            }

                            return acc;
                        },
                        { categories: [], subCategories: [] },
                    );
                },
            }),
            getCategoryById: builder.query<Category, string>({
                query: (id) => ({ url: `${ApiEndpoints.CATEGORIES}/${id}` }),
            }),
        }),
    });

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApiSlice;
