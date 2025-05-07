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
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { DataTestId } from '~/consts/consts';
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

    const { data: recipesData, isFetching: isLoading } = useGetRecipesQuery(
        isToggleActive
            ? { searchString: searchInputCurrent, allergens: selectedAllergens, limit: 8 }
            : { searchString: searchInputCurrent, limit: 8 },
        {
            skip: !isSearchTriggered,
        },
    );

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
            dispatch(setIsSearchTriggered(false));
        }
        dispatch(toggleIntroAllergen());
    };

    const handleRemoveFilter = (type: keyof typeof selectedFilters, value: string) => {
        const updatedFilter = selectedFilters[type]?.filter((item) => item !== value);
        dispatch(updateSelectedFilters({ type, value: updatedFilter || [] }));

        const updatedSearchParams = {
            ...searchParams,
            allergens: type === 'allergens' ? updatedFilter || [] : searchParams.allergens,
            meat: type === 'meatTypes' ? updatedFilter || [] : searchParams.meat,
            garnish: type === 'garnishTypes' ? updatedFilter || [] : searchParams.garnish,
        };
        dispatch(updateSearchParams(updatedSearchParams));
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
            {filterKeysToShow.some(
                (key) => Array.isArray(searchParams[key]) && searchParams[key]?.length,
            ) && (
                <HStack spacing={3} mb={4} flexWrap='wrap'>
                    {filterKeysToShow.flatMap((filterType) => {
                        const filterKey = filterType as keyof typeof searchParams;

                        const formattedKey =
                            filterKey === 'meat'
                                ? 'meatTypes'
                                : filterKey === 'garnish'
                                  ? 'garnishTypes'
                                  : filterKey;

                        return Array.isArray(searchParams[filterKey])
                            ? searchParams[filterKey]?.map((item, index) => (
                                  <Tag
                                      data-test-id={DataTestId.FilterTag}
                                      size='sm'
                                      key={`${filterKey}-${index}`}
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
                              ))
                            : [];
                    })}
                </HStack>
            )}
        </VStack>
    );
};
