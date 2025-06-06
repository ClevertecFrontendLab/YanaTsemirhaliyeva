import { Center, ModalOverlayProps, useBreakpointValue } from '@chakra-ui/react';

import { DataTestId } from '~/consts/consts';

import { Loader } from '../loader/Loader';

type LoaderFullsizeProps = {
    isLoading: boolean;
    zIndex?: number;
    overlayColor?: ModalOverlayProps['bgColor'];
};

export const LoaderFullsize = ({
    isLoading,
    zIndex = 10,
    overlayColor = 'blackAlpha.600',
}: LoaderFullsizeProps) => {
    const isMobileWidth = useBreakpointValue({ base: true, md: false }) ?? true;
    if (!isLoading) return null;
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
