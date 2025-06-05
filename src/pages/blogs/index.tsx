import { Box, Button, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { LoaderFullsize } from '~/components/loader-fullsize/LoaderFullsize';
import { NewRecipes } from '~/components/new-recipes/NewRecipes';
import { ALERT_MESSAGES, AppRoute, DataTestId, TOKEN_NAME } from '~/consts/consts';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { ArrowRightIcon } from '~/shared/custom-icons';
import { useAppDispatch } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { decodeToken } from '~/utils/jwt-decode';

import { FavoritesList } from './FavoritesList';
import { OtherBlogList } from './OtherBlogList';

const TOTAL_BLOGS_COUNT = 'all';
const DEFAULT_BLOGS_COUNT_XL = '9';
const DEFAULT_BLOGS_COUNT = 8;

export const BlogsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem(TOKEN_NAME);
    const userData = decodeToken(token);
    const isLargeScreen = useBreakpointValue({ base: false, xl: true });
    const [isAllBlogs, setIsAllBlogs] = useState(false);
    const blogsCountToShow = isAllBlogs ? TOTAL_BLOGS_COUNT : DEFAULT_BLOGS_COUNT_XL;
    const { data, isLoading, isError } = useGetBloggersQuery({
        currentUserId: userData?.userId,
        limit: blogsCountToShow,
    });

    useEffect(() => {
        if (isError) {
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
            navigate(AppRoute.Index);
        }
    }, [dispatch, isError, navigate]);

    if (isLoading) return <LoaderFullsize isOpen={isLoading} />;
    if (!data) return null;

    const otherBloggersToDisplay =
        !isLargeScreen && !isAllBlogs ? data.others.slice(0, DEFAULT_BLOGS_COUNT) : data.others;

    const handleBtnClick = () => setIsAllBlogs((prev) => !prev);

    return (
        <Box p={6} color='black'>
            <Heading
                textAlign='center'
                fontSize={{ base: 24, md: 48 }}
                color='black'
                mb={6}
                mt={-6}
            >
                Кулинарные блоги
            </Heading>
            <Flex flexDir='column' gap={6}>
                {data.favorites && (
                    <Box mb={{ base: 2, md: 4 }}>
                        <FavoritesList list={data.favorites} />
                    </Box>
                )}
                {otherBloggersToDisplay && (
                    <Box
                        display='flex'
                        flexDir='column'
                        as='section'
                        bgColor='blackAlpha.200'
                        borderRadius={12}
                        pb={6}
                        mb={3}
                    >
                        <OtherBlogList list={otherBloggersToDisplay} />
                        <Button
                            data-test-id={DataTestId.BlogsOthersBtn}
                            iconSpacing={2}
                            size='md'
                            m='0 auto'
                            variant='ghost'
                            colorScheme='black'
                            onClick={handleBtnClick}
                            fontSize={18}
                            pt='10px'
                            leftIcon={
                                isAllBlogs ? (
                                    <ArrowRightIcon sx={{ transform: 'rotate(180deg)' }} />
                                ) : undefined
                            }
                            rightIcon={!isAllBlogs ? <ArrowRightIcon /> : undefined}
                        >
                            {isAllBlogs ? 'Свернуть' : 'Все авторы'}
                        </Button>
                    </Box>
                )}
                <NewRecipes />
            </Flex>
        </Box>
    );
};
