import { Ingredient, Recipe, Step } from './recipe';

export type Note = {
    date: string;
    text: string;
};

export type BloggerResponse = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: Note[];
    newRecipesCount: number;
};

export type BloggerListResponse = {
    favorites: BloggerResponse[];
    others: BloggerResponse[];
};

export type RecipeDraft = {
    _id: string;
    title: string;
    description?: string;
    time: number;
    portions: number;
    image: string;
    categoriesIds?: string[];
    steps: Step[];
    ingredients: Ingredient[];
};

export type BloggerInfoResponse = {
    bloggerInfo: {
        _id: string;
        email: string;
        login: string;
        firstName: string;
        lastName: string;
        recipesIds: string[];
        drafts: RecipeDraft[];
        subscriptions: string[];
        subscribers: string[];
        notes: Note[];
    };
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};

export type UserRecipesResponse = {
    recipes: Recipe[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
    notes: Note[];
};
