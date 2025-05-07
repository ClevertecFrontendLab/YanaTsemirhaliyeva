import { Box, Flex, Hide } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { AppRoute, DataTestId } from '~/consts/consts';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipeByIdQuery, useGetRecipesQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    currentRecipeIdSelector,
    isFetching,
    setCategory,
    setRecipeTitle,
    setSubcategory,
} from '~/store/slices/recipes-slice';
import { getCategoriesFromDB, getCategoryAndSubcategoryFromUrl, saveCategoriesToDB } from '~/utils';

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
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const recipeId = useAppSelector(currentRecipeIdSelector);
    const isJuiciestFetching = useAppSelector(isFetching);
    const { data: categoriesData, isLoading: isCategoriesDataLoading } = useGetCategoriesQuery();
    const { isFetching: isRecipesLoading } = useGetRecipesQuery({ limit: 8, sortBy: 'createdAt' });
    const { isFetching: isJuiciestRecipesLoading } = useGetRecipesQuery({
        limit: 8,
        sortBy: 'likes',
        page: 1,
    });
    const { isFetching: isRecipeLoading } = useGetRecipeByIdQuery(recipeId ?? '', {
        skip: !recipeId,
    });

    const isDataLoading =
        isCategoriesDataLoading ||
        isRecipesLoading ||
        isRecipeLoading ||
        isJuiciestRecipesLoading ||
        isJuiciestFetching;

    useEffect(() => {
        if (categoriesData) {
            saveCategoriesToDB(categoriesData);
        }
    }, [categoriesData]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            const { category, subcategory, id, isValid } = await getCategoryAndSubcategoryFromUrl(
                location.pathname,
            );
            const { categories } = await getCategoriesFromDB();

            const excludedRoutes = [AppRoute.Index, AppRoute.Juicy, AppRoute.NotFound].map(String);
            if (excludedRoutes.includes(location.pathname)) return;

            if (!isValid) {
                navigate(AppRoute.NotFound, { replace: true });
                return;
            }

            if (id) {
                dispatch(setCategory(null));
                dispatch(setSubcategory(null));
                return;
            } else {
                dispatch(setRecipeTitle(null));
            }

            const validCategory = categories.find((cat) => cat.category === category?.category);
            if (!validCategory) {
                navigate(AppRoute.NotFound, { replace: true });
                return;
            }

            dispatch(setCategory(category));

            if (subcategory) {
                const validSubcategory = validCategory.subCategories?.find(
                    (sub) => sub.category === subcategory.category,
                );

                if (!validSubcategory) {
                    navigate(AppRoute.NotFound, { replace: true });
                    return;
                }

                dispatch(setSubcategory(subcategory));
            } else {
                const firstSubcategory = validCategory.subCategories?.[0];
                if (category && firstSubcategory) {
                    dispatch(setSubcategory(firstSubcategory));
                    navigate(`/${category.category}/${firstSubcategory.category}`, {
                        replace: true,
                    });
                }
            }
        };

        fetchCategoryData();
    }, [dispatch, location.pathname, navigate]);

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
            <LoaderFullsize isOpen={isDataLoading} />
            <AlertComponent />
        </Flex>
    );
};
