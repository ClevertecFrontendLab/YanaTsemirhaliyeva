import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, useBreakpointValue } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { AppRoute } from '~/consts/consts';
import {
    getCategoryAndSubcategoryFromUrl,
    getCategoryRoute,
    getSubcategoryRoute,
} from '~/consts/dictionary';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    currentRecipeTitleSelector,
    setCategory,
    setSubcategory,
} from '~/store/slices/recipes-slice';

type BreadcrumbsProps = {
    onBreadcrumbClick?: () => void;
};

export const Breadcrumbs = ({ onBreadcrumbClick }: BreadcrumbsProps) => {
    const recipeTitle = useAppSelector(currentRecipeTitleSelector);
    const location = useLocation();
    const shouldWrap = useBreakpointValue({ base: true, md: false });
    const dispatch = useAppDispatch();

    const { category, subcategory, id } = getCategoryAndSubcategoryFromUrl(location.pathname);

    const categoryRoute = category ? getCategoryRoute(category) : '';
    const subcategoryRoute =
        category && subcategory ? getSubcategoryRoute(category, subcategory) : '';

    const handleCategoryClick = () => {
        if (category) {
            dispatch(setCategory(category));
            dispatch(setSubcategory(null));
            onBreadcrumbClick?.();
        }
    };

    const handleSubcategoryClick = () => {
        if (category && subcategory) {
            dispatch(setCategory(category));
            dispatch(setSubcategory(subcategory));
            onBreadcrumbClick?.();
        }
    };

    const handleReset = () => {
        if (category) {
            dispatch(setCategory(null));
            dispatch(setSubcategory(null));
            onBreadcrumbClick?.();
        }
    };

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
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
                        to={`${categoryRoute}`}
                        sx={{
                            '&:hover': {
                                color: 'lime.800',
                                textDecoration: 'none',
                            },
                        }}
                    >
                        {category}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {/* Подкатегория */}
            {subcategory && (
                <BreadcrumbItem isCurrentPage={!id}>
                    <BreadcrumbLink
                        onClick={handleSubcategoryClick}
                        as={Link}
                        to={`${categoryRoute}/${subcategoryRoute}`}
                        sx={{
                            color: !id ? 'black' : 'inherit',
                            pointerEvents: !id ? 'none' : 'auto',
                            '&:hover': {
                                color: 'lime.800',
                                textDecoration: 'none',
                            },
                        }}
                    >
                        {subcategory}
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
