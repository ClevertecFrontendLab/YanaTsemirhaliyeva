import { Navigate, Route, Routes } from 'react-router';

import { AppRoute, DynamicRoutes } from '~/consts/consts';
import { CategoryCuisine } from '~/pages/category-cuisine';
import { ErrorPage } from '~/pages/error';
import { Home } from '~/pages/home';
import { JuiciestCollection } from '~/pages/juiciest-collection';
import { RecipePage } from '~/pages/recipe';

export const AppRoutes = () => (
    <Routes>
        <Route path={AppRoute.Index} element={<Home />} />
        <Route path={AppRoute.Juicy} element={<JuiciestCollection />} />

        <Route path={DynamicRoutes.CategoryRoot} element={<CategoryCuisine />} />
        <Route path={DynamicRoutes.SubcategoryPage} element={<CategoryCuisine />} />
        <Route path={DynamicRoutes.RecipePage} element={<RecipePage />} />

        <Route path='*' element={<Navigate to={AppRoute.NotFound} replace />} />
        <Route path={AppRoute.NotFound} element={<ErrorPage />} />
    </Routes>
);
