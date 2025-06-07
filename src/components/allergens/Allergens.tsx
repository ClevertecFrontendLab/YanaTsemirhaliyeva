import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    Tag,
    TagLabel,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { DataTestId } from '~/consts/consts';
import { generateTestId } from '~/utils';

import { Toggle } from '../toggle/Toggle';
import { ALLERGENS_STYLES } from './styles';

const allergens = [
    'Молочные продукты',
    'Яйцо',
    'Рыба',
    'Моллюски',
    'Орехи',
    'Томат (помидоры)',
    'Цитрусовые',
    'Клубника (ягоды)',
    'Шоколад',
];

type AllergenSelectProps = {
    selectedAllergens: string[];
    isFilterActive: boolean;
    testIdSwitcher: string;
    testIdMenuButton: string;
    onToggleFilter: () => void;
    onCheckboxChange: (allergen: string) => void;
    onAddCustomAllergen: (allergen: string) => void;
    allergensList?: string[];
    setShadowVisible?: (visible: boolean) => void;
    direction?: 'row' | 'column';
    width?: string;
    testIdMenuList?: string;
    isIntro?: boolean;
};

export const AllergenSelect = ({
    selectedAllergens,
    isFilterActive,
    onToggleFilter,
    onCheckboxChange,
    onAddCustomAllergen,
    allergensList = allergens,
    setShadowVisible,
    direction = 'row',
    width = '100%',
    testIdSwitcher = '',
    testIdMenuButton = '',
    testIdMenuList,
    isIntro = false,
}: AllergenSelectProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [customAllergen, setCustomAllergen] = useState('');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 10);
        }
    }, [isOpen]);

    const handleAddCustomAllergen = () => {
        const value = customAllergen.trim();
        if (value && !selectedAllergens.includes(value)) {
            onAddCustomAllergen(value);
            setCustomAllergen('');
            inputRef.current?.focus();
        }
    };

    return (
        <Flex gap={3} flexDir={direction} ref={menuRef} onClick={() => setShadowVisible?.(true)}>
            <Toggle
                onChange={onToggleFilter}
                isChecked={isFilterActive}
                text='Исключить аллергены'
                id={isIntro ? 'intro-allergens' : 'filter-allergens'}
                testIdSwitcher={testIdSwitcher}
            />
            <Box width={width} position='relative'>
                <Button
                    data-test-id={testIdMenuButton}
                    rightIcon={isOpen ? <ChevronUpIcon mr={2} /> : <ChevronDownIcon mr={2} />}
                    onClick={() => {
                        if (isFilterActive) {
                            setShadowVisible?.(true);
                            setIsOpen((prev) => !prev);
                        }
                    }}
                    isDisabled={!isFilterActive}
                    {...ALLERGENS_STYLES.mainButton}
                    textAlign='start'
                >
                    {selectedAllergens.length > 0 ? (
                        <HStack gap={2} flexWrap='wrap'>
                            {selectedAllergens.map((allergen) => (
                                <Tag
                                    key={allergen}
                                    size='sm'
                                    variant='outline'
                                    colorScheme='lime'
                                    borderRadius='md'
                                    color='lime.600'
                                    borderColor='lime.150'
                                >
                                    <TagLabel>{allergen}</TagLabel>
                                </Tag>
                            ))}
                        </HStack>
                    ) : (
                        'Выберите из списка...'
                    )}
                </Button>

                {isOpen && isFilterActive && (
                    <Box
                        data-test-id={testIdMenuList ? testIdMenuList : ''}
                        minW={width}
                        w={width}
                        {...ALLERGENS_STYLES.menuListBox}
                        overflowY='auto'
                    >
                        <Box>
                            {allergensList.map((allergen, index) => (
                                <Flex
                                    key={index}
                                    align='center'
                                    px={4}
                                    py={1}
                                    borderRadius='none'
                                    fontWeight={400}
                                    bg={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                                    sx={{
                                        '.chakra-checkbox': {
                                            width: '100%',
                                        },
                                    }}
                                    cursor='pointer'
                                    _hover={{ bg: 'blackAlpha.200' }}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    <Checkbox
                                        data-test-id={generateTestId(DataTestId.Allergen, index)}
                                        isChecked={selectedAllergens.includes(allergen)}
                                        onChange={() => {
                                            onCheckboxChange(allergen);
                                        }}
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
                                        <Box fontSize={14}>{allergen}</Box>
                                    </Checkbox>
                                </Flex>
                            ))}
                        </Box>

                        <Box p={2} borderTop='1px solid' borderColor='gray.200' tabIndex={0}>
                            <InputGroup alignItems='center' gap={2} ml={4} w='inherit'>
                                <Input
                                    ref={inputRef}
                                    data-test-id={isOpen ? DataTestId.InputAddOtherAllergen : ''}
                                    value={customAllergen}
                                    onChange={(e) => setCustomAllergen(e.target.value)}
                                    onKeyDown={(e: React.KeyboardEvent) => {
                                        if (e.key === 'Enter') {
                                            handleAddCustomAllergen();
                                        }
                                    }}
                                    placeholder='Другой аллерген'
                                    size='sm'
                                    focusBorderColor='teal.400'
                                    _focus={{
                                        borderColor: 'teal.400',
                                        boxShadow: '0 0 0 1px #38b2ac',
                                    }}
                                />
                                <IconButton
                                    data-test-id={isOpen ? DataTestId.BtnAddOtherAllergen : ''}
                                    aria-label='Добавить аллерген'
                                    icon={<AddIcon boxSize={2} />}
                                    size='xs'
                                    onClick={handleAddCustomAllergen}
                                    colorScheme='lime'
                                    bgColor='lime.600'
                                    boxSize={3}
                                    minW={3}
                                    cursor='pointer'
                                />
                            </InputGroup>
                        </Box>
                    </Box>
                )}
            </Box>
        </Flex>
    );
};
