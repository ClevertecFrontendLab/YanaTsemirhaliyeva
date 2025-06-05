export const FULL_CARD_STYLES = {
    bookmarkBtn: {
        size: { base: 'sx', sm: 'sm', xl: 'lg' },
        variant: 'solid',
        bgColor: 'lime.400',
        color: 'black',
        fontWeight: 600,
        fontSize: { base: 12, sm: 16, xl: 14 },
        p: 1,
        px: { base: 2, sm: 3 },
        sx: {
            transition: 'all 0.3s ease-in-out',
            '&:focus': {
                outline: 'none',
                borderColor: 'transparent',
            },
            '&:hover': {
                bgColor: 'white',
                color: 'black',
                borderColor: 'black',
            },
        },
    },
    likeBtn: {
        size: { base: 'xs', sm: 'sm', xl: 'lg' },
        px: { base: 2, sm: 3 },
        variant: 'outline',
        fontSize: { base: 12, sm: 16, xl: 14 },
        sx: {
            transition: 'all 0.3s ease-in-out',
            '&:focus': {
                outline: 'none',
                borderColor: 'transparent',
            },
            '&:hover': {
                bgColor: 'lime.600',
                color: 'white',
                borderColor: 'lime.600',
            },
        },
    },
    editBtn: {
        size: { base: 'sx', sm: 'sm', xl: 'lg' },
        colorScheme: 'black',
        variant: 'outline',
        color: 'blackAlpha.800',
        borderColor: 'blackAlpha.800',
        fontSize: { base: 12, md: 18 },
        p: '3px',
        sx: {
            transition: 'all 0.3s ease-in-out',
            '&:focus': {
                outline: 'none',
                borderColor: 'blackAlpha.800',
            },
            '&:hover': {
                bgColor: 'lime.600',
                color: 'white',
                borderColor: 'lime.600',
            },
        },
    },
};
