import {
    CategoryRoute,
    ChildSubcategory,
    DessertsSubcategory,
    DrinksSubcategory,
    FirstSubcategory,
    GrilledSubcategory,
    NationalSubcategory,
    NutritionSubcategory,
    PreparationsSubcategory,
    SaladsSubcategory,
    SauceSubcategory,
    SecondSubcategory,
    SnacksSubcategory,
    VeganSubcategory,
} from './consts';

// Тип для категорий в меню
export type CategoryName = keyof typeof CATEGORY_DICTIONARY;

// Тип для всех возможных подкатегорий
export type SubcategoryName =
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Салаты']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Закуски']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Первые блюда']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Вторые блюда']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Десерты, выпечка']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Блюда на гриле']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Веганская кухня']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Детские блюда']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Лечебное питание']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Национальные']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Соусы']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Напитки']
    | keyof (typeof SUBCATEGORY_DICTIONARIES)['Заготовки'];

// Тип для путей категорий
export type CategoryPath = CategoryRoute;

// Тип для путей подкатегорий (объединение всех enum подкатегорий)
export type SubcategoryPath =
    | SaladsSubcategory
    | SnacksSubcategory
    | FirstSubcategory
    | SecondSubcategory
    | DessertsSubcategory
    | GrilledSubcategory
    | VeganSubcategory
    | ChildSubcategory
    | NutritionSubcategory
    | NationalSubcategory
    | SauceSubcategory
    | DrinksSubcategory
    | PreparationsSubcategory;

// Словарь категорий: русское название -> enum
export const CATEGORY_DICTIONARY: Record<string, CategoryPath> = {
    Салаты: CategoryRoute.Salads,
    Закуски: CategoryRoute.Snacks,
    'Первые блюда': CategoryRoute.First,
    'Вторые блюда': CategoryRoute.Second,
    'Десерты, выпечка': CategoryRoute.Desserts,
    'Блюда на гриле': CategoryRoute.Grilled,
    'Веганская кухня': CategoryRoute.VeganDishes,
    'Детские блюда': CategoryRoute.Child,
    'Лечебное питание': CategoryRoute.Nutrition,
    Национальные: CategoryRoute.National,
    Соусы: CategoryRoute.Sauce,
    Напитки: CategoryRoute.Drinks,
    Заготовки: CategoryRoute.Preparations,
};

// Тип для словарей подкатегорий
type SubcategoryDictionary = Record<string, SubcategoryPath>;

