import { Box, Heading, HStack, IconButton, Show } from '@chakra-ui/react';

import { VerticalCard } from '~/components/vertical-card/VerticalCard';
import { NEW_RECIPES } from '~/consts/mocks';
import { ArrowRightIcon } from '~/shared/custom-icons';

export const NewRecipes = () => (
    <Box as='section' w='100%' boxSizing='border-box'>
        <Heading
            as='h2'
            fontSize={{ base: 24, sm: 36, xl: 48 }}
            fontFamily='inherit'
            fontWeight={500}
            mb={{ base: 3, sm: 6, xl: 5 }}
        >
            Новые рецепты
        </Heading>
        <Box pos='relative'>
            <HStack gap={{ base: 3, sm: 3, xl: '18px' }} alignItems='stretch' overflow='hidden'>
                {NEW_RECIPES.map((recipe) => (
                    <Box
                        minW={{
                            base: 'calc(48% - 8px)',
                            xs: 'calc(23% - 9px)',
                            sm: 'calc(33.5% - 17px)',
                            xl: 'calc(25% - 13px)',
                        }}
                        w={{ base: '158px', xs: '277px', xl: '322px' }}
                        minH='100%'
                        key={recipe.id}
                        pb='6px'
                    >
                        <VerticalCard item={recipe} />
                    </Box>
                ))}
                <Show above='md'>
                    <HStack
                        pos='absolute'
                        top='40%'
                        transform='translateY(-50%)'
                        justifyContent='space-between'
                        w='100%'
                        pointerEvents='none'
                    >
                        <IconButton
                            aria-label='left'
                            icon={
                                <ArrowRightIcon
                                    color='white'
                                    boxSize={6}
                                    sx={{ transform: 'rotate(180deg)' }}
                                />
                            }
                            bg='black'
                            pos='absolute'
                            left='-10px'
                            zIndex={1}
                            pointerEvents='all'
                            _hover={{ bg: 'blackAlpha.800', border: 'black' }}
                            _focus={{ outline: 'none' }}
                            boxSize={12}
                        />
                        <IconButton
                            aria-label='left'
                            icon={<ArrowRightIcon color='white' boxSize={6} />}
                            bg='black'
                            pos='absolute'
                            right='-10px'
                            zIndex={1}
                            pointerEvents='all'
                            _hover={{ bg: 'blackAlpha.800', border: 'black' }}
                            boxSize={12}
                        />
                    </HStack>
                </Show>
            </HStack>
        </Box>
    </Box>
);
