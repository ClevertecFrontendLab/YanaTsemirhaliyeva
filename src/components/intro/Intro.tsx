import { Heading, Show, Text, useOutsideClick, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    addAllergen,
    allergensSelector,
    clearAllergens,
    isIntroActiveSelector,
    removeAllergen,
    toggleIntroAllergen,
} from '~/store/slices/recipes-slice';

import { AllergenSelect } from '../allergens/Allergens';
import { Search } from '../search/Search';

type IntroProps = {
    title: string;
    desc?: string;
};

export const Intro = ({ title, desc }: IntroProps) => {
    const [isShadowVisible, setShadowVisible] = useState(false);

    const selectedAllergens = useAppSelector(allergensSelector);
    const isToggleActive = useAppSelector(isIntroActiveSelector);
    const introRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const handleAddCustomAllergen = (customAllergen: string) => {
        if (customAllergen.trim() && !selectedAllergens.includes(customAllergen)) {
            dispatch(addAllergen(customAllergen));
        }
    };

    const handleCheckboxChange = (allergen: string) => {
        dispatch(
            selectedAllergens.includes(allergen) ? removeAllergen(allergen) : addAllergen(allergen),
        );
    };

    const handleToggleFilter = () => {
        if (isToggleActive) {
            dispatch(clearAllergens());
        }
        dispatch(toggleIntroAllergen());
    };

    // Активируем тень при клике внутри Intro
    const handleClickInsideIntro = () => {
        setShadowVisible(true);
    };

    const handleClickOutsideIntro = () => {
        setShadowVisible(false);
    };

    useOutsideClick({
        ref: introRef as React.RefObject<HTMLElement>,
        handler: handleClickOutsideIntro,
    });

    return (
        <VStack
            ml={{ xl: 5 }}
            pr={{ md: 2 }}
            px={{ base: 3, '2xs': 1 }}
            pb={8}
            ref={introRef}
            borderRadius={16}
            boxShadow={
                isShadowVisible
                    ? '0px 10px 8px rgba(0, 0, 0, 0.1), 0px 14px 16px rgba(0, 0, 0, 0.08)'
                    : 'none'
            }
            transition='box-shadow 0.3s ease-in-out'
            onClick={handleClickInsideIntro}
        >
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
                    <AllergenSelect
                        width='270px'
                        selectedAllergens={selectedAllergens}
                        isFilterActive={isToggleActive}
                        onToggleFilter={handleToggleFilter}
                        onCheckboxChange={handleCheckboxChange}
                        onAddCustomAllergen={handleAddCustomAllergen}
                        setShadowVisible={setShadowVisible}
                        testIdSwitcher='allergens-switcher'
                        testIdMenuButton='allergens-menu-button'
                        testIdMenuList='allergens-menu'
                        isIntro
                    />
                </Show>
            </VStack>
        </VStack>
    );
};
