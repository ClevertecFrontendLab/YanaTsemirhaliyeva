import { Box, Flex, Link, List, ListItem, Show, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { AppRoute, DataTestId } from '~/consts/consts';
import {
    BookmarkIcon,
    HappyFaceIcon,
    PeopleIcon,
    WriteDownRecipeIcon,
} from '~/shared/custom-icons';

import { RECIPE_BUTTON_STYLES } from './styles';

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
        <Show above='md'>
            <Link
                as={RouterLink}
                to={AppRoute.NewRecipe}
                {...RECIPE_BUTTON_STYLES}
                flexDir='column'
                data-test-id={DataTestId.AddRecipeBtn}
            >
                <Flex className='icon-container'>
                    <WriteDownRecipeIcon boxSize='48px' />
                </Flex>
                <Text fontSize={12} color='blackAlpha.700'>
                    Записать рецепт
                </Text>
            </Link>
        </Show>
    </Box>
);
