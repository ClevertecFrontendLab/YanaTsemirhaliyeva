import { Box, VStack } from '@chakra-ui/react';

import { CategoryHighlight } from '~/components/category-highlight/CategoryHighlight';
import { CulinaryBlogList } from '~/components/culinary-blog-list/CulinaryBlogList';
import { HelmetComponent } from '~/components/helmet-component/HelmetComponent';
import { Intro } from '~/components/intro/Intro';
import { JuiciestList } from '~/components/juiciest-list/JuiciestList';
import { LoaderFullsize } from '~/components/loader-fullsize/LoaderFullsize';
import { NewRecipes } from '~/components/new-recipes/NewRecipes';
import { PAGE_META } from '~/consts/page-meta';
import { useAppSelector } from '~/store/hooks';
import {
    isBloggersFetchingSelector,
    isJuiciestFetchingSelector,
    isRelevantFetchingSelector,
    isSliderFetchingSelector,
} from '~/store/slices/recipes-slice';

export const Home = () => {
    const isJuiciestFetching = useAppSelector(isJuiciestFetchingSelector);
    const isSliderFetching = useAppSelector(isSliderFetchingSelector);
    const isRelevantFetching = useAppSelector(isRelevantFetchingSelector);
    const isBlogsFetchings = useAppSelector(isBloggersFetchingSelector);

    const isDataLoading =
        isSliderFetching || isJuiciestFetching || isRelevantFetching || isBlogsFetchings;

    return (
        <>
            <HelmetComponent {...PAGE_META.Home} />
            <Box
                pl={{ base: '16px', xs: '20px', sm: '28px' }}
                pr={{ xs: '20px', sm: '54px', md: '70px' }}
            >
                <Box
                    m={{ base: '0 auto', xs: '0 auto 4px', sm: '0 auto 24px', lg: '0 auto 20px' }}
                    maxW={{ base: '500px', sm: '700px' }}
                    pr={{ base: 4, '2xs': 0 }}
                >
                    <Intro title='Приятного аппетита!' />
                </Box>
                <VStack gap={{ base: '34px', sm: 10, md: 9 }} alignItems='stretch'>
                    <Box pr={{ base: 3 }} px={{ md: 3 }}>
                        <NewRecipes />
                    </Box>
                    <Box pr={{ base: '16px', xs: '0' }}>
                        <JuiciestList />
                    </Box>
                    <Box pr={{ base: '16px', xs: '0' }}>
                        <CulinaryBlogList />
                    </Box>
                    <Box pr={{ base: '16px', xs: '0' }}>
                        <CategoryHighlight isDivider />
                    </Box>
                </VStack>
                <LoaderFullsize isLoading={isDataLoading} />
            </Box>
        </>
    );
};
