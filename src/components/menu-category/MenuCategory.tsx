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
import { Category } from '~/types/category';
import { getCategoryTitles } from '~/utils';

type MenuCategoryProps = {
    list: Category[];
    type: 'categories';
    isAddItem?: boolean;
    newItem?: string;
    width?: string;
    placeholder?: string;
    dataTestId?: string;
};

export const MenuCategory = ({
    width = '100%',
    placeholder = 'Выберите из списка',
    list,
    type,
    dataTestId,
}: MenuCategoryProps) => {
    const dispatch = useAppDispatch();
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const selectedFilters = useAppSelector(selectedFiltersSelector);
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [menuWidth, setMenuWidth] = useState<string>('auto');
    const selectedTitles = getCategoryTitles(selectedFilters.categories ?? [], list);

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

    const handleCheckboxChange = (category: Category) => {
        const updatedSubcategoryIds = selectedFilters.categories?.some((subId) =>
            category.subCategories.some((sub) => sub._id === subId),
        )
            ? selectedFilters.categories?.filter(
                  (subId) => !category.subCategories.some((sub) => sub._id === subId),
              )
            : [
                  ...(selectedFilters.categories ?? []),
                  ...category.subCategories.map((sub) => sub._id),
              ];

        dispatch(updateSelectedFilters({ type, value: updatedSubcategoryIds }));
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
                    {selectedTitles.length > 0 ? (
                        <HStack gap={2} flexWrap='wrap'>
                            {selectedTitles.map((elem) => (
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
                        '& > *:nth-of-type(odd)': {
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
                                    el.title === 'Веганская кухня' ? DataTestId.VeganCheckbox : ''
                                }
                                isChecked={selectedTitles.includes(el.title)}
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
                                {el.title}
                            </Checkbox>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
};
