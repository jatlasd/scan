"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";

export async function getOrCreateProduct(productData) {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const userId = user.id;
  const upcString = String(productData.upc);

  const existingProduct = await db.GlobalProduct.findUnique({
    where: {
      upc: upcString,
    },
    include: {
      userProducts: {
        where: {
          userId,
        },
      },
    },
  });

  if (existingProduct) {
    if (existingProduct.userProducts.length === 0) {
      const userProduct = await db.userProduct.create({
        data: {
          userId,
          globalProductId: existingProduct.upc,
        },
      });

      const ingredients = existingProduct.ingredients || [];
      for (const ingredient of ingredients) {
        await db.userIngredient.create({
          data: {
            userId,
            name: ingredient,
            products: {
              connect: {
                id: userProduct.id
              }
            }
          }
        });
      }
    }
    return existingProduct;
  }

  const newProduct = await db.GlobalProduct.create({
    data: {
      upc: upcString,
      source: productData.source || "manual",
      type: productData.type || "food",
      name: productData.name,
      brand: productData.brand,
      image: productData.image,
      ingredients: productData.ingredients || [],
      userProducts: {
        create: {
          userId,
        },
      },
    },
    include: {
      userProducts: true,
    },
  });

  const userProduct = newProduct.userProducts[0];
  const ingredients = productData.ingredients || [];
  
  for (const ingredient of ingredients) {
    await db.userIngredient.create({
      data: {
        userId,
        name: ingredient,
        products: {
          connect: {
            id: userProduct.id
          }
        }
      }
    });
  }

  return newProduct;
}

export async function isProductInDb(upc){
    const product = await db.GlobalProduct.findUnique({
        where: {
            upc: String(upc),
        },
    });
    return!!product;
}