// Словари подкатегорий для каждой категории
export const SUBCATEGORY_DICTIONARIES: Record<string, SubcategoryDictionary> = {
    Салаты: {
        'Мясные салаты': SaladsSubcategory.Meat,
        'Рыбные салаты': SaladsSubcategory.Fish,
        'Овощные салаты': SaladsSubcategory.Vegetable,
        'Теплые салаты': SaladsSubcategory.Warm,
    },
    Закуски: {
        'Мясные закуски': SnacksSubcategory.Meat,
        'Рыбные закуски': SnacksSubcategory.Fish,
        'Овощные закуски': SnacksSubcategory.Vegetable,
        'Теплые закуски': SnacksSubcategory.Warm,
        Бутерброды: SnacksSubcategory.Sandwiches,
        Фастфуд: SnacksSubcategory.FastFood,
    },
    'Первые блюда': {
        'Мясные супы': FirstSubcategory.MeatSoups,
        'Овощные супы': FirstSubcategory.VegetableSoups,
        Бульоны: FirstSubcategory.Broths,
        'Холодные супы': FirstSubcategory.ColdSoups,
        'Диетические супы': FirstSubcategory.DietSoups,
    },
    'Вторые блюда': {
        Мясные: SecondSubcategory.Meat,
        Рыбные: SecondSubcategory.Fish,
        Овощные: SecondSubcategory.Vegetable,
        'Из птицы': SecondSubcategory.Poultry,
        'Из грибов': SecondSubcategory.Mushroom,
        'Из субпродуктов': SecondSubcategory.Offal,
        'На пару': SecondSubcategory.Steamed,
        'Пельмени, вареники': SecondSubcategory.Dumplings,
        'Мучные гарниры': SecondSubcategory.FlourGarnishes,
        'Овощные гарниры': SecondSubcategory.VegetableGarnishes,
        Пицца: SecondSubcategory.Pizza,
        Суши: SecondSubcategory.Sushi,
    },
    'Десерты, выпечка': {
        'Блины и оладьи': DessertsSubcategory.Pancakes,
        'Пироги и пончики': DessertsSubcategory.Pies,
        Торты: DessertsSubcategory.Cakes,
        Рулеты: DessertsSubcategory.Rolls,
        'Кексы и маффины': DessertsSubcategory.Muffins,
        'Сырники и ватрушки': DessertsSubcategory.CheeseCakes,
        'Из слоеного теста': DessertsSubcategory.PuffPastry,
        'Из заварного теста': DessertsSubcategory.Choux,
        'Из дрожжевого теста': DessertsSubcategory.YeastDough,
        'Булочки и сдоба': DessertsSubcategory.Buns,
        Хлеб: DessertsSubcategory.Bread,
        'Тесто на пиццу': DessertsSubcategory.PizzaDough,
        Кремы: DessertsSubcategory.Creams,
    },
    'Блюда на гриле': {
        Говядина: GrilledSubcategory.Beef,
        Свинина: GrilledSubcategory.Pork,
        Птица: GrilledSubcategory.Poultry,
        Рыба: GrilledSubcategory.Fish,
        Грибы: GrilledSubcategory.Mushrooms,
        Овощи: GrilledSubcategory.Vegetables,
    },
    'Веганская кухня': {
        Закуски: VeganSubcategory.Snacks,
        'Первые блюда': VeganSubcategory.FirstDish,
        'Вторые блюда': VeganSubcategory.SecondDish,
        Гарниры: VeganSubcategory.SideDish,
        Десерты: VeganSubcategory.Desserts,
        Выпечка: VeganSubcategory.Bakery,
        'Сыроедческие блюда': VeganSubcategory.RawFood,
        Напитки: VeganSubcategory.Drinks,
    },
    'Детские блюда': {
        'Первые блюда': ChildSubcategory.FirstDish,
        'Вторые блюда': ChildSubcategory.SecondDish,
        Гарниры: ChildSubcategory.SideDish,
        Выпечка: ChildSubcategory.Bakery,
        'Без глютена': ChildSubcategory.GlutenFree,
        'Без сахара': ChildSubcategory.SugarFree,
        'Без аллергенов': ChildSubcategory.AllergenFree,
        'Блюда для прикорма': ChildSubcategory.Complementary,
    },
    'Лечебное питание': {
        'Детская диета': NutritionSubcategory.ChildDiet,
        'Диета №1': NutritionSubcategory.Diet1,
        'Диета №2': NutritionSubcategory.Diet2,
        'Диета №3': NutritionSubcategory.Diet3,
        'Диета №5': NutritionSubcategory.Diet5,
        'Диета №6': NutritionSubcategory.Diet6,
        'Диета №7': NutritionSubcategory.Diet7,
        'Диета №8': NutritionSubcategory.Diet8,
        'Диета №9': NutritionSubcategory.Diet9,
        'Диета №10': NutritionSubcategory.Diet10,
        'Диета №11': NutritionSubcategory.Diet11,
        'Диета №12': NutritionSubcategory.Diet12,
        'Диета №13': NutritionSubcategory.Diet13,
        'Диета №14': NutritionSubcategory.Diet14,
        'Без глютена': NutritionSubcategory.GlutenFree,
        'Без аллергенов': NutritionSubcategory.AllergenFree,
    },
    Национальные: {
        'Американская кухня': NationalSubcategory.American,
        'Армянская кухня': NationalSubcategory.Armenian,
        'Греческая кухня': NationalSubcategory.Greek,
        'Грузинская кухня': NationalSubcategory.Georgian,
        'Итальянская кухня': NationalSubcategory.Italian,
        'Испанская кухня': NationalSubcategory.Spanish,
        'Китайская кухня': NationalSubcategory.Chinese,
        'Мексиканская кухня': NationalSubcategory.Mexican,
        'Паназиатская кухня': NationalSubcategory.PanAsian,
        'Русская кухня': NationalSubcategory.Russian,
        'Турецкая кухня': NationalSubcategory.Turkish,
        'Французская кухня': NationalSubcategory.French,
        'Шведская кухня': NationalSubcategory.Swedish,
        'Японская кухня': NationalSubcategory.Japanese,
        'Другая кухня': NationalSubcategory.Other,
    },
    Соусы: {
        'Соусы мясные': SauceSubcategory.MeatSauces,
        'Соусы сырные': SauceSubcategory.CheeseSauces,
        Маринады: SauceSubcategory.Marinades,
    },
    Напитки: {
        'Соки и фреши': DrinksSubcategory.Juices,
        Смузи: DrinksSubcategory.Smoothies,
        Компоты: DrinksSubcategory.Compotes,
        Кисели: DrinksSubcategory.Kissel,
        Кофе: DrinksSubcategory.Coffee,
        'Лечебный чай': DrinksSubcategory.MedicinalTea,
        Квас: DrinksSubcategory.Kvass,
        Коктейли: DrinksSubcategory.Cocktails,
        Алкогольные: DrinksSubcategory.Alcoholic,
    },
    Заготовки: {
        'Мясные заготовки': PreparationsSubcategory.MeatPreparations,
        'Рыбные заготовки': PreparationsSubcategory.FishPreparations,
        'Из огурцов': PreparationsSubcategory.Cucumber,
        'Из томатов': PreparationsSubcategory.Tomato,
        'Из грибов': PreparationsSubcategory.Mushroom,
        'Овощные заготовки': PreparationsSubcategory.VegetablePreparations,
        'Салаты, икра': PreparationsSubcategory.SaladsCaviar,
        'Из фруктов и ягод': PreparationsSubcategory.FruitsBerries,
    },
};

