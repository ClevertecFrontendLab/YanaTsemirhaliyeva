import { Box, Heading, Image, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';

import { API_IMG } from '~/consts/consts';
import { Step } from '~/types/recipe';

type CookStepsProps = {
    steps: Step[];
};

export const CookSteps = ({ steps }: CookStepsProps) => {
    const [isImgLoadSuccess, setIsImgLoadSuccess] = useState(true);

    const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.style.display = 'none';
        setIsImgLoadSuccess(false);
    };

    return (
        <Box>
            <Heading as='h2' fontSize={{ base: 24, md: 48 }} mb={{ base: 6 }}>
                Шаги приготовления
            </Heading>
            <UnorderedList
                listStyleType='none'
                marginInlineStart={0}
                display='flex'
                flexDir='column'
                gap={5}
            >
                {steps.map((step) => (
                    <ListItem
                        key={step.stepNumber}
                        display='flex'
                        borderRadius={8}
                        borderWidth={1}
                        borderColor='blackAlpha.200'
                        overflow='hidden'
                        minH={{ base: '128px' }}
                    >
                        {step.image && isImgLoadSuccess && (
                            <Box
                                w={{ base: '48%', '2xs': '52%', md: '60%', xl: '52%' }}
                                pos='relative'
                            >
                                <Image
                                    src={`${API_IMG}${step.image}`}
                                    alt={`Шаг ${step.stepNumber}`}
                                    onError={(e) => handleImageError(e)}
                                    objectFit='cover'
                                    w='100%'
                                    h='100%'
                                    pos='absolute'
                                />
                            </Box>
                        )}
                        <VStack
                            w={
                                isImgLoadSuccess
                                    ? { base: '52%', '2xs': '48%', md: '40%', xl: '48%' }
                                    : '100%'
                            }
                            py={{ base: 2, md: 5 }}
                            px={{ base: 2, md: 6 }}
                            alignItems='flex-start'
                        >
                            <Text
                                bgColor='blackAlpha.100'
                                px={2}
                                borderRadius={4}
                                fontSize={{ base: 14 }}
                            >
                                Шаг {step.stepNumber}
                            </Text>
                            <Text fontSize={{ base: 14 }}>{step.description}</Text>
                        </VStack>
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    );
};
