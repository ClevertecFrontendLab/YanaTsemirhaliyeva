import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ALERT_MESSAGES, DataTestId } from '~/consts/consts';
import { useResetPasswordMutation } from '~/query/services/auth';
import { ResetPasswordParams } from '~/query/types/authApi.types';
import { resetPasswordSchema } from '~/schemas/auth.schema';
import { useAppDispatch } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/auth-slice';

import { LoaderFullsize } from '../loader-fullsize/LoaderFullsize';

type ResetPasswordProps = {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
    email: string;
};

export const ResetPasswordModal = ({ isOpen, onClose, email }: ResetPasswordProps) => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        getValues,
        setValue,
    } = useForm<ResetPasswordParams>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { email: email, login: '', password: '', passwordConfirm: '' },
        mode: 'onChange',
    });

    useEffect(() => {
        if (email) {
            setValue('email', email);
        }
    }, [email, setValue]);

    const handleResetPasswordSubmit = async (data: ResetPasswordParams) => {
        try {
            data.email = email;
            await resetPassword(data).unwrap();
            dispatch(setAlertStatus(ALERT_MESSAGES.RECOVERY_SUCCESS));
            onClose(false);
        } catch {
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        }
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const values = getValues();
        let hasErrors = false;

        if (!values.login) {
            setError('login', { message: 'Введите логин' });
            hasErrors = true;
        }

        if (!values.password) {
            setError('password', { message: 'Введите пароль' });
            hasErrors = true;
        }

        if (!values.passwordConfirm) {
            setError('passwordConfirm', { message: 'Повторите пароль' });
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        handleSubmit(handleResetPasswordSubmit)(e);
    };

    const handleTrimBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.type !== 'password') {
            setValue('login', event.target.value.trim());
        }
    };

    const handleCloseClick = () => {
        onClose(false);
    };

    return (
        <>
            <Modal onClose={handleCloseClick} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent
                    p={8}
                    alignItems='center'
                    w={{ base: 316, md: 396 }}
                    borderRadius={16}
                    gap={6}
                    data-test-id={DataTestId.ResetCredentialsModal}
                >
                    <ModalCloseButton
                        data-test-id={DataTestId.CloseBtn}
                        borderRadius='50%'
                        border='1px solid black'
                        top={6}
                        right={6}
                        sx={{
                            '&:hover': {
                                borderColor: 'black',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                        }}
                    />
                    <ModalBody p={0}>
                        <Heading
                            as='h1'
                            textAlign='center'
                            color='black'
                            fontSize={24}
                            mb={8}
                            px={10}
                            pt={1}
                        >
                            Восстановление аккаунта
                        </Heading>
                        <form onSubmit={onFormSubmit}>
                            <VStack justifyContent='center'>
                                <FormControl isInvalid={!!errors.login}>
                                    <FormLabel htmlFor='login'>Логин для входа на сайт</FormLabel>
                                    <Input
                                        data-test-id={DataTestId.LoginInput}
                                        id='login'
                                        type='text'
                                        placeholder='bake_and_pie'
                                        bgColor='white'
                                        mb={2}
                                        size='md'
                                        minH={12}
                                        borderColor='lime.150'
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
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Введите пароль'
                                            bgColor='white'
                                            mb={2}
                                            minH={12}
                                            borderColor='lime.150'
                                            {...register('password')}
                                        />
                                        <InputRightElement h={12}>
                                            <IconButton
                                                aria-label={
                                                    showPassword
                                                        ? 'Скрыть пароль'
                                                        : 'Показать пароль'
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

                                <FormControl isInvalid={!!errors.passwordConfirm}>
                                    <FormLabel htmlFor='confirmPassword'>
                                        Подтверждение пароля
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            data-test-id={DataTestId.ConfirmPasswordInput}
                                            id='confirmPassword'
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder='Повторите пароль'
                                            bgColor='white'
                                            mb={2}
                                            minH={12}
                                            borderColor='lime.150'
                                            {...register('passwordConfirm')}
                                        />
                                        <InputRightElement h={12}>
                                            <IconButton
                                                aria-label={
                                                    showConfirmPassword
                                                        ? 'Скрыть пароль'
                                                        : 'Показать пароль'
                                                }
                                                icon={
                                                    showConfirmPassword ? (
                                                        <ViewIcon />
                                                    ) : (
                                                        <ViewOffIcon />
                                                    )
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
                                        {errors.passwordConfirm?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button
                                    data-test-id={DataTestId.SubmitBtn}
                                    type='submit'
                                    variant='solid'
                                    bgColor='black'
                                    color='white'
                                    width='full'
                                    size='md'
                                    py={6}
                                    transition='border-color 0.3s ease-in-out'
                                    sx={{
                                        '&:hover': {
                                            bgColor: 'black',
                                            borderColor: 'lime.150',
                                        },
                                    }}
                                >
                                    Зарегистрироваться
                                </Button>
                            </VStack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <LoaderFullsize isOpen={isLoading} />
        </>
    );
};
