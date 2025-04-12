import './App.css';

import { Route, Routes } from 'react-router';

import { Layout } from '~/components/layout/Layout';
import { Home } from '~/pages/home';
import { JuiciestCollection } from '~/pages/juiciest-collection';
import { VeganCuisine } from '~/pages/vegan-cuisine';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/vegan-cuisine' element={<VeganCuisine />} />
                <Route path='/juiciest-collection' element={<JuiciestCollection />} />
            </Routes>
        </Layout>
    );
}

export default App;
