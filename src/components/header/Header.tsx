import { Box, Flex, Image, Link, Show, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { useAppDispatch } from '~/store/hooks';
import { setCategory, setSubcategory } from '~/store/slices/category-slice';

import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';
import { User } from '../user/User';
import { UserNav } from '../user-nav/UserNav';

export const Header = () => {
    const dispatch = useAppDispatch();
    const isMdOrAbove = useBreakpointValue({ base: false, md: true });

    const handleReset = () => {
        dispatch(setCategory(null));
        dispatch(setSubcategory(null));
    };

    return (
        <Box
            as='header'
            bgColor='lime.50'
            pos='fixed'
            top='0'
            left='0'
            width='100%'
            minW='360px'
            zIndex='2'
            data-test-id='header'
        >
            <Flex
                m='0 auto'
                alignItems='center'
                p={{ base: '14px 18px', sm: '16px 56px 16px 18px' }}
                pr={{ '2xs': 6, md: '76px' }}
            >
                <Link
                    as={RouterLink}
                    to='/'
                    w={{ base: '34px', '2xs': '135px' }}
                    h='auto'
                    mr={{ md: '128px' }}
                    onClick={handleReset}
                >
                    <Show above='2xs'>
                        <Image src='./logo-full.svg' alt='logo' />
                    </Show>
                    <Show below='2xs'>
                        <Image src='./logo.svg' alt='logo' />
                    </Show>
                </Link>
                {isMdOrAbove && <Breadcrumbs />}
                <Spacer />
                <Show above='md'>
                    <User />
                </Show>
                <Show below='md'>
                    <UserNav />
                </Show>
            </Flex>
        </Box>
    );
};
