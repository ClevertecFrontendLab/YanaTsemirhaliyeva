import { Navigate, Route, Routes } from 'react-router';

import { AppRoute, DynamicRoutes } from '~/consts/consts';
import { AuthPage } from '~/pages/auth';
import { CategoryCuisine } from '~/pages/category-cuisine';
import { ErrorPage } from '~/pages/error';
import { Home } from '~/pages/home';
import { JuiciestCollection } from '~/pages/juiciest-collection';
import { RecipePage } from '~/pages/recipe';
import { VerificationPage } from '~/pages/verification';

import { ProtectedRoute } from '../protected-route/ProtectedRoute';

export const AppRoutes = () => (
    <Routes>
        <Route path={AppRoute.Login} element={<AuthPage />} />
        <Route path={AppRoute.Register} element={<AuthPage />} />
        <Route path={AppRoute.Verification} element={<VerificationPage />} />

        <Route element={<ProtectedRoute />}>
            <Route path={AppRoute.Index} element={<Home />} />
            <Route path={AppRoute.Juicy} element={<JuiciestCollection />} />

            <Route path={DynamicRoutes.CategoryRoot} element={<CategoryCuisine />} />
            <Route path={DynamicRoutes.SubcategoryPage} element={<CategoryCuisine />} />
            <Route path={DynamicRoutes.RecipePage} element={<RecipePage />} />
        </Route>

        <Route path='*' element={<Navigate to={AppRoute.NotFound} replace />} />
        <Route path={AppRoute.NotFound} element={<ErrorPage />} />
    </Routes>
);
