import { Avatar, Box, ListItem, UnorderedList } from '@chakra-ui/react';

import AvatarImg from '~/assets/img/avatar.jpg';
import { AppRoute, DataTestId } from '~/consts/consts';
import { HomeIcon, SearchIcon, WriteIcon } from '~/shared/custom-icons';

import { ShadowIcon } from '../shadow-icon/ShadowIcon';

export const Footer = () => (
    <Box as='footer' bgColor='lime.50' py={1}>
        <UnorderedList
            listStyleType='none'
            display='grid'
            gridTemplateColumns='repeat(4, 1fr)'
            color='blackAlpha.700'
            m={0}
        >
            <ListItem>
                <ShadowIcon
                    route={AppRoute.Index}
                    title='Главная'
                    icon={<HomeIcon boxSize='40px' />}
                />
            </ListItem>
            <ListItem>
                <ShadowIcon route='#' title='Поиск' icon={<SearchIcon boxSize='24px' />} />
            </ListItem>
            <ListItem>
                <ShadowIcon
                    data-test-id={DataTestId.AddRecipeBtn}
                    route={AppRoute.NewRecipe}
                    title='Записать'
                    icon={<WriteIcon boxSize='24px' />}
                />
            </ListItem>
            <ListItem>
                <ShadowIcon
                    route='#'
                    title='Мой профиль'
                    icon={<Avatar size='md' src={AvatarImg} />}
                />
            </ListItem>
        </UnorderedList>
    </Box>
);
