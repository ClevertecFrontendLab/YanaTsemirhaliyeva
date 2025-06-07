import { Box, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { CaloricContent } from '~/components/caloric-content/CaloricContent';
import { CookSteps } from '~/components/cook-steps/CookSteps';
import { FullSizeCard } from '~/components/full-size-card/FullSizeCard';
import { HelmetComponent } from '~/components/helmet-component/HelmetComponent';
import { Ingredients } from '~/components/ingredients/Ingredients';
import { LoaderFullsize } from '~/components/loader-fullsize/LoaderFullsize';
import { NewRecipes } from '~/components/new-recipes/NewRecipes';
import { RecipeAuthor } from '~/components/recipe-author/RecipeAuthor';
import { ALERT_MESSAGES } from '~/consts/consts';
import { PAGE_META } from '~/consts/page-meta';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { isAuthorizedSelector } from '~/store/slices/auth-slice';
import {
    isRecipeAuthorFetchingSelector,
    setRecipeId,
    setRecipeTitle,
} from '~/store/slices/recipes-slice';

export const RecipePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(isAuthorizedSelector);
    const isRecipeAuthorLoading = useAppSelector(isRecipeAuthorFetchingSelector);

    useEffect(() => {
        if (id) {
            dispatch(setRecipeId(id));
        }
    });

    const { data, error, isError, isFetching } = useGetRecipeByIdQuery(id ?? '', {
        skip: !id || !isAuthorized,
    });

    useEffect(() => {
        if (isError && !data) {
            navigate(-1);
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        }
    }, [isError, data, navigate, dispatch]);

    useEffect(() => {
        if (data) {
            dispatch(setRecipeTitle(data.title));
        } else {
            dispatch(setRecipeTitle(null));
        }
    }, [data, dispatch]);

    if (error || !data) return;

    return (
        <Box>
            <HelmetComponent {...PAGE_META.Recipe} />
            <Box pl={{ base: 4, md: '26px' }} pr={18}>
                <Box mb={{ base: 6, md: 10 }} pt={{ md: 7 }} pr={{ md: 9 }}>
                    <FullSizeCard {...data} />
                </Box>
                <Box pr={{ md: 10 }}>
                    <VStack
                        spacing={{ base: 6, md: 10 }}
                        alignItems='stretch'
                        maxW={{ md: '578px', xl: '668px' }}
                        m={{ base: '0 auto 40px' }}
                    >
                        <CaloricContent {...data} />
                        <VStack
                            px={{ '2xs': '60px', md: 0 }}
                            spacing={{ base: 6, md: 10 }}
                            alignItems='stretch'
                        >
                            <Ingredients portions={data.portions!} ingredients={data.ingredients} />
                            <CookSteps {...data} />
                            <RecipeAuthor {...data} />
                        </VStack>
                    </VStack>
                </Box>
            </Box>
            <Box pl={{ base: 4, xl: 6 }} pr={{ xl: 12 }}>
                <NewRecipes />
            </Box>
            <LoaderFullsize isLoading={isFetching || isRecipeAuthorLoading} />
        </Box>
    );
};
