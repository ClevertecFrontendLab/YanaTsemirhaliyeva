import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalOverlayProps,
    useBreakpointValue,
} from '@chakra-ui/react';

import { DataTestId } from '~/consts/consts';

import { Loader } from '../loader/Loader';

type LoaderFullsizeProps = {
    isOpen: boolean;
    overlayColor?: ModalOverlayProps['bgColor'];
};

export const LoaderFullsize = ({ isOpen, overlayColor = 'black.300' }: LoaderFullsizeProps) => {
    const isMobileWidth = useBreakpointValue({ base: true, md: false }) ?? true;

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => console.log('AppLoader закрыт')}
            closeOnEsc={false}
            isCentered={true}
        >
            <ModalOverlay bgColor={overlayColor} backdropFilter='blur(4px)' pointerEvents='none' />
            <ModalContent w='fit-content' bg='transparent' border='none' shadow='none'>
                <Loader
                    boxSize={isMobileWidth ? 134 : 206}
                    size='xl'
                    color='black'
                    data-test-id={DataTestId.AppLoader}
                />
            </ModalContent>
        </Modal>
    );
};
