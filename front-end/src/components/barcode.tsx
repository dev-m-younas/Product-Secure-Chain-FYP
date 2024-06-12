import React from "react";
import QRCode from "qrcode.react";
import { Box } from "native-base";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface BarcodeProps {
  barcodeId: string;
  manufacturerName: string;
  manDateEpoch: number;
  productType: string;
  productImage: string;
}

export const Barcode: React.FC<BarcodeProps> = ({
  barcodeId,
  manufacturerName,
  manDateEpoch,
  productType,
  productImage,
}) => {
  // Concatenate props into a single string to be encoded in QR code
  const qrData = `${barcodeId}, ${manufacturerName}, ${manDateEpoch}, ${productType}, ${productImage}`;

  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [qrCodeSize, setQrCodeSize] = useState(80);

  const handleDownloadQRCode = async () => {
    if (qrCodeRef.current) {
      try {
        // Capture the QR code using html2canvas
        const canvas = await html2canvas(qrCodeRef.current);

        // Generate a new PDF document
        const doc = new jsPDF();

        // Set desired QR code size (adjust as needed)
        const qrCodeWidth = qrCodeSize; // Adjust based on your requirements

        // Calculate centering coordinates for QR code
        const docWidth = doc.internal.pageSize.getWidth();
        const docHeight = doc.internal.pageSize.getHeight(); // Get document height for centering
        const qrCodeX = (docWidth - qrCodeWidth) / 2;
        const qrCodeY = (docHeight - qrCodeWidth) / 2; // Center vertically as well

        // Add QR code image to PDF (centered)
        doc.addImage(canvas.toDataURL("image/png"), "PNG", qrCodeX, qrCodeY, qrCodeWidth, qrCodeWidth);

        // Download the PDF
        doc.save("barcode.pdf");
      } catch (error) {
        console.error("Error downloading QR code:", error);
        // Handle potential errors gracefully, e.g., display an error message to the user
      }
    }
  };

  return (
    <div ref={qrCodeRef}>
      <Box mt={-2}>
        <QRCode value={qrData} size={150} />
      </Box>
      
      {/*<Box mt={1.5}>
        <Button onClick={handleDownloadQRCode}>Download QR Code</Button>
      </Box>*/}
    </div>
  );
};
