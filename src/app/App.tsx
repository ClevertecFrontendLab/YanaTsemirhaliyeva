import './App.css';

import { Outlet } from 'react-router';

import { Layout } from '~/components/layout/Layout';
import { ScrollToTop } from '~/hooks/scroll-to-top';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <>
            <ScrollToTop />
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
}

export default App;
