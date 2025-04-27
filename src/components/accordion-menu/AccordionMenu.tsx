import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getCategoryRoute, getSubcategoryRoute } from '~/consts/dictionary';
import { LIST_MENU } from '~/consts/menu-list';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    currentCategorySelector,
    currentSubcategorySelector,
    setCategory,
    setSubcategory,
} from '~/store/slices/recipes-slice';

export const AccordionMenu = () => {
    const currentCategory = useAppSelector(currentCategorySelector);
    const currentSubcategory = useAppSelector(currentSubcategorySelector);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentCategory) {
            const index = Object.keys(LIST_MENU).findIndex(
                (category) => category === currentCategory,
            );
            setActiveIndex(index);
        } else {
            setActiveIndex(-1);
        }
    }, [currentCategory]);

    const handleCategoryClick = (category: string, subcategories: string[]) => {
        dispatch(setCategory(category));

        if (subcategories && subcategories.length > 0) {
            const firstSubcategory = subcategories[0];
            dispatch(setSubcategory(firstSubcategory));

            const categoryPath = getCategoryRoute(category);
            if (categoryPath) {
                const subcategoryPath = getSubcategoryRoute(category, firstSubcategory);

                if (subcategoryPath) {
                    navigate(`${categoryPath}/${subcategoryPath}`);
                } else {
                    navigate(categoryPath);
                }
            } else {
                navigate('/vegan');
            }
        }
    };

    const handleSubcategoryClick = (subcategory: string) => {
        if (!currentCategory) return;

        if (subcategory === currentSubcategory) return;

        dispatch(setSubcategory(subcategory));

        const categoryPath = getCategoryRoute(currentCategory);
        if (categoryPath) {
            const subcategoryPath = getSubcategoryRoute(currentCategory, subcategory);

            if (subcategoryPath) {
                const fullPath = `${categoryPath}/${subcategoryPath}`;

                navigate(fullPath, { replace: true });
            }
        }
    };

    return (
        <Box
            pl='10px'
            py={2}
            maxH={{ base: 'inherit', md: 'calc(100vh - 256px)' }}
            borderRadius={4}
            sx={{
                ...(activeIndex !== -1 && {
                    boxShadow:
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }),
            }}
        >
            <Accordion
                pr={1}
                maxH='100%'
                overflowY='auto'
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
                onChange={(index) => {
                    if (typeof index === 'number') {
                        setActiveIndex(index);
                    }
                }}
                index={activeIndex}
            >
                {Object.entries(LIST_MENU).map(
                    ([category, { icon: IconComponent, subcategories }], index) => {
                        const categoryKey = category
                            ? getCategoryRoute(category).replace(/^\//, '')
                            : null;
                        return (
                            <AccordionItem key={index} border='none'>
                                <AccordionButton
                                    data-test-id={`${categoryKey}`}
                                    p={3}
                                    pl={2}
                                    pr={4}
                                    border='none'
                                    borderRadius='none'
                                    _hover={{
                                        backgroundColor: 'lime.50',
                                        border: 'none',
                                    }}
                                    _expanded={{
                                        fontWeight: '600',
                                        backgroundColor: 'lime.100',
                                    }}
                                    _focus={{
                                        outline: 'none',
                                    }}
                                    onClick={() => handleCategoryClick(category, subcategories)}
                                >
                                    <Box as={IconComponent} boxSize={6} mr='12px'></Box>
                                    <Box
                                        flex='1'
                                        textAlign='left'
                                        isTruncated
                                        {...(category === 'Веганская кухня' && {
                                            'data-test-id': 'vegan-cuisine',
                                        })}
                                    >
                                        {category}
                                    </Box>
                                    <AccordionIcon boxSize={6} />
                                </AccordionButton>
                                <AccordionPanel
                                    pb={4}
                                    display='flex'
                                    flexDirection='column'
                                    alignItems='flex-start'
                                >
                                    {subcategories.map((subcategory, idx) => {
                                        const subcategoryKey = subcategory
                                            ? getSubcategoryRoute(
                                                  category || '',
                                                  subcategory,
                                              ).replace(/^\//, '')
                                            : null;

                                        return (
                                            <Button
                                                data-test-id={
                                                    currentSubcategory === subcategory
                                                        ? `${subcategoryKey}-active`
                                                        : ''
                                                }
                                                h={6}
                                                width='100%'
                                                justifyContent='flex-start'
                                                key={idx}
                                                border='none'
                                                pos='relative'
                                                bgColor='inherit'
                                                onClick={() => handleSubcategoryClick(subcategory)}
                                                py={4}
                                                pl={4}
                                                borderRadius='none'
                                                fontWeight={
                                                    currentSubcategory === subcategory
                                                        ? '600'
                                                        : '500'
                                                }
                                                _hover={{
                                                    backgroundColor: 'lime.50',
                                                    color: 'inherit',
                                                }}
                                                _focus={{
                                                    outline: 'none',
                                                }}
                                            >
                                                {subcategory}
                                                <Box
                                                    as='span'
                                                    pos='absolute'
                                                    left={
                                                        currentSubcategory === subcategory
                                                            ? '-8px'
                                                            : '0'
                                                    }
                                                    h={6}
                                                    w={
                                                        currentSubcategory === subcategory
                                                            ? '8px'
                                                            : '1px'
                                                    }
                                                    bg='lime.300'
                                                    transition='all 0.2s ease-in-out'
                                                />
                                            </Button>
                                        );
                                    })}
                                </AccordionPanel>
                            </AccordionItem>
                        );
                    },
                )}
            </Accordion>
        </Box>
    );
};
