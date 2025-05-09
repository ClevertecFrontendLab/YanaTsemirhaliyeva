import { JSX } from 'react';

import {
    DesertsFoodIcon,
    FirstFoodIcon,
    NationalFoodIcon,
    SaladsFoodIcon,
    SecondFoodIcon,
    SnacksFoodIcon,
    VeganFoodIcon,
} from '~/shared/custom-icons';

type CategoryKey =
    | 'vegan'
    | 'second-dish'
    | 'first-dish'
    | 'snacks'
    | 'national'
    | 'vegetables'
    | 'salads'
    | 'desserts';

type CategoryData = {
    icon: (props: { boxSize?: string | number }) => JSX.Element;
    label: string;
};

export const CategoriesData: Record<CategoryKey, CategoryData> = {
    vegan: {
        icon: VeganFoodIcon,
        label: 'Веганская кухня',
    },
    'second-dish': {
        icon: SecondFoodIcon,
        label: 'Вторые блюда',
    },
    'first-dish': {
        icon: FirstFoodIcon,
        label: 'Первые блюда',
    },
    snacks: {
        icon: SnacksFoodIcon,
        label: 'Закуски',
    },
    national: {
        icon: NationalFoodIcon,
        label: 'Национальные блюда',
    },
    vegetables: {
        icon: VeganFoodIcon,
        label: 'Овощи',
    },
    salads: {
        icon: SaladsFoodIcon,
        label: 'Салаты',
    },
    desserts: {
        icon: DesertsFoodIcon,
        label: 'Десерты, выпечка',
    },
};

export const getCategoryContent = (categoryKey: keyof typeof CategoriesData) => {
    const category = CategoriesData[categoryKey];

    if (!category) {
        return { IconComponent: null, label: 'Неизвестная категория' };
    }

    return {
        IconComponent: category.icon,
        label: category.label,
    };
};
