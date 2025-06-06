import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { API_URL, TOKEN_NAME } from '~/consts/consts';
import { ErrorCodes } from '~/consts/errors';
import { AppDispatch } from '~/store/hooks';
import { login, logout } from '~/store/slices/auth-slice';

import { ApiEndpoints } from './constants/api';

type TokenRefreshResponse = {
    accessToken?: string;
    message?: string;
    statusText?: string;
};

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(TOKEN_NAME);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

const mutex = new Mutex();

export const checkAuthToken = async (api: BaseQueryApi) => {
    const token = localStorage.getItem(TOKEN_NAME);

    if (!token) {
        api.dispatch(logout());
        return false;
    }

    try {
        const checkResult = await baseQuery(
            {
                url: ApiEndpoints.AUTH_REFRESH,
                method: 'GET',
                credentials: 'include',
            },
            api,
            {},
        );

        if (checkResult.data) {
            api.dispatch(login());
            return true;
        } else {
            const refreshResult = await baseQuery(
                {
                    url: ApiEndpoints.AUTH_REFRESH,
                    method: 'GET',
                    credentials: 'include',
                },
                api,
                {},
            );

            if (refreshResult.data) {
                const responseHeaders = (refreshResult.meta as { response?: Response })?.response
                    ?.headers;
                const newToken = responseHeaders?.get('Authentication-Access');

                if (newToken) {
                    localStorage.setItem(TOKEN_NAME, newToken);
                    api.dispatch(login());
                    return true;
                } else {
                    const data = refreshResult.data as TokenRefreshResponse;
                    if (data.accessToken) {
                        localStorage.setItem(TOKEN_NAME, data.accessToken);
                        api.dispatch(login());
                        return true;
                    }
                }
            }

            localStorage.removeItem(TOKEN_NAME);
            api.dispatch(logout());
            return false;
        }
    } catch {
        localStorage.removeItem(TOKEN_NAME);
        api.dispatch(logout());
        return false;
    }
};

export const checkAuthTokenForComponent = async (dispatch: AppDispatch) => {
    const token = localStorage.getItem(TOKEN_NAME);

    if (!token) {
        dispatch(logout());
        return false;
    }

    try {
        const response = await fetch(`${API_URL}auth/check-auth`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            dispatch(login());
            return true;
        } else {
            const refreshResponse = await fetch(`${API_URL}auth/refresh`, {
                method: 'GET',
                credentials: 'include',
            });

            if (refreshResponse.ok) {
                const newToken = refreshResponse.headers.get('Authentication-Access');

                if (newToken) {
                    localStorage.setItem(TOKEN_NAME, newToken);
                    dispatch(login());
                    return true;
                } else {
                    const refreshData = (await refreshResponse.json()) as TokenRefreshResponse;
                    if (refreshData.accessToken) {
                        localStorage.setItem(TOKEN_NAME, refreshData.accessToken);
                        dispatch(login());
                        return true;
                    }
                }
            }

            localStorage.removeItem(TOKEN_NAME);
            dispatch(logout());
            return false;
        }
    } catch {
        localStorage.removeItem(TOKEN_NAME);
        dispatch(logout());
        return false;
    }
};

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (
        result.error?.status === ErrorCodes.Unauthorized ||
        result.error?.status === ErrorCodes.Forbidden
    ) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: ApiEndpoints.AUTH_REFRESH,
                        method: 'GET',
                        credentials: 'include',
                    },
                    api,
                    extraOptions,
                );

                if (refreshResult.data) {
                    const responseHeaders = (refreshResult.meta as { response?: Response })
                        ?.response?.headers;
                    const newToken = responseHeaders?.get('Authentication-Access');

                    if (newToken) {
                        localStorage.setItem(TOKEN_NAME, newToken);
                        api.dispatch(login());
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        const data = refreshResult.data as TokenRefreshResponse;
                        if (data.accessToken) {
                            localStorage.setItem(TOKEN_NAME, data.accessToken);
                            api.dispatch(login());
                            result = await baseQuery(args, api, extraOptions);
                        } else {
                            localStorage.removeItem(TOKEN_NAME);
                            api.dispatch(logout());
                        }
                    }
                } else {
                    localStorage.removeItem(TOKEN_NAME);
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};
