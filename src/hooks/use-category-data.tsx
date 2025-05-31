import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { AppRoute, DynamicRoutes } from '~/consts/consts';
import { useAppDispatch } from '~/store/hooks';
import {
    setCategory,
    setRecipeTitle,
    setSubcategory,
    updateSearchParams,
} from '~/store/slices/recipes-slice';
import { getCategoriesFromDB, getCategoryAndSubcategoryFromUrl } from '~/utils';

export const useCategoryData = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryData = async () => {
            const { category, subcategory, id, isValid } = await getCategoryAndSubcategoryFromUrl(
                location.pathname,
            );
            const { categories } = await getCategoriesFromDB();
            const excludedRoutes = [
                AppRoute.Index,
                AppRoute.Juicy,
                AppRoute.NotFound,
                AppRoute.Login,
                AppRoute.Register,
                AppRoute.Verification,
                AppRoute.NewRecipe,
                DynamicRoutes.EditRecipePage,
            ].map(String);
            if (excludedRoutes.includes(location.pathname)) {
                dispatch(setCategory(null));
                dispatch(setSubcategory(null));
                dispatch(
                    updateSearchParams({
                        subcategoriesIds: [],
                        page: 1,
                    }),
                );
                return;
            }

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
                dispatch(
                    updateSearchParams({
                        subcategoriesIds: [subcategory._id],
                        page: 1,
                    }),
                );
            } else {
                const firstSubcategory = validCategory.subCategories?.[0];
                if (category && firstSubcategory) {
                    dispatch(setSubcategory(firstSubcategory));
                    dispatch(
                        updateSearchParams({
                            subcategoriesIds: [firstSubcategory._id],
                            page: 1,
                        }),
                    );
                    navigate(`/${category.category}/${firstSubcategory.category}`, {
                        replace: true,
                    });
                }
            }
        };

        fetchCategoryData();
    }, [dispatch, location.pathname, navigate]);
};
