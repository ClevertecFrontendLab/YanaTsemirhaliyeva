import { Box, Flex, Hide } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';

import { DataTestId, DEFAULT_CARDS_PER_PAGE, DEFAULT_PAGE } from '~/consts/consts';
import { useCategoryData } from '~/hooks/use-category-data';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipeByIdQuery, useGetRecipesQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setCategories, setSubCategories } from '~/store/slices/categories-slice';
import { currentRecipeIdSelector, isFetching } from '~/store/slices/recipes-slice';
import { saveCategoriesToDB } from '~/utils';

import { AccordionMenu } from '../accordion-menu/AccordionMenu';
import { AlertComponent } from '../alert/Alert';
import { Footer } from '../footer/Footer';
import { FooterAside } from '../footer-aside/FooterAside';
import { Header } from '../header/Header';
import { LoaderFullsize } from '../loader-fullsize/LoaderFullsize';
import { UserNav } from '../user-nav/UserNav';

const DEFAULT_SWIPER_SLIDES_COUNT = 10;

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const dispatch = useAppDispatch();
    const recipeId = useAppSelector(currentRecipeIdSelector);
    const isJuiciestFetching = useAppSelector(isFetching);
    const { data: categoriesData, isLoading: isCategoriesDataLoading } = useGetCategoriesQuery();
    const { data: recipesData, isFetching: isRecipesLoading } = useGetRecipesQuery({
        limit: DEFAULT_SWIPER_SLIDES_COUNT,
        sortBy: 'createdAt',
    });
    const { isFetching: isJuiciestRecipesLoading } = useGetRecipesQuery({
        limit: DEFAULT_CARDS_PER_PAGE,
        sortBy: 'likes',
        page: DEFAULT_PAGE,
    });
    const { isFetching: isRecipeLoading } = useGetRecipeByIdQuery(recipeId ?? '', {
        skip: !recipeId,
    });

    const isDataLoading =
        isCategoriesDataLoading ||
        (isRecipesLoading && !recipesData) ||
        isRecipeLoading ||
        isJuiciestRecipesLoading ||
        isJuiciestFetching;

    useEffect(() => {
        if (categoriesData) {
            saveCategoriesToDB(categoriesData);
            dispatch(setCategories(categoriesData.categories));
            dispatch(setSubCategories(categoriesData.subCategories));
        }
    }, [categoriesData, dispatch]);

    useCategoryData();

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
            <AlertComponent title='Ошибка сервера' desc='Попробуйте поискать снова попозже' />
        </Flex>
    );
};
