import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Capture an HTML element by ID and export it to a high-quality PDF.
 * @param {string} elementId - The DOM ID of the element to capture
 * @param {string} filename - Filename of the generated PDF
 */
export const exportToPDF = async (elementId, filename = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found.`);
    return;
  }

  try {
    // 1. Temporarily prepare the element styles to ensure it captures fully without scrollbars
    const originalStyle = element.style.cssText;
    element.style.overflow = 'visible';
    element.style.height = 'auto';

    // 2. Render canvas using html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution scale
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Restore original element style
    element.style.cssText = originalStyle;

    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions: 210mm width, 297mm height
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // 3. Render page(s)
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight; // Offset position for subsequent pages
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;
    }

    // 4. Save the document
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
};
