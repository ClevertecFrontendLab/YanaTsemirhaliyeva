import { SearchIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { FilterIcon } from '~/shared/custom-icons';

export const Search = () => (
    <HStack width='100%' gap={2}>
        <IconButton
            aria-label='Action Button'
            icon={<FilterIcon />}
            size={{ base: 'sm', sm: 'lg' }}
            variant='outline'
            borderColor='blackAlpha.600'
            borderRadius='lg'
            sx={{
                transition: 'border-color 0.3s ease-in-out',
                paddingInline: '0 !important',
                '&:focus': {
                    outline: 'none',
                    borderColor: 'transparent',
                },
                '&:hover': {
                    bgColor: 'transparent',
                    borderColor: 'blackAlpha.400',
                },
            }}
        />
        <InputGroup>
            <Input
                placeholder='Название или ингредиент...'
                size={{ base: 'sm', sm: 'lg' }}
                borderColor='blackAlpha.600'
                focusBorderColor='lime.800'
                _placeholder={{ color: 'lime.800' }}
                color='lime.800'
                borderRadius='md'
                sx={{
                    transition: 'border-color 0.3s ease-in-out',
                }}
            />
            <InputRightElement h='100%' w={12}>
                <Button
                    size={{ base: 'sm', sm: 'lg' }}
                    variant='ghost'
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
                >
                    <SearchIcon color='black' />
                </Button>
            </InputRightElement>
        </InputGroup>
    </HStack>
);
