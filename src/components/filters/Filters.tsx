import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    IconButton,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { authors, DataTestId, garnishTypes, meatTypes } from '~/consts/consts';
import { FilterIcon } from '~/shared/custom-icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import {
    applyFilters,
    clearFilters,
    isFilterActiveSelector,
    selectedFiltersSelector,
    setDrawerStatus,
    toggleFilterAllergen,
    updateSelectedFilters,
} from '~/store/slices/recipes-slice';
import { getCategoryTitles } from '~/utils';

import { AllergenSelect } from '../allergens/Allergens';
import { MenuCategory } from '../menu-category/MenuCategory';
import { MenuComponent } from '../menu-component/MenuComponent';

type LocalFilters = {
    meatTypes: string[];
    garnishTypes: string[];
    allergens: string[];
    categories: string[];
    authors: string[];
};

export const Filters = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const selectedFilters = useAppSelector(selectedFiltersSelector);
    const isFilterActive = useAppSelector(isFilterActiveSelector);
    const dispatch = useAppDispatch();
    const categories = useAppSelector(categoriesSelector);
    const categoryTitles = getCategoryTitles(selectedFilters.categories || [], categories);
    const filterTypes: Array<keyof typeof selectedFilters> = [
        'meatTypes',
        'garnishTypes',
        'authors',
        'categories',
        'allergens',
    ];

    const [isLocalFilterActive, setIsLocalFilterActive] = useState(isFilterActive);
    const [localFilters, setLocalFilters] = useState<LocalFilters>({
        meatTypes: [],
        garnishTypes: [],
        allergens: [],
        categories: [],
        authors: [],
    });

    useEffect(() => {
        setLocalFilters({
            meatTypes: selectedFilters.meatTypes || [],
            garnishTypes: selectedFilters.garnishTypes || [],
            allergens: selectedFilters.allergens || [],
            categories: selectedFilters.categories || [],
            authors: selectedFilters.authors || [],
        });
    }, [selectedFilters]);

    useEffect(() => {
        dispatch(setDrawerStatus(isOpen));
    }, [dispatch, isOpen]);

    useEffect(() => {
        setIsLocalFilterActive(isFilterActive);
    }, [isFilterActive]);

    const handleDrawerClose = () => {
        setIsLocalFilterActive(isFilterActive);
        onClose();
    };

    const handleFilterChange = (type: keyof LocalFilters, value: string) => {
        const updatedFilter = selectedFilters[type]?.includes(value)
            ? selectedFilters[type]?.filter((item) => item !== value)
            : [...(selectedFilters[type] || []), value];

        dispatch(updateSelectedFilters({ type, value: updatedFilter }));
        setLocalFilters({ ...localFilters, [type]: updatedFilter });
    };

    const handleApplyFilters = () => {
        if (isLocalFilterActive) {
            dispatch(toggleFilterAllergen());
        }
        dispatch(applyFilters());
        handleDrawerClose();
    };

    const handleRemoveFilter = (type: keyof typeof selectedFilters, value: string) => {
        if (type === 'categories') {
            const category = categories.find((cat) => cat.title === value);
            if (!category) return;
            const subcategoryIds = category.subCategories.map((sub) => sub._id);

            const updatedFilter = selectedFilters.categories?.filter(
                (subId) => !subcategoryIds.includes(subId),
            );

            dispatch(updateSelectedFilters({ type, value: updatedFilter || [] }));
        } else {
            const updatedFilter = selectedFilters[type]?.filter((item) => item !== value);
            dispatch(updateSelectedFilters({ type, value: updatedFilter || [] }));
        }
    };

    const handleClearFilters = () => {
        if (isFilterActive) {
            dispatch(toggleFilterAllergen());
        }
        dispatch(clearFilters());
        setLocalFilters({
            meatTypes: [],
            garnishTypes: [],
            allergens: [],
            categories: [],
            authors: [],
        });
    };

    useEffect(() => {
        if (isOpen) {
            setIsLocalFilterActive(isFilterActive);
        }
    }, [isOpen, isFilterActive]);

    return (
        <>
            <IconButton
                data-test-id={DataTestId.FilterBtn}
                onClick={() => {
                    onOpen();
                    dispatch(clearFilters());
                }}
                ref={btnRef}
                aria-label='Action Button'
                icon={<FilterIcon />}
                size={{ base: 'sm', sm: 'lg' }}
                variant='outline'
                borderColor='blackAlpha.600'
                borderRadius='lg'
                sx={{
                    transition: 'border-color 0.3s ease-in-out',
                    paddingInline: '0 !important',
                    '&:focus': {
                        outline: 'none',
                    },
                    '&:hover': {
                        bgColor: 'transparent',
                        borderColor: 'blackAlpha.400',
                    },
                }}
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={handleDrawerClose}
                finalFocusRef={btnRef as React.RefObject<HTMLElement>}
            >
                <DrawerOverlay />
                <DrawerContent
                    data-test-id={DataTestId.FilterDrawer}
                    p={4}
                    pr='6px'
                    pl={{ base: 3, md: 8 }}
                    minW={{ base: '344px', md: '463px' }}
                    sx={{
                        width: '344px',
                        '@media screen and (min-width: 1200px)': {
                            width: '463px',
                        },
                        '@media screen and (max-width: 360px)': {
                            left: '16px',
                            right: '0',
                        },
                    }}
                >
                    <DrawerHeader
                        py={0}
                        pl={0}
                        pr={{ base: 5, md: 6 }}
                        display='flex'
                        justifyContent='space-between'
                        gap={4}
                        mb={3}
                    >
                        <Text>Фильтр</Text>
                        <DrawerCloseButton
                            data-test-id={DataTestId.FilterCloseBtn}
                            color='white'
                            bgColor='black'
                            borderRadius='50%'
                            boxSize={6}
                            pos='static'
                        />
                    </DrawerHeader>

                    <DrawerBody
                        px={0}
                        pt={0}
                        pr={{ base: '6px', md: 5 }}
                        pb='60px'
                        sx={{
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'blackAlpha.300',
                                borderRadius: '8px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'blackAlpha.400',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'blackAlpha.50',
                                borderRadius: '8px',
                            },
                        }}
                    >
                        <VStack spacing={4} alignItems='stretch' pl={1} pt={1}>
                            <Box>
                                <MenuCategory
                                    list={categories}
                                    placeholder='Категория'
                                    type='categories'
                                    dataTestId='filter-menu-button-категория'
                                />
                            </Box>
                            <Box>
                                <MenuComponent
                                    list={authors}
                                    placeholder='Поиск по автору'
                                    isAddItem
                                    newItem='Только новые авторы'
                                    type='authors'
                                />
                            </Box>
                            <Box>
                                <Text mb={2}>Тип мяса:</Text>
                                <VStack align='stretch' spacing={2}>
                                    {meatTypes.map((type) => (
                                        <Checkbox
                                            key={type}
                                            isChecked={localFilters.meatTypes?.includes(type)}
                                            onChange={() => handleFilterChange('meatTypes', type)}
                                            borderColor='lime.150'
                                            sx={{
                                                '.chakra-checkbox__control': {
                                                    borderWidth: 3,
                                                },
                                                '&[data-checked] .chakra-checkbox__control': {
                                                    background: 'lime.150 !important',
                                                    borderColor: 'lime.150 !important',
                                                    color: 'black !important',
                                                },
                                            }}
                                        >
                                            {type}
                                        </Checkbox>
                                    ))}
                                </VStack>
                            </Box>
                            <Box>
                                <Text mb={2}>Тип гарнира:</Text>
                                <VStack align='stretch' spacing={2}>
                                    {garnishTypes.map((type) => (
                                        <Checkbox
                                            data-test-id={
                                                type === 'Картошка' ? DataTestId.CheckboxPotato : ''
                                            }
                                            key={type}
                                            isChecked={localFilters.garnishTypes?.includes(type)}
                                            onChange={() =>
                                                handleFilterChange('garnishTypes', type)
                                            }
                                            borderColor='lime.150'
                                            sx={{
                                                '.chakra-checkbox__control': {
                                                    borderWidth: 3,
                                                },
                                                '&[data-checked] .chakra-checkbox__control': {
                                                    background: 'lime.150 !important',
                                                    borderColor: 'lime.150 !important',
                                                    color: 'black !important',
                                                },
                                            }}
                                        >
                                            {type}
                                        </Checkbox>
                                    ))}
                                </VStack>
                            </Box>
                            <AllergenSelect
                                direction='column'
                                width='308px'
                                selectedAllergens={selectedFilters.allergens || []}
                                isFilterActive={isLocalFilterActive}
                                onToggleFilter={() => setIsLocalFilterActive((prev) => !prev)}
                                onCheckboxChange={(allergen) =>
                                    handleFilterChange('allergens', allergen)
                                }
                                onAddCustomAllergen={(allergen) =>
                                    handleFilterChange('allergens', allergen)
                                }
                                testIdSwitcher={DataTestId.AllergensSwitcherFilter}
                                testIdMenuButton={DataTestId.AllergensMenuBtnFilter}
                            />
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter
                        pr={{ base: '6px', md: 5 }}
                        pt={3}
                        pb={0}
                        px={0}
                        flexDir='column'
                        alignItems='stretch'
                    >
                        <HStack spacing={3} mb={4} flexWrap='wrap'>
                            {filterTypes.map((filterType) => {
                                if (filterType === 'categories' && selectedFilters.categories) {
                                    return categoryTitles.map((title, index) => (
                                        <Tag
                                            key={`${filterType}-${index}`}
                                            data-test-id={DataTestId.FilterTag}
                                            size='sm'
                                            borderRadius='md'
                                            border='1px solid'
                                            borderColor='lime.400'
                                            variant='solid'
                                            bgColor='lime.100'
                                            color='lime.700'
                                        >
                                            <TagLabel>{title}</TagLabel>
                                            <TagCloseButton
                                                onClick={() =>
                                                    handleRemoveFilter(filterType, title)
                                                }
                                                _focus={{ outline: 'none' }}
                                            />
                                        </Tag>
                                    ));
                                }

                                return selectedFilters[filterType]?.map((item, index) => (
                                    <Tag
                                        key={`${filterType}-${index}`}
                                        data-test-id={DataTestId.FilterTag}
                                        size='sm'
                                        borderRadius='md'
                                        border='1px solid'
                                        borderColor='lime.400'
                                        variant='solid'
                                        bgColor='lime.100'
                                        color='lime.700'
                                    >
                                        <TagLabel>{item}</TagLabel>
                                        <TagCloseButton
                                            onClick={() => handleRemoveFilter(filterType, item)}
                                            _focus={{ outline: 'none' }}
                                        />
                                    </Tag>
                                ));
                            })}
                        </HStack>

                        <ButtonGroup justifyContent='flex-end'>
                            <Button
                                data-test-id={DataTestId.FilterClearBtn}
                                onClick={handleClearFilters}
                                variant='outline'
                                borderColor='blackAlpha.600'
                                fontSize={{ base: 14, md: 18 }}
                                transition='color 0.3s ease-in-out, background-color 0.3s ease-in-out'
                                _hover={{
                                    color: 'white',
                                    backgroundColor: 'black',
                                }}
                            >
                                Очистить фильтр
                            </Button>
                            <Button
                                data-test-id={DataTestId.FilterFindRecipe}
                                onClick={handleApplyFilters}
                                isDisabled={
                                    !Object.values(selectedFilters).some(
                                        (values) => values && values.length > 0,
                                    )
                                }
                                variant='solid'
                                bgColor='black'
                                color='white'
                                fontSize={{ base: 14, md: 18 }}
                                transition='color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out'
                                _disabled={{
                                    bgColor: 'blackAlpha.300',
                                    pointerEvents: 'none',
                                }}
                                _hover={{
                                    color: 'black',
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                }}
                            >
                                Найти рецепт
                            </Button>
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
