import { Box, Button, Grid, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CategoryHighlight } from '~/components/category-highlight/CategoryHighlight';
import { HorizontalCard } from '~/components/horizontal-card/HorizontalCard';
import { Intro } from '~/components/intro/Intro';
import { LoaderFullsize } from '~/components/loader-fullsize/LoaderFullsize';
import { ALERT_MESSAGES, DataTestId, DEFAULT_PAGE } from '~/consts/consts';
import { useGetPaginatedRecipesQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { categoriesSelector } from '~/store/slices/categories-slice';
import { searchParamsSelector } from '~/store/slices/recipes-slice';

const CARDS_PER_PAGE = 8;

export const JuiciestCollection = () => {
    const dispatch = useAppDispatch();
    const searchParams = useAppSelector(searchParamsSelector);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const categories = useAppSelector(categoriesSelector);

    const { data, isError, isFetching, isLoading } = useGetPaginatedRecipesQuery(
        {
            ...searchParams,
            page,
            sortBy: 'likes',
            sortOrder: 'desc',
            limit: CARDS_PER_PAGE,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        if (isError) {
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        }
    }, [dispatch, isError]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const recipes = data?.data || [];
    const isBtnDisplay =
        data?.meta && recipes.length < data?.meta.total && page < data?.meta.totalPages;

    return (
        <Box
            pl={{ base: '16px', xs: '20px', sm: '28px' }}
            pr={{ base: '20px', sm: '54px', md: '70px' }}
        >
            <Box
                m={{ base: '0 auto 30px', xs: '0 auto 36px', md: '0 auto 32px' }}
                maxW={{ base: '500px', sm: '700px' }}
            >
                <Intro title='Самое сочное' />
            </Box>
            <Grid
                templateColumns={{
                    base: '1fr',
                    '2xs': 'repeat(2, 1fr)',
                    md: '1fr',
                    xl: 'repeat(2, 1fr)',
                }}
                rowGap={{ base: 4, md: '14px' }}
                columnGap='24px'
                alignItems='stretch'
                autoRows='1fr'
            >
                {recipes.map((item, i) => (
                    <HorizontalCard key={i} item={item} index={i} categories={categories} />
                ))}
            </Grid>
            {isBtnDisplay && (
                <Box textAlign='center' mt='14px' mb={10}>
                    <Button
                        data-test-id={DataTestId.BtnLoadMore}
                        onClick={handleLoadMore}
                        bgColor='lime.400'
                        size='md'
                        m='0 auto'
                        border='none'
                        sx={{
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:hover': {
                                bgColor: 'lime.300',
                            },
                            '&:active': {
                                bgColor: 'lime.150',
                            },
                        }}
                        _disabled={{
                            bgColor: 'blackAlpha.300',
                            pointerEvents: 'none',
                        }}
                        isDisabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <>
                                <Spinner size='sm' mr={2} /> Загрузка...
                            </>
                        ) : (
                            'Загрузить ещё'
                        )}
                    </Button>
                </Box>
            )}
            <CategoryHighlight isDivider />
            <LoaderFullsize isOpen={isFetching || isLoading} />
        </Box>
    );
};
