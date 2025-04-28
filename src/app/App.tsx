import './App.css';

import { Route, Routes } from 'react-router';

import { Layout } from '~/components/layout/Layout';
import { AppRoute, CategoryRoute, DynamicRoutes } from '~/consts/consts';
import ScrollToTop from '~/hooks/scroll-to-top';
import { Home } from '~/pages/home';
import { JuiciestCollection } from '~/pages/juiciest-collection';
import { RecipePage } from '~/pages/recipe';
import { VeganCuisine } from '~/pages/vegan-cuisine';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <>
            <ScrollToTop />
            <Layout>
                <Routes>
                    {/* Основные страницы */}
                    <Route path={AppRoute.Index} element={<Home />} />
                    <Route path={AppRoute.Juicy} element={<JuiciestCollection />} />

                    {/* Категории из меню - используем VeganCuisine как заглушку */}
                    <Route path={CategoryRoute.Salads} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Snacks} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.First} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Second} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Desserts} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Grilled} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.VeganDishes} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Child} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Nutrition} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.National} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Sauce} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Drinks} element={<VeganCuisine />} />
                    <Route path={CategoryRoute.Preparations} element={<VeganCuisine />} />

                    {/* Поддержка URL с подкатегориями - используем тот же компонент, что и для категорий */}
                    <Route path={DynamicRoutes.SubcategoryPage} element={<VeganCuisine />} />

                    {/* Маршрут для страницы рецепта */}
                    <Route path={DynamicRoutes.RecipePage} element={<RecipePage />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
