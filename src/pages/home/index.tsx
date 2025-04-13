import { Box, VStack } from '@chakra-ui/react';

import { CategoryHighlight } from '~/components/category-highlight/CategoryHighlight';
import { CulinaryBlogList } from '~/components/culinary-blog-list/CulinaryBlogList';
import { Intro } from '~/components/intro/Intro';
import { JuiciestList } from '~/components/juiciest-list/JuiciestList';
import { NewRecipes } from '~/components/new-recipes/NewRecipes';

import { VEGAN_HEADINGS, VEGAN_HIGHLIGHTS } from './mocks';

export const Home = () => (
    <Box pl={{ base: '16px', xs: '20px', sm: '28px' }} pr={{ xs: '20px', sm: '54px', md: '70px' }}>
        <Box
            m={{ base: '0 auto 30px', xs: '0 auto 36px', sm: '0 auto 56px', lg: '0 auto 52px' }}
            maxW={{ base: '500px', sm: '700px' }}
            pr={{ base: 4, '2xs': 0 }}
        >
            <Intro title='Приятного аппетита!' />
        </Box>
        <VStack gap={{ base: '34px', sm: 10, md: 9 }}>
            <NewRecipes />
            <Box pr={{ base: '16px', xs: '0' }}>
                <JuiciestList />
            </Box>
            <Box pr={{ base: '16px', xs: '0' }}>
                <CulinaryBlogList />
            </Box>
            <Box pr={{ base: '16px', xs: '0' }}>
                <CategoryHighlight
                    title='Веганская кухня'
                    desc='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                    recipes={VEGAN_HIGHLIGHTS}
                    headings={VEGAN_HEADINGS}
                    isDivider
                />
            </Box>
        </VStack>
    </Box>
);
