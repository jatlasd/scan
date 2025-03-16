"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { determineRenders } from "@/lib/constants/dev";
import ProductCard from "@/components/product/ProductCard";
import { formatGoUpcData } from "@/lib/formatApiData";

const renderEnvironment = "dev";

const LookupPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upc, setUpc] = useState("");
  const [product, setProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  // TODO add actual api route for lookup. currently using constants

  useEffect(() => {
    const fetchProductData = async (upc) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/product/${encodeURIComponent(upc)}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  }, [upc]);

  const minLoadingTimer = new Promise((resolve) => setTimeout(resolve, 2000));

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for UPC:", upc);
  };

  const components = determineRenders(renderEnvironment, {
    upc,
    setUpc,
    handleSearch,
    setProduct,
  });

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    );

  return (
      <div className="w-full pl-20 flex flex-col gap-6 container py-6">

        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Product Lookup
          </h1>
          <p className="text-muted-foreground pb-6">
            Scan a barcode or enter a UPC to view detailed product information
            and allergen data
          </p>

        <Card className="w-full max-w-3xl bg-white">
          <CardHeader>
            <CardTitle>Search Products</CardTitle>
            <CardDescription>
              Enter a UPC code or scan a barcode to find product information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {components.scanner}
          </CardContent>
        </Card>
        </div>


      {/* {product && <button onClick={()=>console.log(product)}>click</button>} */}
      {product && <ProductCard product={formatGoUpcData(product)}/>}
    </div>
  );
};

export default LookupPage;
