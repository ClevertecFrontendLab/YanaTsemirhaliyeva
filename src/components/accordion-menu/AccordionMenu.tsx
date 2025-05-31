import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { API_IMG, DataTestId } from '~/consts/consts';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import {
    currentCategorySelector,
    currentSubcategorySelector,
    setCategory,
    setSubcategory,
} from '~/store/slices/recipes-slice';
import { Category, SubCategory } from '~/types/category';

export const AccordionMenu = () => {
    const currentCategory = useAppSelector(currentCategorySelector);
    const currentSubcategory = useAppSelector(currentSubcategorySelector);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const categories = useAppSelector(categoriesSelector);

    useEffect(() => {
        if (currentCategory) {
            const index = categories.findIndex(
                (category) => category.title === currentCategory.title,
            );
            setActiveIndex(index);
        } else {
            setActiveIndex(-1);
        }
    }, [currentCategory, categories]);

    const { isLoading: isCategoriesDataLoading } = useGetCategoriesQuery();

    if (isCategoriesDataLoading || !categories.length) {
        return null;
    }

    const handleCategoryClick = (category: Category, subCategory: SubCategory) => {
        dispatch(setCategory(category));

        if (subCategory) {
            dispatch(setSubcategory(subCategory));

            navigate(`/${category.category}/${subCategory.category}`);
        } else {
            navigate(`/${category.category}`);
        }
    };

    const handleSubcategoryClick = (subcategory: SubCategory, category: Category) => {
        if (!currentCategory) return;
        if (subcategory.category === currentSubcategory?.category) return;

        dispatch(setSubcategory(subcategory));
        navigate(`/${category.category}/${subcategory.category}`);
    };

    if (!categories.length) {
        return <p>Ошибка загрузки категорий</p>;
    }

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
                {categories.map((category, index) => (
                    <AccordionItem key={index} border='none'>
                        <AccordionButton
                            data-test-id={category.category}
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
                            onClick={() => handleCategoryClick(category, category.subCategories[0])}
                        >
                            <Image src={`${API_IMG}/${category.icon}`} boxSize={6} mr={3} />
                            <Box
                                flex='1'
                                textAlign='left'
                                isTruncated
                                {...(category.title === 'Веганская кухня' && {
                                    'data-test-id': DataTestId.VeganCuisine,
                                })}
                            >
                                {category.title}
                            </Box>
                            <AccordionIcon boxSize={6} />
                        </AccordionButton>
                        <AccordionPanel
                            pb={4}
                            display='flex'
                            flexDirection='column'
                            alignItems='flex-start'
                        >
                            {category.subCategories.map((subcategory, idx) => (
                                <Button
                                    data-test-id={
                                        currentSubcategory?.title === subcategory.title
                                            ? `${subcategory.category}-active`
                                            : ''
                                    }
                                    h={6}
                                    width='100%'
                                    justifyContent='flex-start'
                                    key={idx}
                                    border='none'
                                    pos='relative'
                                    bgColor='inherit'
                                    onClick={() => handleSubcategoryClick(subcategory, category)}
                                    py={4}
                                    pl={4}
                                    borderRadius='none'
                                    fontWeight={
                                        currentSubcategory?.title === subcategory.title
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
                                    {subcategory.title}
                                    <Box
                                        as='span'
                                        pos='absolute'
                                        left={
                                            currentSubcategory?.title === subcategory.title
                                                ? '-8px'
                                                : '0'
                                        }
                                        h={6}
                                        w={
                                            currentSubcategory?.title === subcategory.title
                                                ? '8px'
                                                : '1px'
                                        }
                                        bg='lime.300'
                                        transition='all 0.2s ease-in-out'
                                    />
                                </Button>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};
