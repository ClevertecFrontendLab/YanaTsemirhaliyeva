import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type CurrentUser = {
    firstName: string;
    lastName: string;
    login: string;
};

export type BloggersState = {
    currentUser: CurrentUser | null;
};

const initialState: BloggersState = {
    currentUser: null,
};

export const bloggersSlice = createSlice({
    name: 'bloggers',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<CurrentUser | null>) => {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = bloggersSlice.actions;

export const currentUserSelector = (state: ApplicationState) => state.bloggers.currentUser;

export default bloggersSlice.reducer;
