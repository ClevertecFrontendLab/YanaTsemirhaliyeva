import { SmallAddIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';

export const IngredientsHeader = () => (
    <>
        <Text fontWeight={600} fontSize={{ base: 14, md: 16 }}>
            Добавьте ингредиенты рецепта, нажав на &nbsp;
            <SmallAddIcon borderRadius='50%' border='1px solid black' />
        </Text>
        <Flex
            w='100%'
            fontWeight='bold'
            color='lime.600'
            fontSize={12}
            display={{ base: 'none', '2xs': 'flex' }}
        >
            <Box w={{ '2xs': 240, sm: 295 }} pl={6}>
                Ингредиент
            </Box>
            <Box w={120} pl={6}>
                Количество
            </Box>
            <Box w={205} pl={4}>
                Единица измерения
            </Box>
        </Flex>
    </>
);
