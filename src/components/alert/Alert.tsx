import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Center,
    CloseButton,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { DataTestId } from '~/consts/consts';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { clearError, isErrorSelector } from '~/store/slices/recipes-slice';

const TIME = 5000;

type AlertComponentProps = {
    title: string;
    desc: string;
};

export const AlertComponent = ({ title, desc }: AlertComponentProps) => {
    const dispatch = useAppDispatch();
    const isError = useAppSelector(isErrorSelector);

    useEffect(() => {
        const timer = setTimeout(() => dispatch(clearError()), TIME);
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch, isError]);

    return (
        isError && (
            <Center
                zIndex={10}
                position='absolute'
                bottom={{ base: '100px', lg: '30px' }}
                left='50%'
                transform='translateX(-50%)'
                width={{ base: '328px', md: '400px' }}
            >
                <Alert
                    data-test-id={DataTestId.ErrorNotification}
                    status='error'
                    variant='solid'
                    bgColor='red.500'
                >
                    <AlertIcon />
                    <Box width='100%'>
                        <AlertTitle>{title}</AlertTitle>
                        <AlertDescription>{desc}</AlertDescription>
                    </Box>
                    <CloseButton
                        data-test-id={DataTestId.CloseAlertBtn}
                        alignSelf='flex-start'
                        position='relative'
                        right={-1}
                        top={-1}
                        onClick={() => dispatch(clearError())}
                    />
                </Alert>
            </Center>
        )
    );
};
