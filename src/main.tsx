import './index.css';

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from '~/app/App.tsx';
import { store } from '~/store/configure-store.ts';

import theme from './theme';

const { ToastContainer } = createStandaloneToast();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <App />
                </BrowserRouter>
                <ToastContainer />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
