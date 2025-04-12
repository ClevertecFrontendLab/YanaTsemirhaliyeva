import { Box, Divider, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { NarrowCard } from '../narrow-card/NarrowCard';
import { SimpleCard } from '../simple-card/SimpleCard';

type CategoryHighlightProps = {
    title: string;
    desc: string;
    recipes: {
        id: number;
        title: string;
        desc: string;
        img?: string;
        tag: {
            icon: string;
            name: string;
        };
        bookmark?: number;
        likes?: number;
    }[];
    headings: {
        id: number;
        title: string;
        icon: ReactNode;
    }[];
    isDivider?: boolean;
};

export const CategoryHighlight = ({
    title,
    desc,
    recipes,
    headings,
    isDivider = false,
}: CategoryHighlightProps) => (
    <Box as='section'>
        {isDivider && <Divider />}
        <Grid
            templateColumns={{ xs: 'repeat(3, minmax(0, 1fr))', xl: 'repeat(2, minmax(0, 1fr))' }}
            columnGap={{ base: '10px', sm: '18px', xl: 4 }}
            rowGap={{ base: 1, sm: 6, xl: 4 }}
            mt={{ base: 1, sm: 6 }}
        >
            <Heading
                as='h2'
                fontSize={{ base: 24, sm: 36, xl: 48 }}
                lineHeight={{ base: '40px', xl: '56px' }}
                fontFamily='inherit'
                fontWeight={500}
            >
                {title}
            </Heading>
            <Text
                fontWeight={500}
                color='blackAlpha.700'
                pl={{ sm: 1 }}
                pt={{ xs: 0, xl: 1 }}
                gridColumn={{ xs: '1/4', sm: '2/4', xl: '2/3' }}
                gridRow={{ xs: '2/3', sm: '1/2' }}
                fontSize={{ base: 14, sm: 16 }}
                lineHeight={{ base: '21px', xs: '22px', sm: '156%' }}
                mb={{ base: '10px', sm: 0 }}
            >
                {desc}
            </Text>
            <Grid
                templateColumns={{ xs: 'repeat(2, 1fr)' }}
                gap={{ base: 2, sm: 4, xl: 5 }}
                gridColumn={{ xs: '1/3', xl: '1/2' }}
                gridRow={{ xs: '3/4', sm: '2/3' }}
                mb={{ base: '10px', xs: '0' }}
            >
                {recipes.map((item) => (
                    <SimpleCard key={item.id} item={item} />
                ))}
            </Grid>
            <Flex
                flexDir='column'
                gap={{ base: 2, sm: '14px', md: '10px', xl: 3 }}
                gridColumn={{ xs: '3/4', xl: '2/3' }}
                gridRow={{ xs: '3/4', sm: '2/3' }}
            >
                {headings.map((item) => (
                    <NarrowCard key={item.id} title={item.title} icon={item.icon} />
                ))}
            </Flex>
        </Grid>
    </Box>
);
