"use client"

import dynamic from 'next/dynamic'
import 'react-barcode-scanner/polyfill'
import { useState } from 'react'

const BarcodeScanner = dynamic(() => {
  return import('react-barcode-scanner').then((mod) => mod.BarcodeScanner)
}, { ssr: false })

const Scanner = ({ upc, setUpc }) => {
  const [scanned, setScanned] = useState(false);

  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
      <BarcodeScanner 
        onCapture={(barcodes) => {
          if (scanned) return;
          
          const validBarcode = barcodes.find(b => 
            b.rawValue && b.rawValue !== upc
          );
          
          if (validBarcode) {
            setScanned(true);
            setUpc(validBarcode.rawValue);
            setTimeout(() => setScanned(false), 2000);
          }
        }}
        options={{
          formats: ['code_128', 'code_39', 'ean_8', 'ean_13', 'upc_a', 'upc_e'],
          frameRate: 15,
          delay: 1000
        }}
        trackConstraints={{
          facingMode: "environment",
          width: { min: 640, ideal: 1280 },
          height: { min: 480, ideal: 720 }
        }}
      />
    </div>
  )
}

export default Scanner