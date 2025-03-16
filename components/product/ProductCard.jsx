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

const ProductCard = ({ product }) => {
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
      <span className="font-medium text-amber-600">{ingredient}</span>
    ) : (
      ingredient
    );
  };

  return (
    <Card className="w-full max-w-3xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-muted-foreground text-xs">UPC: {product.upc}</p>
            <CardTitle className="text-xl font-bold sm:text-2xl">
              {product.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <span className="font-medium">{product.brand}</span>
              {product.weight && <span>•</span>}
              <span>{product.weight !== "na" ? product.weight : ""}</span>
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="self-start border-blue-200 bg-blue-50 px-3 py-1 text-blue-700 sm:self-center"
          >
            Body + Face Wash
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      {/* 
      
      RIGHTHERE
      [ ]   implement ingredient separation
      [ ]   ing string paragraph and then separate allergen analysis
      [ ]   add a "see all ingredients" link at the bottom of the card
      [ ]   button    

      */}

      <CardContent className="pt-4">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="relative h-[180px] w-[180px] overflow-hidden rounded-lg border bg-slate-50 p-2 shadow-sm">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="mt-3 w-full rounded-lg bg-slate-50 p-3">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <ShoppingBag className="h-4 w-4 text-blue-600" />
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="font-medium text-slate-500">Serving Size:</div>
                <div>{product.servingSize || "na"}</div>
                <div className="font-medium text-slate-500">
                  Servings Per Container:
                </div>
                <div>{product.servingsPerContainer || "na"}</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Leaf className="h-4 w-4 text-green-600" />
                  Ingredients
                </h3>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-600" />
                  <p className="text-xs text-slate-500">Allergens in orange</p>
                </div>
              </div>

              {product.ingredients.length > 0 ? (
                <div className="custom-scrollbar max-h-[200px] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {product.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-baseline gap-1 py-0.5">
                        <span className="text-xs text-slate-300">•</span>
                        {highlightAllergens(ing)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No ingredients information available
                </p>
              )}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Info className="h-4 w-4 text-purple-600" />
                  Nutrition Facts
                </h3>
                <p className="text-sm text-slate-500">
                  Not applicable for this product type
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Warnings
                </h3>
                <p className="text-sm text-slate-500">
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
