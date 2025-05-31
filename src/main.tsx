import './index.css';

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { store } from '~/store/configure-store.ts';

import { router } from './components/app-routes/AppRoutes';
import theme from './theme';

const { ToastContainer } = createStandaloneToast();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
                <ToastContainer />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
