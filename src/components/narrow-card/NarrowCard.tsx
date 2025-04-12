import { Box, Button, Card, CardBody, Spacer, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type NarrowCardProps = {
    title: string;
    icon: ReactNode;
};

export const NarrowCard = ({ title, icon }: NarrowCardProps) => (
    <Card
        variant='outline'
        borderRadius='lg'
        transition='box-shadow 0.3s ease-in-out'
        _hover={{
            boxShadow: `
          0 4px 6px -1px rgba(16, 58, 2, 0.1),
          0 2px 4px -1px rgba(32, 126, 0, 0.06)
        `,
        }}
    >
        <CardBody
            display='flex'
            alignItems='center'
            py={{ base: '10px', xs: 2, md: '10px', xl: 3 }}
            px={{ base: 2, xl: 6 }}
        >
            <Box mr={{ base: 2, sm: 3 }}>{icon}</Box>
            <Text
                fontSize={{ base: 16, sm: 18, xl: 20 }}
                fontWeight={500}
                noOfLines={1}
                sx={{ wordBreak: 'break-all' }}
            >
                {title}
            </Text>
            <Spacer />
            <Button
                size='sm'
                variant='outline'
                borderColor='lime.600'
                color='lime.600'
                fontSize={{ base: 12, xl: 14 }}
                fontWeight={{ base: 400, lg: 600 }}
                minW='70px'
                sx={{
                    transition: 'all 0.3s ease-in-out',
                    paddingInline: { base: '0px', sm: '8px' },
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
                Готовить
            </Button>
        </CardBody>
    </Card>
);
