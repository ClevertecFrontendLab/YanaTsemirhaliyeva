import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useAppSelector } from '~/store/hooks';
import { currentCategorySelector, currentSubcategorySelector } from '~/store/slices/category-slice';

export const Breadcrumbs = () => {
    const category = useAppSelector(currentCategorySelector);
    const subcategory = useAppSelector(currentSubcategorySelector);

    return (
        <Breadcrumb separator={<ChevronRightIcon color='black' />} color='blackAlpha.700'>
            {/* Главная */}
            <BreadcrumbItem>
                <BreadcrumbLink
                    as={Link}
                    to='/'
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

            {/* Категория */}
            {category && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={Link}
                        to='/vegan-cuisine'
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
                <BreadcrumbItem isCurrentPage color='black'>
                    <BreadcrumbLink>{subcategory}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
