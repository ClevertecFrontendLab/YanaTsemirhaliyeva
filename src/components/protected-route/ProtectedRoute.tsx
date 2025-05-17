import { Navigate, Outlet } from 'react-router';

import { AppRoute } from '~/consts/consts';
import { useAppSelector } from '~/store/hooks';
import { isAuthorizedSelector } from '~/store/slices/auth-slice';

export const ProtectedRoute = () => {
    const isAuthorized = useAppSelector(isAuthorizedSelector);

    return isAuthorized ? <Outlet /> : <Navigate to={AppRoute.Login} replace />;
};
