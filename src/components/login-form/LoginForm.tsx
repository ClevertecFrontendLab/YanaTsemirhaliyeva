import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ALERT_MESSAGES, DataTestId, InputAriaLabel, InputType } from '~/consts/consts';
import { INPUT_STYLES } from '~/consts/styles';
import { useLoginMutation, useVerifyOtpMutation } from '~/query/services/auth';
import { LoginFormValues, loginSchema } from '~/schemas/auth.schema';
import { useAppDispatch } from '~/store/hooks';
import {
    login as authLogin,
    setAlertStatus,
    setIsAuthModalOpen,
    setIsSubmitingform,
} from '~/store/slices/auth-slice';

import { BUTTON_STYLES } from '../auth-modals/consts';
import { PasswordRecoveryModal } from '../auth-modals/PasswordRecovery';
import { PinRecoveryModal } from '../auth-modals/PinRecoveryModal';
import { ResetPasswordModal } from '../auth-modals/ResetPassword';
import { ServerErrorModal } from '../auth-modals/ServerError';

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [serverErrorOpen, setServerErrorOpen] = useState(false);
    const [savedData, setSavedData] = useState<LoginFormValues | null>(null);
    const [login, { error }] = useLoginMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [isPasswordRecoveryOpen, setIsPasswordRecoveryOpen] = useState(false);
    const [isPinRecoveryOpen, setIsPinRecoveryOpen] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [pinError, setPinError] = useState(false);
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
    const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined);
    const [email, setEmail] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { login: '', password: '' },
    });

    const onSubmit = async (data: LoginFormValues) => {
        dispatch(setIsSubmitingform(true));
        setSavedData(data);

        try {
            await login(data).unwrap();
            dispatch(authLogin());
            navigate('/');
        } catch (err) {
            const status = (err as FetchBaseQueryError)?.status;

            if (status === 403) {
                dispatch(setAlertStatus(ALERT_MESSAGES.EMAIL_NOT_VERIFIED));
            } else if (typeof status === 'number' && status >= 500 && status < 600) {
                setServerErrorOpen(true);
                dispatch(setIsAuthModalOpen(true));
                reset();
            } else {
                dispatch(setAlertStatus(ALERT_MESSAGES.INVALID_DATA));
                reset();
            }
        } finally {
            dispatch(setIsSubmitingform(false));
        }
    };

    const handleTrimBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.type !== InputType.Password) {
            setValue('login', event.target.value.trim());
        }
    };

    const handleRetry = () => {
        if (savedData) {
            onSubmit(savedData);
        }
    };
    const handlePasswordRecovery = (email: string) => {
        setEmailValue(email);
        setIsPinRecoveryOpen(true);
        dispatch(setIsAuthModalOpen(true));
        setIsPasswordRecoveryOpen(false);
    };

    const handleVerifyOtp = async (otpToken: string) => {
        dispatch(setIsSubmitingform(true));
        try {
            await verifyOtp({ email: emailValue, otpToken }).unwrap();
            setEmail(emailValue);
            setIsPinRecoveryOpen(false);
            setIsResetPasswordOpen(true);
            dispatch(setIsAuthModalOpen(true));
        } catch (err) {
            setPinError(true);
            const status = (err as FetchBaseQueryError)?.status;
            setErrorStatus(status as number | undefined);
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
            dispatch(setIsAuthModalOpen(true));
        } finally {
            dispatch(setIsSubmitingform(false));
        }
    };

    const hanleRecoveryPasswordOpen = () => {
        dispatch(setIsAuthModalOpen(true));
        setIsPasswordRecoveryOpen(true);
    };

    const hanleRecoveryPasswordClose = () => {
        dispatch(setIsAuthModalOpen(false));
        setIsPasswordRecoveryOpen(false);
    };

    const hanlePinOtpModalClose = () => {
        setIsPinRecoveryOpen(false);
        dispatch(setIsAuthModalOpen(false));
    };

    const hanleResetPasswordModalClose = () => {
        setIsResetPasswordOpen(false);
        dispatch(setIsAuthModalOpen(false));
    };

    const borderColor = error ? 'red.500' : 'lime.150';

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestId.SignInForm}>
                <VStack align='flex-start' gap={4}>
                    <FormControl isInvalid={!!errors.login}>
                        <FormLabel htmlFor='email'>Логин для входа на сайт</FormLabel>
                        <Input
                            data-test-id={DataTestId.LoginInput}
                            id='login'
                            type='text'
                            placeholder='bake_and_pie'
                            borderColor={borderColor}
                            {...INPUT_STYLES}
                            {...register('login', { onBlur: handleTrimBlur })}
                        />
                        {errors.login && (
                            <Text fontSize={14} color='blackAlpha.700'>
                                Логин не менее 5 символов, только латиница и !@#$&_+-.
                            </Text>
                        )}
                        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel htmlFor='password'>Пароль</FormLabel>
                        <InputGroup>
                            <Input
                                data-test-id={DataTestId.PasswordInput}
                                id='password'
                                type={showPassword ? InputType.Text : InputType.Password}
                                placeholder='**********'
                                borderColor={borderColor}
                                {...INPUT_STYLES}
                                {...register('password')}
                            />
                            <InputRightElement h={12}>
                                <IconButton
                                    data-test-id={DataTestId.PasswordVisibilityBtn}
                                    aria-label={
                                        showPassword ? InputAriaLabel.Hide : InputAriaLabel.Show
                                    }
                                    icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    variant='ghost'
                                    size='md'
                                    border='none'
                                    sx={{
                                        '&:hover': {
                                            bgColor: 'white',
                                        },
                                    }}
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}
                                />
                            </InputRightElement>
                        </InputGroup>
                        {errors.password && (
                            <Text fontSize={14} color='blackAlpha.700'>
                                Пароль не менее 8 символов, с заглавной буквой и цифрой
                            </Text>
                        )}
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    <Button
                        data-test-id={DataTestId.SubmitBtn}
                        {...BUTTON_STYLES}
                        sx={{ ...BUTTON_STYLES.sx, mt: 20 }}
                    >
                        Войти
                    </Button>
                </VStack>
            </form>
            <Box mt={4} textAlign='center'>
                <Link
                    data-test-id={DataTestId.ForgotPasswordLink}
                    as='button'
                    color='black'
                    onClick={hanleRecoveryPasswordOpen}
                    border='none'
                    sx={{
                        '&:focus': {
                            outline: 'none',
                        },
                    }}
                >
                    Забыли логин или пароль?
                </Link>
            </Box>
            <PasswordRecoveryModal
                isOpen={isPasswordRecoveryOpen}
                onClose={hanleRecoveryPasswordClose}
                onSubmit={handlePasswordRecovery}
            />
            <ServerErrorModal
                isOpen={serverErrorOpen}
                onClose={setServerErrorOpen}
                onRetry={handleRetry}
            />
            <PinRecoveryModal
                isOpen={isPinRecoveryOpen}
                onClose={hanlePinOtpModalClose}
                onSubmit={handleVerifyOtp}
                isError={pinError}
                email={emailValue}
                errorStatus={errorStatus}
            />
            <ResetPasswordModal
                isOpen={isResetPasswordOpen}
                onClose={hanleResetPasswordModalClose}
                email={email}
            />
        </Box>
    );
};
