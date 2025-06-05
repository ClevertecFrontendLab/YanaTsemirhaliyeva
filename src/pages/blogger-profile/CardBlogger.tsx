import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    HStack,
    Tooltip,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Loader } from '~/components/loader/Loader';
import { DataTestId, TOKEN_NAME } from '~/consts/consts';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { BookmarkIcon, SubscribeIcon, SubscribersIcon } from '~/shared/custom-icons';
import { decodeToken } from '~/utils/jwt-decode';

const FAVORITE_BTN_TOOLTIP = 'Нажмите, если хотите отписаться';

type CardBloggerProps = {
    id: string;
    firstName: string;
    lastName: string;
    login: string;
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};

export const CardBlogger = ({
    id,
    firstName,
    lastName,
    login,
    totalSubscribers,
    totalBookmarks,
    isFavorite,
}: CardBloggerProps) => {
    const token = localStorage.getItem(TOKEN_NAME);
    const currentUserData = decodeToken(token);
    const [isFavoriteBlogger, setIsFavoriteBlogger] = useState(isFavorite);

    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();

    const handleSubscription = async () => {
        const previousState = isFavoriteBlogger;

        setIsFavoriteBlogger((prev) => !prev);

        try {
            await toggleSubscription({
                toUserId: id,
                fromUserId: currentUserData?.userId,
            }).unwrap();
        } catch {
            setIsFavoriteBlogger(previousState);
        }
    };

    return (
        <Card
            data-test-id={DataTestId.BloggerUserInfoBox}
            alignItems='center'
            flexDir='row'
            boxShadow='none'
            justifyContent='center'
            gap={6}
        >
            <Avatar name={firstName} src={firstName} size='2xl' />
            <VStack alignItems='flex-start'>
                <CardHeader
                    data-test-id={DataTestId.BloggerUserInfoName}
                    p={0}
                    fontSize={48}
                    color='black'
                    fontWeight={700}
                    mb={3}
                >
                    {firstName} {lastName}
                </CardHeader>
                <CardBody
                    p={0}
                    fontSize={14}
                    color='blackAlpha.700'
                    data-test-id={DataTestId.BloggerUserInfoLogin}
                >
                    @{login}
                </CardBody>
                <CardFooter p={0} justifyContent='space-between' w='100%'>
                    {isFavoriteBlogger ? (
                        <Tooltip
                            data-test-id={DataTestId.BlogTooltip}
                            label={FAVORITE_BTN_TOOLTIP}
                            w='148px'
                            bg='black'
                            sx={{
                                borderRadius: '4px',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: 'black',
                                    transform: 'rotate(45deg)',
                                    left: '60px',
                                    top: '-5px',
                                },
                            }}
                            placement='bottom-end'
                            offset={[50, 10]}
                        >
                            <Button
                                variant='outline'
                                colorScheme='black'
                                color='blackAlpha.800'
                                bgColor='white'
                                borderColor='blackAlpha.600'
                                size='xs'
                                leftIcon={<SubscribeIcon />}
                                onClick={handleSubscription}
                                isLoading={isLoading}
                                data-test-id={DataTestId.BlogsToggleUnsubscribe}
                            >
                                Вы подписаны
                            </Button>
                        </Tooltip>
                    ) : (
                        <Button
                            variant='outline'
                            colorScheme='black'
                            color='white'
                            bgColor='black'
                            borderColor='black'
                            size='xs'
                            leftIcon={<SubscribeIcon />}
                            onClick={handleSubscription}
                            isLoading={isLoading}
                            data-test-id={DataTestId.BlogsToggleSubscribe}
                        >
                            Подписаться
                        </Button>
                    )}

                    <HStack>
                        <HStack>
                            {totalBookmarks && (
                                <HStack gap={1} data-test-id={DataTestId.BloggerFollowersBookmarks}>
                                    <BookmarkIcon color='black' boxSize={3} />
                                    <Box as='span' color='lime.600' fontWeight={600} fontSize={12}>
                                        {totalBookmarks}
                                    </Box>
                                </HStack>
                            )}

                            {totalSubscribers && (
                                <HStack
                                    alignItems='center'
                                    gap={1}
                                    data-test-id={DataTestId.BloggerFollowersCount}
                                >
                                    <SubscribersIcon color='black' boxSize={3} />
                                    <Box as='span' color='lime.600' fontWeight={600} fontSize={12}>
                                        {totalSubscribers}
                                    </Box>
                                </HStack>
                            )}
                        </HStack>
                    </HStack>
                </CardFooter>
            </VStack>
            {isLoading && (
                <Box w='100%' h='100%' pos='absolute' bgColor='blackAlpha.400'>
                    <Box
                        pos='absolute'
                        left='50%'
                        top='50%'
                        transform='translate(-50%, -50%)'
                        data-test-id={DataTestId.MobileLoader}
                    >
                        <Loader boxSize='12' />
                    </Box>
                </Box>
            )}
        </Card>
    );
};
