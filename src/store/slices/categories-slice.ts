import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category, SubCategory } from '~/types/category';

import { ApplicationState } from '../configure-store';

export type FilterTypes = 'meatTypes' | 'garnishTypes' | 'allergens' | 'categories' | 'authors';

export type CategoryState = {
    categories: Category[];
    subCategories: SubCategory[];
};

const initialState: CategoryState = {
    categories: [],
    subCategories: [],
};

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },
        setSubCategories(state, action: PayloadAction<SubCategory[]>) {
            state.subCategories = action.payload;
        },
    },
});

export const { setCategories, setSubCategories } = categorySlice.actions;

export const categoriesSelector = (state: ApplicationState) => state.categories.categories;
export const subCategoriesSelector = (state: ApplicationState) => state.categories.subCategories;

export default categorySlice.reducer;
