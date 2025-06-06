import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    useDisclosure,
    useOutsideClick,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { DataTestId } from '~/consts/consts';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectedFiltersSelector, updateSelectedFilters } from '~/store/slices/recipes-slice';

type MenuComponentProps = {
    list: string[];
    type: 'categories' | 'authors';
    width?: string;
    placeholder?: string;
    isAddItem?: boolean;
    newItem?: string;
    dataTestId?: string;
};

export const MenuComponent = ({
    width = '100%',
    placeholder = 'Выберите из списка',
    list,
    isAddItem = false,
    newItem,
    type,
    dataTestId,
}: MenuComponentProps) => {
    const dispatch = useAppDispatch();
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const selectedFilters = useAppSelector(selectedFiltersSelector);
    const selectedItems = selectedFilters[type] || [];
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [menuWidth, setMenuWidth] = useState<string>('auto');

    useEffect(() => {
        if (menuButtonRef.current) {
            setMenuWidth(`${menuButtonRef.current.offsetWidth}px`);
        }
    }, [isOpen]);

    useOutsideClick({
        ref: menuRef as React.RefObject<HTMLElement>,
        handler: () => {
            if (isOpen) {
                onClose();
            }
        },
    });

    const handleCheckboxChange = (item: string) => {
        const updatedItems = selectedItems.includes(item)
            ? selectedItems.filter((elem) => elem !== item)
            : [...selectedItems, item];

        dispatch(updateSelectedFilters({ type, value: updatedItems }));
    };

    return (
        <Box width={width} ref={menuRef}>
            <Menu isOpen={isOpen}>
                <MenuButton
                    data-test-id={dataTestId}
                    ref={menuButtonRef}
                    as={Button}
                    rightIcon={isOpen ? <ChevronUpIcon mr={2} /> : <ChevronDownIcon mr={2} />}
                    variant='outline'
                    w='100%'
                    fontWeight='400'
                    color='blackAlpha.700'
                    minH='fit-content'
                    h='fit-content'
                    textAlign='start'
                    onClick={onToggle}
                    sx={{
                        transition: 'border-color 0.3s ease-in-out',
                        padding: 2,
                        paddingLeft: 3,
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:hover': {
                            bgColor: 'transparent',
                            borderColor: 'blackAlpha.400',
                        },
                        '&[data-active]': {
                            bgColor: 'transparent !important',
                            borderColor: 'lime.300 !important',
                        },
                    }}
                >
                    {selectedItems.length > 0 ? (
                        <HStack gap={2} flexWrap='wrap'>
                            {selectedItems.map((elem) => (
                                <Tag
                                    key={elem}
                                    size='sm'
                                    variant='outline'
                                    colorScheme='lime'
                                    borderRadius='md'
                                    color='lime.600'
                                    borderColor='lime.150'
                                >
                                    <TagLabel>{elem}</TagLabel>
                                </Tag>
                            ))}
                        </HStack>
                    ) : (
                        placeholder
                    )}
                </MenuButton>

                <MenuList
                    w={menuWidth}
                    minW={menuWidth}
                    zIndex={10}
                    p={0}
                    borderTopRadius='none'
                    color='blackAlpha.800'
                    sx={{
                        '& > *:nth-of-type(odd):not(:last-child)': {
                            bg: 'blackAlpha.100',
                        },
                    }}
                >
                    {list.map((el, index) => (
                        <MenuItem
                            key={index}
                            closeOnSelect={false}
                            borderRadius='none'
                            fontWeight={400}
                            sx={{
                                '.chakra-checkbox': {
                                    width: '100%',
                                },
                            }}
                        >
                            <Checkbox
                                data-test-id={
                                    el === 'Веганская кухня' ? DataTestId.VeganCheckbox : ''
                                }
                                isChecked={selectedItems.includes(el)}
                                onChange={() => handleCheckboxChange(el)}
                                borderColor='lime.150'
                                sx={{
                                    '.chakra-checkbox__control': {
                                        borderWidth: 3,
                                    },
                                    '&[data-checked] .chakra-checkbox__control': {
                                        background: 'lime.150 !important',
                                        borderColor: 'lime.150 !important',
                                        color: 'black !important',
                                    },
                                }}
                            >
                                {el}
                            </Checkbox>
                        </MenuItem>
                    ))}

                    {isAddItem && newItem && (
                        <MenuItem
                            closeOnSelect={false}
                            borderRadius='none'
                            fontWeight={400}
                            sx={{
                                '.chakra-checkbox': {
                                    width: '100%',
                                },
                            }}
                        >
                            <Checkbox
                                isChecked={selectedItems.includes(newItem)}
                                onChange={() => handleCheckboxChange(newItem)}
                                borderColor='lime.150'
                                sx={{
                                    '.chakra-checkbox__control': {
                                        borderWidth: 3,
                                    },
                                    '&[data-checked] .chakra-checkbox__control': {
                                        background: 'lime.150 !important',
                                        borderColor: 'lime.150 !important',
                                        color: 'black !important',
                                    },
                                }}
                            >
                                {newItem}
                            </Checkbox>
                        </MenuItem>
                    )}
                </MenuList>
            </Menu>
        </Box>
    );
};
