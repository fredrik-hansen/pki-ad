
import { FileText } from "lucide-react";
import { Button } from "./ui/button";
import { generateDOCX } from "../utils/docxExport";

export const DOCXExportButton = () => {
  const handleExportDOCX = () => {
    generateDOCX();
  };

  return (
    <Button
      onClick={handleExportDOCX}
      variant="outline"
      className="fixed top-4 right-20 z-50 bg-slate-800 border-slate-600 text-white hover:bg-slate-700 pdf-hide"
    >
      <FileText className="w-4 h-4 mr-2" />
      Save as DOCX
    </Button>
  );
};
