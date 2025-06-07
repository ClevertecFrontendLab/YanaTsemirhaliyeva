import { Box, SimpleGrid } from '@chakra-ui/react';

import { OtherBlogItem } from '~/components/other-blog-item/OtherBlogItem';
import { DataTestId } from '~/consts/consts';
import { BloggerResponse } from '~/types/blogs';

type OtherBlogListProps = {
    list: BloggerResponse[];
};

export const OtherBlogList = ({ list }: OtherBlogListProps) => (
    <Box
        p={{ base: 3, sm: 6 }}
        pt={{ xs: 4, sm: 3, lg: 6 }}
        data-test-id={DataTestId.BlogsOthersBox}
    >
        <SimpleGrid
            data-test-id={DataTestId.BlogsOthersGrid}
            columns={{ base: 1, '2xs': 2, xl: 3 }}
            spacing={4}
        >
            {list.map((blogger) => (
                <OtherBlogItem key={blogger._id} blogger={blogger} />
            ))}
        </SimpleGrid>
    </Box>
);
