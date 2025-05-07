import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CategoryHighlight } from '~/components/category-highlight/CategoryHighlight';
import { Intro } from '~/components/intro/Intro';
import { TabsComponent } from '~/components/tabs/Tabs';
import { useAppSelector } from '~/store/hooks';
import { currentCategorySelector } from '~/store/slices/recipes-slice';
import { Category } from '~/types/category';
import { getCategoriesFromDB } from '~/utils';

export const CategoryCuisine = () => {
    const currentCategory = useAppSelector(currentCategorySelector);
    const [fullCategory, setFullCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            const storedCategories = await getCategoriesFromDB();
            const categoryData = storedCategories.categories.find(
                (cat) => cat.category === currentCategory?.category,
            );
            setFullCategory(categoryData || null);
        };

        fetchCategoryDetails();
    }, [currentCategory?.category]);

    if (!fullCategory) return null;

    return (
        <Box>
            <Box
                m={{
                    base: '0 auto 22px',
                    '2xs': '0 auto 28px',
                    md: '0 auto 30px',
                    xl: '0 auto 32px',
                }}
                maxW={{ base: '500px', '2xs': '100%', md: '850px' }}
                pl={{ base: '18px', xs: '20px', sm: '28px' }}
                pr={{ base: '18px', sm: '54px', md: '70px' }}
            >
                <Intro title={fullCategory.title} desc={fullCategory.description} />
            </Box>
            <Box mb={7}>
                <TabsComponent />
            </Box>
            <Box
                pl={{ base: '18px', xs: '20px', sm: '28px' }}
                pr={{ base: '20px', sm: '54px', md: '70px' }}
            >
                <Box
                    pl={{ base: '18px', xs: '20px', sm: '28px' }}
                    pr={{ base: '20px', sm: '54px', md: '70px' }}
                >
                    <CategoryHighlight isDivider />
                </Box>
            </Box>
        </Box>
    );
};
