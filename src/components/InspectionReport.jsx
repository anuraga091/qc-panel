import React from 'react';

const InspectionReport = () => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full">
            <th colSpan="2" className="border px-4 py-2 text-left bg-gray-200">Inspection Report (Furniture)</th>
            <th className="border px-4 py-2 text-left bg-gray-200">Final Inspection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">Client</td>
            <td className="border px-4 py-2">Trampoline</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">2</td>
            <td className="border px-4 py-2">Item Descriptions</td>
            <td className="border px-4 py-2">Ada Bone Inlay Coffee Table</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">3</td>
            <td className="border px-4 py-2">SKU</td>
            <td className="border px-4 py-2">BAC70033A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">4</td>
            <td className="border px-4 py-2">PO No.</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">5</td>
            <td className="border px-4 py-2">Qty.</td>
            <td className="border px-4 py-2">9 pcs</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">6</td>
            <td className="border px-4 py-2">Factory</td>
            <td className="border px-4 py-2">MEHUL ART & CRAFT</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">7</td>
            <td className="border px-4 py-2">Inspected By</td>
            <td className="border px-4 py-2">KANHAIYA LAL</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">10</td>
            <td className="border px-4 py-2">Date of Inspection</td>
            <td className="border px-4 py-2">05 JUNE 2024</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">11</td>
            <td className="border px-4 py-2">Inspection Result</td>
            <td className="border px-4 py-2">Pass</td>
          </tr>
        </tbody>
      </table>

      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th colSpan="3" className="border px-4 py-2 text-left bg-gray-200">CONSTRUCTION, AESTHETIC, FINISHING & PRODUCT LABELLING</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">Construction of the item was made according to 'Approved Sample'?</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">2</td>
            <td className="border px-4 py-2">The materials of the item are all according to the client's approved specifications.</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">3</td>
            <td className="border px-4 py-2">Colors/finish of the bulk production is as per the approved finish Swatch.</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">4</td>
            <td className="border px-4 py-2">Aesthetic, distressing, and antiquing finished are as per the approved sample & finish swatch?</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">5</td>
            <td className="border px-4 py-2">Color/finish of the production units are even and consistent.</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">6</td>
            <td className="border px-4 py-2">Gloss/Sheen finished off the production units are per the approved finish swatch?</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">7</td>
            <td className="border px-4 py-2">Have you gathered all the SKUs/styles of the collection and compared overall color and gloss finish; to ensure color and gloss are even and consistent?</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">8</td>
            <td className="border px-4 py-2">The format and statement content of the Warning, Cautionary, and Regulatory labels are as per the client's approval?</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">9</td>
            <td className="border px-4 py-2">Have you performed the moisture check on the wooden parts of the item?</td>
            <td className="border px-4 py-2">N/A</td>
          </tr>
        </tbody>
      </table>

      <div className="text-center mt-4">
        <img src="/path/to/your/image.png" alt="Inspection" className="mx-auto" />
        <p className="mt-2 text-lg">Goods offered for the inspection.<br />The goods were inspected 100% and found satisfactory.</p>
      </div>
    </div>
  );
};

export default InspectionReport;
