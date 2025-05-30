import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ALERT_MESSAGES, DataTestId } from '~/consts/consts';
import { INPUT_STYLES } from '~/consts/styles';
import { useForgotPasswordMutation } from '~/query/services/auth';
import { PasswordRecoveryFormValues, passwordRecoverySchema } from '~/schemas/auth.schema';
import { useAppDispatch } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/auth-slice';

import { BORDER_COLOR_STYLES, BUTTON_STYLES, MODAL_CLOSE_BUTTON_STYLES } from './consts';

type PasswordRecoveryProps = {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
    onSubmit: (email: string) => void;
};

export const PasswordRecoveryModal = ({ isOpen, onClose, onSubmit }: PasswordRecoveryProps) => {
    const dispatch = useAppDispatch();
    const [isServerError, setIsServerError] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<PasswordRecoveryFormValues>({
        resolver: zodResolver(passwordRecoverySchema),
        defaultValues: { email: '' },
        mode: 'onChange',
    });

    useEffect(() => {
        if (isOpen) {
            setValue('email', '');
            reset({ email: '' });
        }
    }, [isOpen, setValue, reset]);

    const handleRecoverySubmit = async (data: PasswordRecoveryFormValues) => {
        try {
            setIsServerError(false);
            await forgotPassword(data).unwrap();
            onSubmit(data.email);
            onClose(false);
        } catch (error) {
            setIsServerError(true);
            const apiError = error as FetchBaseQueryError;

            if (apiError.status === 403) {
                setValue('email', '');
                dispatch(setAlertStatus(ALERT_MESSAGES.EMAIL_NOT_FOUND));
            } else {
                reset();
                dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
            }
        }
    };

    const handleCloseClick = () => {
        setValue('email', '');
        reset({ email: '' });
        onClose(false);
    };

    const handleInputChange = () => {
        isServerError && setIsServerError(false);
    };

    return (
        <Modal onClose={handleCloseClick} isOpen={isOpen} isCentered>
            <ModalOverlay onClick={handleCloseClick} />
            <ModalContent
                sx={{ fontFamily: 'Inter' }}
                p={8}
                alignItems='center'
                w={{ base: 316, md: 396 }}
                borderRadius={16}
                gap={6}
                data-test-id={DataTestId.SendEmailModal}
            >
                <Image src='img/modals/meal.jpg' boxSize={{ base: 108, md: 206 }} />
                <ModalCloseButton
                    data-test-id={DataTestId.CloseBtn}
                    {...MODAL_CLOSE_BUTTON_STYLES}
                />
                <ModalBody p={0}>
                    <Text textAlign='center' color='blackAlpha.900' px={5} mb={4} pt='10px'>
                        Для восстановления входа введите ваш e-mail, куда можно отправить уникальный
                        код
                    </Text>
                    <form onSubmit={handleSubmit(handleRecoverySubmit)}>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel htmlFor='modalPasswordRecovery'>Ваш e-mail</FormLabel>
                            <Input
                                data-test-id={DataTestId.EmailInput}
                                id='modalPasswordRecovery'
                                type='email'
                                placeholder='e-mail'
                                mb={2}
                                {...INPUT_STYLES}
                                borderColor='lime.150'
                                sx={BORDER_COLOR_STYLES(isServerError)}
                                onInput={handleInputChange}
                                {...register('email')}
                            />
                            <FormErrorMessage fontSize={12}>
                                {errors.email?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            data-test-id={DataTestId.SubmitBtn}
                            {...BUTTON_STYLES}
                            sx={{ ...BUTTON_STYLES.sx, mt: 3 }}
                        >
                            Получить код
                        </Button>
                    </form>
                </ModalBody>
                <ModalFooter p={0}>
                    <Text textAlign='center' color='blackAlpha.600' fontSize={12}>
                        Не пришло письмо? Проверьте папку Спам.
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
