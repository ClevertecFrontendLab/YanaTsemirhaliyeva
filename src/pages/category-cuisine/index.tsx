import { Box } from '@chakra-ui/react';

import { CategoryHighlight } from '~/components/category-highlight/CategoryHighlight';
import { Intro } from '~/components/intro/Intro';
import { LoaderFullsize } from '~/components/loader-fullsize/LoaderFullsize';
import { TabsComponent } from '~/components/tabs/Tabs';
import { useAppSelector } from '~/store/hooks';
import {
    currentCategorySelector,
    isCategoryCuisineDataFetchingSelector,
    isRelevantFetchingSelector,
} from '~/store/slices/recipes-slice';

export const CategoryCuisine = () => {
    const currentCategory = useAppSelector(currentCategorySelector);
    const isCategoryCuisineDataFetching = useAppSelector(isCategoryCuisineDataFetchingSelector);
    const isRelevantFetching = useAppSelector(isRelevantFetchingSelector);
    const isDataLoading = isRelevantFetching || isCategoryCuisineDataFetching;

    if (!currentCategory) return null;

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
                <Intro title={currentCategory.title} desc={currentCategory.description} />
            </Box>
            <Box mb={7}>
                <TabsComponent />
            </Box>
            <Box
                pl={{ base: '18px', xs: '20px', sm: '28px' }}
                pr={{ base: '20px', sm: '54px', md: '70px' }}
            >
                <CategoryHighlight isDivider />
            </Box>
            <LoaderFullsize isLoading={isDataLoading} />
        </Box>
    );
};
