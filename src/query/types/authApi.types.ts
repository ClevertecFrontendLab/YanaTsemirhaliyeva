export type BaseAuthParams = {
    email: string;
};

export type AuthResponse = {
    statusText: string;
    message: string;
};

export type SignupParams = BaseAuthParams & {
    login: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export type LoginParams = {
    login: string;
    password: string;
};

export type ForgotPasswordParams = BaseAuthParams;

export type VerifyOtpParams = BaseAuthParams & {
    otpToken: string;
};

export type ResetPasswordParams = BaseAuthParams & {
    login: string;
    password: string;
    passwordConfirm: string;
};
