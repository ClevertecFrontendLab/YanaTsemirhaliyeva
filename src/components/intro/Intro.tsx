import {
    Center,
    Heading,
    HStack,
    Show,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    useOutsideClick,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { DataTestId, DEFAULT_CARDS_PER_PAGE } from '~/consts/consts';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    addAllergen,
    allergensSelector,
    clearAllergens,
    isIntroActiveSelector,
    isSearchTriggeredSelector,
    removeAllergen,
    searchParamsSelector,
    selectedFiltersSelector,
    serchInputSelector,
    setIsSearchTriggered,
    toggleIntroAllergen,
    updateSearchParams,
    updateSelectedFilters,
} from '~/store/slices/recipes-slice';
import { formatFilters } from '~/utils';

import { AllergenSelect } from '../allergens/Allergens';
import { Loader } from '../loader/Loader';
import { Search } from '../search/Search';

type IntroProps = {
    title: string;
    desc?: string;
};

export const Intro = ({ title, desc }: IntroProps) => {
    const introRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [isShadowVisible, setShadowVisible] = useState(false);
    const selectedAllergens = useAppSelector(allergensSelector);
    const searchInputCurrent = useSelector(serchInputSelector);
    const isToggleActive = useAppSelector(isIntroActiveSelector);
    const isSearchTriggered = useAppSelector(isSearchTriggeredSelector);
    const searchParams = useAppSelector(searchParamsSelector);
    const selectedFilters = useAppSelector(selectedFiltersSelector);
    const filterKeysToShow: Array<
        keyof Pick<typeof searchParams, 'allergens' | 'meat' | 'garnish'>
    > = ['allergens', 'meat', 'garnish'];
    const formattedFilters = formatFilters(filterKeysToShow, searchParams, selectedFilters);

    const recipesQueryParams = {
        searchString: searchInputCurrent,
        limit: DEFAULT_CARDS_PER_PAGE,
        ...(isToggleActive ? { allergens: selectedAllergens } : {}),
    };

    const { data: recipesData, isFetching: isLoading } = useGetRecipesQuery(recipesQueryParams, {
        skip: !isSearchTriggered,
    });

    useEffect(() => {
        dispatch(setIsSearchTriggered(false));
    }, [dispatch, recipesData]);

    const handleAddCustomAllergen = (customAllergen: string) => {
        if (customAllergen.trim() && !selectedAllergens.includes(customAllergen)) {
            dispatch(addAllergen(customAllergen));
            const updatedAllergens = [...(selectedFilters.allergens || []), customAllergen];
            dispatch(updateSelectedFilters({ type: 'allergens', value: updatedAllergens }));
        }
    };

    const handleCheckboxChange = (allergen: string) => {
        const isAllergenSelected = selectedAllergens.includes(allergen);
        dispatch(isAllergenSelected ? removeAllergen(allergen) : addAllergen(allergen));
        const currentAllergens = selectedFilters.allergens || [];
        let updatedAllergens: string[];

        if (isAllergenSelected) {
            updatedAllergens = currentAllergens.filter((item) => item !== allergen);
        } else {
            updatedAllergens = [...currentAllergens, allergen];
        }

        dispatch(updateSelectedFilters({ type: 'allergens', value: updatedAllergens }));
    };

    const handleToggleFilter = () => {
        if (isToggleActive) {
            dispatch(clearAllergens());
            dispatch(setIsSearchTriggered(false));
            dispatch(updateSelectedFilters({ type: 'allergens', value: [] }));
        }
        dispatch(toggleIntroAllergen());
    };

    const handleRemoveFilter = (type: string, value: string) => {
        let filterType: keyof typeof selectedFilters;

        if (type === 'allergens') filterType = 'allergens';
        else if (type === 'meat') filterType = 'meatTypes';
        else if (type === 'garnish') filterType = 'garnishTypes';
        else filterType = type as keyof typeof selectedFilters;

        const currentValues = selectedFilters[filterType] || [];
        const updatedValues = currentValues.filter((item) => item !== value);
        dispatch(updateSelectedFilters({ type: filterType, value: updatedValues }));

        if (type === 'allergens') {
            dispatch(removeAllergen(value));
        }
        const updatedSearchParams: Partial<typeof searchParams> = { ...searchParams };

        if (type === 'allergens') {
            updatedSearchParams.allergens = updatedValues;
        } else if (type === 'meat') {
            updatedSearchParams.meat = updatedValues;
        } else if (type === 'garnish') {
            updatedSearchParams.garnish = updatedValues;
        }

        dispatch(updateSearchParams(updatedSearchParams));
    };

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
                {isLoading ? (
                    <Center data-test-id={DataTestId.LoaderSearchBlock}>
                        <Loader boxSize={100} />
                    </Center>
                ) : (
                    <>
                        <Search recipesData={recipesData?.data} />
                        <Show above='md'>
                            <AllergenSelect
                                width='270px'
                                selectedAllergens={selectedAllergens}
                                isFilterActive={isToggleActive}
                                onToggleFilter={handleToggleFilter}
                                onCheckboxChange={handleCheckboxChange}
                                onAddCustomAllergen={handleAddCustomAllergen}
                                setShadowVisible={setShadowVisible}
                                testIdSwitcher={DataTestId.AllergensSwitcher}
                                testIdMenuButton={DataTestId.AllergensMenuBtn}
                                testIdMenuList={DataTestId.AllergensMenu}
                                isIntro
                            />
                        </Show>
                    </>
                )}
            </VStack>
            <HStack spacing={3} mb={4} flexWrap='wrap'>
                {formattedFilters.map(({ key, formattedKey, item }) => (
                    <Tag
                        data-test-id={DataTestId.FilterTag}
                        size='sm'
                        key={`${key}`}
                        borderRadius='md'
                        border='1px solid'
                        borderColor='lime.400'
                        variant='solid'
                        bgColor='lime.100'
                        color='lime.700'
                    >
                        <TagLabel>{item}</TagLabel>
                        <TagCloseButton
                            onClick={() =>
                                handleRemoveFilter(
                                    formattedKey as keyof typeof selectedFilters,
                                    item,
                                )
                            }
                            _focus={{ outline: 'none' }}
                        />
                    </Tag>
                ))}
            </HStack>
        </VStack>
    );
};
