import './NewRecipes.css';

import { Box, Heading, IconButton } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { VerticalCard } from '~/components/vertical-card/VerticalCard';
import { DataTestId } from '~/consts/consts';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ArrowRightIcon } from '~/shared/custom-icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { searchParamsSelector, setError } from '~/store/slices/recipes-slice';
import { generateTestId } from '~/utils';

export const NewRecipes = () => {
    const dispatch = useAppDispatch();
    const swiperRef = useRef<SwiperType | null>(null);
    const searchParams = useAppSelector(searchParamsSelector);
    const [params, setParams] = useState({
        ...searchParams,
        sortBy: 'createdAt' as const,
        sortOrder: 'desc' as const,
    });

    useEffect(() => {
        setParams({ ...searchParams, sortBy: 'createdAt', sortOrder: 'desc', limit: 10 });
    }, [searchParams]);

    const { data, isError } = useGetRecipesQuery(params, {
        // refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (isError) {
            dispatch(setError(true));
        }
    }, [dispatch, isError]);

    const newestRecipes = data?.data || [];

    const sortedRecipes = [...newestRecipes].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    if (sortedRecipes.length === 0) return;

    return (
        <Box as='section' w='100%' boxSizing='border-box'>
            <Heading
                as='h2'
                fontSize={{ base: 24, sm: 36, xl: 48 }}
                fontFamily='inherit'
                fontWeight={500}
                mb={{ base: 3, sm: 6, xl: 5 }}
            >
                Новые рецепты
            </Heading>
            <Box pos='relative' data-test-id={DataTestId.Carousel}>
                {sortedRecipes.length > 0 ? (
                    <>
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={2.1}
                            spaceBetween={12}
                            loop={true}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            navigation={{
                                prevEl: '.slider-controls--prev',
                                nextEl: '.slider-controls--next',
                            }}
                            breakpoints={{
                                620: { slidesPerView: 4.3, spaceBetween: 12 },
                                1200: { slidesPerView: 3.1, spaceBetween: 12 },
                                1536: { slidesPerView: 4, spaceBetween: 18 },
                            }}
                        >
                            {sortedRecipes.map((recipe, i) => (
                                <SwiperSlide
                                    key={recipe._id}
                                    style={{ minHeight: '100%' }}
                                    data-test-id={generateTestId(DataTestId.CarouselCard, i)}
                                >
                                    <Box w='100%' minH='100%' pb='6px'>
                                        <VerticalCard item={{ ...recipe }} />
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {sortedRecipes.length > 3 && (
                            <Box className='swiper-btns'>
                                <IconButton
                                    data-test-id={DataTestId.CarouselCardBtnBack}
                                    aria-label='left'
                                    className='slider-controls slider-controls--prev'
                                    icon={
                                        <ArrowRightIcon
                                            color='white'
                                            boxSize={6}
                                            sx={{ transform: 'rotate(180deg)' }}
                                        />
                                    }
                                    bg='black'
                                    pos='absolute'
                                    top='50%'
                                    left='-10px'
                                    transform='translateY(-50%)'
                                    zIndex={1}
                                    _hover={{ bg: 'blackAlpha.800', border: 'black' }}
                                    _focus={{ outline: 'none' }}
                                    boxSize={12}
                                />
                                <IconButton
                                    data-test-id={DataTestId.CarouselCardBtnForward}
                                    aria-label='right'
                                    className='slider-controls slider-controls--next'
                                    icon={<ArrowRightIcon color='white' boxSize={6} />}
                                    bg='black'
                                    pos='absolute'
                                    top='50%'
                                    right='-10px'
                                    transform='translateY(-50%)'
                                    zIndex={1}
                                    _hover={{ bg: 'blackAlpha.800', border: 'black' }}
                                    _focus={{ outline: 'none' }}
                                    boxSize={12}
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <Box textAlign='center' mt='16px' fontSize='lg' color='gray.500'>
                        По вашему запросу не найдено рецептов
                    </Box>
                )}
            </Box>
        </Box>
    );
};
