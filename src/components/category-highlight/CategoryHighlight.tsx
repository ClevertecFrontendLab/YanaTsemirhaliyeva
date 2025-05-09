import { Box, Divider, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { useGetRecipesByCategoryQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import { currentCategorySelector, setError } from '~/store/slices/recipes-slice';
import { Category } from '~/types/category';

import { NarrowCard } from '../narrow-card/NarrowCard';
import { SimpleCard } from '../simple-card/SimpleCard';

const LIMIT_CARDS_VALUE = 5;

type CategoryHighlightProps = {
    isDivider?: boolean;
};

export const CategoryHighlight = ({ isDivider = false }: CategoryHighlightProps) => {
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(currentCategorySelector);
    const categories = useAppSelector(categoriesSelector);
    const [randomCategory, setRandomCategory] = useState<Category | null>(null);

    const randomCategoryRef = useRef<Category | null>(null);

    useEffect(() => {
        if (!categories.length) return;
        let newRandomCategory = randomCategoryRef.current;
        do {
            const randomIndex = Math.floor(Math.random() * categories.length);
            newRandomCategory = categories[randomIndex];
        } while (newRandomCategory?.category === currentCategory?.category);

        randomCategoryRef.current = newRandomCategory;
        setRandomCategory(newRandomCategory);
    }, [currentCategory?.category, categories]);

    const { data, isError } = useGetRecipesByCategoryQuery(
        {
            subCategoryId: randomCategory?.subCategories[0]?._id ?? '',
            limit: LIMIT_CARDS_VALUE,
        },
        {
            skip: !randomCategory?.subCategories[0]?._id,
        },
    );

    useEffect(() => {
        if (isError) {
            dispatch(setError(true));
        }
    }, [dispatch, isError]);

    if (!randomCategory || !data?.data) return null;
    const recipesLeft = [...data.data].slice(0, 2);
    const recipesRight = [...data.data].slice(2, 5);

    return (
        <Box as='section'>
            {isDivider && <Divider />}
            <Grid
                templateColumns={{
                    xs: 'repeat(3, minmax(0, 1fr))',
                    xl: 'repeat(2, minmax(0, 1fr))',
                }}
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
                    {randomCategory.title}
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
                    {randomCategory.description}
                </Text>
                <Grid
                    templateColumns={{ xs: 'repeat(2, 1fr)' }}
                    gap={{ base: 2, sm: 4, xl: 5 }}
                    gridColumn={{ xs: '1/3', xl: '1/2' }}
                    gridRow={{ xs: '3/4', sm: '2/3' }}
                    mb={{ base: '10px', xs: '0' }}
                >
                    {recipesLeft.length > 0 &&
                        recipesLeft.map((item, i) => <SimpleCard key={i} item={{ ...item }} />)}
                </Grid>
                <Flex
                    flexDir='column'
                    gap={{ base: 2, sm: '14px', md: '10px', xl: 3 }}
                    gridColumn={{ xs: '3/4', xl: '2/3' }}
                    gridRow={{ xs: '3/4', sm: '2/3' }}
                    justifyContent='space-between'
                >
                    {recipesRight.length > 0 &&
                        recipesRight.map((item, i) => (
                            <NarrowCard
                                key={i}
                                title={item.title}
                                categoriesIds={item.categoriesIds}
                            />
                        ))}
                </Flex>
            </Grid>
        </Box>
    );
};
