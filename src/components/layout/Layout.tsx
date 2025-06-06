import { Box, Flex, Hide } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';

import { AppRoute, DataTestId } from '~/consts/consts';
import { useCategoryData } from '~/hooks/use-category-data';
import { checkAuthTokenForComponent } from '~/query/baseQueryWithReauth';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { alertStatusSelector } from '~/store/slices/alert-slice';
import { isAuthorizedSelector, isSubmitingFormSelector } from '~/store/slices/auth-slice';
import { setCategories, setSubCategories } from '~/store/slices/categories-slice';
import { saveCategoriesToDB } from '~/utils';

import { AccordionMenu } from '../accordion-menu/AccordionMenu';
import { AlertComponent } from '../alert/Alert';
import { Footer } from '../footer/Footer';
import { FooterAside } from '../footer-aside/FooterAside';
import { Header } from '../header/Header';
import { LoaderFullsize } from '../loader-fullsize/LoaderFullsize';
import { UserNav } from '../user-nav/UserNav';

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(isAuthorizedSelector);
    const isAuthDataLoading = useAppSelector(isSubmitingFormSelector);
    const alertProps = useAppSelector(alertStatusSelector);

    useEffect(() => {
        checkAuthTokenForComponent(dispatch);
    }, [dispatch]);

    const { data: categoriesData } = useGetCategoriesQuery(undefined, { skip: !isAuthorized });

    useEffect(() => {
        if (categoriesData) {
            saveCategoriesToDB(categoriesData);
            dispatch(setCategories(categoriesData.categories));
            dispatch(setSubCategories(categoriesData.subCategories));
        }
    }, [categoriesData, dispatch]);

    useCategoryData();

    const isAuthPage = [
        AppRoute.Login,
        AppRoute.Register,
        AppRoute.ForgotPassword,
        AppRoute.VerifyOTP,
        AppRoute.ResetPassword,
        AppRoute.Verification,
    ].includes(location.pathname as AppRoute);

    if (isAuthPage) {
        return (
            <Flex flexDirection='column' minH='100vh' w='100%' minW='359px'>
                <Box as='main' display='flex' flexDir='column' flexGrow={1} h='100%'>
                    {children}
                </Box>
                <LoaderFullsize isLoading={isAuthDataLoading} zIndex={1500} />
            </Flex>
        );
    }

    return (
        <Flex flexDirection='column' h='100%' minH='100vh' w='100%' minW='359px'>
            <Header />
            <Hide breakpoint='(max-width: 1200px)'>
                <Flex
                    data-test-id={DataTestId.Nav}
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
                display='flex'
                flexDir='column'
                flexGrow={1}
            >
                {children}
            </Box>
            {location.pathname !== AppRoute.NewRecipe &&
                !location.pathname.startsWith('/edit-recipe') && (
                    <Hide breakpoint='(max-width: 1200px)'>
                        <Box w='208px' h='100vh' pos='fixed' right='0' pt='72px'>
                            <UserNav />
                        </Box>
                    </Hide>
                )}
            <Box
                pos='fixed'
                left='0'
                bottom='0'
                w='100%'
                minW='359px'
                zIndex='2'
                data-test-id={DataTestId.Footer}
                sx={{
                    '@media screen and (min-width: 1200px)': {
                        display: 'none',
                    },
                }}
            >
                <Footer />
            </Box>
            <AlertComponent
                title={alertProps.title}
                status={alertProps.status}
                desc={alertProps.desc}
                hasFooter
            />
        </Flex>
    );
};
