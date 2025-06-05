import { Box, Button, Heading, HStack, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router';

import { OtherBlogItem } from '~/components/other-blog-item/OtherBlogItem';
import { AppRoute, DataTestId } from '~/consts/consts';
import { ArrowRightIcon } from '~/shared/custom-icons';
import { BloggerResponse } from '~/types/blogs';

export const OtherBlogsSection = ({ list }: { list: BloggerResponse[] }) => (
    <Box as='section'>
        <HStack justifyContent='space-between' mb={5}>
            <Heading as='h2' fontWeight={500} color='black' fontSize={48}>
                Другие блоги
            </Heading>
            <Button
                as={Link}
                to={AppRoute.Blogs}
                variant='ghost'
                colorScheme='black'
                rightIcon={<ArrowRightIcon />}
                data-test-id={DataTestId.BloggerUserOtherBlogsBtn}
                fontSize={18}
            >
                Всe авторы
            </Button>
        </HStack>
        <SimpleGrid
            columns={{ base: 1, '2xs': 3 }}
            spacing={4}
            data-test-id={DataTestId.BloggerUserOtherBlogsGrid}
        >
            {list.map((blogger) => (
                <OtherBlogItem blogger={blogger} variant='section' key={blogger._id} />
            ))}
        </SimpleGrid>
    </Box>
);
