import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { API_URL } from '~/consts/consts';
import { login, logout } from '~/store/slices/auth-slice';

type TokenRefreshResponse = {
    accessToken?: string;
    message?: string;
    statusText?: string;
};

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                // Запрос обновления токенов
                const refreshResult = await baseQuery(
                    {
                        url: '/auth/refresh',
                        method: 'GET',
                    },
                    api,
                    extraOptions,
                );

                if (refreshResult.data) {
                    // Проверяем наличие данных в ответе (успешное обновление)
                    const responseHeaders = (refreshResult.meta as { response?: Response })
                        ?.response?.headers;
                    const newToken = responseHeaders?.get('Authentication-Access');

                    if (newToken) {
                        localStorage.setItem('accessToken', newToken);
                        api.dispatch(login());

                        // Повторяем запрос с новым токеном
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        // Если в ответе нет токена, но запрос был успешным - проверяем другие способы получения токена
                        const data = refreshResult.data as TokenRefreshResponse;
                        if (data.accessToken) {
                            localStorage.setItem('accessToken', data.accessToken);
                            api.dispatch(login());

                            // Повторяем запрос с новым токеном
                            result = await baseQuery(args, api, extraOptions);
                        } else {
                            // Если никак не получается найти токен - логаут
                            api.dispatch(logout());
                        }
                    }
                } else if (refreshResult.error) {
                    // Если запрос на обновление токена вернул ошибку
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
