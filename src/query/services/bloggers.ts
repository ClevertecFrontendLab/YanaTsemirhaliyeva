import { ALERT_MESSAGES } from '~/consts/consts';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { BloggerInfoResponse, BloggerListResponse, UserRecipesResponse } from '~/types/blogs';

import { baseApiSlice } from '../base-api';
import { ApiEndpoints } from '../constants/api';
import { Tags } from '../constants/tags';
import {
    BloggerListParams,
    BloggerParams,
    ToggleSubscriptionParams,
} from '../types/bloggerApi.types';
import { handleApiError } from './utils';

export const bloggerApiSlice = baseApiSlice
    .enhanceEndpoints({ addTagTypes: [Tags.BLOGGERS, Tags.RECIPES] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getBloggers: builder.query<BloggerListResponse, BloggerListParams>({
                query: ({ limit, currentUserId }) => ({
                    url: `${ApiEndpoints.BLOGGERS}?currentUserId=${currentUserId}&limit=${limit}`,
                    method: 'GET',
                }),
                providesTags: [Tags.BLOGGERS],
            }),

            getBloggerById: builder.query<BloggerInfoResponse, BloggerParams>({
                query: ({ bloggerId, currentUserId }) => ({
                    url: `${ApiEndpoints.BLOGGERS}/${bloggerId}?currentUserId=${currentUserId}`,
                    method: 'GET',
                }),
            }),

            toggleSubscription: builder.mutation<void, ToggleSubscriptionParams>({
                query: ({ toUserId, fromUserId }) => ({
                    url: ApiEndpoints.USERS_SUBSCRIPTION,
                    method: 'PATCH',
                    body: { toUserId, fromUserId },
                }),
                async onQueryStarted({ toUserId, fromUserId }, { dispatch, queryFulfilled }) {
                    const patchResult = dispatch(
                        bloggerApiSlice.util.updateQueryData(
                            'getBloggers',
                            { currentUserId: fromUserId, limit: 'all' },
                            (draft) => {
                                const blogger = draft?.others.find((b) => b._id === toUserId);
                                if (blogger) {
                                    blogger.isFavorite = !blogger.isFavorite;
                                    blogger.subscribersCount += blogger.isFavorite ? 1 : -1;
                                }
                            },
                        ),
                    );

                    try {
                        await queryFulfilled;
                    } catch {
                        patchResult.undo();
                        dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
                    }
                },
                invalidatesTags: [{ type: Tags.BLOGGERS }],
            }),
            getRecipesByUser: builder.query<UserRecipesResponse, string>({
                query: (userId) => ({
                    url: `${ApiEndpoints.RECIPES}/user/${userId}`,
                    method: 'GET',
                }),
                transformErrorResponse: (error) =>
                    handleApiError(error, ALERT_MESSAGES.SERVER_ERROR.desc),
                providesTags: [{ type: Tags.RECIPES }],
            }),
        }),
    });

export const {
    useGetBloggersQuery,
    useGetBloggerByIdQuery,
    useToggleSubscriptionMutation,
    useGetRecipesByUserQuery,
} = bloggerApiSlice;
