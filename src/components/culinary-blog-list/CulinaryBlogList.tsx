import { Box, Button, Grid, Heading, HStack, Show, Spacer } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router';

import { ALERT_MESSAGES, AppRoute, DataTestId, TOKEN_NAME } from '~/consts/consts';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { ArrowRightIcon } from '~/shared/custom-icons';
import { useAppDispatch } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { setIsBloggersFetching } from '~/store/slices/recipes-slice';
import { decodeToken } from '~/utils/jwt-decode';

import { CulinaryBlogItem } from '../culinary-blog-item/CulinaryBlogItem';
import { CYLINARY_BLOG_STYLES } from './styles';

const TOTAL_BLOGS_COUNT = '';

export const CulinaryBlogList = () => {
    const dispatch = useAppDispatch();
    const token = localStorage.getItem(TOKEN_NAME);
    const userData = decodeToken(token);
    const { data, isLoading, isError } = useGetBloggersQuery({
        currentUserId: userData?.userId,
        limit: TOTAL_BLOGS_COUNT,
    });

    useEffect(() => {
        if (isError) {
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        }
    }, [dispatch, isError]);

    useEffect(() => {
        dispatch(setIsBloggersFetching(isLoading));
    }, [dispatch, isLoading]);

    if (!data?.others) return null;

    return (
        <Box
            as='section'
            bgColor='lime.400'
            borderRadius={12}
            p={{ base: 3, sm: 6 }}
            pr={{ base: 1, sm: 4, lg: 6 }}
            pt={{ xs: 4, sm: 3, lg: 6 }}
            data-test-id={DataTestId.MainPageBlogsBox}
        >
            <HStack pr={2} mb={{ base: 3, sm: 4 }}>
                <Heading
                    as='h2'
                    fontSize={{ base: 24, sm: 30, xl: 36 }}
                    fontFamily='inherit'
                    fontWeight={400}
                    mb={{ sm: 1, xl: 4 }}
                >
                    Кулинарные блоги
                </Heading>
                <Show above='sm'>
                    <Spacer />
                    <Button
                        as={Link}
                        to={AppRoute.Blogs}
                        rightIcon={<ArrowRightIcon />}
                        {...CYLINARY_BLOG_STYLES.allAuthorsBtn}
                        data-test-id={DataTestId.MainPageBlogsBtn}
                    >
                        Всe авторы
                    </Button>
                </Show>
            </HStack>
            <Grid
                templateColumns={{ xs: 'repeat(3, 1fr)' }}
                gap={{ base: '13px', xs: 4 }}
                pr={{ base: 2, lg: 0 }}
                alignItems='stretch'
                autoRows='1fr'
                data-test-id={DataTestId.MainPageBlogsGrid}
            >
                {data?.others.map((item) => <CulinaryBlogItem {...item} key={item._id} />)}
            </Grid>
            <Show below='sm'>
                <Box textAlign='center' mt={3}>
                    <Button
                        as={Link}
                        to={AppRoute.Blogs}
                        rightIcon={<ArrowRightIcon />}
                        {...CYLINARY_BLOG_STYLES.allAuthorsBtn}
                        data-test-id={DataTestId.MainPageBlogsBtn}
                    >
                        Всe авторы
                    </Button>
                </Box>
            </Show>
        </Box>
    );
};
