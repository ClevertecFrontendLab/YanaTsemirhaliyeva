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
    useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router';

import { AppRoute, DataTestId } from '~/consts/consts';

import { MODAL_CLOSE_BUTTON_STYLES } from './consts';

type RegisterSuccessProps = {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
    email: string;
};

export const RegisterSuccessModal = ({ isOpen, onClose, email }: RegisterSuccessProps) => {
    const navigate = useNavigate();
    const isMobile = useBreakpointValue({ base: true, md: false });

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
                sx={{ fontFamily: 'Inter' }}
                data-test-id={DataTestId.SignUpSeccessModal}
            >
                <Image src='img/modals/registration-success.jpg' boxSize={{ base: 108, md: 206 }} />
                <ModalCloseButton
                    data-test-id={DataTestId.CloseBtn}
                    {...MODAL_CLOSE_BUTTON_STYLES}
                />
                <ModalBody p={0}>
                    <Heading
                        as='h1'
                        textAlign='center'
                        color='black'
                        fontSize={24}
                        mb={4}
                        lineHeight='1.3'
                        pt='10px'
                    >
                        Остался последний шаг. Нужно верифицировать
                        <Text as='span' whiteSpace='nowrap' display='inline-block'>
                            &nbsp;ваш e-mail
                        </Text>
                    </Heading>
                    <Text textAlign='center' color='blackAlpha.900'>
                        Мы отправили вам на почту
                        <Text fontWeight={600} as='span' display='block'>
                            {email}
                        </Text>
                        ссылку для верификации.
                    </Text>
                </ModalBody>
                <ModalFooter p={0} pt={2}>
                    <Text textAlign='center' color='blackAlpha.600' fontSize={12}>
                        Не пришло письмо?
                        {isMobile && <br />}
                        &nbsp;Проверьте папку Спам.&nbsp;
                        <br /> По другим вопросам свяжитесь&nbsp;
                        {isMobile && <br />}
                        <Link as={RouterLink} to='#'>
                            с&nbsp;поддержкой
                        </Link>
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
