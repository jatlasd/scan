import { ProductSelector } from "@/components/ProductSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Search } from "lucide-react";

export const determineRenders = (renderEnvironment, { upc, setUpc, handleSearch, setProduct }) => {
  if (renderEnvironment === "dev") {
    return {
      scanner: <ProductSelector setUpc={setUpc} setProduct={setProduct} />,
    };
  } else {
    return {
      scanner: (
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
      ),
    };
  }
};
