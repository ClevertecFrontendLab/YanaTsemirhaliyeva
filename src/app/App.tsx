import './App.css';

import { AppRoutes } from '~/components/app-routes/AppRoutes';
import { Layout } from '~/components/layout/Layout';
import ScrollToTop from '~/hooks/scroll-to-top';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <>
            <ScrollToTop />
            <Layout>
                <AppRoutes />
            </Layout>
        </>
    );
}

export default App;
