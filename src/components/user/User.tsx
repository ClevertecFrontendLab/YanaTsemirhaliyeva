import { Avatar, Flex, Text } from '@chakra-ui/react';

export const User = () => (
    <Flex gap={3}>
        <Avatar size='md' name='user name' src='img/avatar.jpg' />
        <Flex flexDirection='column'>
            <Text fontSize='18px' lineHeight='28px' fontWeight='600'>
                Екатерина Константинопольская
            </Text>
            <Text fontSize='14px' lineHeight='20px' color='blackAlpha.700'>
                @bake_and_pie
            </Text>
        </Flex>
    </Flex>
);
