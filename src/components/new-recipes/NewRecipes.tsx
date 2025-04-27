import './NewRecipes.css';

import { Box, Heading, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { VerticalCard } from '~/components/vertical-card/VerticalCard';
import { ArrowRightIcon } from '~/shared/custom-icons';
import { useAppSelector } from '~/store/hooks';
import { recipesSelector } from '~/store/slices/recipes-slice';

export const NewRecipes = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const filteredRecipes = useAppSelector(recipesSelector);

    const sortedRecipes = [...filteredRecipes].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const newestRecipes = sortedRecipes.slice(0, 10);

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
            <Box pos='relative' data-test-id='carousel'>
                {newestRecipes.length > 0 ? (
                    <>
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={2.1}
                            // speed={10}
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
                            {newestRecipes.map((recipe, i) => (
                                <SwiperSlide
                                    key={recipe.id}
                                    style={{ minHeight: '100%' }}
                                    data-test-id={`carousel-card-${i}`}
                                >
                                    <Box w='100%' minH='100%' pb='6px'>
                                        <VerticalCard item={recipe} />
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {newestRecipes.length > 3 && (
                            <Box className='swiper-btns'>
                                <IconButton
                                    data-test-id='carousel-back'
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
                                    data-test-id='carousel-forward'
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
