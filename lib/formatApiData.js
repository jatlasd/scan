export const formatGoUpcData = (data) => {
    const splitIngredients = data.product.ingredients.text.split(',').map(ingredient => ingredient.trim());
    return {
        name: data.product.name,
        brand: data.product.brand,
        image: data.product.imageUrl,
        ingredients: splitIngredients,
        upc: data.product.upc
    }
}