"use client";

import { useState, useEffect } from "react";
import { goProducts } from "@/lib/constants/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductSelector({ setUpc }) {
  const handleProductSelect = (value) => {
    const selectedProduct = goProducts[value];
    if (selectedProduct && selectedProduct.code) {
      setUpc(selectedProduct.code);
    }
  };

  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        Test Products
      </label>
      <Select onValueChange={handleProductSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a test product" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(goProducts).map(([key, product]) => (
            <SelectItem key={key} value={key}>
              {product.product.brand} - {product.product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="mt-1 text-xs text-gray-500">
        Select a product to automatically fill the UPC field
      </p>
    </div>
  );
} 