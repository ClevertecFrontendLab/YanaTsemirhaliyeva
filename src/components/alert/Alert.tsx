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
import { alertStatusSelector, setAlertStatus } from '~/store/slices/alert-slice';
import { alertAuthStatusSelector, setAuthAlertStatus } from '~/store/slices/auth-slice';

const DEFAULT_ALERT_STATUS = {
    status: 'error' as const,
    isError: false,
    title: '',
    desc: '',
};

const TIME = 15000;

type AlertComponentProps = {
    status: 'error' | 'success';
    title: string;
    desc?: string;
    hasFooter?: boolean;
};

export const AlertComponent = ({ status, title, desc, hasFooter = false }: AlertComponentProps) => {
    const dispatch = useAppDispatch();
    const isAuthError = useAppSelector(alertAuthStatusSelector);
    const isError = useAppSelector(alertStatusSelector);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setAlertStatus(DEFAULT_ALERT_STATUS));
            dispatch(setAuthAlertStatus(DEFAULT_ALERT_STATUS));
        }, TIME);
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch, isAuthError, isError]);

    const handleAlertClose = () => {
        dispatch(setAlertStatus(DEFAULT_ALERT_STATUS));
        dispatch(setAuthAlertStatus(DEFAULT_ALERT_STATUS));
    };

    return (
        (isError.isError || isAuthError.isError) && (
            <Center
                zIndex={1500}
                position='fixed'
                bottom={hasFooter ? { base: '100px', lg: '100px' } : '30px'}
                left='50%'
                transform='translateX(-50%)'
                width={{ base: '328px', md: '400px' }}
            >
                <Alert
                    data-test-id={DataTestId.ErrorNotification}
                    status={status}
                    variant='solid'
                    bgColor={status === 'error' ? 'red.500' : 'green.500'}
                >
                    <AlertIcon />
                    <Box width='100%'>
                        <AlertTitle data-test-id={DataTestId.ErrorNotificationTitle}>
                            {title}
                        </AlertTitle>
                        {desc && (
                            <AlertDescription data-test-id={DataTestId.ErrorNotificationDesc}>
                                {desc}
                            </AlertDescription>
                        )}
                    </Box>
                    <CloseButton
                        data-test-id={DataTestId.CloseAlertBtn}
                        alignSelf='flex-start'
                        position='relative'
                        right={-1}
                        top={-1}
                        onClick={handleAlertClose}
                    />
                </Alert>
            </Center>
        )
    );
};
