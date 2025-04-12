import { Box, Button, Grid, Heading, HStack, Show, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router';

import { HorizontalCard } from '~/components/horizontal-card/HorizontalCard';
import { JUICIEST_LIST } from '~/consts/mocks';
import { ArrowRightIcon } from '~/shared/custom-icons';

export const JuiciestList = () => (
    <Box as='section'>
        <HStack mb={{ base: '10px', xs: 4, sm: 3, lg: 4 }}>
            <Heading
                as='h2'
                fontSize={{ base: 24, sm: 36, xl: 48 }}
                fontFamily='inherit'
                fontWeight={500}
            >
                Самое сочное
            </Heading>
            <Spacer />
            <Show above='md'>
                <Button
                    as={Link}
                    to='/juiciest-collection'
                    data-test-id='juiciest-link'
                    rightIcon={<ArrowRightIcon />}
                    bgColor='lime.400'
                    size={{ sm: 'md', xl: 'lg' }}
                    border='none'
                    sx={{
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:hover': {
                            bgColor: 'lime.300',
                            color: 'black',
                        },
                        '&:active': {
                            bgColor: 'lime.150',
                        },
                    }}
                >
                    Вся подборка
                </Button>
            </Show>
        </HStack>
        <Grid
            templateColumns={{ base: '1fr', xs: 'repeat(2, 1fr)', sm: '1fr', xl: 'repeat(2, 1fr)' }}
            gap={{ base: 3, xs: '14px', sm: '14px', xl: 5 }}
            alignItems='stretch'
            autoRows='1fr'
        >
            {JUICIEST_LIST.map((item) => (
                <HorizontalCard item={item} key={item.id} />
            ))}
        </Grid>
        <Box textAlign='center' mt='10px'>
            <Button
                as={Link}
                to='/juiciest-collection'
                data-test-id='juiciest-link-mobile'
                rightIcon={<ArrowRightIcon />}
                bgColor='lime.400'
                size='md'
                m='0 auto'
                border='none'
                sx={{
                    display: { base: 'inline-flex', md: 'none' },
                    '&:focus': {
                        outline: 'none',
                    },
                    '&:hover': {
                        bgColor: 'lime.300',
                        color: 'black',
                    },
                    '&:active': {
                        bgColor: 'lime.150',
                    },
                }}
            >
                Вся подборка
            </Button>
        </Box>
    </Box>
);
