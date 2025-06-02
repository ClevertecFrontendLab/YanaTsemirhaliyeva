import { z } from 'zod';

export const recipeSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(500),
    categoriesIds: z.array(z.string()).min(3),
    time: z.number().positive().max(10000),
    portions: z.number().positive(),
    image: z.string().min(1, 'Обязательное поле'),
    steps: z
        .array(
            z.object({
                stepNumber: z.number().positive(),
                description: z.string().min(1).max(300),
                image: z.string().nullable(),
            }),
        )
        .min(1),
    ingredients: z
        .array(
            z.object({
                title: z.string().min(1).max(50),
                count: z.number().positive(),
                measureUnit: z.string().min(1),
            }),
        )
        .min(1),
});

export const draftRecipeSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().optional(),
    categoriesIds: z.array(z.string()).optional(),
    time: z.number().optional(),
    portions: z.number().optional(),
    image: z.string().optional(),
    steps: z
        .array(
            z.object({
                stepNumber: z.number(),
                description: z.string(),
                image: z.string().nullable(),
            }),
        )
        .optional(),
    ingredients: z
        .array(
            z.object({
                title: z.string(),
                count: z.number(),
                measureUnit: z.string(),
            }),
        )
        .optional(),
});
