import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { AppRoute, DataTestId } from '~/consts/consts';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    currentRecipeTitleSelector,
    setCategory,
    setRecipeTitle,
    setSubcategory,
} from '~/store/slices/recipes-slice';
import { Category, SubCategory } from '~/types/category';
import { getCategoryAndSubcategoryFromUrl } from '~/utils';

type CategoryData = {
    category: Category | null;
    subcategory: SubCategory | null;
    id: string | null;
};

type BreadcrumbsProps = {
    onBreadcrumbClick?: () => void;
};

export const Breadcrumbs = ({ onBreadcrumbClick }: BreadcrumbsProps) => {
    const recipeTitle = useAppSelector(currentRecipeTitleSelector);
    const location = useLocation();
    const shouldWrap = useBreakpointValue({ base: true, md: false });
    const dispatch = useAppDispatch();

    const [categoryData, setCategoryData] = useState<CategoryData>({
        category: null,
        subcategory: null,
        id: null,
    });

    useEffect(() => {
        const fetchCategoryData = async () => {
            const data = await getCategoryAndSubcategoryFromUrl(location.pathname);
            setCategoryData(data);
        };

        fetchCategoryData();
    }, [location.pathname]);

    const { category, subcategory, id } = categoryData;

    const handleCategoryClick = () => {
        if (category) {
            dispatch(setCategory(category));
            dispatch(setSubcategory(null));
            dispatch(setRecipeTitle(null));
            onBreadcrumbClick?.();
        }
    };

    const handleSubcategoryClick = () => {
        if (category && subcategory) {
            dispatch(setCategory(category));
            dispatch(setSubcategory(subcategory));
            dispatch(setRecipeTitle(null));
            onBreadcrumbClick?.();
        }
    };

    const handleReset = () => {
        if (category) {
            dispatch(setCategory(null));
            dispatch(setSubcategory(null));
            dispatch(setRecipeTitle(null));
            onBreadcrumbClick?.();
        }
    };

    return (
        <Breadcrumb
            data-test-id={DataTestId.Breadcrumbs}
            separator={<ChevronRightIcon color='black' />}
            color='blackAlpha.700'
            sx={{
                '& .chakra-breadcrumb__list': {
                    flexWrap: 'wrap',
                    rowGap: shouldWrap ? '0.5rem' : 0,
                },
            }}
        >
            {/* Главная */}
            <BreadcrumbItem>
                <BreadcrumbLink
                    as={Link}
                    to='/'
                    onClick={handleReset}
                    sx={{
                        '&:hover': {
                            color: 'lime.800',
                            textDecoration: 'none',
                        },
                    }}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Статическая страница "Самое сочное" */}
            {location.pathname === AppRoute.Juicy && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink
                        as={Link}
                        to={AppRoute.Juicy}
                        color='black'
                        pointerEvents='none'
                    >
                        Самое сочное
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {/* Категория */}
            {category && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        onClick={handleCategoryClick}
                        as={Link}
                        to={`${category.category}`}
                        sx={{
                            '&:hover': {
                                color: 'lime.800',
                                textDecoration: 'none',
                            },
                        }}
                    >
                        {category.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {/* Подкатегория */}
            {subcategory && (
                <BreadcrumbItem isCurrentPage={!id}>
                    <BreadcrumbLink
                        onClick={handleSubcategoryClick}
                        as={Link}
                        to={`${category?.category}/${subcategory.category}`}
                        sx={{
                            color: !id ? 'black' : 'inherit',
                            pointerEvents: !id ? 'none' : 'auto',
                            '&:hover': {
                                color: 'lime.800',
                                textDecoration: 'none',
                            },
                        }}
                    >
                        {subcategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {recipeTitle && (
                <BreadcrumbItem isCurrentPage color='black'>
                    <BreadcrumbLink>{recipeTitle}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
