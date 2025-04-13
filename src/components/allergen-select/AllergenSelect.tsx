import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    // Tag,
    // TagCloseButton,
    // TagLabel,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Toggle } from '../toggle/Toggle';

const allergens = [
    'Молочные продукты',
    'Яйцо',
    'Рыба',
    'Моллюски',
    'Орехи',
    'Томат (помидор)',
    'Цитрусовые',
    'Клубника (ягоды)',
    'Шоколад',
];

export const AllergenSelect = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const [customAllergen, setCustomAllergen] = useState('');

    const handleCheckboxChange = (allergen: string) => {
        setSelectedAllergens((prev) =>
            prev.includes(allergen)
                ? prev.filter((item) => item !== allergen)
                : [...prev, allergen],
        );
    };

    const handleAddCustomAllergen = () => {
        if (customAllergen.trim() && !selectedAllergens.includes(customAllergen)) {
            setSelectedAllergens((prev) => [...prev, customAllergen]);
            setCustomAllergen('');
        }
    };

    // const handleRemoveAllergen = (allergen: string) => {
    //     setSelectedAllergens((prev) => prev.filter((item) => item !== allergen));
    // };

    return (
        <HStack gap={3}>
            <Toggle text='Исключить мои аллергены' id='allergens' />
            <Box width='234px'>
                <Menu isOpen={isOpen}>
                    {/* Кнопка для открытия/закрытия меню */}
                    <MenuButton
                        as={Button}
                        rightIcon={isOpen ? <ChevronUpIcon mr={2} /> : <ChevronDownIcon mr={2} />}
                        variant='outline'
                        onClick={onToggle}
                        w='100%'
                        fontWeight='400'
                        color='blackAlpha.700'
                        sx={{
                            transition: 'border-color 0.3s ease-in-out',
                            paddingInline: '0 !important',
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:hover': {
                                bgColor: 'transparent',
                                borderColor: 'blackAlpha.400',
                            },
                            '&:active': {
                                bgColor: 'transparent',
                            },
                        }}
                    >
                        Выберите из списка...
                        {/* {selectedAllergens.length > 0 ? (
                            <HStack gap={2} overflow='hidden'>
                                {selectedAllergens.map((allergen) => (
                                    <Tag
                                        key={allergen}
                                        size="sm"
                                        colorScheme="teal"
                                        borderRadius="full"
                                    >
                                        <TagLabel>{allergen}</TagLabel>
                                        <TagCloseButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveAllergen(allergen);
                                            }}
                                        />
                                    </Tag>
                                ))}
                            </HStack>
                        ) : (
                            "Выберите из списка..."
                        )} */}
                    </MenuButton>

                    {/* Выпадающий список */}
                    <MenuList>
                        {allergens.map((allergen, index) => (
                            <MenuItem key={index} closeOnSelect={false}>
                                <Checkbox
                                    isChecked={selectedAllergens.includes(allergen)}
                                    onChange={() => handleCheckboxChange(allergen)}
                                >
                                    {allergen}
                                </Checkbox>
                            </MenuItem>
                        ))}

                        {/* Инпут для добавления пользовательского аллергена */}
                        <Box p={2} borderTop='1px solid' borderColor='gray.200'>
                            <Flex alignItems='center' gap={2}>
                                <Input
                                    value={customAllergen}
                                    onChange={(e) => setCustomAllergen(e.target.value)}
                                    placeholder='Другой аллерген'
                                    size='sm'
                                    focusBorderColor='teal.400'
                                />
                                <IconButton
                                    aria-label='Добавить аллерген'
                                    icon={<AddIcon />}
                                    size='sm'
                                    onClick={handleAddCustomAllergen}
                                    colorScheme='teal'
                                />
                            </Flex>
                        </Box>
                    </MenuList>
                </Menu>
            </Box>
        </HStack>
    );
};
