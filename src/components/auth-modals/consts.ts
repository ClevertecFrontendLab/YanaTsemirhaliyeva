export const MODAL_CLOSE_BUTTON_STYLES = {
    borderRadius: '50%',
    border: '1px solid black',
    top: 6,
    right: 6,
    boxSize: 6,
    sx: {
        '&:hover': {
            borderColor: 'black',
        },
        '&:focus': {
            outline: 'none',
        },
    },
};

export const BUTTON_STYLES = {
    type: 'submit' as const,
    variant: 'solid',
    bgColor: 'black',
    color: 'white',
    width: 'full',
    size: 'md',
    py: 6,
    sx: {
        '&:hover': {
            bgColor: 'black',
        },
    },
};

export const BORDER_COLOR_STYLES = (isError: boolean) => ({
    borderColor: isError ? 'red.500' : 'lime.150',
    _hover: {
        borderColor: isError ? 'red.500' : 'lime.150',
    },
});

export const HOVER_EFFECT = {
    '&:hover': {
        bgColor: 'white',
    },
};
