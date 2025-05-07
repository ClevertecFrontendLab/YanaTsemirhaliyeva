import { Center, type CenterProps, Spinner, type SpinnerProps } from '@chakra-ui/react';

type LoaderProps = SpinnerProps & { boxSize: CenterProps['boxSize'] & (number | string) };

export const Loader = ({ boxSize, ...spinnerProps }: LoaderProps) => (
    <Center
        pos='relative'
        h={boxSize}
        w={boxSize}
        bgGradient='radial(50% 50% at 50% 50%, lime.300 0%, transparent 95%)'
        borderRadius='50%'
        border='none'
        outline='none'
        shadow='none'
        _before={{
            content: '""',
            zIndex: -1,
            pos: 'absolute',
            borderRadius: '50%',
            top: '0',
            left: '0',
            w: '100%',
            h: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'overlay',
        }}
    >
        <Spinner
            {...spinnerProps}
            thickness='2px'
            speed='0.6s'
            background='transparent'
            boxSize={{ base: 6, sm: '37px' }}
        />
    </Center>
);
