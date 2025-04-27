export enum AppRoute {
    Index = '/',
    Juicy = '/the-juiciest',
}

export enum CategoryRoute {
    VeganDishes = '/vegan',
    Salads = '/salads',
    Snacks = '/snacks',
    First = '/first-dish',
    Second = '/second-dish',
    Desserts = '/desserts',
    Grilled = '/grilled-dishes',
    Child = '/children-dishes',
    Nutrition = '/therapeutic-nutrition',
    National = '/national',
    Sauce = '/sauces',
    Drinks = '/drinks',
    Preparations = '/preparations',
}

// Шаблоны динамических маршрутов
export const DynamicRoutes = {
    SubcategoryPage: '/:category/:subcategory',
    RecipePage: '/:category/:subcategory/:id',
};

// Enum для подкатегорий салатов
export enum SaladsSubcategory {
    Meat = 'meat-salads',
    Fish = 'fish-salads',
    Vegetable = 'vegetable-salads',
    Warm = 'warm-salads',
}

// Enum для подкатегорий закусок
export enum SnacksSubcategory {
    Meat = 'meat-snacks',
    Fish = 'fish-snacks',
    Vegetable = 'vegetable-snacks',
    Warm = 'warm-snacks',
    Sandwiches = 'sandwiches',
    FastFood = 'fast-food',
}

// Enum для подкатегорий первых блюд
export enum FirstSubcategory {
    MeatSoups = 'meat-soups',
    VegetableSoups = 'vegetable-soups',
    Broths = 'broths',
    ColdSoups = 'cold-soups',
    DietSoups = 'diet-soups',
}

// Enum для подкатегорий вторых блюд
export enum SecondSubcategory {
    Meat = 'meat-dish',
    Fish = 'fish-dish',
    Vegetable = 'vegetable-dish',
    Poultry = 'poultry-dish',
    Mushroom = 'mushroom-dish',
    Offal = 'offal-dish',
    Steamed = 'steamed-dish',
    Dumplings = 'dumplings',
    FlourGarnishes = 'flour-garnish',
    VegetableGarnishes = 'vegetable-garnish',
    Pizza = 'pizza',
    Sushi = 'sushi',
}

// Enum для подкатегорий десертов и выпечки
export enum DessertsSubcategory {
    Pancakes = 'pancakes',
    Pies = 'pies',
    Cakes = 'cakes',
    Rolls = 'rolls',
    Muffins = 'muffins',
    CheeseCakes = 'cheese-cakes',
    PuffPastry = 'puff-pastry',
    Choux = 'choux-pastry',
    YeastDough = 'yeast-dough',
    Buns = 'buns',
    Bread = 'bread',
    PizzaDough = 'pizza-dough',
    Creams = 'creams',
}

// Enum для подкатегорий блюд на гриле
export enum GrilledSubcategory {
    Beef = 'beef',
    Pork = 'pork',
    Poultry = 'poultry-dish',
    Fish = 'fish',
    Mushrooms = 'mushrooms',
    Vegetables = 'vegetables',
}

// Enum для подкатегорий веганской кухни
export enum VeganSubcategory {
    Snacks = 'snacks',
    FirstDish = 'first-dish',
    SecondDish = 'second-dish',
    SideDish = 'side-dish',
    Desserts = 'desserts',
    Bakery = 'bakery',
    RawFood = 'raw-food',
    Drinks = 'drinks',
}

// Enum для подкатегорий детских блюд
export enum ChildSubcategory {
    FirstDish = 'first-dish',
    SecondDish = 'second-dish',
    SideDish = 'side-dish',
    Bakery = 'bakery',
    GlutenFree = 'gluten-free',
    SugarFree = 'sugar-free',
    AllergenFree = 'allergen-free',
    Complementary = 'complementary',
}

// Enum для подкатегорий лечебного питания
export enum NutritionSubcategory {
    ChildDiet = 'child-diet',
    Diet1 = 'diet-1',
    Diet2 = 'diet-2',
    Diet3 = 'diet-3',
    Diet5 = 'diet-5',
    Diet6 = 'diet-6',
    Diet7 = 'diet-7',
    Diet8 = 'diet-8',
    Diet9 = 'diet-9',
    Diet10 = 'diet-10',
    Diet11 = 'diet-11',
    Diet12 = 'diet-12',
    Diet13 = 'diet-13',
    Diet14 = 'diet-14',
    GlutenFree = 'gluten-free',
    AllergenFree = 'allergen-free',
}

// Enum для подкатегорий национальных блюд
export enum NationalSubcategory {
    American = 'american',
    Armenian = 'armenian',
    Greek = 'greek',
    Georgian = 'georgian',
    Italian = 'italian',
    Spanish = 'spanish',
    Chinese = 'chinese',
    Mexican = 'mexican',
    PanAsian = 'pan-asian',
    Russian = 'russian',
    Turkish = 'turkish',
    French = 'french',
    Swedish = 'swedish',
    Japanese = 'japanese',
    Other = 'other',
}

// Enum для подкатегорий соусов
export enum SauceSubcategory {
    MeatSauces = 'meat-sauce',
    CheeseSauces = 'cheese-sauce',
    Marinades = 'marinades',
}

// Enum для подкатегорий напитков
export enum DrinksSubcategory {
    Juices = 'juices',
    Smoothies = 'smoothies',
    Compotes = 'compotes',
    Kissel = 'kissel',
    Coffee = 'coffee',
    MedicinalTea = 'medicinal-tea',
    Kvass = 'kvass',
    Cocktails = 'cocktails',
    Alcoholic = 'alcoholic',
}

// Enum для подкатегорий заготовок
export enum PreparationsSubcategory {
    MeatPreparations = 'meat-preparations',
    FishPreparations = 'fish-preparations',
    Cucumber = 'cucumber',
    Tomato = 'tomato',
    Mushroom = 'mushroom',
    VegetablePreparations = 'vegetable-preparations',
    SaladsCaviar = 'salads-caviar',
    FruitsBerries = 'fruits-berries',
}

// Обратная карта для быстрого поиска категории по пути
export const PathToCategoryMap: Record<string, string> = Object.entries(CategoryRoute).reduce(
    (acc, [key, path]) => {
        const cleanPath = path.replace('/', '');
        acc[cleanPath] = key;
        return acc;
    },
    {} as Record<string, string>,
);

// Вспомогательная функция для получения ключа категории по пути URL
export function getCategoryKeyByPath(path: string): string | null {
    const cleanPath = path.replace('/', '');
    return PathToCategoryMap[cleanPath] || null;
}

export const meatTypes = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];

export const garnishTypes = [
    'Картошка',
    'Гречка',
    'Паста',
    'Спагетти',
    'Рис',
    'Капуста',
    'Фасоль',
    'Другие овощи',
];

export const garnishMapping: Record<string, string> = {
    Картошка: 'potatoes',
    Гречка: 'buckwheat',
    Паста: 'pasta',
    Спагетти: 'spaghetti',
    Рис: 'rice',
    Капуста: 'cabbage',
    Фасоль: 'beans',
    'Другие овощи': 'other-vegetables',
};

export const authors = [
    'Segun Adebayo',
    'Елена Мин',
    'Mark Chandler',
    'Мирием Чонишвили',
    'Елена Прекрасная',
    'Alex Cook',
    'Екатерина Константинопольская',
    'Инна Высоцкая',
    'Сергей Разумов',
    'Анна Рогачева',
    'Иван Орлов',
    'Повар Ши',
];
