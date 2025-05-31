import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
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
    useBreakpointValue,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ALERT_MESSAGES, API_IMG, DataTestId } from '~/consts/consts';
import { useBookmarkRecipeMutation } from '~/query/services/recipes';
import { BookmarkIcon, HappyFaceIcon } from '~/shared/custom-icons';
import { useAppDispatch } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { serchInputSelector } from '~/store/slices/recipes-slice';
import { Category } from '~/types/category';
import { generateTestId, highlightText } from '~/utils';

type HorizontalCard = {
    _id: string;
    title: string;
    description: string;

    categoriesIds: string[];
    image?: string;
    bookmarks?: number;
    likes?: number;
};

type HorizontalCardProps = {
    item: HorizontalCard;
    index: number;
    categories: Category[];
};

export const HorizontalCard = ({ item, index, categories }: HorizontalCardProps) => {
    const { _id, title, description, image, bookmarks, likes, categoriesIds } = item;
    const searchInputCurrent = useSelector(serchInputSelector);
    const isTruncated = useBreakpointValue({ base: false, sm: true });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    const matchedCategories = categories.filter((category) =>
        category.subCategories.some((sub) => categoriesIds.includes(sub._id)),
    );

    const handleCardClick = () => {
        if (matchedCategories.length) {
            navigate(
                `/${matchedCategories[0].category}/${matchedCategories[0].subCategories?.[0]?.category}/${_id}`,
            );
        }
    };

    const handleBookmark = async () => {
        try {
            await bookmarkRecipe(_id).unwrap();
        } catch {
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        }
    };

    const highlightedTitle = highlightText(title, searchInputCurrent);

    return (
        <Card
            data-test-id={generateTestId(DataTestId.FoodCard, index)}
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
                src={`${API_IMG}${image}`}
                alt={title}
                pos='relative'
                overflow='hidden'
            />
            <Stack
                width={{ base: '52%', xs: '55.5%', sm: '60.5%', xl: '48%' }}
                gap={{ base: '1px', sm: 2 }}
            >
                <CardHeader display='flex' p={{ base: 3, sm: 5 }} pb={{ base: 1, lg: 2 }}>
                    <Flex
                        flexWrap='wrap'
                        gap={2}
                        maxW={{ base: '30%', sm: '60%' }}
                        pos={{ base: 'absolute', sm: 'static' }}
                        top={3}
                        left={3}
                    >
                        {matchedCategories.map((cat, idx) => (
                            <Tag
                                key={`${item._id}-tag-${idx}`}
                                size={{ base: 'sm', sm: 'md' }}
                                variant='subtle'
                                backgroundColor='lime.50'
                                gap={{ base: '2px', sm: 2 }}
                                borderRadius={{ base: '4px', sm: 'lg' }}
                                px={{ base: '2px', sm: '4px' }}
                            >
                                <Image src={`${API_IMG}${cat.icon}`} boxSize={5} />
                                <TagLabel>{cat.title}</TagLabel>
                            </Tag>
                        ))}
                    </Flex>
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
                        alignSelf={categories.length > 1 ? 'flex-start' : 'auto'}
                    >
                        {bookmarks && (
                            <HStack gap={1}>
                                <BookmarkIcon color='black' />
                                <Box as='span'>{bookmarks}</Box>
                            </HStack>
                        )}
                        {likes && (
                            <HStack alignItems='center' gap={1}>
                                <HappyFaceIcon color='black' />
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
                        fontFamily='inherit'
                        noOfLines={isTruncated ? 1 : 2}
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
                        <Text pt={{ base: 2, lg: 1 }} noOfLines={3} fontSize={14} lineHeight='150%'>
                            {description}
                        </Text>
                    </Show>
                </CardBody>
                <CardFooter p={{ base: 2, sm: 5 }} pt={{ base: 1, lg: 0 }} pb={{ base: 1, sm: 4 }}>
                    <Spacer />
                    <Stack direction='row' spacing={2} flexWrap='wrap'>
                        <Button
                            onClick={handleBookmark}
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
                            data-test-id={generateTestId(DataTestId.CardLink, index)}
                            onClick={handleCardClick}
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
