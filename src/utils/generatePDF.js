import jsPDF from 'jspdf';

const generatePDF = async (formData, name) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  let yPosition = 10;

  const addText = (text, x = 10, isBold = false) => {
    if (yPosition + 10 > pageHeight) {
      doc.addPage();
      yPosition = 10;
    }
    if (isBold) {
      doc.setFont(undefined, 'bold');
    } else {
      doc.setFont(undefined, 'normal');
    }
    doc.text(text, x, yPosition);
    yPosition += 10;
  };

  
  addText(`Name: ${name}`, 10, true);
  yPosition += 10;

  const addImage = async (url, comments) => {
    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; 
      img.src = url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Create a canvas and draw the image onto it
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      
      const imgData = canvas.toDataURL('image/jpeg');
      
      if (yPosition + 60 > pageHeight) {
        doc.addPage();
        yPosition = 10;
      }

      doc.addImage(imgData, 'JPEG', 10, yPosition, 50, 50);
      yPosition += 60;
      addText(`Comments: ${comments}`);
    } catch (error) {
      console.error('Error loading image:', error);
      addText('Error loading image.');
      yPosition += 60;
      addText(`Comments: ${comments}`);
    }
  };

  for (const step in formData) {
    addText(`Step ${step}`, 10, true);
    const stepData = formData[step];
    addText(`Text: ${stepData.freeText}`);
    addText(`Dropdown: ${stepData.dropdown}`);
    addText(`Comments: ${stepData.comments}`);
    addText(`Toggle: ${stepData.toggle ? 'Yes' : 'No'}`);
    if (stepData.imageUpload) {
      await addImage(stepData.imageUpload.url, stepData.comments);
    }
    yPosition += 5; 
  }

  doc.save(`${name}_inspection.pdf`);
};

export default generatePDF;
