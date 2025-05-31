export type Step = {
    stepNumber: number;
    description: string;
    image: string | null;
};

export type Ingredient = {
    title: string;
    count: number;
    measureUnit: string;
};

export type NutritionValue = {
    calories: number;
    proteins?: number;
    protein?: number;
    fats: number;
    carbohydrates: number;
};

type AuthorData = {
    login: string;
    firstName: string;
    lastName: string;
    subscribers: string[];
};

export type Recipe = {
    _id: string;
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: Step[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    authorData: AuthorData;
};

export type NewRecipeRequest = {
    title: string;
    description: string;
    time: number;
    categoriesIds: string[];
    portions: number;
    image: string;
    steps: Step[];
    ingredients: Ingredient[];
};

export type MeasureUnit = {
    _id: string;
    name: string;
};
