import { createBrowserRouter } from 'react-router';

import App from '~/app/App.tsx';
import { ProtectedRouteElement } from '~/components/protected-route/ProtectedRoute';
import { AppRoute, DynamicRoutes } from '~/consts/consts';
import { AuthPage } from '~/pages/auth';
import { CategoryCuisine } from '~/pages/category-cuisine';
import { ErrorPage } from '~/pages/error';
import { Home } from '~/pages/home';
import { JuiciestCollection } from '~/pages/juiciest-collection';
import { NewRecipe } from '~/pages/new-recipe';
import { RecipePage } from '~/pages/recipe';
import { VerificationPage } from '~/pages/verification';

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: AppRoute.Login,
                    element: <AuthPage />,
                },
                {
                    path: AppRoute.Register,
                    element: <AuthPage />,
                },
                {
                    path: AppRoute.Verification,
                    element: <VerificationPage />,
                },
                {
                    element: <ProtectedRouteElement />,
                    children: [
                        {
                            path: AppRoute.Index,
                            element: <Home />,
                        },
                        {
                            path: AppRoute.Juicy,
                            element: <JuiciestCollection />,
                        },
                        {
                            path: AppRoute.NewRecipe,
                            element: <NewRecipe />,
                        },
                        {
                            path: DynamicRoutes.EditRecipePage,
                            element: <NewRecipe />,
                        },
                        {
                            path: DynamicRoutes.CategoryRoot,
                            element: <CategoryCuisine />,
                        },
                        {
                            path: DynamicRoutes.SubcategoryPage,
                            element: <CategoryCuisine />,
                        },
                        {
                            path: DynamicRoutes.RecipePage,
                            element: <RecipePage />,
                        },
                        {
                            path: AppRoute.NotFound,
                            element: <ErrorPage />,
                        },
                    ],
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ],
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    },
);
