export const formatGoUpcData = (data) => {
    if (!data.product?.ingredients?.text) {
        return {
            name: data.product?.name,
            brand: data.product?.brand,
            image: data.product?.imageUrl,
            ingredients: [],
            allergenStatement: null,
            upc: data.product?.upc
        };
    }

    const allergenMatch = data.product.ingredients.text.match(/\.\s*(Processed|May contain|Contains|Manufactured).*$/i);
    const allergenStatement = allergenMatch ? allergenMatch[0].substring(2) : null;
    
    const ingredientsText = data.product.ingredients.text
        .replace(/^(Other\s)?Ingredients:\s*/i, '')
        .replace(/\.\s*(Processed|May contain|Contains|Manufactured).*$/i, '');

    const splitIngredients = [];
    let buffer = '';
    let parenCount = 0;

    for (const char of ingredientsText) {
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
        
        if (char === ',' && parenCount === 0) {
            const cleanedIngredient = buffer.trim().replace(/\.$/, '');
            if (cleanedIngredient) splitIngredients.push(cleanedIngredient);
            buffer = '';
        } else {
            buffer += char;
        }
    }
    
    const finalIngredient = buffer.trim().replace(/\.$/, '');
    if (finalIngredient) splitIngredients.push(finalIngredient);

    return {
        name: data.product.name,
        brand: data.product.brand,
        image: data.product.imageUrl,
        ingredients: splitIngredients,
        allergenStatement: allergenStatement,
        upc: data.product.upc,
        source: {
            name: 'GoUPC',
            url: `https://go-upc.com/search?q=${data.product.upc}`
        }
    }
}

export const formatOpenFoodData = (data) => {
    // TODO write and implement format open foot data
}

// TODO function to handle all lookup and call