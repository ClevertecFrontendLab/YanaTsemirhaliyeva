import { Avatar, Box, ListItem, UnorderedList } from '@chakra-ui/react';

import { HomeIcon, SearchIcon, WriteIcon } from '~/shared/custom-icons';

import { ShadowIcon } from '../shadow-icon/ShadowIcon';

export const Footer = () => (
    <Box as='footer' bgColor='limeAlpha.50' py={1} data-test-id='footer'>
        <UnorderedList
            listStyleType='none'
            display='grid'
            gridTemplateColumns='repeat(4, 1fr)'
            color='blackAlpha.700'
        >
            <ListItem>
                <ShadowIcon route='/' title='Главная' icon={<HomeIcon boxSize='40px' />} />
            </ListItem>
            <ListItem>
                <ShadowIcon route='#' title='Поиск' icon={<SearchIcon boxSize='24px' />} />
            </ListItem>
            <ListItem>
                <ShadowIcon route='#' title='Записать' icon={<WriteIcon boxSize='24px' />} />
            </ListItem>
            <ListItem>
                <ShadowIcon
                    route='#'
                    title='Мой профиль'
                    icon={<Avatar size='md' src='./img/avatar.jpg' />}
                />
            </ListItem>
        </UnorderedList>
    </Box>
);
