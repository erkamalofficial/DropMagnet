export const getCategoryIdByPosition = (position, allCategories) => {
  if (position >= allCategories.categories.length) {
    return allCategories.external_creators.find(category => category.position === position).id;
  }

  return allCategories.categories.find(category => category.position === position).id;
};

export const getCategorySymbolByPosition = (position, allCategories) => {
  if (position >= allCategories.categories.length) {
    return allCategories.external_creators.find(category => category.position === position).symbol;
  }

  return allCategories.categories.find(category => category.position === position).value;
};

export const getFirstExternalCategoryPosition = (allCategories) => {
  if (!allCategories.external_creators || !allCategories.external_creators.length) return 0;

  return allCategories.external_creators[0].position;
}