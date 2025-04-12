import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Heading,
    HStack,
    Image,
    Spacer,
    Stack,
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';

type SimpleCard = {
    title: string;
    desc: string;
    tag: {
        icon: string;
        name: string;
    };
    bookmark?: number;
    likes?: number;
};
type SimpleCardProps = {
    item: SimpleCard;
};

export const SimpleCard = ({ item }: SimpleCardProps) => {
    const { title, desc, tag, bookmark, likes } = item;

    return (
        <Card
            display='flex'
            flexDirection='column'
            height='100%'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: `
                  0 4px 6px -1px rgba(16, 58, 2, 0.1),
                  0 2px 4px -1px rgba(32, 126, 0, 0.06)
                `,
            }}
        >
            <CardBody
                px={{ base: 3, sm: 4, xl: 6 }}
                pt={{ base: 4, xl: 7 }}
                pb={{ base: 6, xs: 3 }}
            >
                <Stack spacing={{ base: 2, sm: 3 }}>
                    <Heading
                        fontFamily='inherit'
                        fontSize={{ base: 16, sm: 20 }}
                        isTruncated
                        letterSpacing={{ base: '-0.5px', sm: '0' }}
                    >
                        {title}
                    </Heading>
                    <Text noOfLines={3} fontSize={14} lineHeight='20px'>
                        {desc}
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter pt={1} pb={{ base: 3, xl: 6 }} pl={{ base: 3, sm: 6, md: 4 }}>
                <Tag size='md' variant='subtle' backgroundColor='lime.150' gap={{ base: 1, xl: 3 }}>
                    <Image boxSize={4} src={tag.icon} />
                    <TagLabel>{tag.name}</TagLabel>
                </Tag>
                <Spacer />
                <HStack
                    gap={3}
                    color='lime.600'
                    fontSize={12}
                    fontWeight={700}
                    lineHeight='140%'
                    pr={{ base: 0, xl: 4 }}
                >
                    {bookmark && (
                        <HStack>
                            <Image
                                src='./svg/BsBookmarkHeart.svg'
                                boxSize='12px'
                                alt='bookmarks count'
                            />
                            <Box as='span'>{bookmark}</Box>
                        </HStack>
                    )}
                    {likes && (
                        <HStack>
                            <Image
                                src='./svg/BsEmojiHeartEyes.svg'
                                boxSize='12px'
                                alt='bookmarks count'
                            />
                            <Box as='span'>{likes}</Box>
                        </HStack>
                    )}
                </HStack>
            </CardFooter>
        </Card>
    );
};
