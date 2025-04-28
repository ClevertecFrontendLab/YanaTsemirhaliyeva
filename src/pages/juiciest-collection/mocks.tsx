import { FirstFoodIcon, SecondFoodIcon } from '~/shared/custom-icons';

export const VEGAN_HEADINGS = [
    {
        id: 1,
        title: 'Стейк для вегетарианцев',
        icon: <SecondFoodIcon boxSize='24px' />,
    },
    {
        id: 2,
        title: 'Котлеты из гречки и фасоли',
        icon: <SecondFoodIcon boxSize='24px' />,
    },
    {
        id: 3,
        title: 'Сырный суп с лапшой и брокколи',
        icon: <FirstFoodIcon boxSize='24px' />,
    },
];

export const VEGAN_HIGHLIGHTS = [
    {
        id: 1,
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        desc: 'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        tag: {
            icon: './svg/dish-second.svg',
            name: 'Вторые блюда',
        },
        bookmark: 1,
        likes: 1,
    },
    {
        id: 2,
        title: 'Капустные котлеты',
        desc: 'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        tag: {
            icon: '/svg/dish-second.svg',
            name: 'Вторые блюда',
        },
        bookmark: 2,
        likes: 1,
    },
];

export const JUICY_LIST = [
    {
        id: '1',
        title: 'Лапша с курицей и шафраном',
        description: 'Ароматная лапша с курицей и шафраном, идеальное сочетание для сытного обеда.',
        image: '/img/juiciest-page/1.jpg',
        category: ['second-dish', 'national'],
        subcategory: ['poultry-dish'],
        bookmarks: 258,
        likes: 342,
        date: '2024-03-08T00:00:00Z',
        portions: 4,
        nutritionValue: { calories: 400, proteins: 30, fats: 15, carbohydrates: 50 },
        ingredients: [
            { title: 'лапша', count: '200', measureUnit: 'г' },
            { title: 'курица', count: '300', measureUnit: 'г' },
            { title: 'шафран', count: '1', measureUnit: 'ч. л.' },
            { title: 'лук', count: '1', measureUnit: 'шт.' },
        ],
        steps: [
            { stepNumber: 1, description: 'Отварить лапшу.', image: 'url' },
            {
                stepNumber: 2,
                description: 'Обжарить курицу с луком и шафраном.',
                image: '/img/cook-steps/2.jpg',
            },
            {
                stepNumber: 3,
                description: 'Смешать лапшу с курицей и подавать.',
                image: '/img/cook-steps/3.jpg',
            },
        ],
    },
    {
        id: '2',
        title: 'Том-ям с капустой кимчи',
        description:
            'Острый том-ям с ароматом капусты кимчи — отличное блюдо для ценителей азиатской кухни.',
        image: '/img/juiciest-page/2.jpg',
        category: ['first-dish', 'national'],
        subcategory: ['soups', 'spicy-food'],
        bookmarks: 124,
        likes: 324,
        date: '2024-03-10T00:00:00Z',
        portions: 2,
        nutritionValue: { calories: 250, proteins: 8, fats: 10, carbohydrates: 22 },
        ingredients: [
            { title: 'грибы', count: '150', measureUnit: 'г' },
            { title: 'кимчи', count: '100', measureUnit: 'г' },
            { title: 'креветки', count: '200', measureUnit: 'г' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            { stepNumber: 1, description: 'Подготовить кимчи.', image: 'url' },
            {
                stepNumber: 2,
                description: 'Добавить грибы и специи.',
                image: '/img/cook-steps/2.jpg',
            },
            { stepNumber: 3, description: 'Варить до готовности.', image: '/img/cook-steps/3.jpg' },
        ],
    },
    {
        id: '3',
        title: 'Пряная ветчина по итальянски',
        description: 'Итальянская ветчина с пряным вкусом идеально дополняет любые гарниры.',
        image: '/img/juiciest-page/3.jpg',
        category: ['second-dish', 'national'],
        subcategory: ['meat', 'italian'],
        bookmarks: 159,
        likes: 3257,
        date: '2024-03-12T00:00:00Z',
        portions: 3,
        nutritionValue: { calories: 350, proteins: 22, fats: 18, carbohydrates: 20 },
        ingredients: [
            { title: 'ветчина', count: '300', measureUnit: 'г' },
            { title: 'специи', count: '10', measureUnit: 'г' },
        ],
        steps: [
            { stepNumber: 1, description: 'Нарезать ветчину.', image: 'url' },
            { stepNumber: 2, description: 'Приправить специями.', image: '/img/cook-steps/2.jpg' },
            { stepNumber: 3, description: 'Запечь в духовке.', image: '/img/cook-steps/3.jpg' },
        ],
    },
    {
        id: '4',
        title: 'Кнели со спагетти',
        description: 'Классическое сочетание нежных кнелей с пастой.',
        image: '/img/juiciest-page/4.jpg',
        category: ['second-dish'],
        subcategory: ['poultry-dish'],
        bookmarks: 124,
        likes: 231,
        date: '2024-03-15T00:00:00Z',
        portions: 4,
        nutritionValue: { calories: 300, proteins: 20, fats: 12, carbohydrates: 35 },
        ingredients: [
            { title: 'кнели', count: '200', measureUnit: 'г' },
            { title: 'спагетти', count: '150', measureUnit: 'г' },
        ],
        steps: [
            { stepNumber: 1, description: 'Сварить спагетти.', image: 'url' },
            { stepNumber: 2, description: 'Подготовить кнели.', image: '/img/cook-steps/2.jpg' },
            { stepNumber: 3, description: 'Смешать и подавать.', image: '/img/cook-steps/3.jpg' },
        ],
    },
    {
        id: '5',
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description: 'Сытное рагу, наполненное ароматами и вкусами.',
        image: '/img/juiciest-page/5.jpg',
        category: ['vegan', 'second-dish'],
        subcategory: ['snacks', 'vegetables'],
        bookmarks: 120,
        likes: 180,
        date: '2025-02-28T00:00:00Z',
        portions: 2,
        nutritionValue: { calories: 250, proteins: 5, fats: 8, carbohydrates: 40 },
        ingredients: [
            { title: 'картошка', count: '4', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '2', measureUnit: 'шт.' },
            { title: 'фасоль', count: '200', measureUnit: 'г' },
            { title: 'томатный соус', count: '200', measureUnit: 'мл' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Нарезать картошку и перец.',
                image: '/img/cook-steps/1.jpg',
            },
            { stepNumber: 2, description: 'Обжарить.', image: '/img/cook-steps/2.jpg' },
            {
                stepNumber: 3,
                description: 'Тушить с фасолью и соусом.',
                image: '/img/cook-steps/3.jpg',
            },
        ],
    },
    {
        id: '6',
        title: 'Картофельные рулетики с грибами',
        description:
            'Постное блюдо из картофеля и грибов. Готовится без яиц, мяса и сыра. Вкусно, сытно и просто!',
        image: '/img/juiciest-page/6.jpg',
        category: ['vegan', 'snacks'],
        subcategory: ['snacks', 'warm-snacks'],
        bookmarks: 85,
        likes: 180,
        date: '2024-02-20T00:00:00Z',
        portions: 2,
        nutritionValue: { calories: 180, proteins: 4, fats: 6, carbohydrates: 28 },
        ingredients: [
            { title: 'картошка', count: '3', measureUnit: 'шт.' },
            { title: 'грибы', count: '200', measureUnit: 'г' },
            { title: 'мука', count: '100', measureUnit: 'г' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Сделать пюре из картофеля.',
                image: '/img/cook-steps/1.jpg',
            },
            { stepNumber: 2, description: 'Обжарить грибы.', image: '/img/cook-steps/2.jpg' },
            {
                stepNumber: 3,
                description: 'Сформировать рулетики и запечь.',
                image: '/img/cook-steps/3.jpg',
            },
        ],
    },
    {
        id: '7',
        title: 'Овощная лазанья из лаваша',
        description:
            'Сытное блюдо для ценителей блюд без мяса. Готовится с овощным соусом и соусом бешамель.',
        image: '/img/juiciest-page/7.jpg',
        category: ['vegan', 'second-dish', 'national'],
        subcategory: ['second-dish', 'vegetables', 'italian', 'snacks'],
        bookmarks: 85,
        likes: 152,
        date: '2023-01-25T00:00:00Z',
        portions: 4,
        nutritionValue: { calories: 300, proteins: 12, fats: 8, carbohydrates: 45 },
        ingredients: [
            { title: 'лаваш', count: '3', measureUnit: 'листов' },
            { title: 'овощной соус', count: '300', measureUnit: 'мл' },
            { title: 'соус бешамель', count: '200', measureUnit: 'мл' },
            { title: 'сыр', count: '100', measureUnit: 'г' },
        ],
        steps: [
            { stepNumber: 1, description: 'Приготовить соусы.', image: '/img/cook-steps/1.jpg' },
            {
                stepNumber: 2,
                description: 'Собрать лазанью слоями.',
                image: '/img/cook-steps/2.jpg',
            },
            { stepNumber: 3, description: 'Запечь до готовности.', image: '/img/cook-steps/3.jpg' },
        ],
    },
    {
        id: '8',
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Питательное и яркое блюдо для веганского и постного меню. Подходит для обеда или ужина.',
        image: '/img/juiciest-page/8.jpg',
        category: ['vegan', 'second-dish'],
        subcategory: ['second-dish', 'vegetables'],
        bookmarks: 85,
        likes: 150,
        date: '2023-02-15T00:00:00Z',
        portions: 4,
        nutritionValue: { calories: 200, proteins: 10, fats: 5, carbohydrates: 30 },
        ingredients: [
            { title: 'булгур', count: '150', measureUnit: 'г' },
            { title: 'чечевица', count: '100', measureUnit: 'г' },
            { title: 'томатный соус', count: '200', measureUnit: 'мл' },
            { title: 'лук', count: '1', measureUnit: 'шт.' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Сварить булгур и чечевицу.',
                image: '/img/cook-steps/1.jpg',
            },
            { stepNumber: 2, description: 'Сформировать тефтели.', image: '/img/cook-steps/2.jpg' },
            {
                stepNumber: 3,
                description: 'Запечь и подать с соусом.',
                image: '/img/cook-steps/3.jpg',
            },
        ],
    },
];
