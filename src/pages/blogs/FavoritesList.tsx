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
    SimpleGrid,
    Tag,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import { AppRoute, DataTestId } from '~/consts/consts';
import { BookmarkIcon, SubscribersIcon } from '~/shared/custom-icons';
import { BloggerResponse } from '~/types/blogs';

import { getRecipeText } from './utils';

type FavoritesListProps = {
    list: BloggerResponse[];
};

export const FavoritesList = ({ list }: FavoritesListProps) => (
    <Box
        as='section'
        bgColor='lime.400'
        borderRadius={12}
        p={{ base: 3, sm: 6 }}
        pt={{ xs: 4, sm: 3, lg: 6 }}
        data-test-id={DataTestId.BlogsFavoritesBox}
    >
        <Heading as='h2' fontSize={{ base: 24, md: 36 }} color='black' fontWeight={400} mb={4}>
            Избранные блоги
        </Heading>
        <SimpleGrid
            columns={{ base: 1, '2xs': 2 }}
            spacing={4}
            data-test-id={DataTestId.BlogsFavoritesGrid}
        >
            {list.map((blogger) => (
                <Card
                    data-test-id={DataTestId.BlogsCard}
                    key={blogger._id}
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
                    <CardHeader
                        p={{
                            base: '28px 12px 12px 12px',
                            sm: '28px 16px 16px 16px',
                            xl: '28px 24px 24px 24px',
                        }}
                    >
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
                    <CardFooter justifyContent='space-between' pt={0} pb={3}>
                        <ButtonGroup>
                            <Button
                                variant='solid'
                                colorScheme='lime'
                                color='black'
                                size='xs'
                                as={Link}
                                to={`${AppRoute.Blogs}/${blogger._id}`}
                                data-test-id={DataTestId.BlogsCardRecipesBtn}
                                fontSize={14}
                            >
                                Рецепты
                            </Button>
                            <Button
                                variant='outline'
                                colorScheme='lime'
                                size='xs'
                                as={Link}
                                to={`/blogs/${blogger._id}#notes`}
                                data-test-id={DataTestId.BlogsCardNotesBtn}
                                fontSize={14}
                            >
                                Читать
                            </Button>
                        </ButtonGroup>
                        <HStack>
                            <HStack>
                                {blogger.bookmarksCount && (
                                    <HStack gap={1}>
                                        <BookmarkIcon color='black' boxSize={3} />
                                        <Box
                                            as='span'
                                            color='lime.600'
                                            fontWeight={600}
                                            fontSize={12}
                                        >
                                            {blogger.bookmarksCount}
                                        </Box>
                                    </HStack>
                                )}

                                {blogger.subscribersCount && (
                                    <HStack alignItems='center' gap={1}>
                                        <SubscribersIcon color='black' boxSize={3} />
                                        <Box
                                            as='span'
                                            color='lime.600'
                                            fontWeight={600}
                                            fontSize={12}
                                        >
                                            {blogger.subscribersCount}
                                        </Box>
                                    </HStack>
                                )}
                            </HStack>
                        </HStack>
                    </CardFooter>
                    {blogger.newRecipesCount > 0 && (
                        <Tag
                            pos='absolute'
                            right={2}
                            top={2}
                            data-test-id={DataTestId.BlogsCardNewRecipesBadge}
                        >
                            {getRecipeText(blogger.newRecipesCount)}
                        </Tag>
                    )}
                </Card>
            ))}
        </SimpleGrid>
    </Box>
);
