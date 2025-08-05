import { useState } from "react";
import { Menu, FileText, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { generateDOCX } from "../utils/docxExport";
import { generateCVTemplate } from "../utils/cvTemplateExport";

export const ExportMenu = () => {
  const handleExportDOCX = () => {
    generateDOCX();
  };

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
    <div className="fixed top-4 right-4 z-50 pdf-hide">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Export options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-slate-900 border-slate-700">
          <DropdownMenuItem
            onClick={handleExportDOCX}
            className="flex items-center p-3 cursor-pointer text-slate-200 hover:bg-slate-800"
          >
            <FileText className="w-4 h-4 mr-3" />
            <div className="flex flex-col">
              <div className="font-medium">Save Document</div>
              <div className="text-sm text-slate-400">Export as DOCX</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-slate-700" />
          
          <div className="px-3 py-2">
            <div className="text-sm font-medium text-slate-300 mb-2">CV Templates</div>
            {templates.map((template) => (
              <DropdownMenuItem
                key={template.id}
                onClick={() => handleExportTemplate(template.id)}
                className="flex flex-col items-start p-2 cursor-pointer text-slate-200 hover:bg-slate-800 rounded-sm"
              >
                <div className="font-medium text-sm">{template.name}</div>
                <div className="text-xs text-slate-400">{template.description}</div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};