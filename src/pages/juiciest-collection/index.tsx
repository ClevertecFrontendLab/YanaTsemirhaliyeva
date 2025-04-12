import { Box, Button, Grid } from '@chakra-ui/react';

import { CategoryHighlight } from '~/components/category-highlight/CategoryHighlight';
import { HorizontalCard } from '~/components/horizontal-card/HorizontalCard';
import { Intro } from '~/components/intro/Intro';

import { JUICY_LIST, VEGAN_HEADINGS, VEGAN_HIGHLIGHTS } from './mocks';

export const JuiciestCollection = () => (
    <Box
        pl={{ base: '16px', xs: '20px', sm: '28px' }}
        pr={{ base: '20px', sm: '54px', md: '70px' }}
    >
        <Box
            m={{ base: '0 auto 30px', xs: '0 auto 36px', md: '0 auto 32px' }}
            maxW={{ base: '500px', sm: '700px' }}
        >
            <Intro title='Самое сочное' />
        </Box>
        <Grid
            templateColumns={{
                base: '1fr',
                '2xs': 'repeat(2, 1fr)',
                md: '1fr',
                xl: 'repeat(2, 1fr)',
            }}
            rowGap={{ base: 4, md: '14px' }}
            columnGap='24px'
            alignItems='stretch'
            autoRows='1fr'
        >
            {JUICY_LIST.map((item) => (
                <HorizontalCard key={item.id} item={item} />
            ))}
        </Grid>
        <Box textAlign='center' mt='14px' mb={10}>
            <Button
                bgColor='lime.400'
                size='md'
                m='0 auto'
                border='none'
                sx={{
                    '&:focus': {
                        outline: 'none',
                    },
                    '&:hover': {
                        bgColor: 'lime.300',
                    },
                    '&:active': {
                        bgColor: 'lime.150',
                    },
                }}
            >
                Загрузить ещё
            </Button>
        </Box>
        <CategoryHighlight
            title='Веганская кухня'
            desc='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            recipes={VEGAN_HIGHLIGHTS}
            headings={VEGAN_HEADINGS}
            isDivider
        />
    </Box>
);
