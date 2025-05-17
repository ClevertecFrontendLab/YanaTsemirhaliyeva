import { Box, Flex, Image, Text } from '@chakra-ui/react';

export const FooterAside = ({ as = 'footer' }: { as?: React.ElementType }) => (
    <Box as={as}>
        <Flex flexDirection='column' fontSize={12} lineHeight='16px' px={6} pb={5}>
            <Text color='blackAlpha.400' mb={4}>
                Версия программы 03.25
            </Text>
            <Text color='blackAlpha.700'>
                Все права защищены, ученический файл, <br />
                &copy;Клевер Технолоджи, 2025
            </Text>
            <Box
                as='button'
                display='flex'
                alignItems='center'
                gap='6px'
                fontWeight={600}
                border='none'
                py={4}
                sx={{
                    '&:hover': {
                        opacity: 0.7,
                    },
                }}
            >
                <Image src='svg/left-icon.svg' alt='выйти из аккаунта' boxSize={3} />
                <Box as='span'>Выйти</Box>
            </Box>
        </Flex>
    </Box>
);
