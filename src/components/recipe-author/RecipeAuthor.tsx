import {
    Avatar,
    Box,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Text,
} from '@chakra-ui/react';

import AvatarImg from '~/assets/img/avatar-2.jpg';
import { SubscribeIcon, SubscribersIcon } from '~/shared/custom-icons';

export const RecipeAuthor = () => (
    <Card
        bgColor='lime.300'
        display='flex'
        flexDir='row'
        alignItems='center'
        p={{ base: 1, '2xs': 6 }}
        px={{ base: 3 }}
        gap={{ base: 2 }}
    >
        <Avatar name='Segun Adebayo' src={AvatarImg} size='xl' />
        <Box width='100%'>
            <CardHeader
                display='flex'
                flexDir={{ base: 'column', '2xs': 'row' }}
                justifyContent='space-between'
                gap={{ '2xs': 2 }}
                p={0}
                mb={{ base: 2 }}
            >
                <Flex gap='4' alignItems='center' flexWrap='wrap' order={{ base: 2, '2xs': 1 }}>
                    <Box>
                        <Heading fontSize={{ base: 18, '2xs': 24 }} fontWeight={700}>
                            Сергей Разумов
                        </Heading>
                        <Text fontSize={14} color='blackAlpha.700'>
                            @serge25
                        </Text>
                    </Box>
                </Flex>
                <Text
                    fontSize={{ base: 12, '2xs': 14 }}
                    order={{ base: 1, '2xs': 2 }}
                    alignSelf={{ base: 'flex-end', '2xs': 'flex-start' }}
                >
                    Автор рецепта
                </Text>
            </CardHeader>
            <CardFooter p={0} justify='space-between' flexWrap='wrap'>
                <Button
                    variant='solid'
                    colorScheme='black'
                    bgColor='black'
                    leftIcon={<SubscribeIcon />}
                    fontSize={12}
                    size='xs'
                >
                    Подписаться
                </Button>
                <HStack>
                    <SubscribersIcon />
                    <Text color='lime.600' fontWeight={600} fontSize={12}>
                        125
                    </Text>
                </HStack>
            </CardFooter>
        </Box>
    </Card>
);
