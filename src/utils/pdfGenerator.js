// PDF Generator for Tirada Angelical
// This utility creates a valid PDF file from the reading data

import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generates a PDF document for a Tirada Angelical reading
 * @param {Object} readingData - The data from the reading
 * @returns {Blob} - PDF file as a Blob
 */
export const generatePDF = (readingData) => {
  try {
    const { tipoTirada, tema, cartas, fecha, consultaEnVivo } = readingData;
    
    // Validate required data
    if (!cartas || !Array.isArray(cartas) || cartas.length === 0) {
      throw new Error('No hay cartas disponibles para generar el PDF');
    }
    
    if (!tipoTirada || !tipoTirada.nombre) {
      throw new Error('Información de tirada incompleta');
    }
    
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Set document properties
    doc.setProperties({
      title: `Tirada Angelical - ${tipoTirada.nombre}`,
      subject: `Consulta sobre ${tema?.nombre || 'General'}`,
      author: 'Plataforma Angélica',
      creator: 'Plataforma Angélica'
    });
    
    // Add header
    doc.setFillColor(102, 51, 153); // Purple color
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(24);
    doc.text('Tirada Angelical', 105, 15, { align: 'center' });
    
    // Add reading information
    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date(fecha).toLocaleDateString()}`, 20, 40);
    doc.text(`Tipo de Tirada: ${tipoTirada.nombre}`, 20, 48);
    doc.text(`Tema de Consulta: ${tema?.nombre || 'General'}`, 20, 56);
    
    if (consultaEnVivo) {
      doc.setFillColor(0, 150, 136); // Teal color
      doc.rect(20, 62, 80, 10, 'F');
      doc.setTextColor(255, 255, 255); // White text
      doc.text('Consulta en Vivo Solicitada', 60, 68, { align: 'center' });
      doc.setTextColor(0, 0, 0); // Reset to black text
    }
    
    // Add cards section title
    doc.setFontSize(16);
    doc.setTextColor(102, 51, 153); // Purple color
    doc.text('Cartas de tu Lectura', 105, 80, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.setDrawColor(102, 51, 153); // Purple color
    doc.line(20, 85, 190, 85);
    
    // Add each card
    let yPosition = 95;
    
    cartas.forEach((carta, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Card position title
      doc.setFontSize(14);
      doc.setTextColor(102, 51, 153); // Purple color
      const positionName = tipoTirada.posiciones && tipoTirada.posiciones[index] 
        ? tipoTirada.posiciones[index].nombre 
        : `Posición ${index + 1}`;
      doc.text(`${index + 1}. ${positionName}`, 20, yPosition);
      yPosition += 8;
      
      // Card name
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black text
      doc.text(`Carta: ${carta.nombre || 'Carta Angelical'}`, 20, yPosition);
      yPosition += 8;
      
      // Card attributes
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100); // Gray text
      const elemento = carta.elemento || 'No especificado';
      const color = carta.color || 'No especificado';
      const cristal = carta.cristal || 'No especificado';
      doc.text(`Elemento: ${elemento} | Color: ${color} | Cristal: ${cristal}`, 20, yPosition);
      yPosition += 8;
      
      // Card message
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0); // Black text
      
      // Split long text into multiple lines
      const mensaje = carta.mensaje || 'Mensaje angelical de guía y protección.';
      const messageLines = doc.splitTextToSize(mensaje, 170);
      doc.text(messageLines, 20, yPosition);
      yPosition += messageLines.length * 6;
      
      // Card affirmation
      doc.setFontSize(11);
      doc.setTextColor(102, 51, 153); // Purple color
      doc.setFont(undefined, 'italic');
      
      // Split long text into multiple lines
      const afirmacion = carta.afirmacion || 'Soy un ser de luz y amor divino.';
      const affirmationLines = doc.splitTextToSize(`"${afirmacion}"`, 170);
      doc.text(affirmationLines, 20, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += affirmationLines.length * 6 + 10;
    });
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150); // Light gray
      doc.text('Plataforma Angélica - Transformación Espiritual', 105, 285, { align: 'center' });
      doc.text(`Página ${i} de ${pageCount}`, 105, 292, { align: 'center' });
    }
    
    // Return the PDF as a blob
    return doc.output('blob');
    
  } catch (error) {
    console.error('Error al generar PDF:', error);
    throw new Error(`Error al generar el PDF: ${error.message}`);
  }
};
