import { baseApiSlice } from '~/query/base-api.ts';
import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';

export const healthApiSlice = baseApiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.HEALTH],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            checkHealth: builder.query<{ status: string }, void>({
                query: () => ({
                    url: ApiEndpoints.HEALTH,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.HEALTH,
                    name: EndpointNames.CHECK_HEALTH,
                    responseHandler: (response) => response.text(),
                }),
                providesTags: [Tags.HEALTH],
            }),
            createEcho: builder.mutation<{ echo: string }, { echo: string }>({
                query: (body) => ({
                    url: ApiEndpoints.HEALTH,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.HEALTH,
                    name: EndpointNames.CREATE_ECHO,
                    body,
                }),
            }),
        }),
    });

export const { useCheckHealthQuery, useCreateEchoMutation } = healthApiSlice;
