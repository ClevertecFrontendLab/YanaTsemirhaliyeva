import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '~/consts/consts';

export const baseApiSlice = createApi({
    reducerPath: 'yee-daa-api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: () => ({}),
});
