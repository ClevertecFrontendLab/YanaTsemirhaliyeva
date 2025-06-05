import { Box } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { ALERT_MESSAGES, AppRoute, TOKEN_NAME } from '~/consts/consts';
import {
    useGetBloggerByIdQuery,
    useGetBloggersQuery,
    useGetRecipesByUserQuery,
} from '~/query/services/bloggers';
import { useAppDispatch } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { setCurrentUser } from '~/store/slices/bloggers-slice';
import { decodeToken } from '~/utils/jwt-decode';

import { CardBlogger } from './CardBlogger';
import { Notes } from './Notes';
import { OtherBlogsSection } from './OtherBlogsSection';
import { UserRecipes } from './UserRecipes';

const TOTAL_BLOGS_COUNT = '';

export const BloggerProfilePage = () => {
    const params = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem(TOKEN_NAME);
    const currentUserData = decodeToken(token);

    const {
        data: userInfo,
        isError: isUserDataError,
        error: userDataError,
    } = useGetBloggerByIdQuery({
        bloggerId: params.userId ?? '',
        currentUserId: currentUserData?.userId ?? '',
    });

    const {
        data: userRecipes,
        isError: isRecipesDataError,
        error: recipesError,
    } = useGetRecipesByUserQuery(params?.userId ?? '');

    const {
        data: otherBloggers,
        isError: isBloggerDataError,
        error: bloggerDataError,
    } = useGetBloggersQuery({
        currentUserId: currentUserData?.userId,
        limit: TOTAL_BLOGS_COUNT,
    });

    const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
        typeof error === 'object' && error !== null && 'status' in error;

    useEffect(() => {
        if (
            (isUserDataError &&
                isFetchBaseQueryError(userDataError) &&
                userDataError.status === 404) ||
            (isRecipesDataError &&
                isFetchBaseQueryError(recipesError) &&
                recipesError.status === 404)
        ) {
            navigate(AppRoute.NotFound, { replace: true });
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        }

        if (
            (isUserDataError &&
                isFetchBaseQueryError(userDataError) &&
                userDataError.status !== 404) ||
            (isRecipesDataError &&
                isFetchBaseQueryError(recipesError) &&
                recipesError.status !== 404) ||
            isBloggerDataError
        ) {
            navigate(AppRoute.Index, { replace: true });
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        }
    }, [
        userDataError,
        recipesError,
        navigate,
        isUserDataError,
        isRecipesDataError,
        isBloggerDataError,
        bloggerDataError,
        dispatch,
    ]);

    useEffect(() => {
        if (location.hash === '#notes') {
            setTimeout(() => {
                document.getElementById('notes')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        if (userInfo) {
            dispatch(
                setCurrentUser({
                    firstName: userInfo.bloggerInfo.firstName,
                    lastName: userInfo.bloggerInfo.lastName,
                    login: userInfo.bloggerInfo.login,
                }),
            );
        }
    }, [dispatch, userInfo]);

    return (
        <Box
            display='flex'
            flexDir='column'
            gap={10}
            mt={-2}
            pl={{ base: '26px' }}
            pr={{ base: '54px' }}
        >
            {userInfo && (
                <CardBlogger
                    id={userInfo.bloggerInfo._id}
                    firstName={userInfo.bloggerInfo.firstName}
                    lastName={userInfo.bloggerInfo.lastName}
                    login={userInfo.bloggerInfo.login}
                    {...userInfo}
                />
            )}
            {userRecipes && <UserRecipes list={userRecipes?.recipes ?? []} />}
            <Notes notes={userRecipes?.notes ?? []} />
            {otherBloggers && <OtherBlogsSection list={otherBloggers.others ?? []} />}
        </Box>
    );
};
