import { DataTestId } from '~/consts/consts';
import { Category, SubCategory } from '~/types/category';

export const highlightText = (text: string, search: string) => {
    if (!search.trim()) return [text];

    const regex = new RegExp(`(${search.trim()})`, 'gi');
    return text.split(regex).filter(Boolean);
};

// export const filterRecipes = (state: RecipeState) => {
//     const {
//         recipes,
//         searchQuery,
//         appliedFilters,
//         currentCategory,
//         currentSubcategory,
//         isFilterAllergenActive,
//         isIntroAllergenActive,
//         allergens,
//     } = state;

//     const activeAllergens = Array.from(
//         new Set([
//             ...(isFilterAllergenActive ? appliedFilters.allergens || [] : []),
//             ...(isIntroAllergenActive ? allergens : []),
//         ]),
//     );

//     const extractKeywords = (text: string) =>
//         text
//             .toLowerCase()
//             .replace(/[^a-zа-яё\s]/g, '')
//             .split(/\s+/);

//     //checks tests
//     const normalizedAllergens = activeAllergens.flatMap((allergen) =>
//         extractKeywords(allergen).map((word) => word.slice(0, 3)),
//     );

//     return recipes.filter((recipe) => {
//         const matchesSearch =
//             !searchQuery || recipe.title.toLowerCase().includes(searchQuery.trim().toLowerCase());

//         const categoryKey = currentCategory
//             ? getCategoryRoute(currentCategory.title).replace(/^\//, '')
//             : null;
//         const subcategoryKey = currentSubcategory
//             ? getSubcategoryRoute(currentCategory?.title || '', currentSubcategory.title).replace(
//                   /^\//,
//                   '',
//               )
//             : null;

//         const allSelectedCategories = Array.from(new Set(appliedFilters.categories || []));
//         const realCategory = JSON.parse(JSON.stringify(recipe.category));

//         const currentCategoryMatch = categoryKey ? realCategory.includes(categoryKey) : true;

//         const drawerCategoryMatch =
//             allSelectedCategories.length > 0
//                 ? allSelectedCategories.some((drawerCategory) => {
//                       const drawerCategoryKey = getCategoryRoute(drawerCategory).replace(/^\//, '');
//                       return realCategory.includes(drawerCategoryKey);
//                   })
//                 : true;

//         const categoryMatch = currentCategoryMatch && drawerCategoryMatch;

//         const subcategoryMatch = subcategoryKey
//             ? recipe.subcategory.includes(subcategoryKey)
//             : true;

//         const meatMatch =
//             appliedFilters.meatTypes && appliedFilters.meatTypes?.length > 0
//                 ? appliedFilters.meatTypes.some((meat) =>
//                       recipe.ingredients.some(
//                           (ingredient) =>
//                               ingredient.title.trim().toLowerCase() === meat.trim().toLowerCase(),
//                       ),
//                   )
//                 : true;

//         const garnishMatch =
//             appliedFilters.garnishTypes && appliedFilters.garnishTypes.length > 0
//                 ? appliedFilters.garnishTypes.some((garnish) => {
//                       const normalizedGarnish = garnish.trim();
//                       const mappedGarnish = garnishMapping[normalizedGarnish]?.toLowerCase();

//                       return (
//                           recipe.side?.toLowerCase() === mappedGarnish ||
//                           recipe.ingredients.some((ingredient) => {
//                               const ingredientName = ingredient.title.trim().toLowerCase();

//                               return (
//                                   ingredientName === normalizedGarnish ||
//                                   garnishMapping[ingredientName]?.toLowerCase() === mappedGarnish
//                               );
//                           })
//                       );
//                   })
//                 : true;

//         const allergensMatch =
//             normalizedAllergens.length > 0
//                 ? recipe.ingredients.every((ingredient) => {
//                       const normalizedIngredientKeywords = extractKeywords(
//                           ingredient.title.trim(),
//                       ).map((word) => word.slice(0, 3));

//                       return !normalizedIngredientKeywords.some((keyword) =>
//                           normalizedAllergens.includes(keyword),
//                       );
//                   })
//                 : true;

