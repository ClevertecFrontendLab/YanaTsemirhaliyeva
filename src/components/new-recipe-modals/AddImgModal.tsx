import {
    Box,
    Button,
    Heading,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import { ALERT_MESSAGES, API_IMG, DataTestId } from '~/consts/consts';
import { useUploadFileMutation } from '~/query/services/new-recipe';
import { UploadImg } from '~/shared/custom-icons';
import { useAppDispatch } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';

import { MODAL_CLOSE_BUTTON_STYLES } from '../auth-modals/consts';

type AddImgModalProps = {
    isOpen: boolean;
    onClose: (imageUrl?: string) => void;
    imgPreview: string | null;
    onDelete: () => void;
    index: number | string;
    dataTestId: string;
};

export const AddImgModal = ({
    isOpen,
    onClose,
    imgPreview,
    onDelete,
    index,
    dataTestId,
}: AddImgModalProps) => {
    const dispatch = useAppDispatch();
    const [img, setImg] = useState<File | null>(null);
    const [uploadFile, { isLoading }] = useUploadFileMutation();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImg(file);
    };

    const handleUpload = async () => {
        if (!img) return;

        try {
            const result = await uploadFile(img).unwrap();
            onClose(result.url);
            setImg(null);
        } catch {
            dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_UPLOAD_IMG_ERROR));
        }
    };

    const handleModalClose = () => {
        setImg(null);
        onClose();
    };

    return (
        <Modal onClose={handleModalClose} isOpen={isOpen} isCentered>
            <ModalOverlay onClick={handleModalClose} />
            <ModalContent
                data-test-id={DataTestId.RecipeImageModal}
                p={8}
                pb={10}
                alignItems='center'
                w={{ base: 316, md: 396 }}
                borderRadius={16}
                gap={6}
                sx={{ fontFamily: 'Inter' }}
            >
                <ModalCloseButton {...MODAL_CLOSE_BUTTON_STYLES} />
                <ModalBody p={0}>
                    <Heading
                        as='h1'
                        textAlign='center'
                        color='black'
                        fontSize={24}
                        mb={8}
                        lineHeight='1.3'
                        sx={{ fontFamily: 'Inter' }}
                    >
                        Изображение
                    </Heading>
                    <Box w='206px' h='206px'>
                        <Box
                            w='100%'
                            h='100%'
                            bgColor='blackAlpha.200'
                            borderRadius={8}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            cursor='pointer'
                            onClick={() =>
                                document.getElementById(`fileInputStep-${index}`)?.click()
                            }
                            overflow='hidden'
                            data-test-id={DataTestId.RecipeImageModalBlock}
                        >
                            {img && (
                                <Image
                                    src={URL.createObjectURL(img)}
                                    w='100%'
                                    h='100%'
                                    objectFit='cover'
                                    data-test-id={DataTestId.RecipePreviewImageModal}
                                />
                            )}
                            {!img && imgPreview && (
                                <Image
                                    src={`${API_IMG}${imgPreview}`}
                                    w='100%'
                                    h='100%'
                                    objectFit='cover'
                                    data-test-id={DataTestId.RecipePreviewImageModal}
                                />
                            )}
                            {!img && !imgPreview && <UploadImg w='33px' h='32px' />}
                        </Box>
                        <Input
                            id={`fileInputStep-${index}`}
                            data-test-id={dataTestId}
                            type='file'
                            display='none'
                            onChange={handleFileChange}
                        />
                    </Box>
                </ModalBody>
                {(img || imgPreview) && (
                    <ModalFooter p={0} pt={2} justifyContent='center' w='100%' flexWrap='wrap'>
                        <Button
                            w='100%'
                            size='lg'
                            colorScheme='black'
                            variant='solid'
                            bgColor='black'
                            color='white'
                            fontWeight={600}
                            fontSize={18}
                            px={{ base: 2, sm: 3 }}
                            sx={{
                                transition: 'all 0.3s ease-in-out',
                                '&:focus': {
                                    outline: 'none',
                                    borderColor: 'transparent',
                                },
                                '&:hover': {
                                    bgColor: 'white',
                                    color: 'black',
                                    borderColor: 'black',
                                },
                            }}
                            onClick={handleUpload}
                            isLoading={isLoading}
                        >
                            Сохранить
                        </Button>
                        <Button
                            colorScheme='black'
                            variant='ghost'
                            color='black'
                            onClick={onDelete}
                            size='lg'
                        >
                            Удалить
                        </Button>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};
