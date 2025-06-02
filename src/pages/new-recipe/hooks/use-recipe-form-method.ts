import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { recipeSchema } from '~/schemas/recipe.schema';
import { NewRecipeRequest } from '~/types/recipe';

import { DEFAULT_INGREDIENT_VALUE, DEFAULT_PORTIONS_VALUE, DEFAULT_TIME_VALUE } from '../consts';

export const useRecipeFormMethods = (isEditing: boolean, recipeId: string) => {
    const { data: recipeData } = useGetRecipeByIdQuery(recipeId, { skip: !isEditing });

    const methods = useForm<NewRecipeRequest>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            title: '',
            description: '',
            time: DEFAULT_TIME_VALUE,
            categoriesIds: [],
            portions: DEFAULT_PORTIONS_VALUE,
            image: '',
            steps: [{ stepNumber: 1, description: '', image: null }],
            ingredients: [{ title: '', count: DEFAULT_INGREDIENT_VALUE, measureUnit: '' }],
        },
        mode: 'onSubmit',
        shouldUnregister: false,
    });

    const {
        control,
        formState: { isDirty },
        trigger,
        watch,
        setValue,
        getValues,
        reset,
    } = methods;

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'steps',
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
        replace,
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    useEffect(() => {
        if (recipeData) {
            reset(recipeData);
            replace(recipeData.ingredients || []);
        }
    }, [recipeData, replace, reset]);

    useEffect(() => {
        if (recipeData?.ingredients) {
            recipeData.ingredients.forEach((ingredient, index) => {
                setValue(`ingredients.${index}.measureUnit`, ingredient.measureUnit ?? '');
            });
        }
    }, [recipeData, setValue]);

    return {
        methods,
        control,
        isDirty,
        trigger,
        watch,
        setValue,
        getValues,
        reset,
        fields,
        append,
        remove,
        update,
        ingredientFields,
        appendIngredient,
        removeIngredient,
        replace,
    };
};
