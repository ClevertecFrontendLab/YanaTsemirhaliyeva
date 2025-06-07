export const getRecipeText = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) {
        return `${count} новый рецепт`;
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return `${count} новых рецепта`;
    } else {
        return `${count} новых рецептов`;
    }
};
