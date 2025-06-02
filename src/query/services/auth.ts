import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { TOKEN_NAME } from '~/consts/consts';
import { setAuthAlertStatus } from '~/store/slices/auth-slice';
import { getErrorMessage } from '~/utils';

import { baseApiSlice } from '../base-api';
import { ApiEndpoints } from '../constants/api';
import { Tags } from '../constants/tags';
import {
    AuthResponse,
    ForgotPasswordParams,
    LoginParams,
    ResetPasswordParams,
    SignupParams,
    VerifyOtpParams,
} from '../types/authApi.types';

export const authApiSlice = baseApiSlice
    .enhanceEndpoints({ addTagTypes: [Tags.AUTH] })
    .injectEndpoints({
        endpoints: (builder) => ({
            signup: builder.mutation<AuthResponse, SignupParams>({
                query: (body) => ({
                    url: ApiEndpoints.AUTH_SIGNUP,
                    method: 'POST',
                    body,
                }),
                transformErrorResponse: (error: FetchBaseQueryError) =>
                    error.data as { message?: string },
            }),

            login: builder.mutation<AuthResponse, LoginParams>({
                query: (body) => ({
                    url: ApiEndpoints.AUTH_LOGIN,
                    method: 'POST',
                    body,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        const result = await queryFulfilled;
                        const responseHeaders = (result.meta as { response?: Response })?.response
                            ?.headers;
                        const accessToken = responseHeaders?.get('Authentication-Access');

                        if (accessToken) {
                            localStorage.setItem(TOKEN_NAME, accessToken);
                        }
                    } catch (error) {
                        const errorMessage = getErrorMessage(error);

                        dispatch(
                            setAuthAlertStatus({
                                status: 'error',
                                isError: true,
                                title: errorMessage,
                                desc: 'Пожалуйста, попробуйте ещё раз',
                            }),
                        );
                    }
                },
            }),

            refreshToken: builder.query<AuthResponse, void>({
                query: () => ({
                    url: ApiEndpoints.AUTH_REFRESH,
                    method: 'GET',
                }),
            }),

            checkAuth: builder.query<AuthResponse, void>({
                query: () => ({
                    url: ApiEndpoints.AUTH_CHECK_AUTH,
                    method: 'GET',
                }),
            }),

            verifyEmail: builder.query<AuthResponse, { token: string }>({
                query: ({ token }) => ({
                    url: `${ApiEndpoints.AUTH_VERIFY}?token=${token}`,
                    method: 'GET',
                }),
            }),

            forgotPassword: builder.mutation<AuthResponse, ForgotPasswordParams>({
                query: (body) => ({
                    url: ApiEndpoints.AUTH_FORGOT_PASSWORD,
                    method: 'POST',
                    body,
                }),
            }),

            verifyOtp: builder.mutation<AuthResponse, VerifyOtpParams>({
                query: (body) => ({
                    url: ApiEndpoints.AUTH_VERIFY_OTP,
                    method: 'POST',
                    body,
                }),
            }),

            resetPassword: builder.mutation<AuthResponse, ResetPasswordParams>({
                query: (body) => ({
                    url: ApiEndpoints.AUTH_RESET_PASSWORD,
                    method: 'POST',
                    body,
                }),
            }),
        }),
    });

export const {
    useSignupMutation,
    useLoginMutation,
    useRefreshTokenQuery,
    useCheckAuthQuery,
    useVerifyEmailQuery,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApiSlice;