/**
 * Функция для получения пути категории по русскому названию
 * @param russianName - Русское название категории
 * @returns Путь категории или пустая строка, если категория не найдена
 */
export function getCategoryRoute(russianName: string): CategoryPath | '' {
    return CATEGORY_DICTIONARY[russianName] || '';
}

/**
 * Функция для получения пути подкатегории по русским названиям категории и подкатегории
 * @param categoryRussian - Русское название категории
 * @param subcategoryRussian - Русское название подкатегории
 * @returns Путь подкатегории или пустая строка, если подкатегория не найдена
 */
export function getSubcategoryRoute(
    categoryRussian: string,
    subcategoryRussian: string,
): SubcategoryPath | '' {
    const categoryDict = SUBCATEGORY_DICTIONARIES[categoryRussian];
    if (!categoryDict) return '';

    return categoryDict[subcategoryRussian] || '';
}

/**
 * Функция для формирования полного URL
 * @param categoryRussian - Русское название категории
 * @param subcategoryRussian - Русское название подкатегории
 * @param id - ID рецепта (опционально)
 * @returns Полный URL путь
 */
export function getFullUrl(
    categoryRussian: string,
    subcategoryRussian: string,
    id: string = '',
): string {
    const categoryRoute = getCategoryRoute(categoryRussian);
    const subcategoryRoute = getSubcategoryRoute(categoryRussian, subcategoryRussian);

    if (!categoryRoute || !subcategoryRoute) return '/';

    return id
        ? `${categoryRoute}/${subcategoryRoute}/${id}`
        : `${categoryRoute}/${subcategoryRoute}`;
}

export function getCategoryAndSubcategoryFromUrl(pathname: string): {
    category: string | null;
    subcategory: string | null;
    id: string | null;
} {
    // Результат по умолчанию
    const result: {
        category: string | null;
        subcategory: string | null;
        id: string | null;
    } = {
        category: null,
        subcategory: null,
        id: null,
    };

    // Разбиваем путь на части и убираем пустые строки
    const pathParts = pathname.split('/').filter(Boolean);

    if (pathParts.length === 0) {
        return result;
    }

    // Получаем путь категории
    const categoryPathValue = `/${pathParts[0]}`;

    // Находим категорию по пути
    for (const [categoryName, categoryPath] of Object.entries(CATEGORY_DICTIONARY)) {
        if (categoryPath === categoryPathValue) {
            result.category = categoryName;

            // Если есть вторая часть пути, ищем подкатегорию
            if (pathParts.length > 1) {
                const subcategoryPathValue = pathParts[1];
                const subcategoryPathWithSlash = `/${subcategoryPathValue}`;

                const categoryDict = SUBCATEGORY_DICTIONARIES[categoryName];

                if (categoryDict) {
                    // Проверяем оба варианта пути - с / и без
                    for (const [subcategoryName, subcategoryPath] of Object.entries(categoryDict)) {
                        if (
                            subcategoryPath === subcategoryPathValue ||
                            subcategoryPath === subcategoryPathWithSlash
                        ) {
                            result.subcategory = subcategoryName;
                            break;
                        }
                    }
                }
            }

            if (pathParts.length > 2) {
                result.id = pathParts[2];
            }

            break;
        }
    }

    return result;
}
