
export const generatePDF = () => {
  // Hide navigation and other interactive elements for PDF
  const elementsToHide = document.querySelectorAll('nav, .pdf-hide');
  elementsToHide.forEach(el => {
    (el as HTMLElement).style.display = 'none';
  });

  // Add PDF-specific styles
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body { 
        background: white !important; 
        color: black !important;
        font-size: 12pt;
        line-height: 1.4;
      }
      
      * {
        background: white !important;
        color: black !important;
        box-shadow: none !important;
      }
      
      .container {
        max-width: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      
      section {
        page-break-inside: avoid;
        margin-bottom: 20pt;
        padding: 10pt;
      }
      
      h1 { 
        font-size: 18pt; 
        font-weight: bold; 
        margin-bottom: 10pt;
        page-break-after: avoid;
      }
      
      h2 { 
        font-size: 16pt; 
        font-weight: bold; 
        margin: 15pt 0 8pt 0;
        page-break-after: avoid;
      }
      
      h3 { 
        font-size: 14pt; 
        font-weight: bold; 
        margin: 10pt 0 5pt 0;
        page-break-after: avoid;
      }
      
      p, li {
        font-size: 11pt;
        margin-bottom: 6pt;
      }
      
      ul, ol {
        margin: 6pt 0;
        padding-left: 20pt;
      }
      
      .experience-item,
      .competency-category {
        page-break-inside: avoid;
        margin-bottom: 15pt;
      }
      
      .date-range {
        font-weight: bold;
        font-size: 10pt;
      }
      
      .company-name {
        font-weight: bold;
      }
      
      .pdf-page-break {
        page-break-before: always;
      }
    }
  `;
  document.head.appendChild(style);

  // Trigger print dialog
  window.print();

  // Clean up after printing
  setTimeout(() => {
    document.head.removeChild(style);
    elementsToHide.forEach(el => {
      (el as HTMLElement).style.display = '';
    });
  }, 1000);
};
