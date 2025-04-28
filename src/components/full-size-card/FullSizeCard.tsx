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
} from '@chakra-ui/react';

import { CategoriesData, getCategoryContent } from '~/consts/category-icons';
import { BookmarkIcon, HappyFaceIcon, TimeIcon } from '~/shared/custom-icons';

type FullSizeCardProps = {
    title: string;
    description: string;
    bookmarks: number;
    likes: number;
    time: string;
    category: string[];
    image: string;
};

export const FullSizeCard = ({
    title,
    description,
    bookmarks,
    likes,
    time,
    category,
    image,
}: FullSizeCardProps) => (
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
            src={image}
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
                    {category.map((cat, i) => {
                        const { IconComponent, label } = getCategoryContent(
                            cat as keyof typeof CategoriesData,
                        );
                        return (
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
                                    {IconComponent && <IconComponent boxSize={5} />}
                                    <TagLabel fontSize={{ base: 14, sm: 12, lg: 14 }} pr={1}>
                                        {label}
                                    </TagLabel>
                                </Tag>
                            </Box>
                        );
                    })}
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
                <Stack direction='row' spacing={2}>
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
                        Сохранить в закладки
                    </Button>
                </Stack>
            </CardFooter>
        </Stack>
    </Card>
);
