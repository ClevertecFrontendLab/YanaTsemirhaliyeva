export const SELECT_STYLES = {
    button: {
        variant: 'outline',
        w: '100%',
        fontWeight: '400',
        color: 'blackAlpha.700',
        minH: 'fit-content',
        h: 'fit-content',
        sx: {
            transition: 'border-color 0.3s ease-in-out',
            padding: 2,
            paddingLeft: 3,
            '&:focus': {
                outline: 'none',
            },
            '&:hover': {
                bgColor: 'transparent',
            },
            '&[data-active]': {
                bgColor: 'transparent !important',
                borderColor: 'lime.300 !important',
            },
            span: {
                isTruncated: true,
            },
        },
    },
    list: {
        zIndex: 10,
        p: 0,
        borderRadius: 'none',
        color: 'blackAlpha.800',
        maxH: '450px',
        sx: {
            '& > *:nth-of-type(odd)': {
                bg: 'blackAlpha.100',
            },
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'blackAlpha.300',
                borderRadius: '8px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: 'blackAlpha.400',
            },
            '&::-webkit-scrollbar-track': {
                background: 'blackAlpha.50',
                borderRadius: '8px',
            },
        },
    },
    checkbox: {
        borderColor: 'lime.150',
        sx: {
            '.chakra-checkbox__control': {
                borderWidth: 3,
            },
            '&[data-checked] .chakra-checkbox__control': {
                background: 'lime.150 !important',
                borderColor: 'lime.150 !important',
                color: 'black !important',
            },
        },
    },
    tag: {
        size: 'sm',
        variant: 'outline',
        colorScheme: 'lime',
        borderRadius: 'md',
        color: 'lime.600',
        borderColor: 'lime.150',
    },
};
