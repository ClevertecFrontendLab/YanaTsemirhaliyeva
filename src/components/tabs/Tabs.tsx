import {
    Box,
    Button,
    Grid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef } from 'react';

import { LIST_MENU } from '~/consts/menu-list';
import { VEGAN_LIST } from '~/pages/vegan-cuisine/mocks';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    currentCategorySelector,
    currentSubcategorySelector,
    setSubcategory,
} from '~/store/slices/category-slice';

import { HorizontalCard } from '../horizontal-card/HorizontalCard';

export const TabsComponent = () => {
    const currentCategory = useAppSelector(currentCategorySelector);
    const currentSubcategory = useAppSelector(currentSubcategorySelector);
    const dispatch = useAppDispatch();
    const subcategories = useMemo(
        () => LIST_MENU[currentCategory as keyof typeof LIST_MENU]?.subcategories || [],
        [currentCategory],
    );

    const itemsToShow = useBreakpointValue({ base: VEGAN_LIST.length, md: 7, xl: 8 });

    const tabListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tabListRef.current && currentSubcategory) {
            const activeTabIndex = subcategories.indexOf(currentSubcategory);
            const activeTab = tabListRef.current.children[activeTabIndex] as HTMLElement;

            if (activeTab) {
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
            }
        }
    }, [currentSubcategory, subcategories]);

    return (
        <Tabs
            index={currentSubcategory ? subcategories.indexOf(currentSubcategory) : 0}
            onChange={(index) => {
                const newSubcategory = subcategories[index];
                if (newSubcategory) {
                    dispatch(setSubcategory(newSubcategory));
                }
            }}
        >
            <TabList
                width='100%'
                ref={tabListRef}
                overflowX='auto'
                whiteSpace='nowrap'
                sx={{
                    '&::-webkit-scrollbar': { display: 'none' }, // Убираем скроллбар
                }}
                borderBottomWidth='1px'
                borderBottomColor='gray.200' // Явно задаем цвет границы
            >
                {subcategories.map((subcategory, idx) => (
                    <Tab
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
                            {VEGAN_LIST.slice(0, itemsToShow).map((item) => (
                                <HorizontalCard key={item.id} item={item} />
                            ))}
                        </Grid>
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
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
