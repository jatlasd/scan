import { currentUser } from "@clerk/nextjs/server";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const renderUpcLookup = async () => {
  const user = await currentUser();
    if (!user) {
        return null
    }
}