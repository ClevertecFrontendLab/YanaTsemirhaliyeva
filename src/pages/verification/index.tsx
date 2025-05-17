import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import { ALERT_MESSAGES, AppRoute } from '~/consts/consts';
import { useAppDispatch } from '~/store/hooks';
import { setAlertStatus, setIsVerificationExpired } from '~/store/slices/auth-slice';

export const VerificationPage = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const searchParams = new URLSearchParams(location.search);
    const emailVerified = searchParams.get('emailVerified') === 'true';

    useEffect(() => {
        if (!emailVerified) {
            dispatch(setIsVerificationExpired(true));
        } else {
            dispatch(setAlertStatus(ALERT_MESSAGES.VERIFICATION_SUCCESS));
        }
    }, [emailVerified, dispatch]);

    return <Navigate to={emailVerified ? AppRoute.Login : AppRoute.Register} replace />;
};
