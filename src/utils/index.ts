import { garnishMapping } from '~/consts/consts';
import { getCategoryRoute, getSubcategoryRoute } from '~/consts/dictionary';
import { RecipeState } from '~/store/slices/recipes-slice';

export const highlightText = (text: string, search: string) => {
    if (!search.trim()) return [text];

    const regex = new RegExp(`(${search.trim()})`, 'gi');
    return text.split(regex).filter(Boolean);
};

export const filterRecipes = (state: RecipeState) => {
    const {
        recipes,
        searchQuery,
        appliedFilters,
        currentCategory,
        currentSubcategory,
        isFilterAllergenActive,
        isIntroAllergenActive,
        allergens,
    } = state;

    const activeAllergens = Array.from(
        new Set([
            ...(isFilterAllergenActive ? appliedFilters.allergens || [] : []),
            ...(isIntroAllergenActive ? allergens : []),
        ]),
    );

    const extractKeywords = (text: string) =>
        text
            .toLowerCase()
            .replace(/[^a-zа-яё\s]/g, '')
            .split(/\s+/);

    // Нормализуем аллергены, извлекая первые три буквы каждого слова
    const normalizedAllergens = activeAllergens.flatMap((allergen) =>
        extractKeywords(allergen).map((word) => word.slice(0, 3)),
    );

    return recipes.filter((recipe) => {
        const matchesSearch =
            !searchQuery || recipe.title.toLowerCase().includes(searchQuery.trim().toLowerCase());

        const categoryKey = currentCategory
            ? getCategoryRoute(currentCategory).replace(/^\//, '')
            : null;
        const subcategoryKey = currentSubcategory
            ? getSubcategoryRoute(currentCategory || '', currentSubcategory).replace(/^\//, '')
            : null;

        const allSelectedCategories = Array.from(new Set(appliedFilters.categories || []));
        const realCategory = JSON.parse(JSON.stringify(recipe.category));

        const currentCategoryMatch = categoryKey ? realCategory.includes(categoryKey) : true;

        const drawerCategoryMatch =
            allSelectedCategories.length > 0
                ? allSelectedCategories.some((drawerCategory) => {
                      const drawerCategoryKey = getCategoryRoute(drawerCategory).replace(/^\//, '');
                      return realCategory.includes(drawerCategoryKey);
                  })
                : true;

        const categoryMatch = currentCategoryMatch && drawerCategoryMatch;

        const subcategoryMatch = subcategoryKey
            ? recipe.subcategory.includes(subcategoryKey)
            : true;

        const meatMatch =
            appliedFilters.meatTypes && appliedFilters.meatTypes?.length > 0
                ? appliedFilters.meatTypes.some((meat) =>
                      recipe.ingredients.some(
                          (ingredient) =>
                              ingredient.title.trim().toLowerCase() === meat.trim().toLowerCase(),
                      ),
                  )
                : true;

        const garnishMatch =
            appliedFilters.garnishTypes && appliedFilters.garnishTypes.length > 0
                ? appliedFilters.garnishTypes.some((garnish) => {
                      const normalizedGarnish = garnish.trim();
                      const mappedGarnish = garnishMapping[normalizedGarnish]?.toLowerCase();

                      return (
                          recipe.side?.toLowerCase() === mappedGarnish ||
                          recipe.ingredients.some((ingredient) => {
                              const ingredientName = ingredient.title.trim().toLowerCase();

                              return (
                                  ingredientName === normalizedGarnish ||
                                  garnishMapping[ingredientName]?.toLowerCase() === mappedGarnish
                              );
                          })
                      );
                  })
                : true;

        const allergensMatch =
            normalizedAllergens.length > 0
                ? recipe.ingredients.every((ingredient) => {
                      const normalizedIngredientKeywords = extractKeywords(
                          ingredient.title.trim(),
                      ).map((word) => word.slice(0, 3));

                      return !normalizedIngredientKeywords.some((keyword) =>
                          normalizedAllergens.includes(keyword),
                      );
                  })
                : true;

        const result =
            matchesSearch &&
            categoryMatch &&
            subcategoryMatch &&
            meatMatch &&
            garnishMatch &&
            allergensMatch;
        return result;
    });
};
