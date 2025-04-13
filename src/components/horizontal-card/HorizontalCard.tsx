import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    HStack,
    Image,
    Show,
    Spacer,
    Stack,
    Tag,
    TagLabel,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import { BookmarkIcon } from '~/shared/custom-icons';

type HorizontalCard = {
    title: string;
    desc: string;
    img: string;
    tag: {
        icon: string;
        name: string;
    };
    bookmark?: number;
    likes?: number;
    recomendation?: {
        avatar: string;
        name: string;
    };
};

type HorizontalCardProps = {
    item: HorizontalCard;
};

export const HorizontalCard = ({ item }: HorizontalCardProps) => {
    const { title, desc, img, tag, bookmark, likes, recomendation } = item;
    const isTruncated = useBreakpointValue({ base: false, sm: true });

    return (
        <Card
            direction='row'
            overflow='hidden'
            variant='outline'
            borderRadius='lg'
            pos='relative'
            flex='1 1 auto'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: `
                  0 4px 6px -1px rgba(16, 58, 2, 0.1),
                  0 2px 4px -1px rgba(32, 126, 0, 0.06)
                `,
            }}
        >
            <Image
                objectFit='cover'
                width={{ base: '48%', xs: '44.5%', sm: '39.5%', xl: '52%' }}
                src={img}
                alt={title}
                pos='relative'
                overflow='hidden'
            />
            {recomendation && isTruncated && (
                <Box pos='absolute' left={6} bottom={5} maxW='calc(50% - 20px)' overflow='hidden'>
                    <Tag
                        size='md'
                        backgroundColor='lime.150'
                        borderRadius='sm'
                        minW={0}
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                    >
                        <Avatar
                            src={recomendation.avatar}
                            boxSize={4}
                            name={recomendation.name}
                            ml={-1}
                            mr={2}
                        />
                        <TagLabel isTruncated fontSize={14} lineHeight={7}>
                            {recomendation.name} рекомендует
                        </TagLabel>
                    </Tag>
                </Box>
            )}
            <Stack
                width={{ base: '52', xs: '55.5%', sm: '60.5%', xl: '48%' }}
                gap={{ base: '1px', sm: 2 }}
            >
                <CardHeader display='flex' p={{ base: 3, sm: 5 }} pb={{ base: 1, lg: 2 }}>
                    <Tag
                        size={{ base: 'sm', sm: 'md' }}
                        variant='subtle'
                        backgroundColor='lime.50'
                        gap={{ base: '2p1', sm: 2 }}
                        pos={{ base: 'absolute', sm: 'static' }}
                        top='7px'
                        left='8px'
                        borderRadius={{ base: '4px', sm: 'lg' }}
                        px={{ base: '2px', sm: '4px' }}
                    >
                        <Image boxSize={5} src={tag.icon} />
                        <TagLabel fontSize={{ base: 14, sm: 12, lg: 14 }}>{tag.name}</TagLabel>
                    </Tag>
                    <Show above='sm'>
                        <Spacer />
                    </Show>
                    <HStack
                        gap={4}
                        color='lime.600'
                        fontSize={12}
                        fontWeight={700}
                        lineHeight='140%'
                        pr={2}
                    >
                        {bookmark && (
                            <HStack gap={1}>
                                <Image
                                    src='./svg/BsBookmarkHeart.svg'
                                    boxSize={3}
                                    alt='bookmarks count'
                                />
                                <Box as='span'>{bookmark}</Box>
                            </HStack>
                        )}
                        {likes && (
                            <HStack alignItems='center' gap={1}>
                                <Image
                                    src='./svg/BsEmojiHeartEyes.svg'
                                    boxSize={3}
                                    alt='bookmarks count'
                                />
                                <Box as='span'>{likes}</Box>
                            </HStack>
                        )}
                    </HStack>
                </CardHeader>
                <CardBody
                    p={{ base: 2, sm: 5 }}
                    py={{ base: 0, sm: 2 }}
                    mb={{ base: 1, sm: 0 }}
                    pb={{ lg: 0 }}
                >
                    <Heading
                        fontSize={{ base: 16, sm: 20 }}
                        lineHeight={{ base: '24px', sm: '148%' }}
                        // isTruncated={isTruncated}
                        fontFamily='inherit'
                        noOfLines={isTruncated ? 1 : 2}
                    >
                        {title}
                    </Heading>
                    <Show above='sm'>
                        <Text pt={{ base: 2, lg: 1 }} noOfLines={3} fontSize={14} lineHeight='150%'>
                            {desc}
                        </Text>
                    </Show>
                </CardBody>
                <CardFooter p={{ base: 2, sm: 5 }} pt={{ base: 1, lg: 0 }} pb={{ base: 1, sm: 4 }}>
                    <Spacer />
                    <Stack direction='row' spacing={2} flexWrap='wrap'>
                        <Button
                            size={{ base: 'xs', sm: 'sm' }}
                            leftIcon={
                                <BookmarkIcon
                                    boxSize={{ base: 3, sm: 4 }}
                                    marginInlineEnd={{ base: '-8px', sm: '0', lg: 2 }}
                                    sx={{
                                        transition: 'fill 0.3s ease-in-out',
                                        fill: 'currentColor',
                                        '&:hover': {
                                            fill: 'lime.600',
                                        },
                                    }}
                                />
                            }
                            colorScheme='black'
                            variant='outline'
                            sx={{
                                transition: 'all 0.3s ease-in-out',
                                '@media screen and (max-width: 960px)': {
                                    paddingInline: '0',
                                },
                                paddingInline: { base: '0px', sm: '8px' },
                                '&:focus': {
                                    outline: 'none',
                                    borderColor: 'transparent',
                                },
                                '&:hover': {
                                    bgColor: 'lime.600',
                                    color: 'white',
                                    borderColor: 'lime.600',
                                },
                            }}
                        >
                            <Show above='sm'>Сохранить</Show>
                        </Button>
                        <Button
                            size={{ base: 'sx', sm: 'sm' }}
                            colorScheme='black'
                            variant='solid'
                            bgColor='black'
                            color='white'
                            fontWeight={600}
                            fontSize={{ base: 12, sm: 16, lg: 14 }}
                            px={{ base: 2, sm: 3 }}
                            sx={{
                                transition: 'all 0.3s ease-in-out',
                                '&:focus': {
                                    outline: 'none',
                                    borderColor: 'transparent',
                                },
                                '&:hover': {
                                    bgColor: 'white',
                                    color: 'black',
                                    borderColor: 'black',
                                },
                            }}
                        >
                            Готовить
                        </Button>
                    </Stack>
                </CardFooter>
            </Stack>
        </Card>
    );
};
