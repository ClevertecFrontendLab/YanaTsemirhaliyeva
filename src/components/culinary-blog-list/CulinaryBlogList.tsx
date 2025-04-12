import { Box, Button, Grid, Heading, HStack, Show, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router';

import { CULINARY_BLOGS } from '~/consts/mocks';
import { ArrowRightIcon } from '~/shared/custom-icons';

import { CulinaryBlogItem } from '../culinary-blog-item/CulinaryBlogItem';

export const CulinaryBlogList = () => (
    <Box
        as='section'
        bgColor='lime.400'
        borderRadius={12}
        p={{ base: 3, sm: 6 }}
        pr={{ base: 1, sm: 4, lg: 6 }}
        pt={{ xs: 4, sm: 3, lg: 6 }}
    >
        <HStack pr={2} mb={{ base: 3, sm: 4 }}>
            <Heading
                as='h2'
                fontSize={{ base: 24, sm: 30, xl: 36 }}
                fontFamily='inherit'
                fontWeight={400}
                mb={{ sm: 1, xl: 4 }}
            >
                Кулинарные блоги
            </Heading>
            <Show above='sm'>
                <Spacer />
                <Button
                    as={Link}
                    to='#'
                    rightIcon={<ArrowRightIcon />}
                    bgColor='lime.400'
                    fontSize={{ sm: 16, xl: 18 }}
                    fontWeight={600}
                    border='none'
                    lineHeight='156%'
                    sx={{
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:hover': {
                            bgColor: 'inherit',
                            color: 'blackAlpha.700',
                        },
                        '&:active': {
                            bgColor: 'inherit',
                        },
                    }}
                >
                    Все авторы
                </Button>
            </Show>
        </HStack>
        <Grid
            templateColumns={{ xs: 'repeat(3, 1fr)' }}
            gap={{ base: '13px', xs: 4 }}
            pr={{ base: 2, lg: 0 }}
            alignItems='stretch'
            autoRows='1fr'
        >
            {CULINARY_BLOGS.map((item) => (
                <CulinaryBlogItem item={item} key={item.id} />
            ))}
        </Grid>
        <Show below='sm'>
            <Box textAlign='center' mt={3}>
                <Button
                    as={Link}
                    to='#'
                    rightIcon={<ArrowRightIcon />}
                    bgColor='lime.400'
                    fontSize={{ sm: 16, lg: 18 }}
                    fontWeight={600}
                    border='none'
                    lineHeight='156%'
                    sx={{
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:hover': {
                            bgColor: 'inherit',
                            color: 'blackAlpha.700',
                        },
                        '&:active': {
                            bgColor: 'inherit',
                        },
                    }}
                >
                    Все авторы
                </Button>
            </Box>
        </Show>
    </Box>
);
