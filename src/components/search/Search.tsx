import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    clearSearch,
    recipesSelector,
    serchInputSelector,
    setSearchQuery,
} from '~/store/slices/recipes-slice';

import { Filters } from '../filters/Filters';

export const Search = () => {
    const dispatch = useAppDispatch();
    const searchInputCurrent = useSelector(serchInputSelector);
    const [searchInput, setSearchInput] = useState(searchInputCurrent);
    const filteredRecipes = useAppSelector(recipesSelector);
    const outlineColorCondition =
        filteredRecipes.length > 0 && searchInputCurrent.length > 0
            ? '#2DB100'
            : filteredRecipes.length === 0 && searchInputCurrent.length > 0
              ? '#E53E3E'
              : 'none';

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = () => {
        if (searchInput.trim().length >= 3) {
            dispatch(setSearchQuery(searchInput.trim()));
        }
    };

    const handleClearInput = () => {
        setSearchInput('');
        dispatch(clearSearch());
    };

    return (
        <HStack width='100%' gap={2}>
            <Filters />
            <InputGroup>
                <Input
                    data-test-id='search-input'
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchInput.trim().length >= 3) {
                            handleSearch();
                        }
                    }}
                    placeholder='Название или ингредиент...'
                    size={{ base: 'sm', sm: 'lg' }}
                    borderColor='blackAlpha.600'
                    focusBorderColor='lime.800'
                    _placeholder={{ color: 'lime.800' }}
                    color='lime.800'
                    borderRadius='md'
                    outline={`2px solid ${outlineColorCondition}`}
                    sx={{
                        transition: 'border-color 0.3s ease-in-out',
                        paddingRight: '100px',
                    }}
                />
                <InputRightElement h='100%' w={searchInput.length > 0 ? 24 : 12}>
                    {searchInput.length > 0 && (
                        <IconButton
                            onClick={handleClearInput}
                            icon={<CloseIcon color='lime.800' boxSize={3} />}
                            aria-label='очистить поиск'
                            size={{ base: 'sm', sm: 'lg' }}
                            bgColor='inherit'
                            sx={{
                                transition:
                                    'opacity 0.3s ease-in-out, border-color 0.3s ease-in-out',
                                border: 'none',
                                '&:hover': {
                                    bgColor: 'transparent',
                                    opacity: 0.7,
                                },
                                '&:focus': {
                                    outline: 'none',
                                },
                            }}
                        />
                    )}
                    <IconButton
                        data-test-id='search-button'
                        onClick={handleSearch}
                        icon={<SearchIcon color='black' />}
                        aria-label='найти рецепты по запросу'
                        size={{ base: 'sm', sm: 'lg' }}
                        bgColor='inherit'
                        pointerEvents={searchInput.trim().length < 3 ? 'none' : 'auto'}
                        sx={{
                            transition: 'opacity 0.3s ease-in-out, border-color 0.3s ease-in-out',
                            border: 'none',
                            '&:hover': {
                                bgColor: 'transparent',
                                opacity: 0.7,
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                        }}
                    />
                </InputRightElement>
            </InputGroup>
        </HStack>
    );
};
