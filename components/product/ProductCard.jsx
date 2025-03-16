import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, ShoppingBag } from "lucide-react"
import Image from "next/image"

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
]

const ProductCard = ({ p }) => {
  // Placeholder product data - in a real app, this would come from an API
  const product = {
    name: "Organic Chocolate Chip Cookies",
    brand: "Nature's Bakery",
    image: "/placeholder.svg?height=300&width=300",
    ingredients: [
      "Organic Wheat Flour",
      "Organic Cane Sugar",
      "Organic Palm Oil",
      "Organic Chocolate Chips (Organic Cane Sugar, Organic Chocolate Liquor, Organic Cocoa Butter)",
      "Organic Eggs",
      "Baking Soda",
      "Sea Salt",
      "Natural Flavor",
      "Organic Milk",
    ],
    upc: "123456789012",
    weight: "12 oz (340g)",
    servingSize: "2 cookies (30g)",
    servingsPerContainer: "About 11",
  }

  // Function to highlight allergens in ingredients
  const highlightAllergens = (ingredient) => {
    const highlighted = ingredient
    let containsAllergen = false

    commonAllergens.forEach((allergen) => {
      const regex = new RegExp(`\\b${allergen}\\b`, "gi")
      if (regex.test(ingredient.toLowerCase())) {
        containsAllergen = true
      }
    })

    return { text: highlighted, isAllergen: containsAllergen }
  }

  return (
    <div className="flex flex-col gap-5">
        <button onClick={()=>console.log(p)}>click</button>
    <Card className="w-full max-w-3xl bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">UPC: {product.upc}</p>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.brand} • {product.weight}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex justify-center">
            <div className="relative h-[150px] w-[150px] rounded-md overflow-hidden border">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-2" />
            </div>
          </div>

          <div className="space-y-3 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
                <div className="text-muted-foreground">Serving Size:</div>
                <div>{product.servingSize}</div>
                <div className="text-muted-foreground">Servings Per Container:</div>
                <div>{product.servingsPerContainer}</div>
              </div>
            </div>

            <Separator className="my-2" />

            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Info className="h-4 w-4" />
                Ingredients
              </h3>
              <div className="mt-1">
                <p className="text-xs text-muted-foreground mb-1">Allergens are highlighted</p>
                <ul className="text-xs space-y-0.5">
                  {product.ingredients.slice(0, 5).map((ingredient, index) => {
                    const { text, isAllergen } = highlightAllergens(ingredient)
                    return (
                      <li key={index} className={isAllergen ? "font-bold" : ""}>
                        {text}
                        {isAllergen && (
                          <Badge variant="secondary" className="ml-1 text-xs">
                            Allergen
                          </Badge>
                        )}
                      </li>
                    )
                  })}
                  {product.ingredients.length > 5 && (
                    <li className="text-muted-foreground">+{product.ingredients.length - 5} more ingredients</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default ProductCard