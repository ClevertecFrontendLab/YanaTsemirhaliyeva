import {
    Box,
    Button,
    Center,
    Grid,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { DEFAULT_CARDS_PER_PAGE } from '~/consts/consts';
import { useGetRecipesWithFiltersAndPaginateQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import {
    currentCategorySelector,
    currentSubcategorySelector,
    searchParamsSelector,
    setSubcategory,
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
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const subcategories = useMemo(() => currentCategory?.subCategories || [], [currentCategory]);

    useEffect(() => {
        if (!currentSubcategory) return;
        const foundIndex = subcategories.findIndex((sub) => sub._id === currentSubcategory._id);
        if (foundIndex !== -1) setActiveTabIndex(foundIndex);
    }, [currentSubcategory, subcategories]);

    const selectedSubCategoryId = subcategories[activeTabIndex]?._id ?? '';

    useEffect(() => {
        setPage(1);
    }, [searchParams]);

    const { data, isLoading } = useGetRecipesWithFiltersAndPaginateQuery(
        {
            subcategoriesIds: [selectedSubCategoryId],
            searchString: searchParams.searchString || '',
            allergens: searchParams.allergens || [],
            page,
            limit: DEFAULT_CARDS_PER_PAGE,
        },
        {
            skip: !selectedSubCategoryId,
            refetchOnMountOrArgChange: true,
        },
    );

    const recipesForSubcategory = data?.data || [];

    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
        setPage(1);

        const newSubcategory = subcategories[index];
        if (newSubcategory && newSubcategory._id !== currentSubcategory?._id) {
            dispatch(setSubcategory(newSubcategory));
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
                        {idx === activeTabIndex ? (
                            isLoading ? (
                                <Center p={1}>
                                    <Spinner color='lime.500' />
                                </Center>
                            ) : recipesForSubcategory.length > 0 ? (
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
                            )
                        ) : null}
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
