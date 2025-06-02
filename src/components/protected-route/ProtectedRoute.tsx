import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { AppRoute } from '~/consts/consts';
import { isAuthorizedSelector } from '~/store/slices/auth-slice';

export const ProtectedRouteElement = () => {
    const isAuth = useSelector(isAuthorizedSelector);

    if (!isAuth) {
        return <Navigate to={AppRoute.Login} replace />;
    }

    return <Outlet />;
};
