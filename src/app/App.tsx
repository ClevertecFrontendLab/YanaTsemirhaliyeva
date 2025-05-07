import './App.css';

import { Navigate, Route, Routes } from 'react-router';

import { Layout } from '~/components/layout/Layout';
import { AppRoute, DynamicRoutes } from '~/consts/consts';
import ScrollToTop from '~/hooks/scroll-to-top';
import { CategoryCuisine } from '~/pages/category-cuisine';
import { ErrorPage } from '~/pages/error';
import { Home } from '~/pages/home';
import { JuiciestCollection } from '~/pages/juiciest-collection';
import { RecipePage } from '~/pages/recipe';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <>
            <ScrollToTop />
            <Layout>
                <Routes>
                    <Route path={AppRoute.Index} element={<Home />} />
                    <Route path={AppRoute.Juicy} element={<JuiciestCollection />} />

                    <Route path={DynamicRoutes.CategoryRoot} element={<CategoryCuisine />} />
                    <Route path={DynamicRoutes.SubcategoryPage} element={<CategoryCuisine />} />
                    <Route path={DynamicRoutes.RecipePage} element={<RecipePage />} />

                    <Route path='*' element={<Navigate to={AppRoute.NotFound} replace />} />
                    <Route path={AppRoute.NotFound} element={<ErrorPage />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
