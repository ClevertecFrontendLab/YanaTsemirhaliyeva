// import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Mutex } from 'async-mutex';

// import { API_URL } from '~/consts/consts';
// import { login, logout } from '~/store/slices/auth-slice';

// type TokenRefreshResponse = {
//     accessToken?: string;
//     message?: string;
//     statusText?: string;
// };

// const baseQuery = fetchBaseQuery({
//     baseUrl: API_URL,
//     prepareHeaders: (headers) => {
//         const token = localStorage.getItem('yeedaaToken');
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//         }
//         return headers;
//     },
//     credentials: 'include',
// });

// const mutex = new Mutex();

// export const baseQueryWithReauth: BaseQueryFn<
//     string | FetchArgs,
//     unknown,
//     FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//     await mutex.waitForUnlock();
//     let result = await baseQuery(args, api, extraOptions);

//     if (result.error?.status === 401 || result.error?.status === 403) {
//         console.log('Получена ошибка авторизации со статусом:', result.error.status);

//         if (!mutex.isLocked()) {
//             const release = await mutex.acquire();
//             try {
//                 console.log('Начинаем обновление токена...');
//                 const refreshResult = await baseQuery(
//                     {
//                         url: '/auth/refresh',
//                         method: 'GET',
//                         credentials: 'include',
//                     },
//                     api,
//                     extraOptions,
//                 );

//                 console.log('Результат обновления токена:', refreshResult);

//                 if (refreshResult.data) {
//                     const responseHeaders = (refreshResult.meta as { response?: Response })
//                         ?.response?.headers;
//                     const newToken = responseHeaders?.get('Authentication-Access');

//                     console.log('Новый токен из заголовков:', newToken);

//                     if (newToken) {
//                         localStorage.setItem('yeedaaToken', newToken);
//                         api.dispatch(login());
//                         result = await baseQuery(args, api, extraOptions);
//                     } else {
//                         const data = refreshResult.data as TokenRefreshResponse;
//                         console.log('Данные ответа:', data);
//                         if (data.accessToken) {
//                             localStorage.setItem('yeedaaToken', data.accessToken);
//                             api.dispatch(login());
//                             result = await baseQuery(args, api, extraOptions);
//                         } else {
//                             console.log('Не получен новый токен доступа. Выход...');
//                             api.dispatch(logout());
//                         }
//                     }
//                 } else if (refreshResult.error) {
//                     console.log('Ошибка при обновлении токена:', refreshResult.error);
//                     api.dispatch(logout());
//                 }
//             } finally {
//                 release();
//             }
//         } else {
//             await mutex.waitForUnlock();
//             result = await baseQuery(args, api, extraOptions);
//         }
//     }

//     return result;
// };
import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { API_URL } from '~/consts/consts';
import { AppDispatch } from '~/store/hooks';
import { login, logout } from '~/store/slices/auth-slice';

type TokenRefreshResponse = {
    accessToken?: string;
    message?: string;
    statusText?: string;
};

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('yeedaaToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

const mutex = new Mutex();

export const checkAuthToken = async (api: BaseQueryApi) => {
    const token = localStorage.getItem('yeedaaToken');

    if (!token) {
        api.dispatch(logout());
        return false;
    }

    try {
        const checkResult = await baseQuery(
            {
                url: '/auth/check-auth',
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
                    url: '/auth/refresh',
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
                    localStorage.setItem('yeedaaToken', newToken);
                    api.dispatch(login());
                    return true;
                } else {
                    const data = refreshResult.data as TokenRefreshResponse;
                    if (data.accessToken) {
                        localStorage.setItem('yeedaaToken', data.accessToken);
                        api.dispatch(login());
                        return true;
                    }
                }
            }

            localStorage.removeItem('yeedaaToken');
            api.dispatch(logout());
            return false;
        }
    } catch {
        localStorage.removeItem('yeedaaToken');
        api.dispatch(logout());
        return false;
    }
};

export const checkAuthTokenForComponent = async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('yeedaaToken');

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
            console.log('Токен невалиден, попытка обновления...');
            const refreshResponse = await fetch(`${API_URL}auth/refresh`, {
                method: 'GET',
                credentials: 'include',
            });

            if (refreshResponse.ok) {
                const newToken = refreshResponse.headers.get('Authentication-Access');

                if (newToken) {
                    localStorage.setItem('yeedaaToken', newToken);
                    dispatch(login());
                    return true;
                } else {
                    const refreshData = (await refreshResponse.json()) as TokenRefreshResponse;
                    if (refreshData.accessToken) {
                        localStorage.setItem('yeedaaToken', refreshData.accessToken);
                        dispatch(login());
                        return true;
                    }
                }
            }

            localStorage.removeItem('yeedaaToken');
            dispatch(logout());
            return false;
        }
    } catch {
        localStorage.removeItem('yeedaaToken');
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

    if (result.error?.status === 401 || result.error?.status === 403) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: '/auth/refresh',
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
                        localStorage.setItem('yeedaaToken', newToken);
                        api.dispatch(login());
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        const data = refreshResult.data as TokenRefreshResponse;
                        if (data.accessToken) {
                            localStorage.setItem('yeedaaToken', data.accessToken);
                            api.dispatch(login());
                            result = await baseQuery(args, api, extraOptions);
                        } else {
                            localStorage.removeItem('yeedaaToken');
                            api.dispatch(logout());
                        }
                    }
                } else {
                    localStorage.removeItem('yeedaaToken');
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
