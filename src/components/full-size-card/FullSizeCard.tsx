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
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';
import { useOptimistic } from 'react';
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
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes);
    const [optimisticBookmarks, setOptimisticBookmarks] = useOptimistic(bookmarks);
    const [likeRecipe] = useLikeRecipeMutation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();

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

    const handleLike = async () => {
        setOptimisticLikes((prev) => prev + 1);
        try {
            await likeRecipe(_id).unwrap();
        } catch {
            setOptimisticLikes((prev) => prev - 1);
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
        }
    };

    const handleBookmark = async () => {
        setOptimisticBookmarks((prev) => prev + 1);
        try {
            await bookmarkRecipe(_id).unwrap();
        } catch {
            setOptimisticBookmarks((prev) => prev - 1);
            dispatch(setAlertStatus(ALERT_MESSAGES.SERVER_ERROR));
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
                                <Tag
                                    size={{ base: 'sm', sm: 'md' }}
                                    variant='subtle'
                                    backgroundColor='lime.50'
                                    gap={{ base: '1px', sm: 2 }}
                                    top='7px'
                                    left='8px'
                                    borderRadius={{ base: '4px', sm: 'lg' }}
                                    px={{ sm: '4px' }}
                                >
                                    <Image src={`${API_IMG}${cat.icon}`} boxSize={5} />
                                    <TagLabel>{cat.title}</TagLabel>
                                </Tag>
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
                        {optimisticBookmarks && (
                            <HStack gap={1}>
                                <BookmarkIcon color='black' />
                                <Box as='span'>{optimisticBookmarks}</Box>
                            </HStack>
                        )}

                        {optimisticLikes && (
                            <HStack alignItems='center' gap={1}>
                                <HappyFaceIcon color='black' />
                                <Box as='span'>{optimisticLikes}</Box>
                            </HStack>
                        )}
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
                                size={{ base: 'xs', sm: 'sm', xl: 'lg' }}
                                px={{ base: 2, sm: 3 }}
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
                                variant='outline'
                                fontSize={{ base: 12, sm: 16, xl: 14 }}
                                sx={{
                                    transition: 'all 0.3s ease-in-out',
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
                                onClick={handleLike}
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                size={{ base: 'sx', sm: 'sm', xl: 'lg' }}
                                leftIcon={<BookmarkIcon />}
                                colorScheme='black'
                                variant='solid'
                                bgColor='lime.400'
                                color='black'
                                fontWeight={600}
                                fontSize={{ base: 12, sm: 16, xl: 14 }}
                                p={1}
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
                                onClick={handleBookmark}
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
                                size={{ base: 'sx', sm: 'sm', xl: 'lg' }}
                                leftIcon={<WriteDraftIcon boxSize={4} />}
                                colorScheme='black'
                                variant='outline'
                                color='blackAlpha.800'
                                borderColor='blackAlpha.800'
                                fontSize={{ base: 12, md: 18 }}
                                p='3px'
                                onClick={handleEditClick}
                                sx={{
                                    transition: 'all 0.3s ease-in-out',
                                    '&:focus': {
                                        outline: 'none',
                                        borderColor: 'blackAlpha.800',
                                    },
                                    '&:hover': {
                                        bgColor: 'lime.600',
                                        color: 'white',
                                        borderColor: 'lime.600',
                                    },
                                }}
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
