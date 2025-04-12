import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Heading,
    HStack,
    Image,
    Show,
    Spacer,
    Stack,
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';

type VerticalCard = {
    title: string;
    desc: string;
    img?: string;
    tag: {
        icon: string;
        name: string;
    };
    bookmark?: number;
    likes?: number;
};
type VerticalCardProps = {
    item: VerticalCard;
};

export const VerticalCard = ({ item }: VerticalCardProps) => {
    const { img, title, desc, tag, bookmark, likes } = item;

    return (
        <Card
            display='flex'
            flexDirection='column'
            h='100%'
            width='100%'
            flex='1 1 auto'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: `
                  0 4px 6px -1px rgba(16, 58, 2, 0.1),
                  0 2px 4px -1px rgba(32, 126, 0, 0.06)
                `,
            }}
        >
            <CardBody p='0'>
                {img && (
                    <Image
                        src={img}
                        alt={title}
                        width='100%'
                        h={{ base: '128px', sm: '230px' }}
                        objectFit='cover'
                        borderTopRadius='lg'
                    />
                )}
                <Stack
                    spacing={{ base: 2 }}
                    px={{ base: '8px', xl: 6 }}
                    pt={{ base: 2, sm: 4, lg: 3 }}
                    pb={{ base: 2, lg: 1 }}
                >
                    <Heading
                        fontSize={{ sm: '18px', lg: '20px' }}
                        noOfLines={{ base: 2, sm: 1 }}
                        lineHeight={{ base: '24px', sm: '148%' }}
                    >
                        {title}
                    </Heading>
                    <Show above='sm'>
                        <Text noOfLines={3} fontSize={14} lineHeight='20px'>
                            {desc}
                        </Text>
                    </Show>
                </Stack>
            </CardBody>
            <CardFooter
                px={{ base: 3, sm: '10px', xl: 6 }}
                pb={{ base: 1, sm: 3, xl: 6 }}
                pt={{ base: 1, sm: 6 }}
            >
                <Show above='sm'>
                    <Tag
                        size='md'
                        variant='subtle'
                        backgroundColor='lime.150'
                        gap={{ sm: 2, lg: 3 }}
                    >
                        <Image boxSize={4} src={tag.icon} />
                        <TagLabel>{tag.name}</TagLabel>
                    </Tag>
                    <Spacer />
                </Show>
                <HStack
                    gap={3}
                    color='lime.600'
                    fontSize={12}
                    fontWeight={700}
                    lineHeight='140%'
                    pr={2}
                >
                    {bookmark && (
                        <HStack>
                            <Image
                                src='./svg/BsBookmarkHeart.svg'
                                boxSize={3}
                                alt='bookmarks count'
                            />
                            <Box as='span'>{bookmark}</Box>
                        </HStack>
                    )}
                    {likes && (
                        <HStack>
                            <Image src='./svg/BsEmojiHeartEyes.svg' boxSize={3} alt='likes count' />
                            <Box as='span'>{likes}</Box>
                        </HStack>
                    )}
                </HStack>
            </CardFooter>
        </Card>
    );
};
