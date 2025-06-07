import { Image, Tag, TagLabel } from '@chakra-ui/react';

import { API_IMG } from '~/consts/consts';

type TagComponentProps = {
    title: string;
    icon: string;
};
export const TagComponent = ({ icon, title }: TagComponentProps) => (
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
        <Image src={`${API_IMG}${icon}`} boxSize={5} />
        <TagLabel>{title}</TagLabel>
    </Tag>
);
