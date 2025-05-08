import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseApiSlice } from '~/query/base-api';
import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
import categoryReducer, { categorySlice } from './slices/categories-slice';
import recipeReducer, { recipeSlice } from './slices/recipes-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [recipeSlice.name]: recipeReducer,
    [categorySlice.name]: categoryReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(baseApiSlice.middleware),
    devTools: !isProduction,
});
