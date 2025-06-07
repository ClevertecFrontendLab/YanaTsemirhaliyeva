import {
    Avatar,
    Box,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import AvatarImg from '~/assets/img/avatar-2.jpg';
import { DataTestId, TOKEN_NAME } from '~/consts/consts';
import { useGetBloggerByIdQuery, useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { SubscribeIcon, SubscribersIcon } from '~/shared/custom-icons';
import { useAppDispatch } from '~/store/hooks';
import { setIsRecipeAuthorFetching } from '~/store/slices/recipes-slice';
import { decodeToken } from '~/utils/jwt-decode';

export const RecipeAuthor = ({ authorId }: { authorId: string }) => {
    const dispatch = useAppDispatch();
    const token = localStorage.getItem(TOKEN_NAME);
    const currentUserData = decodeToken(token);
    const [isFavorite, setIsFavorite] = useState(false);
    const [totalSubscribers, setTotalSubscribers] = useState(0);

    const { data: authorInfo, isLoading } = useGetBloggerByIdQuery({
        bloggerId: authorId,
        currentUserId: currentUserData?.userId,
    });

    const [toggleSubscription] = useToggleSubscriptionMutation();

    const handleSubscription = () => {
        toggleSubscription({
            toUserId: authorId,
            fromUserId: currentUserData?.userId,
        })
            .unwrap()
            .then(() => {
                setIsFavorite((prev) => !prev);
                setTotalSubscribers((prev) => (isFavorite ? prev - 1 : prev + 1));
            });
    };

    useEffect(() => {
        if (authorInfo) {
            setIsFavorite(authorInfo.isFavorite);
            setTotalSubscribers(authorInfo.totalSubscribers);
        }
    }, [authorInfo]);

    useEffect(() => {
        dispatch(setIsRecipeAuthorFetching(isLoading));
    }, [dispatch, isLoading]);

    if (!authorInfo || currentUserData?.userId === authorId) {
        return null;
    }

    return (
        <Card
            bgColor='lime.300'
            display='flex'
            flexDir='row'
            alignItems='center'
            p={{ base: 1, '2xs': 6 }}
            px={{ base: 3 }}
            gap={{ base: 2 }}
        >
            <Avatar name='Segun Adebayo' src={AvatarImg} size='xl' />
            <Box width='100%'>
                <CardHeader
                    display='flex'
                    flexDir={{ base: 'column', '2xs': 'row' }}
                    justifyContent='space-between'
                    gap={{ '2xs': 2 }}
                    p={0}
                    mb={{ base: 2 }}
                >
                    <Flex gap='4' alignItems='center' flexWrap='wrap' order={{ base: 2, '2xs': 1 }}>
                        <Box>
                            <Heading fontSize={{ base: 18, '2xs': 24 }} fontWeight={700}>
                                {authorInfo.bloggerInfo.firstName} {authorInfo.bloggerInfo.lastName}
                            </Heading>
                            <Text fontSize={14} color='blackAlpha.700'>
                                @{authorInfo.bloggerInfo.login}
                            </Text>
                        </Box>
                    </Flex>
                    <Text
                        fontSize={{ base: 12, '2xs': 14 }}
                        order={{ base: 1, '2xs': 2 }}
                        alignSelf={{ base: 'flex-end', '2xs': 'flex-start' }}
                    >
                        Автор рецепта
                    </Text>
                </CardHeader>
                <CardFooter p={0} justify='space-between' flexWrap='wrap'>
                    <Button
                        variant={isFavorite ? 'outline' : 'solid'}
                        colorScheme='black'
                        color={isFavorite ? 'blackAlpha.800' : 'white'}
                        bgColor={isFavorite ? 'transparent' : 'black'}
                        borderColor={isFavorite ? 'blackAlpha.600' : 'black'}
                        leftIcon={<SubscribeIcon />}
                        fontSize={12}
                        size='xs'
                        onClick={handleSubscription}
                        data-test-id={
                            isFavorite
                                ? DataTestId.BlogsToggleUnsubscribe
                                : DataTestId.BlogsToggleSubscribe
                        }
                    >
                        {isFavorite ? 'Вы подписаны' : 'Подписаться'}
                    </Button>
                    <HStack>
                        <SubscribersIcon />
                        <Text color='lime.600' fontWeight={600} fontSize={12}>
                            {totalSubscribers}
                        </Text>
                    </HStack>
                </CardFooter>
            </Box>
        </Card>
    );
};
