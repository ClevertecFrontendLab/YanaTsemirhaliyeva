import { Box, Heading, Image, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';

import { Step } from '~/types/recipe';

type CookStepsProps = {
    steps: Step[];
};

export const CookSteps = ({ steps }: CookStepsProps) => (
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
                    maxH={{ base: '128px', sm: '244px' }}
                >
                    {step.image && (
                        <Image
                            src={step.image}
                            alt={`Шаг ${step.stepNumber}`}
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                            w={{ base: '48%', '2xs': '52%', md: '60%', xl: '52%' }}
                            objectFit='cover'
                        />
                    )}
                    <VStack py={{ base: 2, md: 5 }} px={{ base: 2, md: 6 }} alignItems='flex-start'>
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
