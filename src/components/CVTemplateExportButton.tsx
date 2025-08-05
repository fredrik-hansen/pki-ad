import { FileText, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { generateCVTemplate } from "../utils/cvTemplateExport";

export const CVTemplateExportButton = () => {
  const handleExportTemplate = (templateNumber: number) => {
    generateCVTemplate(templateNumber);
  };

  const templates = [
    { id: 1, name: "Executive Summary", description: "Focus on leadership and achievements" },
    { id: 2, name: "Technical Skills", description: "Emphasizes technical competencies" },
    { id: 3, name: "Modern Professional", description: "Clean, contemporary design" },
    { id: 4, name: "Academic/Research", description: "Formal academic style" },
    { id: 5, name: "Creative Design", description: "Visual and creative layout" }
  ];

  return (
    <div className="fixed top-4 right-32 z-50 pdf-hide">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            CV Templates
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          {templates.map((template) => (
            <DropdownMenuItem
              key={template.id}
              onClick={() => handleExportTemplate(template.id)}
              className="flex flex-col items-start p-3 cursor-pointer"
            >
              <div className="font-medium">{template.name}</div>
              <div className="text-sm text-muted-foreground">{template.description}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};