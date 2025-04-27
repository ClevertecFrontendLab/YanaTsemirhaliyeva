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

import { CategoriesData, getCategoryContent } from '~/consts/category-icons';
import { serchInputSelector } from '~/store/slices/recipes-slice';
import { highlightText } from '~/utils';

type VerticalCard = {
    id: string;
    title: string;
    description: string;
    image?: string;
    category: string[];
    subcategory?: string[];
    bookmarks?: number;
    likes?: number;
};

type VerticalCardProps = {
    item: VerticalCard;
};

export const VerticalCard = ({ item }: VerticalCardProps) => {
    const { id, image, title, description, category, subcategory, bookmarks, likes } = item;
    const navigate = useNavigate();
    const searchInputCurrent = useSelector(serchInputSelector);
    const highlightedTitle = highlightText(title, searchInputCurrent);

    const handleCardClick = () => {
        if (category && subcategory) {
            navigate(`/${category[0]}/${subcategory[0]}/${id}`);
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
                        src={image}
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
                        {category.map((cat, idx) => {
                            const { IconComponent, label } = getCategoryContent(
                                cat as keyof typeof CategoriesData,
                            );
                            return (
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
                                    {IconComponent && <IconComponent boxSize={4} />}
                                    <TagLabel>{label}</TagLabel>
                                </Tag>
                            );
                        })}
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
                                src='/svg/BsBookmarkHeart.svg'
                                boxSize={3}
                                alt='bookmarks count'
                            />
                            <Box as='span'>{bookmarks}</Box>
                        </HStack>
                    )}
                    {likes && (
                        <HStack>
                            <Image src='/svg/BsEmojiHeartEyes.svg' boxSize={3} alt='likes count' />
                            <Box as='span'>{likes}</Box>
                        </HStack>
                    )}
                </HStack>
            </CardFooter>
        </Card>
    );
};
