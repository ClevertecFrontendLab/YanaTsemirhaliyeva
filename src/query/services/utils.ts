import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { ErrorCodes } from '~/consts/errors';

export const handleApiError = (error: unknown, defaultMessage: string) => {
    if (typeof error === 'object' && error !== null) {
        return {
            statusCode:
                (error as FetchBaseQueryError)?.status ??
                (error as { data?: { statusCode?: number } })?.data?.statusCode,
            message: (error as { data?: { message?: string } })?.data?.message ?? defaultMessage,
        };
    }
    return { statusCode: ErrorCodes.InternalServerError, message: 'Неизвестная ошибка' };
};
