import { Heading, Show, Text, VStack } from '@chakra-ui/react';

import { AllergenSelect } from '../allergen-select/AllergenSelect';
import { Search } from '../search/Search';

type IntroProps = {
    title: string;
    desc?: string;
};

export const Intro = ({ title, desc }: IntroProps) => (
    <VStack pr={{ md: 2 }}>
        <VStack mb={{ base: 2, sm: 7, lg: '18px' }}>
            <Heading
                as='h1'
                fontSize={{ base: 24, sm: 48 }}
                pr={{ base: 2, '2xs': 0 }}
                fontFamily='inherit'
            >
                {title}
            </Heading>
            {desc && (
                <Text
                    textAlign='center'
                    fontSize={{ base: 14, sm: 16 }}
                    mt={{ base: '6px' }}
                    lineHeight={{ base: '148%' }}
                    color='blackAlpha.600'
                >
                    {desc}
                </Text>
            )}
        </VStack>

        <VStack maxW={{ base: '447px', sm: '518px' }} gap={4} w='100%'>
            <Search />
            <Show above='md'>
                <AllergenSelect />
            </Show>
        </VStack>
    </VStack>
);
