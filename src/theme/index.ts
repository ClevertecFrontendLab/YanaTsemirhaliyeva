import { extendTheme, ThemeConfig } from '@chakra-ui/react';

import colors from './colors';

const breakpoints = {
    '2xl': '1920px',
    xl: '1536px',
    lg: '1440px',
    md: '1200px',
    sm: '960px',
    xs: '768px',
    '2xs': '620px',
    '3xs': '360px',
    base: '0px',
};

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    colors,
    breakpoints,
});

export default theme;
