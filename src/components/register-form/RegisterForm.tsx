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
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ALERT_MESSAGES, DataTestId, InputAriaLabel, InputType } from '~/consts/consts';
import { INPUT_STYLES } from '~/consts/styles';
import { useSignupMutation } from '~/query/services/auth';
import { RegisterFormValues, registerSchema } from '~/schemas/auth.schema';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    isVerificationExpiredSelector,
    setAlertStatus,
    setIsSubmitingform,
    setIsVerificationExpired,
} from '~/store/slices/auth-slice';

import { BUTTON_STYLES } from '../auth-modals/consts';
import { RegisterSuccessModal } from '../auth-modals/RegisterSuccess';
import { VerificationExpiredModal } from '../auth-modals/VerificationExpired';

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [progressValue, setProgressValue] = useState(0);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const isError = useAppSelector(isVerificationExpiredSelector);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(isError);

    const handleModalClose = () => {
        setIsErrorModalOpen(false);
        dispatch(setIsVerificationExpired(false));
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        setError,
        trigger,
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    const formValues = watch();
    const [signup] = useSignupMutation();

    useEffect(() => {
        const fieldsToCheck: (keyof RegisterFormValues)[] = [
            'firstName',
            'lastName',
            'email',
            'login',
            'password',
            'confirmPassword',
        ];

        const totalFields = fieldsToCheck.length;
        let validFields = 0;

        fieldsToCheck.forEach((field) => {
            if (formValues[field] && !errors[field]) {
                validFields++;
            }
        });
        const progress = Math.round((validFields / totalFields) * 100);
        setProgressValue(progress);
    }, [formValues, errors]);

    const handleTrimBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.type !== 'password') {
            const trimmedValue = event.target.value.trim();
            const fieldName = event.target.name as keyof RegisterFormValues;
            setValue(fieldName, trimmedValue);
        }
    };

    const handleStepNext = async () => {
        const isValid = await trigger(['firstName', 'lastName', 'email']);

        if (!formValues.firstName) setError('firstName', { message: 'Введите имя' });
        if (!formValues.lastName) setError('lastName', { message: 'Введите фамилию' });
        if (!formValues.email) setError('email', { message: 'Введите e-mail' });

        if (isValid) setStep(2);
    };

    const onSubmit = async (data: RegisterFormValues) => {
        dispatch(setIsSubmitingform(true));
        try {
            await signup(data).unwrap();
            setIsRegistrationSuccess(true);
        } catch (err) {
            if (err && typeof err === 'object') {
                let errorMessage = '';

                if ('data' in err && err.data) {
                    if (typeof err.data === 'object' && 'message' in err.data) {
                        errorMessage = err.data.message as string;
                    } else if (typeof err.data === 'string') {
                        errorMessage = err.data;
                    }
                } else if ('message' in err && typeof err.message === 'string') {
                    errorMessage = err.message;
                } else if ('error' in err && typeof err.error === 'string') {
                    errorMessage = err.error;
                }

                if (errorMessage) {
                    dispatch(
                        setAlertStatus({
                            status: 'error',
                            isError: true,
                            title: errorMessage,
                        }),
                    );

                    return;
                }
            }
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        } finally {
            dispatch(setIsSubmitingform(false));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestId.SignUpForm}>
                <VStack spacing={4} align='flex-start'>
                    <Box width='full'>
                        <Text>
                            Шаг {step}.{step === 1 ? 'Личная информация' : 'Логин и пароль'}
                        </Text>
                        <Progress
                            data-test-id={DataTestId.SignUpProgress}
                            hasStripe
                            value={progressValue}
                            colorScheme='lime'
                            size='sm'
                        />
                    </Box>

                    {step === 1 && (
                        <>
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel htmlFor='firstName'>Ваше имя</FormLabel>
                                <Input
                                    data-test-id={DataTestId.FirstNameInput}
                                    id='firstName'
                                    placeholder='Имя'
                                    mb={2}
                                    {...INPUT_STYLES}
                                    {...register('firstName', { onBlur: handleTrimBlur })}
                                />
                                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.lastName}>
                                <FormLabel htmlFor='lastName'>Ваша фамилия</FormLabel>
                                <Input
                                    data-test-id={DataTestId.LastNameInput}
                                    id='lastName'
                                    placeholder='Фамилия'
                                    mb={2}
                                    {...INPUT_STYLES}
                                    {...register('lastName', { onBlur: handleTrimBlur })}
                                />
                                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor='registerEmail'>Ваш e-mail</FormLabel>
                                <Input
                                    data-test-id={DataTestId.EmailInput}
                                    id='registerEmail'
                                    type='email'
                                    placeholder='example@email.com'
                                    mb={2}
                                    {...INPUT_STYLES}
                                    {...register('email', { onBlur: handleTrimBlur })}
                                />
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>
                            <Button
                                {...BUTTON_STYLES}
                                type='button'
                                sx={{ ...BUTTON_STYLES.sx, mt: 9 }}
                                onClick={handleStepNext}
                                data-test-id={DataTestId.SubmitBtn}
                            >
                                Дальше
                            </Button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <FormControl isInvalid={!!errors.login}>
                                <FormLabel htmlFor='login'>Логин для входа на сайт</FormLabel>
                                <Input
                                    data-test-id={DataTestId.LoginInput}
                                    id='login'
                                    type='text'
                                    placeholder='bake_and_pie'
                                    mb={2}
                                    {...INPUT_STYLES}
                                    {...register('login', { onBlur: handleTrimBlur })}
                                />
                                <Text fontSize={14} color='blackAlpha.700'>
                                    Логин не менее 5 символов, только латиница и !@#$&_+-.
                                </Text>
                                <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel htmlFor='registerPassword'>Пароль</FormLabel>
                                <InputGroup>
                                    <Input
                                        data-test-id={DataTestId.PasswordInput}
                                        id='registerPassword'
                                        type={showPassword ? InputType.Text : InputType.Password}
                                        placeholder='Введите пароль'
                                        mb={2}
                                        {...INPUT_STYLES}
                                        {...register('password')}
                                    />
                                    <InputRightElement h={12}>
                                        <IconButton
                                            aria-label={
                                                showPassword
                                                    ? InputAriaLabel.Hide
                                                    : InputAriaLabel.Show
                                            }
                                            icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            variant='ghost'
                                            size='sm'
                                            border='none'
                                            sx={{
                                                '&:hover': {
                                                    bgColor: 'white',
                                                },
                                            }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <Text fontSize={14} color='blackAlpha.700'>
                                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                                </Text>
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.confirmPassword}>
                                <FormLabel htmlFor='confirmPassword'>
                                    Подтверждение пароля
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        data-test-id={DataTestId.ConfirmPasswordInput}
                                        id='confirmPassword'
                                        type={
                                            showConfirmPassword
                                                ? InputType.Text
                                                : InputType.Password
                                        }
                                        placeholder='Повторите пароль'
                                        mb={2}
                                        {...INPUT_STYLES}
                                        {...register('confirmPassword')}
                                    />
                                    <InputRightElement h={12}>
                                        <IconButton
                                            aria-label={
                                                showConfirmPassword
                                                    ? InputAriaLabel.Hide
                                                    : InputAriaLabel.Show
                                            }
                                            icon={
                                                showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />
                                            }
                                            variant='ghost'
                                            size='sm'
                                            border='none'
                                            sx={{
                                                '&:hover': {
                                                    bgColor: 'white',
                                                },
                                            }}
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.confirmPassword?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                data-test-id={DataTestId.SubmitBtn}
                                {...BUTTON_STYLES}
                                sx={{ ...BUTTON_STYLES.sx, mt: 9 }}
                            >
                                Зарегистрироваться
                            </Button>
                        </>
                    )}
                </VStack>
            </form>
            <RegisterSuccessModal
                isOpen={isRegistrationSuccess}
                onClose={setIsRegistrationSuccess}
                email={formValues.email}
            />

            <VerificationExpiredModal isOpen={isErrorModalOpen} onClose={handleModalClose} />
        </>
    );
};
