import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import { NutritionValue } from '~/types/recipe';

type CaloricContentprops = {
    nutritionValue: NutritionValue;
};

export const CaloricContent = ({ nutritionValue }: CaloricContentprops) => (
    <Box>
        <Text color='blackAlpha.800' fontSize={14} mb={{ base: 2, md: 4 }}>
            * Калорийность на 1 порцию
        </Text>
        <SimpleGrid columns={{ base: 1, '2xs': 4 }} spacing={{ base: '10px', md: 3 }}>
            <Box
                display={{ base: 'grid', '2xs': 'flex' }}
                gridTemplateColumns={{ base: '50% 30% 20%' }}
                alignItems='center'
                gap={{ '2xs': 4 }}
                justifyContent='space-between'
                flexDir={{ base: 'row', '2xs': 'column' }}
                borderColor='blackAlpha.300'
                borderWidth={1}
                borderRadius={16}
                p={{ base: 5, md: 4 }}
            >
                <Text as='span' color='blackAlpha.600' fontSize={14}>
                    калорийность
                </Text>
                <Text
                    as='span'
                    color='lime.800'
                    fontSize={{ base: 26, '2xs': 36 }}
                    fontWeight={500}
                >
                    {nutritionValue.calories}
                </Text>
                <Text
                    as='span'
                    color='blackAlpha.900'
                    fontSize={{ base: 12, md: 14 }}
                    textTransform='uppercase'
                    fontWeight={600}
                >
                    ккал
                </Text>
            </Box>
            <Box
                display={{ base: 'grid', '2xs': 'flex' }}
                gridTemplateColumns={{ base: '50% 30% 20%' }}
                alignItems='center'
                gap={{ '2xs': 4 }}
                justifyContent='space-between'
                flexDir={{ base: 'row', '2xs': 'column' }}
                borderColor='blackAlpha.300'
                borderWidth={1}
                borderRadius={16}
                p={{ base: 5, md: 4 }}
            >
                <Text as='span' color='blackAlpha.600' fontSize={14}>
                    белки
                </Text>
                <Text
                    as='span'
                    color='lime.800'
                    fontSize={{ base: 26, '2xs': 36 }}
                    fontWeight={500}
                >
                    {nutritionValue.proteins}
                </Text>
                <Text
                    as='span'
                    color='blackAlpha.900'
                    fontSize={{ base: 12, md: 14 }}
                    textTransform='uppercase'
                    fontWeight={600}
                >
                    грамм
                </Text>
            </Box>
            <Box
                display={{ base: 'grid', '2xs': 'flex' }}
                gridTemplateColumns={{ base: '50% 30% 20%' }}
                alignItems='center'
                gap={{ '2xs': 4 }}
                justifyContent='space-between'
                flexDir={{ base: 'row', '2xs': 'column' }}
                borderColor='blackAlpha.300'
                borderWidth={1}
                borderRadius={16}
                p={{ base: 5, md: 4 }}
            >
                <Text as='span' color='blackAlpha.600' fontSize={14}>
                    жиры
                </Text>
                <Text
                    as='span'
                    color='lime.800'
                    fontSize={{ base: 26, '2xs': 36 }}
                    fontWeight={500}
                >
                    {nutritionValue.fats}
                </Text>
                <Text
                    as='span'
                    color='blackAlpha.900'
                    fontSize={{ base: 12, md: 14 }}
                    textTransform='uppercase'
                    fontWeight={600}
                >
                    грамм
                </Text>
            </Box>
            <Box
                display={{ base: 'grid', '2xs': 'flex' }}
                gridTemplateColumns={{ base: '50% 30% 20%' }}
                alignItems='center'
                gap={{ '2xs': 4 }}
                justifyContent='space-between'
                flexDir={{ base: 'row', '2xs': 'column' }}
                borderColor='blackAlpha.300'
                borderWidth={1}
                borderRadius={16}
                p={{ base: 5, md: 4 }}
            >
                <Text as='span' color='blackAlpha.600' fontSize={14}>
                    углеводы
                </Text>
                <Text
                    as='span'
                    color='lime.800'
                    fontSize={{ base: 26, '2xs': 36 }}
                    fontWeight={500}
                >
                    {nutritionValue.carbohydrates}
                </Text>
                <Text
                    as='span'
                    color='blackAlpha.900'
                    fontSize={{ base: 12, md: 14 }}
                    textTransform='uppercase'
                    fontWeight={600}
                >
                    грамм
                </Text>
            </Box>
        </SimpleGrid>
    </Box>
);
