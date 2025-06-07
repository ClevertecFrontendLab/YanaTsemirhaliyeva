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
    IconButton,
    Image,
    Show,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ALERT_MESSAGES, API_IMG, AppRoute, DataTestId, TOKEN_NAME } from '~/consts/consts';
import { useDeleteRecipeMutation } from '~/query/services/new-recipe';
import { useBookmarkRecipeMutation, useLikeRecipeMutation } from '~/query/services/recipes';
import {
    BookmarkIcon,
    HappyFaceIcon,
    TimeIcon,
    WastebasketIcon,
    WriteDraftIcon,
} from '~/shared/custom-icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAlertStatus } from '~/store/slices/alert-slice';
import { categoriesSelector } from '~/store/slices/categories-slice';
import { Recipe } from '~/types/recipe';
import { getUniqueCategories } from '~/utils';
import { decodeToken } from '~/utils/jwt-decode';

import { TagComponent } from '../tag/Tag';
import { FULL_CARD_STYLES } from './styles';

type FullSizeCardProps = {
    item: Recipe;
};
export const FullSizeCard = ({
    _id,
    title,
    bookmarks,
    image,
    likes,
    time,
    description,
    categoriesIds,
    authorId,
}: FullSizeCardProps['item']) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const categories = useAppSelector(categoriesSelector);
    const uniqueCategories = getUniqueCategories(categories, categoriesIds);
    const token = localStorage.getItem(TOKEN_NAME);
    const userData = decodeToken(token);
    const isRecipeCreateByCurrentUser = userData?.userId === authorId;
    const { category, subcategory, id } = useParams();
    const [likeRecipe] = useLikeRecipeMutation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    const [localLikes, setLocalLikes] = useState(likes);
    const [localBookmarks, setLocalBookmarks] = useState(bookmarks);

    const handleEditClick = () => {
        navigate(`/edit-recipe/${category}/${subcategory}/${id}`);
    };

    const [deleteRecipe, { isLoading }] = useDeleteRecipeMutation();

    const handleDeleteRecipe = async () => {
        try {
            await deleteRecipe(_id).unwrap();
            navigate(AppRoute.Index, { replace: true });
            dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_DELETE_SUCCESS));
        } catch {
            dispatch(setAlertStatus(ALERT_MESSAGES.RECIPE_DELETE_ERROR));
        }
    };

    useEffect(() => {
        setLocalLikes(likes);
        setLocalBookmarks(bookmarks);
    }, [likes, bookmarks]);

    const [isLiking, setIsLiking] = useState(false);
    const [isBookmarking, setIsBookmarking] = useState(false);

    const handleLike = async () => {
        if (isLiking) return;
        setIsLiking(true);
        try {
            await likeRecipe(_id).unwrap();
        } catch {
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        } finally {
            setIsLiking(false);
        }
    };

    const handleBookmark = async () => {
        if (isBookmarking) return;
        setIsBookmarking(true);
        try {
            await bookmarkRecipe(_id).unwrap();
        } catch {
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        } finally {
            setIsBookmarking(false);
        }
    };

    return (
        <Card
            direction={{ base: 'column', '2xs': 'row' }}
            gap={{ '2xs': 3, md: 0 }}
            borderRadius='lg'
            boxShadow='none'
            minH={{ md: '378px' }}
        >
            <Image
                objectFit='cover'
                width={{ base: '100%', '2xs': '33%', sm: '32%', md: '40%', xl: '41%' }}
                src={`${API_IMG}${image}`}
                alt={title}
                overflow='hidden'
                borderRadius={8}
            />

            <Stack
                width={{ base: '100%', '2xs': '67%', sm: '68%', md: '60%', xl: '59%' }}
                gap={{ base: '1px', sm: 2 }}
            >
                <CardHeader
                    display='flex'
                    p={{ base: 3, sm: 5 }}
                    pb={{ base: 1, lg: 2 }}
                    mb={{ base: '26px', md: 2 }}
                    pt={{ md: 0 }}
                >
                    <HStack flexWrap='wrap'>
                        {uniqueCategories.map((cat, i) => (
                            <Box key={i}>
                                <TagComponent title={cat.title} icon={cat.icon} />
                            </Box>
                        ))}
                    </HStack>
                    <Spacer />
                    <HStack
                        gap={4}
                        color='lime.600'
                        fontSize={12}
                        fontWeight={700}
                        lineHeight='140%'
                        pr={2}
                        alignSelf='baseline'
                    >
                        <HStack gap={1}>
                            <BookmarkIcon color='black' />
                            <Box as='span'>{localBookmarks}</Box>
                        </HStack>
                        <HStack alignItems='center' gap={1}>
                            <HappyFaceIcon color='black' />
                            <Box as='span'>{localLikes}</Box>
                        </HStack>
                    </HStack>
                </CardHeader>
                <CardBody
                    p={{ sm: 5 }}
                    py={{ base: 0, sm: 2 }}
                    mb={{ base: 5, sm: 2 }}
                    pb={{ lg: 0 }}
                    pt={{ md: 2 }}
                >
                    <Heading
                        fontSize={{ base: 24, sm: 20, md: 48 }}
                        lineHeight={{ base: '34px', sm: '148%', md: '100%' }}
                        fontFamily='inherit'
                        maxW='450px'
                        mb={{ md: 5 }}
                    >
                        {title}
                    </Heading>
                    <Text pt={{ base: 2, lg: 1 }} fontSize={14} lineHeight='150%'>
                        {description}
                    </Text>
                </CardBody>
                <CardFooter
                    px={{ base: 0, sm: 5 }}
                    pt={{ base: 1, lg: 0 }}
                    pb='0'
                    flexDir={{ base: 'column', '2xs': 'row' }}
                    gap={{ base: 3, '2xs': 0 }}
                >
                    <Flex
                        px={2}
                        gap={2}
                        bgColor='blackAlpha.100'
                        borderRadius={4}
                        fontSize={14}
                        minW='fit-content'
                        h='fit-content'
                        alignItems='center'
                        alignSelf={{ base: 'flex-start', '2xs': 'flex-end' }}
                    >
                        <TimeIcon />
                        <Text>{time}</Text>
                    </Flex>
                    <Show above='2xs'>
                        <Spacer />
                    </Show>
                    {!isRecipeCreateByCurrentUser && (
                        <Stack direction='row' spacing={2} alignItems='center'>
                            <Button
                                {...FULL_CARD_STYLES.likeBtn}
                                leftIcon={
                                    <HappyFaceIcon
                                        boxSize={{ base: 3, sm: 4 }}
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
                                onClick={handleLike}
                                isLoading={isLiking}
                                disabled={isLiking}
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                {...FULL_CARD_STYLES.bookmarkBtn}
                                leftIcon={<BookmarkIcon />}
                                onClick={handleBookmark}
                                isLoading={isBookmarking}
                                disabled={isBookmarking}
                            >
                                Сохранить в закладки
                            </Button>
                        </Stack>
                    )}
                    {isRecipeCreateByCurrentUser && (
                        <Stack direction='row' spacing={2} alignItems='center'>
                            <IconButton
                                onClick={handleDeleteRecipe}
                                icon={<WastebasketIcon />}
                                color='black'
                                bgColor='transparent'
                                boxSize={8}
                                minW={8}
                                aria-label='Удалить рецепт'
                                isLoading={isLoading}
                                data-test-id={DataTestId.RecipeDeleteBtn}
                            />
                            <Button
                                {...FULL_CARD_STYLES.editBtn}
                                leftIcon={<WriteDraftIcon boxSize={4} />}
                                onClick={handleEditClick}
                            >
                                Редактировать рецепт
                            </Button>
                        </Stack>
                    )}
                </CardFooter>
            </Stack>
        </Card>
    );
};
