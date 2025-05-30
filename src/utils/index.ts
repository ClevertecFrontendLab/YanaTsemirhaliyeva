import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { DataTestId } from '~/consts/consts';
import { Category, SubCategory } from '~/types/category';

export const highlightText = (text: string, search: string) => {
    if (!search.trim()) return [text];

    const regex = new RegExp(`(${search.trim()})`, 'gi');
    return text.split(regex).filter(Boolean);
};

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
    if (pathParts.length === 0) return { ...result, isValid: false };

    const categorySlug = pathParts[0];
    const subcategorySlug = pathParts.length > 1 ? pathParts[1] : null;
    const id = pathParts.length > 2 ? pathParts[2] : null;

    const { categories } = await getCategoriesFromDB();

    const categoryData = categories.find((cat) => cat.category === categorySlug);
    if (!categoryData) return { ...result, isValid: false };

    result.category = categoryData;

    if (subcategorySlug) {
        const subcategoryData = categoryData.subCategories?.find(
            (sub) => sub.category === subcategorySlug,
        );
        if (subcategoryData) {
            result.subcategory = subcategoryData;
        } else {
            return { ...result, isValid: false };
        }
    }

    result.id = id;
    return result;
}

export const getUniqueCategories = (categories: Category[], categoriesIds: string[]) =>
    categories.filter(
        (category) =>
            category.subCategories?.some((sub) => categoriesIds.includes(sub._id)) &&
            categories.findIndex((c) => c._id === category._id) === categories.indexOf(category),
    );

export const getCategoryTitles = (selectedCategories: string[], categories: Category[]) => {
    const uniqueRootIds = new Set(
        selectedCategories
            .map((subId) => {
                const subcategory = categories
                    .flatMap((cat) => cat.subCategories)
                    .find((sub) => sub._id === subId);
                return subcategory?.rootCategoryId;
            })
            .filter(Boolean),
    );

    return categories.filter((cat) => uniqueRootIds.has(cat._id)).map((cat) => cat.title);
};

export const transformCategoryResponse = (
    response: Array<Category | SubCategory>,
): { categories: Category[]; subCategories: SubCategory[] } => {
    const subCategorySet = new Set();

    return response.reduce<{ categories: Category[]; subCategories: SubCategory[] }>(
        (acc, item) => {
            if ('subCategories' in item && Array.isArray(item.subCategories)) {
                acc.categories.push({
                    _id: item._id,
                    title: item.title,
                    category: item.category,
                    icon: item.icon,
                    description: item.description,
                    subCategories: item.subCategories,
                });

                item.subCategories.forEach((sub) => {
                    if (!subCategorySet.has(sub._id)) {
                        subCategorySet.add(sub._id);
                        acc.subCategories.push({
                            _id: sub._id,
                            title: sub.title,
                            category: sub.category,
                            rootCategoryId: item._id,
                        });
                    }
                });
            } else if ('rootCategoryId' in item) {
                if (!subCategorySet.has(item._id)) {
                    subCategorySet.add(item._id);
                    acc.subCategories.push({
                        _id: item._id,
                        title: item.title,
                        category: item.category,
                        rootCategoryId: item.rootCategoryId,
                    });
                }
            } else {
                console.warn(`Неизвестный формат объекта:`, item);
            }

            return acc;
        },
        { categories: [], subCategories: [] },
    );
};

export const formatAllergensForUrl = (allergens: string[]): string[] =>
    allergens
        .map((allergen) =>
            allergen.includes('(') ? allergen.replace(/\(|\)/g, '').split(' ') : [allergen],
        )
        .flat();

export const getOriginalAllergens = (
    formattedAllergens: string[] | undefined,
    originalAllergens: string[] = [],
): string[] => {
    if (!formattedAllergens || formattedAllergens.length === 0) return [];

    const uniqueOriginalAllergens = new Set<string>();

    formattedAllergens.forEach((formatted) => {
        for (const original of originalAllergens) {
            if (
                original.includes(formatted) ||
                formatAllergensForUrl([original]).includes(formatted)
            ) {
                uniqueOriginalAllergens.add(original);
                break;
            }
        }
    });

    if (uniqueOriginalAllergens.size > 0) {
        return Array.from(uniqueOriginalAllergens);
    }

    return formattedAllergens;
};

type SearchParamsType = {
    allergens?: string[];
    meat?: string[];
    garnish?: string[];
};

type SelectedFiltersType = {
    allergens?: string[];
};

type FilterItem = {
    key: string;
    formattedKey: string;
    item: string;
};

export const formatFilters = (
    filterKeysToShow: Array<keyof SearchParamsType>,
    searchParams: SearchParamsType,
    selectedFilters: SelectedFiltersType,
): FilterItem[] => {
    const result: FilterItem[] = [];

    for (const filterKey of filterKeysToShow) {
        const values = searchParams[filterKey];
        if (!values || values.length === 0) continue;

        if (
            filterKey === 'allergens' &&
            selectedFilters.allergens &&
            selectedFilters.allergens.length > 0
        ) {
            const formattedToOriginal = new Map<string, string>();
            selectedFilters.allergens.forEach((originalAllergen) => {
                const formattedValues = formatAllergensForUrl([originalAllergen]);
                formattedValues.forEach((formatted) => {
                    formattedToOriginal.set(formatted, originalAllergen);
                });
            });
            const addedOriginals = new Set<string>();
            values.forEach((formatted, index) => {
                const original = formattedToOriginal.get(formatted);

                if (original && !addedOriginals.has(original)) {
                    result.push({
                        key: `allergens-${index}`,
                        formattedKey: 'allergens',
                        item: original,
                    });

                    addedOriginals.add(original);
                } else if (!original) {
                    result.push({
                        key: `allergens-${index}`,
                        formattedKey: 'allergens',
                        item: formatted,
                    });
                }
            });
        } else {
            values.forEach((item, index) => {
                result.push({
                    key: `${filterKey}-${index}`,
                    formattedKey:
                        filterKey === 'meat'
                            ? 'meatTypes'
                            : filterKey === 'garnish'
                              ? 'garnishTypes'
                              : filterKey,
                    item: item,
                });
            });
        }
    }

    return result;
};

// Вспомогательная функция для извлечения сообщения об ошибке
export const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null) {
        if ('status' in error && 'data' in error) {
            const fetchError = error as FetchBaseQueryError;
            if (
                typeof fetchError.data === 'object' &&
                fetchError.data !== null &&
                'message' in fetchError.data
            ) {
                return String(fetchError.data.message);
            }
            if ('error' in fetchError) {
                return String(fetchError.error);
            }
            if (fetchError.status) {
                return `Ошибка ${fetchError.status}`;
            }
        }

        if ('message' in error) {
            return String(error.message);
        }
    }

    return 'Произошла ошибка';
};
