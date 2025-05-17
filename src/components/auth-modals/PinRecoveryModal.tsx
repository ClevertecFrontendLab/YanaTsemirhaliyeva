import {
    Heading,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    PinInput,
    PinInputField,
    Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { DataTestId } from '~/consts/consts';
import { generateTestId } from '~/utils';

const PIN = [1, 2, 3, 4, 5, 6];

type PinRecoveryProps = {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
    onSubmit: (otpToken: string) => void;
    isError: boolean;
    email: string;
    errorStatus?: number;
};

export const PinRecoveryModal = ({
    isOpen,
    onClose,
    onSubmit,
    isError,
    email,
    errorStatus,
}: PinRecoveryProps) => {
    const [pinValue, setPinValue] = useState('');
    const firstPinFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isError || errorStatus) {
            setPinValue('');
            requestAnimationFrame(() => {
                if (firstPinFieldRef.current) {
                    firstPinFieldRef.current.focus();
                }
            });
        }
    }, [isError, errorStatus]);

    const handlePinChange = (value: string) => {
        setPinValue(value);
    };

    const handleCloseClick = () => {
        onClose(false);
    };

    const handleComplete = (otpToken: string) => {
        if (otpToken.length === 6) {
            onSubmit(otpToken);
        }
    };

    return (
        <Modal onClose={handleCloseClick} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent
                p={8}
                alignItems='center'
                w={{ base: 316, md: 396 }}
                borderRadius={16}
                gap={6}
                data-test-id={DataTestId.VerificationCodeModal}
            >
                <Image src='img/modals/otp-recovery.jpg' boxSize={{ base: 108, md: 206 }} />
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
                    {isError && errorStatus === 403 && (
                        <Heading as='h1' textAlign='center' color='black' fontSize={24} mb={8}>
                            Неверный код
                        </Heading>
                    )}
                    <Text textAlign='center' color='blackAlpha.900' px={5} mb={4}>
                        Мы отправили вам на e-mail
                        <Text fontWeight={600} as='span' display='inline-block'>
                            &nbsp;{email}&nbsp;
                        </Text>
                        шестизначный код. Введите его ниже.
                    </Text>
                    <form>
                        <HStack justifyContent='center'>
                            <PinInput
                                otp
                                value={pinValue}
                                onChange={handlePinChange}
                                onComplete={handleComplete}
                                autoFocus
                            >
                                {PIN.map((pin, i) => {
                                    const id = generateTestId(
                                        DataTestId.VerificationCodeInput,
                                        pin,
                                    );
                                    return (
                                        <PinInputField
                                            key={i}
                                            ref={i === 0 ? firstPinFieldRef : undefined}
                                            data-test-id={id}
                                            borderColor={isError ? 'red.500' : 'blackAlpha.500'}
                                        />
                                    );
                                })}
                            </PinInput>
                        </HStack>
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
