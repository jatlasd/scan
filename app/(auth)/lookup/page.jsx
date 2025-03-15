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

const renderEnvironment = "dev";

const LookupPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upc, setUpc] = useState("");

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
    fetchUser();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for UPC:", upc);
  };

  const components = determineRenders(renderEnvironment, { upc, setUpc, handleSearch });

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    );

  return (
    <div className="container max-w-5xl py-6">
      <div className="ml-10 flex flex-col gap-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Product Lookup
          </h1>
          <p className="text-muted-foreground">
            Scan a barcode or enter a UPC to view detailed product information
            and allergen data
          </p>
        </div>

        <Card className="w-full max-w-3xl bg-white">
          <CardHeader>
            <CardTitle>Search Products</CardTitle>
            <CardDescription>
              Enter a UPC code or scan a barcode to find product information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {components.scanner}

            <div className="text-muted-foreground text-sm">
              <p>
                {}
                Try these example UPCs: 049000042566 (Coca-Cola), 038000138416
                (Lay's), 028400090858 (Jif Peanut Butter), 041196910759 (Whole
                Wheat Bread)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LookupPage;