//         const result =
//             matchesSearch &&
//             categoryMatch &&
//             subcategoryMatch &&
//             meatMatch &&
//             garnishMatch &&
//             allergensMatch;
//         return result;
//     });
// };

// Функция для генерации dynamic test-id
export const generateTestId = (baseId: DataTestId, dynamicPart: string | number): string =>
    `${baseId}${dynamicPart}`;

export const openDB = async (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
        const request = indexedDB.open('myAppDB', 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains('categories')) {
                db.createObjectStore('categories', { keyPath: '_id' });
            }

            if (!db.objectStoreNames.contains('subCategories')) {
                db.createObjectStore('subCategories', { keyPath: '_id' });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });

// Функция для сохранения категорий и подкатегорий
export const saveCategoriesToDB = async (data: {
    categories: Category[];
    subCategories: SubCategory[];
}) => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(['categories', 'subCategories'], 'readwrite');
        const categoryStore = tx.objectStore('categories');
        const subCategoryStore = tx.objectStore('subCategories');

        if (data.categories.length > 0) {
            categoryStore.clear();
        }

        if (data.subCategories.length > 0) {
            subCategoryStore.clear();
        }

        data.categories.forEach((category) => categoryStore.put(category));
        data.subCategories.forEach((subCategory) => subCategoryStore.put(subCategory));

        tx.oncomplete = () => {
            resolve(true);
        };

        tx.onerror = () => {
            console.error('❌ Ошибка при сохранении данных в IndexedDB', tx.error);
            reject(tx.error);
        };
    });
};

// Функция для получения категорий и подкатегорий
export const getCategoriesFromDB = async (): Promise<{
    categories: Category[];
    subCategories: SubCategory[];
}> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        if (
            !db.objectStoreNames.contains('categories') ||
            !db.objectStoreNames.contains('subCategories')
        ) {
            console.error("❌ Object store 'categories' или 'subCategories' не найден!");
            resolve({ categories: [], subCategories: [] });
            return;
        }

        const tx = db.transaction(['categories', 'subCategories'], 'readonly');
        const categoryStore = tx.objectStore('categories');
        const subCategoryStore = tx.objectStore('subCategories');

        const getCategoriesRequest = categoryStore.getAll();
        const getSubCategoriesRequest = subCategoryStore.getAll();

        getCategoriesRequest.onsuccess = () => {
            getSubCategoriesRequest.onsuccess = () => {
                resolve({
                    categories: getCategoriesRequest.result,
                    subCategories: getSubCategoriesRequest.result,
                });
            };
        };

        getCategoriesRequest.onerror = () => {
            reject(getCategoriesRequest.error);
        };

        getSubCategoriesRequest.onerror = () => {
            reject(getSubCategoriesRequest.error);
        };
    });
};

export async function getCategoryAndSubcategoryFromUrl(pathname: string): Promise<{
    category: Category | null;
    subcategory: SubCategory | null;
    id: string | null;
    isValid: boolean;
}> {
    const result: {
        category: Category | null;
        subcategory: SubCategory | null;
        id: string | null;
        isValid: boolean;
    } = {
        category: null,
        subcategory: null,
        id: null,
        isValid: true,
    };

    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length === 0) return { ...result, isValid: false }; // Пустой URL → невалидный

    const categorySlug = pathParts[0];
    const subcategorySlug = pathParts.length > 1 ? pathParts[1] : null;
    const id = pathParts.length > 2 ? pathParts[2] : null;

    // Загружаем данные из IndexedDB
    const { categories } = await getCategoriesFromDB();

    // Ищем категорию
    const categoryData = categories.find((cat) => cat.category === categorySlug);
    if (!categoryData) return { ...result, isValid: false }; // Категории нет → невалидно

    result.category = categoryData;

    if (subcategorySlug) {
        const subcategoryData = categoryData.subCategories?.find(
            (sub) => sub.category === subcategorySlug,
        );
        if (subcategoryData) {
            result.subcategory = subcategoryData;
        } else {
            return { ...result, isValid: false }; // Подкатегории нет → невалидно
        }
    }

    result.id = id;
    return result;
}
