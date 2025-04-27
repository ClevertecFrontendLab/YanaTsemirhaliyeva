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
    useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';

import { getCategoryRoute, getSubcategoryRoute } from '~/consts/dictionary';
import { LIST_MENU } from '~/consts/menu-list';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    currentCategorySelector,
    currentSubcategorySelector,
    recipesSelector,
    setSubcategory,
} from '~/store/slices/recipes-slice';

import { HorizontalCard } from '../horizontal-card/HorizontalCard';

export const TabsComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentCategory = useAppSelector(currentCategorySelector);
    const currentSubcategory = useAppSelector(currentSubcategorySelector);
    const filteredRecipes = useAppSelector(recipesSelector);

    const subcategories = useMemo(() => {
        if (!currentCategory) return [];
        return LIST_MENU[currentCategory as keyof typeof LIST_MENU]?.subcategories || [];
    }, [currentCategory]);

    const itemsToShow = useBreakpointValue({ base: 8, md: 7, xl: 8 });

    const tabListRef = useRef<HTMLDivElement>(null);
    const safeActiveTabIndex = useMemo(() => {
        if (!currentSubcategory || subcategories.length === 0) return 0;
        const index = subcategories.indexOf(currentSubcategory);
        return index >= 0 ? index : 0;
    }, [currentSubcategory, subcategories]);

    // Эффект для прокрутки вкладки в видимую область
    useEffect(() => {
        if (!tabListRef.current || !currentSubcategory) return;

        const activeTabIndex = subcategories.indexOf(currentSubcategory);
        if (activeTabIndex < 0 || activeTabIndex >= tabListRef.current.children.length) return;

        const activeTab = tabListRef.current.children[activeTabIndex] as HTMLElement;
        if (!activeTab) return;

        const tabList = tabListRef.current;
        const tabListScrollWidth = tabList.scrollWidth;
        const tabListClientWidth = tabList.clientWidth;

        const tabLeft = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;

        let scrollPosition = tabLeft - tabListClientWidth / 2 + tabWidth / 2;

        if (scrollPosition < 0) {
            scrollPosition = 0;
        } else if (scrollPosition + tabListClientWidth > tabListScrollWidth) {
            scrollPosition = tabListScrollWidth - tabListClientWidth;
        }

        tabList.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        });
    }, [currentSubcategory, subcategories]);

    // Обработчик изменения вкладки
    const handleTabChange = (index: number) => {
        if (index >= 0 && index < subcategories.length) {
            const newSubcategory = subcategories[index];
            if (newSubcategory && newSubcategory !== currentSubcategory) {
                dispatch(setSubcategory(newSubcategory));
                if (currentCategory) {
                    const categoryPath = getCategoryRoute(currentCategory);
                    if (categoryPath) {
                        const subcategoryPath = getSubcategoryRoute(
                            currentCategory,
                            newSubcategory,
                        );
                        if (subcategoryPath) {
                            navigate(`${categoryPath}/${subcategoryPath}`, { replace: true });
                        }
                    }
                }
            }
        }
    };

    if (!currentCategory) {
        return (
            <Center p={10}>
                <Spinner color='lime.500' />
            </Center>
        );
    }

    if (subcategories.length === 0) {
        return null;
    }

    return (
        <Tabs index={safeActiveTabIndex} onChange={handleTabChange}>
            <TabList
                width='100%'
                ref={tabListRef}
                overflowX='auto'
                whiteSpace='nowrap'
                sx={{
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
                borderBottomWidth='1px'
                borderBottomColor='gray.200'
            >
                {subcategories.map((subcategory, idx) => {
                    const subcategoryKey = subcategory
                        ? getSubcategoryRoute(currentCategory || '', subcategory).replace(/^\//, '')
                        : null;

                    return (
                        <Tab
                            data-test-id={
                                currentCategory === 'Веганская кухня'
                                    ? `tab-${subcategoryKey}-${idx}`
                                    : ''
                            }
                            key={`${currentCategory}-${idx}`}
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
                            {subcategory}
                        </Tab>
                    );
                })}
            </TabList>
            <TabPanels>
                {subcategories.map((subcat, idx) => {
                    if (idx !== safeActiveTabIndex) return null;
                    const subcategoryKey = getSubcategoryRoute(
                        currentCategory || '',
                        subcat,
                    ).replace(/^\//, '');

                    const recipesForSubcategory = filteredRecipes.filter((recipe) =>
                        recipe.subcategory.includes(subcategoryKey),
                    );

                    return (
                        <TabPanel
                            key={`panel-${idx}`}
                            pt={{ base: 5, md: 7 }}
                            pr={{ '2xs': 5, md: '66px' }}
                            pl={{ md: 7 }}
                            pb={1}
                        >
                            {recipesForSubcategory.length > 0 ? (
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
                                    {recipesForSubcategory.slice(0, itemsToShow).map((item, i) => (
                                        <Box key={item.id} display='flex'>
                                            <HorizontalCard item={item} index={i} />
                                        </Box>
                                    ))}
                                </Grid>
                            ) : (
                                <Box textAlign='center' mt='16px' fontSize='lg' color='gray.500'>
                                    По вашему запросу не найдено рецептов
                                </Box>
                            )}
                            {recipesForSubcategory.length > 0 && (
                                <Box textAlign='center' mt='16px'>
                                    <Button
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
                    );
                })}
            </TabPanels>
        </Tabs>
    );
};
