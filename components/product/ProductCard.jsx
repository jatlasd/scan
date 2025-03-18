import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, ShoppingBag, Leaf, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { getOrCreateProduct, isProductInDb } from "@/lib/actions/productActions";
import { useState, useEffect } from "react";

// Common allergens to highlight in ingredients list
const commonAllergens = [
  "milk",
  "dairy",
  "egg",
  "eggs",
  "peanut",
  "peanuts",
  "tree nut",
  "tree nuts",
  "soy",
  "wheat",
  "gluten",
  "fish",
  "shellfish",
  "sesame",
];

const ProductCard = ({ product: initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);
  const [isLoading, setIsLoading] = useState(false);
  const [isStored, setIsStored] = useState(false)

  useEffect(() => {
    const checkIfProductExistsInDb = async () => {
      const exists = await isProductInDb(product.upc)
      setIsStored(exists)
    }
    checkIfProductExistsInDb()
  }, [product.upc])

  const handleLogReaction = async () => {
    try {
      setIsLoading(true);
      const updatedProduct = await getOrCreateProduct({
        upc: String(product.upc),
        name: product.name,
        brand: product.brand,
        image: product.image,
        ingredients: product.ingredients,
        type: product.type || "food",
        source: product.source || "manual"
      });
      setProduct(updatedProduct);
    } catch (error) {
      console.error("Failed to log reaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const highlightAllergens = (ingredient) => {
    let lowerIngredient = ingredient.toLowerCase();
    let hasAllergen = false;

    for (const allergen of commonAllergens) {
      if (lowerIngredient.includes(allergen)) {
        hasAllergen = true;
        break;
      }
    }

    return hasAllergen ? (
      <span className="font-semibold text-purple-600">{ingredient}</span>
    ) : (
      ingredient
    );
  };

  return (
    <Card className="w-full max-w-3xl border-none bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs text-purple-400">UPC: {product.upc}</p>
            <CardTitle className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {isStored ? 'stored' : 'not'}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-base">
              <span className="font-semibold text-slate-600">{product.brand}</span>
              {product.weight && <span className="text-purple-300">•</span>}
              <span className="text-slate-500">{product.weight !== "na" ? product.weight : ""}</span>
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="self-start border-2 border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-purple-700"
          >
            Body + Face Wash
          </Badge>
        </div>
      </CardHeader>
      <Separator className="bg-purple-100" />

      <div className="px-6 py-4 flex justify-center w-full">
        <Button 
          onClick={handleLogReaction}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Log Reaction"}
        </Button>
      </div>

      <CardContent className="pt-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl border-2 border-purple-100 bg-white p-2">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="mt-4 w-full rounded-xl bg-purple-50 p-4">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-purple-900">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-y-2">
                <div className="font-medium text-purple-700">Serving Size:</div>
                <div className="text-slate-600">{product.servingSize || "na"}</div>
                <div className="font-medium text-purple-700">
                  Servings Per Container:
                </div>
                <div className="text-slate-600">{product.servingsPerContainer || "na"}</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-xl bg-purple-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-purple-900">
                  <Leaf className="h-5 w-5 text-purple-600" />
                  Ingredients
                </h3>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-purple-600" />
                  <p className="text-sm text-purple-600 font-medium">Allergens highlighted</p>
                </div>
              </div>

              {product.ingredients.length > 0 ? (
                <div className="custom-scrollbar max-h-[250px] overflow-y-auto pr-2">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {product.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-baseline gap-2 py-1">
                        <span className="text-xs text-purple-300">•</span>
                        {highlightAllergens(ing)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-purple-600">
                  No ingredients information available
                </p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-purple-50 p-4">
                <h3 className="mb-3 flex items-center gap-2 font-bold text-purple-900">
                  <Info className="h-5 w-5 text-purple-600" />
                  Nutrition Facts
                </h3>
                <p className="text-purple-600">
                  Not applicable for this product type
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-4">
                <h3 className="mb-3 flex items-center gap-2 font-bold text-purple-900">
                  <AlertTriangle className="h-5 w-5 text-purple-600" />
                  Warnings
                </h3>
                <p className="text-purple-600">
                  Keep out of reach of children. For external use only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
