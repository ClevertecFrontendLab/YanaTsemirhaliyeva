import { Box } from '@chakra-ui/react';

import { CategoryHighlight } from '~/components/category-highlight/CategoryHighlight';
import { Intro } from '~/components/intro/Intro';
import { TabsComponent } from '~/components/tabs/Tabs';

import { DESERT_HEADINGS, DESERT_HIGHLIGHTS } from './mocks';

export const VeganCuisine = () => (
    <Box>
        <Box
            m={{ base: '0 auto 22px', '2xs': '0 auto 28px', md: '0 auto 30px', xl: '0 auto 32px' }}
            maxW={{ base: '500px', '2xs': '100%', md: '850px' }}
            pl={{ base: '18px', xs: '20px', sm: '28px' }}
            pr={{ base: '18px', sm: '54px', md: '70px' }}
        >
            <Intro
                title='Веганская кухня'
                desc='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
        </Box>
        <Box mb={7}>
            <TabsComponent />
        </Box>
        <Box
            pl={{ base: '18px', xs: '20px', sm: '28px' }}
            pr={{ base: '20px', sm: '54px', md: '70px' }}
        >
            <CategoryHighlight
                title='Десерты, выпечка'
                desc='Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.'
                recipes={DESERT_HIGHLIGHTS}
                headings={DESERT_HEADINGS}
                isDivider
            />
        </Box>
    </Box>
);
