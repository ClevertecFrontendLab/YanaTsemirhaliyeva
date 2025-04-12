import { Box, Flex, List, ListItem, Show } from '@chakra-ui/react';

import {
    BookmarkIcon,
    BurgerMenuIcon,
    HappyFaceIcon,
    PeopleIcon,
    WriteDownRecipeIcon,
} from '~/shared/custom-icons';

import { ShadowIcon } from '../shadow-icon/ShadowIcon';

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
        <Show below='md'>
            <Flex
                alignItems='center'
                as='button'
                p={2}
                border='none'
                sx={{
                    transition: 'opacity 0.3s ease-in-out',
                    '&:hover': {
                        opacity: 0.7,
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                }}
            >
                <BurgerMenuIcon boxSize={6} />
            </Flex>
        </Show>
        <Show above='md'>
            <Flex
                boxSize='208px'
                alignItems='center'
                justifyContent='center'
                color='blackAlpha.700'
                pl={{ xl: 8 }}
            >
                <ShadowIcon
                    route='#'
                    title='Записать рецепт'
                    icon={<WriteDownRecipeIcon boxSize='48px' />}
                />
            </Flex>
        </Show>
    </Box>
);
