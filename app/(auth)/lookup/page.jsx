"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Camera, Search } from "lucide-react";

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
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
              <Input
                type="text"
                placeholder="Enter UPC code (e.g., 049000042566)"
                value={upc}
                onChange={(e) => setUpc(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                className="flex items-center gap-2 not-[disabled]:cursor-pointer"
                disabled={!upc}
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Camera size={18} />
                Scan Barcode
              </Button>
            </form>

            <div className="text-muted-foreground text-sm">
              <p>
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
