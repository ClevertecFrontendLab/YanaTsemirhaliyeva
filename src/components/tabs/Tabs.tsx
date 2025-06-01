import { Box, Button, Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { DEFAULT_CARDS_PER_PAGE } from '~/consts/consts';
import {
    useGetRecipesByCategoryWithPaginateQuery,
    useGetRecipesWithFiltersAndPaginateQuery,
} from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import {
    currentCategorySelector,
    currentSubcategorySelector,
    searchParamsSelector,
    setIsCategoryCuisineDataFetching,
    setSubcategory,
    updateSearchParams,
} from '~/store/slices/recipes-slice';

import { HorizontalCard } from '../horizontal-card/HorizontalCard';

export const TabsComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentCategory = useAppSelector(currentCategorySelector);
    const currentSubcategory = useAppSelector(currentSubcategorySelector);
    const searchParams = useAppSelector(searchParamsSelector);
    const categories = useAppSelector(categoriesSelector);
    const [page, setPage] = useState(1);
    const subcategoriesIds = useMemo(
        () => searchParams.subcategoriesIds || [],
        [searchParams.subcategoriesIds],
    );
    const currentSubcategoryId = currentSubcategory?._id || '';

    const subcategories = useMemo(() => currentCategory?.subCategories || [], [currentCategory]);

    const activeTabIndex = useMemo(() => {
        if (!currentSubcategory) return 0;
        const index = subcategories.findIndex((sub) => sub._id === currentSubcategory._id);
        return index !== -1 ? index : 0;
    }, [currentSubcategory, subcategories]);

    useEffect(() => {
        setPage(1);
    }, [searchParams, currentSubcategoryId]);

    useEffect(() => {
        if (
            currentSubcategoryId &&
            (!subcategoriesIds.length || subcategoriesIds[0] !== currentSubcategoryId)
        ) {
            dispatch(
                updateSearchParams({
                    subcategoriesIds: [currentSubcategoryId],
                    page: 1,
                }),
            );
        }
    }, [currentSubcategoryId, dispatch, subcategoriesIds]);

    const hasAdditionalFilters = useMemo(
        () =>
            !!(
                searchParams.meat?.length ||
                searchParams.garnish?.length ||
                searchParams.allergens?.length ||
                searchParams.searchString?.length ||
                false
            ),
        [searchParams],
    );

    const recipesWithFilters = useGetRecipesWithFiltersAndPaginateQuery(
        {
            subcategoriesIds: [currentSubcategoryId],
            searchString: searchParams.searchString || '',
            allergens: searchParams.allergens || [],
            meat: searchParams.meat || [],
            garnish: searchParams.garnish || [],
            page,
            limit: DEFAULT_CARDS_PER_PAGE,
        },
        {
            skip: !currentSubcategoryId || !hasAdditionalFilters,
        },
    );

    const recipesByCategory = useGetRecipesByCategoryWithPaginateQuery(
        {
            subCategoryId: currentSubcategoryId,
            searchString: searchParams.searchString || '',
            allergens: searchParams.allergens || [],
            page,
            limit: DEFAULT_CARDS_PER_PAGE,
        },
        {
            skip: !currentSubcategoryId || hasAdditionalFilters,
        },
    );

    const { data, isFetching } = hasAdditionalFilters ? recipesWithFilters : recipesByCategory;

    const recipesForSubcategory = data?.data || [];

    useEffect(() => {
        dispatch(setIsCategoryCuisineDataFetching(isFetching));
    }, [dispatch, isFetching]);

    const handleTabChange = (index: number) => {
        setPage(1);
        const newSubcategory = subcategories[index];

        if (newSubcategory && newSubcategory._id !== currentSubcategory?._id) {
            dispatch(setSubcategory(newSubcategory));
            dispatch(
                updateSearchParams({
                    subcategoriesIds: [newSubcategory._id],
                    page: 1,
                }),
            );
            navigate(`/${currentCategory?.category}/${newSubcategory.category}`, { replace: true });
        }
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    if (!currentCategory) return null;

    return (
        <Tabs index={activeTabIndex} onChange={handleTabChange}>
            <TabList
                px={3}
                mx={3}
                flexWrap='wrap'
                alignItems='center'
                justifyContent='center'
                borderBottomWidth='1px'
                borderBottomColor='gray.200'
            >
                {subcategories.map((subcategory, idx) => (
                    <Tab
                        data-test-id={`tab-${subcategory.category}-${idx}`}
                        key={idx}
                        width='fit-content'
                        fontSize={{ base: 14, md: 16 }}
                        sx={{
                            whiteSpace: 'nowrap',
                            color: 'lime.800',
                            border: 'none',
                            position: 'relative',
                            _selected: {
                                color: 'lime.600',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '2px',
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'lime.600',
                                    transition: 'background-color 0.2s ease-in-out',
                                },
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                            _hover: {
                                color: 'lime.600',
                            },
                        }}
                    >
                        {subcategory.title}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {subcategories.map((_, idx) => (
                    <TabPanel
                        key={`panel-${idx}`}
                        pt={{ base: 5, md: 7 }}
                        pr={{ '2xs': 5, md: '66px' }}
                        pl={{ md: 7 }}
                        pb={1}
                    >
                        {idx === activeTabIndex &&
                            (recipesForSubcategory.length > 0 ? (
                                <Grid
                                    templateColumns={{
                                        base: '1fr',
                                        '2xs': 'repeat(2, 1fr)',
                                        md: '1fr',
                                        xl: 'repeat(2, 1fr)',
                                    }}
                                    rowGap={{ base: 4, md: 3 }}
                                    columnGap='24px'
                                >
                                    {recipesForSubcategory.map((item, i) => (
                                        <Box key={item._id} display='flex'>
                                            <HorizontalCard
                                                item={item}
                                                index={i}
                                                categories={categories}
                                            />
                                        </Box>
                                    ))}
                                </Grid>
                            ) : (
                                <Box textAlign='center' mt='16px' fontSize='lg' color='gray.500'>
                                    По вашему запросу не найдено рецептов
                                </Box>
                            ))}
                        {data?.data && page < data?.meta?.totalPages && (
                            <Box textAlign='center' mt='16px'>
                                <Button
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
                                >
                                    Загрузить ещё
                                </Button>
                            </Box>
                        )}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
