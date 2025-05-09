import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    IconButton,
    Image,
    Link,
    Show,
    Spacer,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Link as RouterLink } from 'react-router';

import { DataTestId } from '~/consts/consts';
import { useAppDispatch } from '~/store/hooks';
import { setCategory, setSubcategory } from '~/store/slices/recipes-slice';

import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';
import { BurgerMenu } from '../burger-menu/BurgerMenu';
import { User } from '../user/User';
import { UserNav } from '../user-nav/UserNav';

export const Header = () => {
    const dispatch = useAppDispatch();
    const isMdOrAbove = useBreakpointValue({ base: false, md: true });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const burgerButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleReset = () => {
        dispatch(setCategory(null));
        dispatch(setSubcategory(null));
        onClose();
    };

    return (
        <Box
            as='header'
            bgColor={isOpen ? 'white' : 'lime.50'}
            pos='fixed'
            top='0'
            left='0'
            width='100%'
            minW='359px'
            zIndex={isOpen ? '1500' : '3'}
            data-test-id={DataTestId.Header}
        >
            <Flex
                m='0 auto'
                alignItems='center'
                p={{ base: '14px 18px', sm: '16px 56px 16px 18px' }}
                pr={{ '2xs': 6, md: '76px' }}
            >
                <Link
                    as={RouterLink}
                    to='/'
                    w={{ base: '34px', '2xs': '135px' }}
                    h='auto'
                    mr={{ md: '128px' }}
                    onClick={handleReset}
                >
                    <Show above='2xs'>
                        <Image src='/logo-full.svg' alt='logo' />
                    </Show>
                    <Show below='2xs'>
                        <Image src='/logo.svg' alt='logo' />
                    </Show>
                </Link>
                {isMdOrAbove && <Breadcrumbs />}
                <Spacer />
                <Show above='md'>
                    <Flex minW='359px' justifyContent='flex-end'>
                        <User />
                    </Flex>
                </Show>
                <Show below='md'>{!isOpen && <UserNav />}</Show>
                <Box
                    sx={{
                        '@media screen and (min-width: 1200px)': {
                            display: 'none',
                        },
                    }}
                >
                    {!isOpen && (
                        <IconButton
                            data-test-id={DataTestId.Hamburger}
                            ref={burgerButtonRef}
                            aria-label='Toggle menu'
                            icon={<HamburgerIcon />}
                            onClick={onOpen}
                            backgroundColor='inherit'
                            _hover={{
                                backgroundColor: 'inherit',
                                border: 'transparent',
                                color: 'gray.600',
                            }}
                            _focus={{
                                outline: 'none',
                            }}
                            zIndex={3000}
                        />
                    )}
                    {isOpen && (
                        <IconButton
                            data-test-id={DataTestId.HamburgerCloseBtn}
                            boxSize={10}
                            minW={0}
                            aria-label='Close menu'
                            icon={<CloseIcon boxSize={3} />}
                            onClick={onClose}
                            variant='ghost'
                            color='gray.700'
                            _hover={{
                                backgroundColor: 'inherit',
                                border: 'transparent',
                                color: 'gray.600',
                            }}
                            _focus={{
                                outline: 'none',
                            }}
                        />
                    )}
                    <Box>{isOpen && <BurgerMenu onClose={onClose} isOpen={isOpen} />}</Box>
                </Box>
            </Flex>
        </Box>
    );
};
