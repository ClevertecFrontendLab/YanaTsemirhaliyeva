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
                data-test-id={DataTestId.SignInErrorModal}
            >
                <Image src='img/modals/meal.jpg' boxSize={{ base: 108, md: 206 }} />
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
                    <Heading as='h1' textAlign='center' color='black' fontSize={24} mb={8}>
                        Вход не выполнен
                    </Heading>
                    <Text textAlign='center' color='blackAlpha.900'>
                        Что-то пошло не так.
                        <br />
                        Попробуйте еще раз
                    </Text>
                    <form>
                        <Button
                            data-test-id={DataTestId.RepeatBtn}
                            type='submit'
                            variant='solid'
                            bgColor='black'
                            color='white'
                            width='full'
                            mt={6}
                            size='md'
                            py={6}
                            transition='border-color 0.3s ease-in-out'
                            sx={{
                                '&:hover': {
                                    bgColor: 'black',
                                    borderColor: 'white',
                                },
                            }}
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
