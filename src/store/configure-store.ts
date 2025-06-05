import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseApiSlice } from '~/query/base-api';
import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
import alertReducer, { alertSlice } from './slices/alert-slice';
import authReducer, { authSlice } from './slices/auth-slice';
import bloggersReducer, { bloggersSlice } from './slices/bloggers-slice';
import categoryReducer, { categorySlice } from './slices/categories-slice';
import newRecipeReducer, { newRecipeSlice } from './slices/new-recipe';
import recipeReducer, { recipeSlice } from './slices/recipes-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [recipeSlice.name]: recipeReducer,
    [categorySlice.name]: categoryReducer,
    [authSlice.name]: authReducer,
    [newRecipeSlice.name]: newRecipeReducer,
    [alertSlice.name]: alertReducer,
    [bloggersSlice.name]: bloggersReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(baseApiSlice.middleware),
    devTools: !isProduction,
});
