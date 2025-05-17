import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { API_IMG } from '~/consts/consts';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import { serchInputSelector } from '~/store/slices/recipes-slice';
import { getUniqueCategories, highlightText } from '~/utils';

type VerticalCard = {
    _id: string;
    title: string;
    description: string;
    categoriesIds: string[];
    image?: string;
    bookmarks?: number;
    likes?: number;
};

type VerticalCardProps = {
    item: VerticalCard;
};

export const VerticalCard = ({ item }: VerticalCardProps) => {
    const { _id, image, title, description, categoriesIds, bookmarks, likes } = item;
    const navigate = useNavigate();
    const searchInputCurrent = useSelector(serchInputSelector);
    const highlightedTitle = highlightText(title, searchInputCurrent);
    const categories = useAppSelector(categoriesSelector);
    const uniqueCategories = getUniqueCategories(categories, categoriesIds);

    const handleCardClick = () => {
        if (uniqueCategories.length) {
            const recipeUrl = `/${uniqueCategories[0].category}/${uniqueCategories[0].subCategories?.[0]?.category}/${_id}`;
            navigate(recipeUrl);
        }
    };

    return (
        <Card
            onClick={handleCardClick}
            cursor='pointer'
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
                {image && (
                    <Image
                        src={`${API_IMG}${image}`}
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
                        {highlightedTitle.map((part, index) =>
                            part.toLowerCase() === searchInputCurrent.trim().toLowerCase() ? (
                                <Text as='span' key={index} color='lime.600' fontWeight='bold'>
                                    {part}
                                </Text>
                            ) : (
                                <Text as='span' key={index}>
                                    {part}
                                </Text>
                            ),
                        )}
                    </Heading>
                    <Show above='sm'>
                        <Text noOfLines={3} fontSize={14} lineHeight='20px'>
                            {description}
                        </Text>
                    </Show>
                </Stack>
            </CardBody>
            <CardFooter
                px={{ base: 3, sm: '10px', xl: 6 }}
                pb={{ base: 1, sm: 3, xl: 6 }}
                pt={{ base: 1, sm: 6 }}
                alignItems='flex-end'
            >
                <Show above='sm'>
                    <Flex flexWrap='wrap' gap={2} maxW='60%'>
                        {uniqueCategories.map((cat, idx) => (
                            <Tag
                                key={idx}
                                size='sm'
                                variant='subtle'
                                backgroundColor='lime.150'
                                px={2}
                                py={1}
                                borderRadius='md'
                                mr={1}
                            >
                                <Image src={`${API_IMG}${cat.icon}`} boxSize={5} />
                                <TagLabel>{cat.title}</TagLabel>
                            </Tag>
                        ))}
                    </Flex>
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
                    {bookmarks && (
                        <HStack>
                            <Image
                                src='svg/BsBookmarkHeart.svg'
                                boxSize={3}
                                alt='bookmarks count'
                            />
                            <Box as='span'>{bookmarks}</Box>
                        </HStack>
                    )}
                    {likes && (
                        <HStack>
                            <Image src='svg/BsEmojiHeartEyes.svg' boxSize={3} alt='likes count' />
                            <Box as='span'>{likes}</Box>
                        </HStack>
                    )}
                </HStack>
            </CardFooter>
        </Card>
    );
};
