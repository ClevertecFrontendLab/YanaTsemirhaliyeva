import { Box, Flex, Hide } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { ALL_RECIPES } from '~/consts/all-recipes';
import {
    getCategoryAndSubcategoryFromUrl,
    getCategoryRoute,
    getSubcategoryRoute,
} from '~/consts/dictionary';
import { LIST_MENU } from '~/consts/menu-list';
import { useAppDispatch } from '~/store/hooks';
import { setCategory, setRecipeTitle, setSubcategory } from '~/store/slices/recipes-slice';

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
    const navigate = useNavigate();

    useEffect(() => {
        const { category, subcategory, id } = getCategoryAndSubcategoryFromUrl(location.pathname);

        if (id) {
            const recipe = ALL_RECIPES.find((recipe) => recipe.id === id);

            if (recipe) {
                dispatch(setRecipeTitle(recipe.title));
            } else {
                console.warn(`Recipe with ID ${id} not found.`);
            }

            dispatch(setCategory(null));
            dispatch(setSubcategory(null));

            return;
        } else {
            dispatch(setRecipeTitle(null));
        }

        if (category) {
            dispatch(setCategory(category));

            if (subcategory) {
                dispatch(setSubcategory(subcategory));
            } else if (category in LIST_MENU) {
                const categoryKey = category as keyof typeof LIST_MENU;
                const subcategories = LIST_MENU[categoryKey]?.subcategories;

                if (subcategories && subcategories.length > 0) {
                    const firstSubcategory = subcategories[0];

                    dispatch(setSubcategory(firstSubcategory));

                    const categoryPath = getCategoryRoute(category);
                    if (categoryPath) {
                        const subcategoryPath = getSubcategoryRoute(category, firstSubcategory);
                        if (subcategoryPath) {
                            navigate(`${categoryPath}/${subcategoryPath}`, { replace: true });
                        }
                    }
                }
            }
        }
    }, [dispatch, location.pathname, navigate]);

    return (
        <Flex flexDirection='column' h='100%' minH='100vh' w='100%' minW='360px'>
            <Header />
            <Hide breakpoint='(max-width: 1200px)'>
                <Flex
                    data-test-id='nav'
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
            <Box
                pos='fixed'
                left='0'
                bottom='0'
                w='100%'
                minW='360px'
                zIndex='2'
                data-test-id='footer'
                sx={{
                    '@media screen and (min-width: 1200px)': {
                        display: 'none',
                    },
                }}
            >
                <Footer />
            </Box>
        </Flex>
    );
};
