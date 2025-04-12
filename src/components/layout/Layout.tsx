import { Box, Flex, Hide, Show } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';

import { AppRoutes, LIST_MENU } from '~/consts/menu-list';
import { useAppDispatch } from '~/store/hooks';
import { setCategory, setSubcategory } from '~/store/slices/category-slice';

import { AccordionMenu } from '../accordion-menu/AccordionMenu';
import { Footer } from '../footer/Footer';
import { FooterAside } from '../footer-aside/FooterAside';
import { Header } from '../header/Header';
import { UserNav } from '../user-nav/UserNav';

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const category = AppRoutes[pathParts[1] as keyof typeof AppRoutes];

        if (category) {
            dispatch(setCategory(category));

            const subcategories = LIST_MENU[category as keyof typeof LIST_MENU]?.subcategories;
            if (subcategories && subcategories.length > 0) {
                dispatch(setSubcategory(subcategories[0]));
            } else {
                dispatch(setSubcategory(null));
            }
        } else {
            dispatch(setCategory(null));
            dispatch(setSubcategory(null));
        }
    }, [location.pathname, dispatch]);

    return (
        <Flex flexDirection='column' h='100%' minH='100vh' w='100%' minW='360px'>
            <Header />
            <Hide breakpoint='(max-width: 1200px)'>
                <Flex
                    as='aside'
                    flexDirection='column'
                    justifyContent='space-between'
                    w='256px'
                    h='100vh'
                    pos='fixed'
                    left='0'
                    pt='106px'
                >
                    <AccordionMenu />
                    <FooterAside />
                </Flex>
            </Hide>
            <Box
                as='main'
                pt={{ base: '82px', sm: '108px' }}
                ml={{ base: '0', md: '256px' }}
                mr={{ base: 0, md: '208px' }}
                pb={{ base: '110px', md: 2 }}
            >
                {children}
            </Box>
            <Hide breakpoint='(max-width: 1200px)'>
                <Box w='208px' h='100vh' pos='fixed' right='0' pt='72px'>
                    <UserNav />
                </Box>
            </Hide>
            <Show below='md'>
                <Box
                    pos='fixed'
                    left='0'
                    bottom='0'
                    w='100%'
                    minW='360px'
                    zIndex='2'
                    data-test-id='footer'
                >
                    <Footer />
                </Box>
            </Show>
        </Flex>
    );
};
