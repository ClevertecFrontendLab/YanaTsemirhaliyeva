export const FORM_NEW_RECIPE_STYLES = {
    submitBtn: {
        type: 'submit' as const,
        size: 'lg',
        colorScheme: 'black',
        variant: 'solid',
        bgColor: 'black',
        color: 'white',
        fontWeight: 600,
        fontSize: 18,
        w: { base: '100%', '2xs': 'auto' },
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
    saveDraftBtn: {
        w: { base: '100%', '2xs': 'auto' },
        size: 'lg',
        fontSize: 18,
        colorScheme: 'black',
        variant: 'outline',
        loadingText: 'Сохранение...',
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
    newStepBtn: {
        colorScheme: 'black',
        color: 'blackAlpha.800',
        borderColor: 'blackAlpha.600',
        variant: 'outline',
        fontSize: 14,
        fontWeight: 600,
        size: 'sm',
        ml: 'auto',
    },
    imgBlock: {
        w: '100%',
        h: '100%',
        bgColor: 'blackAlpha.200',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
    },
    stepImgBlock: {
        w: { base: '100%', '2xs': '58%', sm: '52%' },
        minH: '160px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        bgColor: 'blackAlpha.200',
        pos: 'relative' as const,
    },
};

export const getFieldStyles = (hasError: boolean, defaultBorderColor: string) => ({
    border: hasError ? '2px solid' : '1px solid',
    borderColor: hasError ? 'red.500' : defaultBorderColor,
    _focusVisible: {
        border: hasError ? '2px solid' : '1px solid',
        borderColor: hasError ? 'red.500' : defaultBorderColor,
    },
});
