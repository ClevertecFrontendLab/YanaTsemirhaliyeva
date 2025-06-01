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
    VStack,
} from '@chakra-ui/react';

import { DataTestId } from '~/consts/consts';
import { WriteDraftIcon } from '~/shared/custom-icons';

import modalImg from '../../assets/img/meal.jpg';
import { BUTTON_STYLES, MODAL_CLOSE_BUTTON_STYLES } from '../auth-modals/consts';

type ConfirmFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSaveDraft: () => void;
    onLeaveWithoutSaving: () => void;
};

export const ConfirmFormModal = ({
    isOpen,
    onClose,
    onSaveDraft,
    onLeaveWithoutSaving,
}: ConfirmFormModalProps) => {
    const handleCloseClick = () => {
        onClose();
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
                data-test-id={DataTestId.RecipePreventiveModal}
            >
                <Image src={modalImg} boxSize={{ base: 108, md: 206 }} />
                <ModalCloseButton
                    {...MODAL_CLOSE_BUTTON_STYLES}
                    data-test-id={DataTestId.CloseBtn}
                />
                <ModalBody p={0}>
                    <Heading
                        as='h1'
                        textAlign='center'
                        color='black'
                        fontSize={24}
                        mb={4}
                        sx={{ fontFamily: 'Inter' }}
                        pt={3}
                    >
                        Выйти без сохранения?
                    </Heading>
                    <Text textAlign='center' color='blackAlpha.700'>
                        Чтобы сохранить, нажмите кнопку сохранить черновик
                    </Text>
                    <VStack gap={5}>
                        <Button
                            {...BUTTON_STYLES}
                            sx={{ ...BUTTON_STYLES.sx, mt: 8 }}
                            onClick={onSaveDraft}
                            leftIcon={<WriteDraftIcon boxSize={4} />}
                        >
                            Сохранить черновик
                        </Button>
                        <Button
                            colorScheme='black'
                            color='black'
                            variant='ghost'
                            onClick={onLeaveWithoutSaving}
                            fontSize={18}
                        >
                            Выйти без сохранения
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
