export type AuthResponse = {
    statusText: string;
    message: string;
};

export type SignupParams = {
    email: string;
    login: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export type LoginParams = {
    login: string;
    password: string;
};

export type ForgotPasswordParams = {
    email: string;
};

export type VerifyOtpParams = {
    email: string;
    otpToken: string;
};

export type ResetPasswordParams = {
    email: string;
    login: string;
    password: string;
    passwordConfirm: string;
};
