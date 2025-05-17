import {
    Heading,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { DataTestId } from '~/consts/consts';

import { MODAL_CLOSE_BUTTON_STYLES } from './consts';

type VerificationExpiredProps = {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
};

export const VerificationExpiredModal = ({ isOpen, onClose }: VerificationExpiredProps) => {
    const handleCloseClick = () => {
        onClose(false);
    };

    return (
        <Modal onClose={handleCloseClick} isOpen={isOpen} isCentered>
            <ModalOverlay onClick={handleCloseClick} />
            <ModalContent
                p={8}
                alignItems='center'
                w={{ base: 316, md: 396 }}
                borderRadius={16}
                gap={6}
                sx={{ fontFamily: 'Inter' }}
                data-test-id={DataTestId.EmailVerificationFailedModal}
            >
                <Image src='img/modals/verification-expired.jpg' boxSize={{ base: 108, md: 206 }} />
                <ModalCloseButton
                    data-test-id={DataTestId.CloseBtn}
                    {...MODAL_CLOSE_BUTTON_STYLES}
                />
                <ModalBody p={0}>
                    <Heading as='h1' textAlign='center' color='black' fontSize={24} mb={8}>
                        Упс! Что-то пошло не так
                    </Heading>
                    <Text textAlign='center' color='blackAlpha.900'>
                        Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                        снова.
                    </Text>
                </ModalBody>
                <ModalFooter p={0}>
                    <Text textAlign='center' color='blackAlpha.600' fontSize={12}>
                        Остались вопросы? Свяжитесь&nbsp;
                        <Link as={RouterLink} to='#'>
                            с поддержкой
                        </Link>
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
