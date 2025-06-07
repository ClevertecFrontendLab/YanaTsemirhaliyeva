export const ALLERGENS_STYLES = {
    mainButton: {
        display: 'flex',
        justifyContent: 'space-between',
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
                borderColor: 'blackAlpha.400',
            },
            '&[data-active]': {
                bgColor: 'transparent !important',
                borderColor: 'lime.300 !important',
            },
            '&:disabled': {
                pointerEvents: 'none',
            },
        },
    },
    menuListBox: {
        zIndex: 10,
        position: 'absolute' as const,
        top: '100%',
        left: 0,
        borderRadius: 'md',
        boxShadow: 'md',
        bg: 'white',
        p: 0,
        mt: 1,
        border: '1px solid',
        borderColor: 'gray.200',
        color: 'blackAlpha.800',
        maxH: '620px',
        sx: {
            '& > *:nth-of-type(odd):not(:last-child)': {
                bg: 'blackAlpha.100',
            },
        },
    },
};
