"use server"

import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";

export async function getOrCreateProduct(productData) {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    
    const userId = user.id;
    const upcString = String(productData.upc);

    const existingProduct = await db.GlobalProduct.findUnique({
        where: {
            upc: upcString
        },
        include: {
            userProducts: {
                where: {
                    userId
                }
            }
        }
    })

    if (existingProduct) {
        if (existingProduct.userProducts.length === 0) {
            await db.userProduct.create({
                data: {
                    userId,
                    globalProductId: existingProduct.upc
                }
            })
        }
        return existingProduct
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
                    userId
                }
            }
        },
        include: {
            userProducts: true
        }
    })

    return newProduct
}

