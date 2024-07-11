import React,{useRef} from 'react';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Reports = () => {
  const formData = useSelector((state) => state.qc);
    const printRef = useRef();

 



  const rows = [
    { label: 'Client', value: formData.client },
    { label: 'Item Descriptions', value: formData.itemDescription },
    { label: 'SKU', value: formData.sku },
    { label: 'PO No.', value: formData.poNumber },
    { label: 'Qty.', value: formData.quantity },
    { label: 'Factory', value: formData.factory },
    { label: 'Inspected By', value: formData.inspectedBy },
    { label: 'Date of Inspection', value: formData.dateOfInspection },
    { label: 'Inspection Result', value: formData.inspectionResult },
  ];

 const generatePDF = async () => {
  const canvasWidth = 1024; 
  const originalWidth = printRef.current.style.width;

  printRef.current.style.width = `${canvasWidth}px`;

  const canvas = await html2canvas(printRef.current, {
    scale: 2,
    useCORS: true,
    width: canvasWidth,
    windowWidth: canvasWidth
  });

  printRef.current.style.width = originalWidth;

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4'
  });

  const margin = 20;
  const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
  const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;

  const imgProps = pdf.getImageProperties(imgData);
  let imgWidth = pageWidth;
  let imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  if (imgHeight <= pageHeight) {
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
  } else {
    let numberOfPages = Math.ceil(imgHeight / pageHeight);
    for (let i = 0; i < numberOfPages; i++) {
      
      let yPosition = -i * pageHeight + margin;
      pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight, undefined, 'FAST');
      if (i < numberOfPages - 1) {
        pdf.addPage();  
      }
    }
  }
  
  pdf.save('report.pdf');
};





  return (
    <>
        <div ref={printRef} className='mx-w-5xl mx-auto border border-black mt-10'>
            <div  className=" bg-white ">
                <div className="flex justify-between bg-gray-300 p-4 "> 
                    <h1 className="text-xl font-bold mx-2 ">Inspection Report ({formData.product.toUpperCase()})</h1>
                    <h1 className="text-xl font-bold mx-2 ">Final Inspection</h1>  
                </div>
                <div className="border border-black">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                        <table className="min-w-full bg-white">
                            <tbody>
                            {rows.map((row, index) => (
                                <tr key={index} className="">
                                <td className="py-2 px-4 font-bold border-b border-r border-black">{index + 1}</td>
                                <td className="py-2 px-4 font-bold border-b border-r border-black">{row.label}</td>
                                <td className="py-2 px-4 border-r border-b border-black">{row.value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                        <div className="flex justify-center items-center">
                        {formData.img_url && (
                            <div className='flex justify-center items-center m-2'>
                                <img
                                    src={formData.img_url}
                                    alt="Inspection"
                                    className="w-full h-auto max-w-full sm:max-w-48 sm:max-h-36 md:max-w-96 md:max-h-72 object-cover border border-black"
                                />
                            </div>
                            
                        )}
                        </div>
                    </div>
                </div>

            </div>
            <div className=' mt-4 mx-4'>
                {formData.steps.map((step, stepIndex) => ( 
                    <div className="border border-black mb-8" key={stepIndex}>
                        <div className='bg-gray-300 p-2 border-b border-black'>
                            <h2 className="text-lg font-bold ">{step.stepName.toUpperCase()}</h2>
                        </div>
                        <table className="min-w-full bg-white">
                            <tbody> 
                                <React.Fragment >
                                    {step.inspectionItems.map((item, itemIndex) => (
                                        <tr key={itemIndex} className="border-b border-black">
                                            <td className="p-2 border-r border-black">{itemIndex + 1}</td>
                                            <td className="p-2 border-r border-black">{item.question}</td>
                                            <td className="p-2 ">{item.status.toUpperCase()}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3" className="py-4 px-4 ">
                                            <div className='border border-black'>
                                                {step.images.map((image, imageIndex) => (
                                                    <div key={imageIndex} className=" flex flex-col justify-center items-center mt-2 ">
                                                        <img src={image.url} alt={image.name} className="w-full h-auto max-w-96 max-h-90 object-cover " />
                                                        <p className='text-center p-4 '>
                                                            <span className='font-bold mr-4'>Comments and Remarks:</span>
                                                            {image.comment}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                        </td>
                                    </tr>
                                </React.Fragment>
                                
                            </tbody>
                        </table>
                    </div>
                ))}
                
            </div>  
        </div>
        <div className='flex justify-center m-5'> 
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>Generate PDF</button>

        </div>
    </>
  );
};

export default Reports;
