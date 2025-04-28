import { Flex, Link, Text, VStack } from '@chakra-ui/react';
import { cloneElement, ReactElement } from 'react';
import { Link as RouterLink } from 'react-router';

type ShadowIconProps = {
    route: string;
    title: string;
    icon: ReactElement;
    fontSize?: string;
};

export const ShadowIcon = ({ route = '#', title, icon, fontSize = '12px' }: ShadowIconProps) => (
    <Link
        as={RouterLink}
        to={route}
        position='relative'
        z-index={3}
        _hover={{
            textDecoration: 'none',
            color: 'black',
            '& .icon-container': {
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px rgba(196, 255, 97, 0.6)',
                    zIndex: -1,
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '-5px',
                    left: '-20px',
                    right: '-20px',
                    bottom: '-15px',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(196, 255, 97, 0.4) 0%, rgba(255, 255, 255, 0) 100%)', // Радиальный градиент
                    zIndex: -1,
                },
            },
        }}
    >
        <VStack gap={0}>
            <Flex
                pos='relative'
                zIndex={2}
                className='icon-container'
                boxSize='48px'
                alignItems='center'
                justifyContent='center'
                borderRadius='50%'
            >
                {cloneElement(icon)}
            </Flex>
            <Text fontSize={fontSize}>{title}</Text>
        </VStack>
    </Link>
);
