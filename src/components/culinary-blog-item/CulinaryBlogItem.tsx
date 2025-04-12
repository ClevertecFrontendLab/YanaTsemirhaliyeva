import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';

type CulinaryBlogItem = {
    userName: string;
    nickName: string;
    text: string;
    avatar: string;
};

type CulinaryBlogItemProps = {
    item: CulinaryBlogItem;
};

export const CulinaryBlogItem = ({ item }: CulinaryBlogItemProps) => {
    const { userName, nickName, text, avatar } = item;
    return (
        <Card
            borderRadius={5}
            flex='1 1 auto'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: `
              0 4px 6px -1px rgba(16, 58, 2, 0.1),
              0 2px 4px -1px rgba(32, 126, 0, 0.06)
            `,
            }}
        >
            <CardHeader p={{ base: 3, sm: 4, xl: 6 }} pl={{ base: 4, xl: 6 }}>
                <Box maxW='100%'>
                    <Flex flex='1' gap={{ base: '6px', sm: 3 }} alignItems='flex-end'>
                        <Avatar name={userName} src={avatar} size={{ base: 'sm', sm: 'md' }} />
                        <Box overflow='hidden'>
                            <Heading
                                as='h2'
                                size='sm'
                                fontFamily='inherit'
                                fontSize={{ base: 16, sm: 18 }}
                                fontWeight={500}
                                noOfLines={1}
                                sx={{
                                    wordBreak: 'break-all',
                                }}
                                pt={{ base: '6px', sm: '0', md: 2 }}
                            >
                                {userName}
                            </Heading>
                            <Text
                                fontSize={{ base: 12, sm: 14 }}
                                color='blackAlpha.700'
                                isTruncated
                            >
                                {nickName}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </CardHeader>
            <CardBody p={{ base: 4, xl: 5 }} pt={{ base: 0, xl: 1 }}>
                <Text noOfLines={3} fontSize={14} lineHeight='148%'>
                    {text}
                </Text>
            </CardBody>
        </Card>
    );
};
