import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
import categoryReducer, { categorySlice } from './slices/category-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [categorySlice.name]: categoryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
