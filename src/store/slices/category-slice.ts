import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type CategoryState = {
    currentCategory: string | null;
    currentSubcategory: string | null;
};

const initialState: CategoryState = {
    currentCategory: null,
    currentSubcategory: null,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string | null>) {
            state.currentCategory = action.payload;
            state.currentSubcategory = null;
        },
        setSubcategory(state, action: PayloadAction<string | null>) {
            state.currentSubcategory = action.payload;
        },
    },
});

// Селекторы для получения данных из стора
export const currentCategorySelector = (state: ApplicationState) => state.category.currentCategory;
export const currentSubcategorySelector = (state: ApplicationState) =>
    state.category.currentSubcategory;

// Экшены
export const { setCategory, setSubcategory } = categorySlice.actions;

// Редьюсер
export default categorySlice.reducer;
