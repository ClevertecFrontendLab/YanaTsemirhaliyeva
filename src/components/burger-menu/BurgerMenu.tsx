import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/react';

import { DataTestId } from '~/consts/consts';

import { AccordionMenu } from '../accordion-menu/AccordionMenu';
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';
import { FooterAside } from '../footer-aside/FooterAside';

type BurgerMenuProps = {
    onClose: () => void;
    isOpen: boolean;
    burgerButtonRef?: React.RefObject<HTMLElement>;
};
export const BurgerMenu = ({ onClose, isOpen }: BurgerMenuProps) => (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
            data-test-id={DataTestId.Nav}
            minW='344px'
            style={{
                top: '64px',
                height: 'calc(100vh - 148px)',
                right: '8px',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                overflow: 'hidden',
                width: '344px',
            }}
            sx={{
                '@media screen and (max-width: 360px)': {
                    left: '8px',
                },
            }}
        >
            <DrawerHeader p='16px 20px 22px' fontSize={16} fontWeight={400}>
                <Breadcrumbs onBreadcrumbClick={onClose} />
            </DrawerHeader>
            <DrawerBody
                p={0}
                mr={1}
                mb={2}
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'blackAlpha.300',
                        borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: 'blackAlpha.400',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'blackAlpha.200',
                        borderRadius: '8px',
                    },
                }}
            >
                <AccordionMenu />
            </DrawerBody>
            <DrawerFooter p={0} justifyContent='flex-start'>
                <FooterAside as='div' />
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
);
