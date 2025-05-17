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
import { Link as RouterLink, useNavigate } from 'react-router';

import { AppRoute, DataTestId } from '~/consts/consts';

type RegisterSuccessProps = {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
    email: string;
};

export const RegisterSuccessModal = ({ isOpen, onClose, email }: RegisterSuccessProps) => {
    const navigate = useNavigate();
    const handleCloseClick = () => {
        onClose(false);
        navigate(AppRoute.Login);
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
                data-test-id={DataTestId.SignUpSeccessModal}
            >
                <Image src='img/modals/registration-success.jpg' boxSize={{ base: 108, md: 206 }} />
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
                        Остался последний шаг. Нужно верифицировать ваш e-mail
                    </Heading>
                    <Text textAlign='center' color='blackAlpha.900'>
                        Мы отправили вам на почту {email} ссылку для верификации.
                    </Text>
                </ModalBody>
                <ModalFooter p={0}>
                    <Text textAlign='center' color='blackAlpha.600' fontSize={12}>
                        Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь&nbsp;
                        <Link as={RouterLink} to='#'>
                            с поддержкой
                        </Link>
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
