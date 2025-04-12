import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { LIST_MENU } from '~/consts/menu-list';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    currentCategorySelector,
    currentSubcategorySelector,
    setCategory,
    setSubcategory,
} from '~/store/slices/category-slice';

export const AccordionMenu = () => {
    const currentCategory = useAppSelector(currentCategorySelector);
    const currentSubcategory = useAppSelector(currentSubcategorySelector);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentCategory) {
            const index = Object.keys(LIST_MENU).findIndex(
                (category) => category === currentCategory,
            );
            setActiveIndex(index);
        } else {
            setActiveIndex(-1);
        }
    }, [currentCategory]);

    return (
        <Box
            pl='10px'
            py={2}
            maxH='calc(100vh - 256px)'
            borderRadius={4}
            sx={{
                ...(activeIndex !== -1 && {
                    boxShadow:
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }),
            }}
        >
            <Accordion
                pr={1}
                maxH='100%'
                overflowY='auto'
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
                        background: 'blackAlpha.50',
                        borderRadius: '8px',
                    },
                }}
                onChange={(index) => {
                    if (typeof index === 'number') {
                        setActiveIndex(index);
                    }
                }}
                index={activeIndex}
            >
                {Object.entries(LIST_MENU).map(([category, { icon, subcategories }], index) => (
                    <AccordionItem key={index} border='none'>
                        <AccordionButton
                            p={3}
                            pl={2}
                            pr={4}
                            border='none'
                            borderRadius='none'
                            _hover={{
                                backgroundColor: 'lime.50',
                                border: 'none',
                            }}
                            _expanded={{
                                fontWeight: '600',
                                backgroundColor: 'lime.100',
                            }}
                            _focus={{
                                outline: 'none',
                            }}
                            onClick={() => {
                                dispatch(setCategory(category));
                                dispatch(setSubcategory(subcategories[0]));
                                navigate('/vegan-cuisine');
                            }}
                        >
                            <Image src={icon} boxSize='24px' alt={category} mr='12px' />
                            <Box
                                flex='1'
                                textAlign='left'
                                isTruncated
                                {...(category === 'Веганская кухня' && {
                                    'data-test-id': 'vegan-cuisine',
                                })}
                            >
                                {category}
                            </Box>
                            <AccordionIcon boxSize={6} />
                        </AccordionButton>
                        <AccordionPanel
                            pb={4}
                            display='flex'
                            flexDirection='column'
                            alignItems='flex-start'
                        >
                            {subcategories.map((subcategory, idx) => (
                                <Button
                                    h={6}
                                    width='100%'
                                    justifyContent='flex-start'
                                    key={idx}
                                    border='none'
                                    pos='relative'
                                    bgColor='inherit'
                                    onClick={() => {
                                        dispatch(setSubcategory(subcategory));
                                    }}
                                    py={4}
                                    pl={4}
                                    borderRadius='none'
                                    fontWeight={currentSubcategory === subcategory ? '600' : '500'}
                                    _hover={{
                                        backgroundColor: 'lime.50',
                                        color: 'inherit',
                                    }}
                                    _focus={{
                                        outline: 'none',
                                    }}
                                >
                                    {subcategory}
                                    <Box
                                        as='span'
                                        pos='absolute'
                                        left={currentSubcategory === subcategory ? '-8px' : '0'}
                                        h={6}
                                        w={currentSubcategory === subcategory ? '8px' : '1px'}
                                        bg='lime.300'
                                        transition='all 0.2s ease-in-out'
                                    />
                                </Button>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};
