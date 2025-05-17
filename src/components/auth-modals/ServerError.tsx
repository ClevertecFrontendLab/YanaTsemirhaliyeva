import {
    Button,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { DataTestId } from '~/consts/consts';

import { BUTTON_STYLES, MODAL_CLOSE_BUTTON_STYLES } from './consts';

type ServerErrorProps = {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
    onRetry: () => void;
};

export const ServerErrorModal = ({ isOpen, onClose, onRetry }: ServerErrorProps) => {
    const handleCloseClick = () => {
        onClose(false);
    };

    const handleRetryClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose(false);
        setTimeout(() => {
            onRetry();
        }, 0);
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
                data-test-id={DataTestId.SignInErrorModal}
            >
                <Image src='img/modals/meal.jpg' boxSize={{ base: 108, md: 206 }} />
                <ModalCloseButton
                    data-test-id={DataTestId.CloseBtn}
                    {...MODAL_CLOSE_BUTTON_STYLES}
                />
                <ModalBody p={0}>
                    <Heading as='h1' textAlign='center' color='black' fontSize={24} mb={8}>
                        Вход не выполнен
                    </Heading>
                    <Text textAlign='center' color='blackAlpha.700'>
                        Что-то пошло не так.
                        <br />
                        Попробуйте еще раз
                    </Text>
                    <form>
                        <Button
                            data-test-id={DataTestId.RepeatBtn}
                            {...BUTTON_STYLES}
                            sx={{ ...BUTTON_STYLES.sx, mt: 6 }}
                            onClick={handleRetryClick}
                        >
                            Повторить
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
