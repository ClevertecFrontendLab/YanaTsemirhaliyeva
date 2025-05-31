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
    Text,
    useBreakpointValue,
    useDisclosure,
    useOutsideClick,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { DataTestId } from '~/consts/consts';
import { getFieldStyles } from '~/pages/new-recipe/styles';
import { useAppSelector } from '~/store/hooks';
import { subCategoriesSelector } from '~/store/slices/categories-slice';
import { SubCategory } from '~/types/category';

import { SELECT_STYLES } from './styles';

type SubcategorySelectProps = {
    name: string;
    hasError?: boolean;
    placeholder?: string;
    dataTestId?: string;
};

export const SubcategorySelect = ({
    name,
    hasError = false,
    placeholder = 'Выберите из списка...',
    dataTestId,
}: SubcategorySelectProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [menuWidth, setMenuWidth] = useState<string>('auto');
    const subCategories = useAppSelector(subCategoriesSelector);
    const visibleSubCategoriesCount = useBreakpointValue({ base: 1, sm: 2 });

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const fieldError = errors[name];
    const showError = hasError || !!fieldError;

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

    const getSelectedSubCategories = (fieldValue: string[], subCategories: SubCategory[]) => {
        const selected = subCategories.filter((subCategory) =>
            fieldValue?.includes(subCategory._id),
        );

        return {
            displayedSubCategories: selected.slice(0, visibleSubCategoriesCount),
            hiddenCount: selected.length - (visibleSubCategoriesCount || 0),
            selectedSubCategories: selected,
        };
    };

    const handleCheckboxChange = (
        field: { value: string[]; onChange: (val: string[]) => void },
        subCategory: SubCategory,
    ) => {
        const currentValue = field.value || [];
        field.onChange(
            currentValue.includes(subCategory._id)
                ? currentValue.filter((id) => id !== subCategory._id)
                : [...currentValue, subCategory._id],
        );
    };

    return (
        <Box
            w={{ base: '196px', '2xs': '232px', sm: '350px' }}
            minW={{ base: '196px', '2xs': '232px', sm: '350px' }}
            ref={menuRef}
            data-test-id={DataTestId.RecipeCategories}
        >
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    const { displayedSubCategories, hiddenCount, selectedSubCategories } =
                        getSelectedSubCategories(field.value, subCategories);

                    return (
                        <Menu isOpen={isOpen}>
                            <MenuButton
                                data-test-id={dataTestId}
                                ref={menuButtonRef}
                                as={Button}
                                rightIcon={
                                    isOpen ? <ChevronUpIcon mr={2} /> : <ChevronDownIcon mr={2} />
                                }
                                onClick={onToggle}
                                {...SELECT_STYLES.button}
                                {...getFieldStyles(!!showError, 'blackAlpha.200')}
                                textAlign='start'
                            >
                                {selectedSubCategories.length > 0 ? (
                                    <HStack gap={2} flexWrap='wrap'>
                                        {displayedSubCategories.map((elem) => (
                                            <Tag key={elem._id} {...SELECT_STYLES.tag}>
                                                <TagLabel>{elem.title}</TagLabel>
                                            </Tag>
                                        ))}
                                        {hiddenCount > 0 && (
                                            <Tag {...SELECT_STYLES.tag} px='6px'>
                                                <TagLabel>+{hiddenCount}</TagLabel>
                                            </Tag>
                                        )}
                                    </HStack>
                                ) : (
                                    <Text as='span' isTruncated>
                                        {placeholder}
                                    </Text>
                                )}
                            </MenuButton>

                            <MenuList
                                w={menuWidth}
                                minW={menuWidth}
                                {...SELECT_STYLES.list}
                                overflowY='auto'
                            >
                                {subCategories.map((el, index) => (
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
                                            isChecked={field.value?.includes(el._id)}
                                            onChange={() => handleCheckboxChange(field, el)}
                                            {...SELECT_STYLES.checkbox}
                                        >
                                            {el.title}
                                        </Checkbox>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    );
                }}
            />
        </Box>
    );
};
