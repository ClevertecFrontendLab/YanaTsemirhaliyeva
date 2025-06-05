import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Loader } from '~/components/loader/Loader';
import { DataTestId, TOKEN_NAME } from '~/consts/consts';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { BookmarkIcon, SubscribeIcon, SubscribersIcon } from '~/shared/custom-icons';
import { BloggerResponse } from '~/types/blogs';
import { decodeToken } from '~/utils/jwt-decode';

type OtherBlogItemProps = {
    blogger: BloggerResponse;
    variant?: 'section' | 'page';
};
export const OtherBlogItem = ({ blogger, variant = 'page' }: OtherBlogItemProps) => {
    const token = localStorage.getItem(TOKEN_NAME);
    const currentUserData = decodeToken(token);
    const [isFavorite, setIsFavorite] = useState(false);

    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();

    const handleSubscription = (id: string) => {
        toggleSubscription({
            toUserId: id,
            fromUserId: currentUserData?.userId,
        })
            .unwrap()
            .then(() => {
                setIsFavorite((prev) => !prev);
            });
    };

    return (
        <Card
            data-test-id={DataTestId.BlogsCard}
            pos='relative'
            borderRadius={5}
            flex='1 1 auto'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: `
              0 4px 6px -1px rgba(16, 58, 2, 0.1),
              0 2px 4px -1px rgba(32, 126, 0, 0.06)
            `,
            }}
        >
            <CardHeader p={{ base: 3, sm: 4, xl: 5 }} pl={{ base: 4, xl: 6 }}>
                <Box maxW='100%'>
                    <Flex flex='1' gap={{ base: '6px', sm: 3 }} alignItems='center'>
                        <Avatar name={blogger.lastName} src={blogger.firstName} size='md' />
                        <Box overflow='hidden'>
                            <Heading
                                data-test-id={DataTestId.BlogsCardName}
                                as='h2'
                                size='sm'
                                fontFamily='inherit'
                                fontSize={{ base: 16, sm: 18 }}
                                fontWeight={500}
                                noOfLines={1}
                                sx={{
                                    wordBreak: 'break-all',
                                }}
                                pt={{ base: '6px', sm: '0', md: 2 }}
                            >
                                {blogger.firstName} {blogger.lastName}
                            </Heading>
                            <Text
                                fontSize={{ base: 12, sm: 14 }}
                                color='blackAlpha.700'
                                isTruncated
                                data-test-id={DataTestId.BlogsCardLogin}
                            >
                                @{blogger.login}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </CardHeader>
            <CardBody p={{ base: 4, xl: 5 }} pt={{ base: 0, xl: 1 }}>
                <Text
                    noOfLines={3}
                    fontSize={14}
                    lineHeight='148%'
                    data-test-id={DataTestId.BlogsCardNotesText}
                >
                    {blogger.notes?.length > 0 && blogger.notes[0]?.text}
                </Text>
            </CardBody>
            <CardFooter
                pt={0}
                justifyContent='space-between'
                flexDir={
                    variant === 'page'
                        ? { base: 'column', '2xs': 'row' }
                        : { base: 'column', xl: 'row' }
                }
                alignItems={
                    variant === 'page'
                        ? { base: 'flex-end', '2xs': 'center' }
                        : { base: 'flex-end', xl: 'center' }
                }
            >
                <ButtonGroup
                    order={variant === 'page' ? { base: 2, '2xs': 1 } : { base: 2, xl: 1 }}
                >
                    <Button
                        variant={isFavorite ? 'outline' : 'solid'}
                        colorScheme='black'
                        color={isFavorite ? 'blackAlpha.800' : 'white'}
                        bgColor={isFavorite ? 'transparent' : 'black'}
                        borderColor={isFavorite ? 'blackAlpha.600' : 'black'}
                        size='xs'
                        leftIcon={<SubscribeIcon />}
                        onClick={() => handleSubscription(blogger._id)}
                        isLoading={isLoading}
                        data-test-id={
                            isFavorite
                                ? DataTestId.BlogsToggleUnsubscribe
                                : DataTestId.BlogsToggleSubscribe
                        }
                    >
                        {isFavorite ? 'Вы подписаны' : 'Подписаться'}
                    </Button>
                    <Button
                        variant='outline'
                        colorScheme='lime'
                        size='xs'
                        as={Link}
                        to={`/blogs/${blogger._id}#notes`}
                        data-test-id={DataTestId.BlogsCardRecipesBtn}
                    >
                        Читать
                    </Button>
                </ButtonGroup>
                <HStack
                    order={variant === 'page' ? { base: 1, '2xs': 2 } : { base: 1, xl: 2 }}
                    mb={variant === 'page' ? { base: 3, '2xs': 0 } : { base: 3, '2xl': 0 }}
                >
                    {blogger.bookmarksCount && (
                        <HStack gap={1}>
                            <BookmarkIcon color='black' boxSize={3} />
                            <Box as='span' color='lime.600' fontWeight={600} fontSize={12}>
                                {blogger.bookmarksCount}
                            </Box>
                        </HStack>
                    )}

                    {blogger.subscribersCount && (
                        <HStack alignItems='center' gap={1}>
                            <SubscribersIcon color='black' boxSize={3} />
                            <Box as='span' color='lime.600' fontWeight={600} fontSize={12}>
                                {blogger.subscribersCount}
                            </Box>
                        </HStack>
                    )}
                </HStack>
            </CardFooter>
            {isLoading && (
                <Box w='100%' h='100%' pos='absolute' bgColor='blackAlpha.400'>
                    <Box
                        pos='absolute'
                        left='50%'
                        top='50%'
                        transform='translate(-50%, -50%)'
                        data-test-id={DataTestId.MobileLoader}
                    >
                        <Loader boxSize={12} />
                    </Box>
                </Box>
            )}
        </Card>
    );
};
