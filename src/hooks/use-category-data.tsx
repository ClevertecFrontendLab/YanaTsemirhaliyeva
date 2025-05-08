import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { AppRoute } from '~/consts/consts';
import { useAppDispatch } from '~/store/hooks';
import { setCategory, setRecipeTitle, setSubcategory } from '~/store/slices/recipes-slice';
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
};
