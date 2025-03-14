import ScannerContainer from "@/components/scan/ScannerContainer";
import { checkUser } from "@/lib/checkUser";
import React from "react";


const LookupPage = async () => {
  const user = await checkUser()
  return (
    <div className="asd m-10 flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Lookup</h1>
        <p className="text-muted-foreground">
          Scan a barcode or enter a UPC to view detailed product information and
          allergen data
        </p>
      </div>
      <ScannerContainer user={user}/>
    </div>
  );
};

export default LookupPage;
