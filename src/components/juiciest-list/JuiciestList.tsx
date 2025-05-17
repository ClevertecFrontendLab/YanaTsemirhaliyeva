import { Box, Button, Grid, Heading, HStack, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router';

import { HorizontalCard } from '~/components/horizontal-card/HorizontalCard';
import { AppRoute, DataTestId } from '~/consts/consts';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ArrowRightIcon } from '~/shared/custom-icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import { searchParamsSelector, setError } from '~/store/slices/recipes-slice';

export const JuiciestList = () => {
    const dispatch = useAppDispatch();
    const isTabletOrAbove = useBreakpointValue({ base: false, sm: true, md: false });
    const categories = useAppSelector(categoriesSelector);
    const searchParams = useAppSelector(searchParamsSelector);
    const params = useMemo(
        () => ({
            ...searchParams,
            sortBy: 'likes' as const,
            sortOrder: 'desc' as const,
        }),
        [searchParams],
    );

    const { data, isError } = useGetRecipesQuery(params);

    useEffect(() => {
        if (isError) {
            dispatch(setError(true));
        }
    }, [dispatch, isError]);

    const mostPopularRecipes = data?.data || [];
    if (mostPopularRecipes.length === 0) return;

    return (
        <Box as='section'>
            <HStack mb={{ base: '10px', xs: 4, sm: 3, lg: 4 }}>
                <Heading
                    as='h2'
                    fontSize={{ base: 24, sm: 36, xl: 48 }}
                    fontFamily='inherit'
                    fontWeight={500}
                >
                    Самое сочное
                </Heading>
                <Spacer />
                <Box display={{ base: 'none', md: 'block' }}>
                    <Button
                        as={Link}
                        to={AppRoute.Juicy}
                        data-test-id={DataTestId.JuicyLink}
                        rightIcon={<ArrowRightIcon />}
                        bgColor='lime.400'
                        size={{ sm: 'md', xl: 'lg' }}
                        border='none'
                        sx={{
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:hover': {
                                bgColor: 'lime.300',
                                color: 'black',
                            },
                            '&:active': {
                                bgColor: 'lime.150',
                            },
                        }}
                    >
                        Вся подборка
                    </Button>
                </Box>
            </HStack>
            {mostPopularRecipes.length > 0 ? (
                <Grid
                    templateColumns={{
                        base: '1fr',
                        xs: 'repeat(2, 1fr)',
                        sm: '1fr',
                        xl: 'repeat(2, 1fr)',
                    }}
                    gap={{ base: 3, xs: '14px', sm: '14px', xl: 5 }}
                    alignItems='stretch'
                    autoRows='1fr'
                >
                    {mostPopularRecipes.map((item, i) => (
                        <HorizontalCard
                            item={item}
                            key={item._id}
                            index={i}
                            categories={categories}
                        />
                    ))}
                </Grid>
            ) : (
                <Box textAlign='center' mt='16px' fontSize='lg' color='gray.500'>
                    По вашему запросу не найдено рецептов
                </Box>
            )}
            <Box textAlign='center' mt='10px'>
                <Button
                    as={Link}
                    to={AppRoute.Juicy}
                    data-test-id={
                        isTabletOrAbove ? DataTestId.JuicyLink : DataTestId.JuicyLinkMobile
                    }
                    rightIcon={<ArrowRightIcon />}
                    bgColor='lime.400'
                    size='md'
                    m='0 auto'
                    border='none'
                    sx={{
                        display: { base: 'inline-flex', md: 'none' },
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:hover': {
                            bgColor: 'lime.300',
                            color: 'black',
                        },
                        '&:active': {
                            bgColor: 'lime.150',
                        },
                    }}
                >
                    Вся подборка
                </Button>
            </Box>
        </Box>
    );
};
