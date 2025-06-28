
import { FileText } from "lucide-react";
import { Button } from "./ui/button";
import { generatePDF } from "../utils/pdfExport";

export const PDFExportButton = () => {
  const handleExportPDF = () => {
    generatePDF();
  };

  return (
    <Button
      onClick={handleExportPDF}
      variant="outline"
      className="fixed top-4 right-4 z-50 bg-slate-800 border-slate-600 text-white hover:bg-slate-700 pdf-hide"
    >
      <FileText className="w-4 h-4 mr-2" />
      Save as PDF
    </Button>
  );
};
