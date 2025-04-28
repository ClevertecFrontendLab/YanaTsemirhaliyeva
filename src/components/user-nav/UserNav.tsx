import { Box, Flex, List, ListItem, Show, Text, VStack } from '@chakra-ui/react';

import {
    BookmarkIcon,
    HappyFaceIcon,
    PeopleIcon,
    WriteDownRecipeIcon,
} from '~/shared/custom-icons';

export const UserNav = () => (
    <Box
        as='nav'
        display='flex'
        flexDirection={{ md: 'column' }}
        justifyContent='space-between'
        h='100%'
    >
        <List
            spacing={{ md: 10 }}
            gap={{ base: '14px', md: 0 }}
            display='flex'
            flexDirection={{ base: 'row', md: 'column' }}
            alignItems={{ base: 'center' }}
            p={{ base: 2, md: 8 }}
            px={{ md: 6 }}
            fontSize={{ base: 12, md: 16 }}
            mr={{ base: 4, '2xs': 5, md: 0 }}
            ml={{ xl: 10 }}
        >
            <ListItem>
                <Box as='button' display='flex' alignItems='center' gap={2} border='none'>
                    <BookmarkIcon />
                    <Box as='span' color='lime.600' fontWeight='600'>
                        185
                    </Box>
                </Box>
            </ListItem>
            <ListItem>
                <Box as='button' display='flex' alignItems='center' gap={2} border='none'>
                    <PeopleIcon />
                    <Box as='span' color='lime.600' fontWeight='600'>
                        589
                    </Box>
                </Box>
            </ListItem>
            <ListItem>
                <Box as='button' display='flex' alignItems='center' gap={2} border='none'>
                    <HappyFaceIcon />
                    <Box as='span' color='lime.600' fontWeight='600'>
                        587
                    </Box>
                </Box>
            </ListItem>
        </List>
        {/* <Box
            sx={{
                '@media screen and (min-width: 1200px)': {
                    display: 'none',
                },
            }}
        >
            <BurgerMenu />
        </Box> */}
        <Show above='md'>
            <VStack
                gap={3}
                boxSize='208px'
                alignItems='center'
                justifyContent='center'
                color='blackAlpha.700'
                pl={{ xl: 8 }}
                as='button'
                _hover={{ borderColor: 'transparent' }}
                _focus={{ outline: 'none' }}
                sx={{
                    textDecoration: 'none',
                    color: 'black',
                    '& .icon-container': {
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            borderRadius: '50%',
                            boxShadow: '0 0 40px 10px rgba(196, 255, 97, 0.6)',
                            zIndex: -1,
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '-20px',
                            left: '-40px',
                            right: '-40px',
                            bottom: '-40px',
                            borderRadius: '50%',
                            background:
                                'radial-gradient(circle, rgba(196, 255, 97, 0.3) 0%, rgba(255, 255, 255, 0) 100%)', // Радиальный градиент
                            zIndex: -1,
                        },
                    },
                }}
            >
                <Flex className='icon-container'>
                    <WriteDownRecipeIcon boxSize='48px' />
                </Flex>
                <Text fontSize={12} color='blackAlpha.700'>
                    Записать рецепт
                </Text>
            </VStack>
        </Show>
    </Box>
);
