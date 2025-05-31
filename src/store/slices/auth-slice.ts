import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type Alert = {
    status: 'error' | 'success';
    title: string;
    isError: boolean;
    desc?: string;
};

export type AuthState = {
    isAuthorized: boolean;
    alertStatus: Alert;
    isVerificationExpired: boolean;
    isSubmitingForm: boolean;
    isAuthModalOpen: boolean;
};

const initialState: AuthState = {
    isAuthorized: Boolean(localStorage.getItem('yeedaaToken')),
    alertStatus: { status: 'error', title: '', isError: false, desc: '' },
    isVerificationExpired: false,
    isSubmitingForm: false,
    isAuthModalOpen: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthorized = true;
        },
        logout: (state) => {
            state.isAuthorized = false;
            localStorage.removeItem('yeedaaToken');
        },
        setAuthAlertStatus: (state, action: PayloadAction<Alert>) => {
            state.alertStatus = action.payload;
        },
        setIsVerificationExpired: (state, action: PayloadAction<boolean>) => {
            state.isVerificationExpired = action.payload;
        },
        setIsSubmitingform: (state, action: PayloadAction<boolean>) => {
            state.isSubmitingForm = action.payload;
        },
        setIsAuthModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isAuthModalOpen = action.payload;
        },
    },
});

// Экшены
export const {
    login,
    logout,
    setAuthAlertStatus,
    setIsVerificationExpired,
    setIsSubmitingform,
    setIsAuthModalOpen,
} = authSlice.actions;

// Селекторы
export const isAuthorizedSelector = (state: ApplicationState) => state.auth.isAuthorized;
export const isVerificationExpiredSelector = (state: ApplicationState) =>
    state.auth.isVerificationExpired;
export const alertAuthStatusSelector = (state: ApplicationState) => state.auth.alertStatus;
export const isSubmitingFormSelector = (state: ApplicationState) => state.auth.isSubmitingForm;
export const isAuthModalOpenSelector = (state: ApplicationState) => state.auth.isAuthModalOpen;

// Редьюсер
export default authSlice.reducer;
