import { useState } from 'react';
import { UseFieldArrayUpdate, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { NewRecipeRequest } from '~/types/recipe';

type RecipeStep = {
    stepNumber: number;
    description: string;
    image: string | null;
};

export const useRecipeModals = (
    watch: UseFormWatch<NewRecipeRequest>,
    fields: RecipeStep[],
    setValue: UseFormSetValue<NewRecipeRequest>,
    update: UseFieldArrayUpdate<NewRecipeRequest, 'steps'>,
    setIsFormDirty: (value: boolean) => void,
) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'main' | 'step'>('main');
    const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
    const [imgPreview, setImgPreview] = useState<string | null>(null);

    const handleOpenModal = (type: 'main' | 'step', index?: number) => {
        setModalType(type);
        setCurrentStepIndex(index ?? null);
        if (type === 'main') {
            setImgPreview(watch('image') || null);
        } else if (type === 'step' && index !== undefined) {
            setImgPreview(fields[index]?.image || null);
        } else {
            setImgPreview(null);
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setImgPreview(null);
    };

    const handleDeleteImage = () => {
        if (modalType === 'main') {
            setValue('image', '');
        } else if (modalType === 'step' && currentStepIndex !== null) {
            update(currentStepIndex, {
                ...fields[currentStepIndex],
                image: null,
            });
        }
        setIsFormDirty(true);
        setImgPreview(null);
        setModalOpen(false);
    };

    return {
        isModalOpen,
        modalType,
        currentStepIndex,
        imgPreview,
        setImgPreview,
        handleOpenModal,
        handleCloseModal,
        handleDeleteImage,
    };
};
