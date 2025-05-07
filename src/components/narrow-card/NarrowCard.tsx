import { Button, Card, CardBody, Image, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { API_IMG } from '~/consts/consts';
import { Category } from '~/types/category';
import { getCategoriesFromDB } from '~/utils';

type NarrowCardProps = {
    title: string;
    categoriesIds: string[];
};

export const NarrowCard = ({ title, categoriesIds }: NarrowCardProps) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            const storedCategories = await getCategoriesFromDB();
            const matchedCategories = storedCategories.categories.filter((category) =>
                category.subCategories?.some((sub) => categoriesIds.includes(sub._id)),
            );
            const uniqueCategories = matchedCategories.filter(
                (cat, index, self) => self.findIndex((c) => c._id === cat._id) === index,
            );

            setCategories(uniqueCategories);
        };

        loadCategories();
    }, [categories.length, categoriesIds]);

    return (
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
                {categories.length > 0 && (
                    <Image src={`${API_IMG}${categories[0].icon}`} mr='2px' />
                )}
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
                    ml={2}
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
};
