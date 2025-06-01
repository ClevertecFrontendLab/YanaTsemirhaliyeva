import { Center, ModalOverlayProps, useBreakpointValue } from '@chakra-ui/react';

import { DataTestId } from '~/consts/consts';

import { Loader } from '../loader/Loader';

type LoaderFullsizeProps = {
    isOpen: boolean;
    zIndex?: number;
    overlayColor?: ModalOverlayProps['bgColor'];
};

export const LoaderFullsize = ({
    isOpen,
    zIndex = 10,
    overlayColor = 'blackAlpha.600',
}: LoaderFullsizeProps) => {
    const isMobileWidth = useBreakpointValue({ base: true, md: false }) ?? true;
    if (!isOpen) return null;
    return (
        <Center
            position='fixed'
            top={0}
            left={0}
            h='100vh'
            w='100vw'
            zIndex={zIndex}
            bgColor={overlayColor}
        >
            <Loader
                boxSize={isMobileWidth ? 134 : 206}
                size='xl'
                color='black'
                data-test-id={DataTestId.AppLoader}
            />
        </Center>
    );
};
