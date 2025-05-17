import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

import { AlertComponent } from '~/components/alert/Alert';
import { AuthTabs } from '~/components/auth-tabs/AuthTabs';
import { useAppSelector } from '~/store/hooks';
import { alertStatusSelector } from '~/store/slices/auth-slice';

export const AuthPage = () => {
    const alertProps = useAppSelector(alertStatusSelector);

    return (
        <Flex minH='100vh' width='full' pos='relative' overflow='auto'>
            <VStack
                w={{ base: '100%', md: '50%' }}
                bgGradient='linear-gradient(228deg, #EAFFC7 0%, #29813F 100%)'
                p='60px 20px 28px'
                minH='100vh'
                h='100%'
                position='relative'
            >
                <Box
                    as='header'
                    m='0 auto'
                    mt={{ base: 4, sm: '80px', md: '110px' }}
                    mb={{ base: 10, sm: 14, md: '80px' }}
                >
                    <Image
                        src='logo-full.svg'
                        w={{ base: '158px', md: '271px' }}
                        h={{ base: '38px', md: '64px' }}
                    />
                </Box>
                <Flex flexGrow={1}>
                    <AuthTabs />
                </Flex>

                <Box as='footer' fontSize={12} color='black' alignSelf='flex-start'>
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Box>
            </VStack>
            <Box
                w='50%'
                minH='100vh'
                position='relative'
                bgColor='lime.700'
                display={{ base: 'none', md: 'block' }}
            >
                <Box pos='absolute' top={0} right={0} bottom={0} left={0}>
                    <Image
                        src='img/auth/1.jpg'
                        height='100%'
                        width='100%'
                        objectFit='cover'
                        objectPosition='center'
                        loading='eager'
                    />
                    <Text
                        fontSize={12}
                        fontWeight={600}
                        pos='absolute'
                        bottom={7}
                        right={7}
                        zIndex={1}
                    >
                        &mdash;&nbsp;Лучший сервис для ваших кулинарных побед
                    </Text>
                </Box>
            </Box>

            {alertProps.isError && (
                <AlertComponent
                    title={alertProps.title}
                    status={alertProps.status}
                    desc={alertProps.desc}
                />
            )}
        </Flex>
    );
};
