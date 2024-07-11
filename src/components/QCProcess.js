import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep, updateFormData } from '../redux/slices/qcSlice';
import QCForm from './QCForm';
import { uploadFile } from '../redux/action/qcActions';
import { useNavigate } from 'react-router-dom';


const QCProcess = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.qc.currentStep);
  const formData = useSelector((state) => state.qc);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [clientInput, setClientInput] = useState('');
  const [clientList, setClientList] = useState(['Trampoline', 'Adidas', 'Nike']);
  const [showDropdown, setShowDropdown] = useState(false);


  const isFormValid = () => {
    const currentFormData = formData.steps[currentStep - 1] || {};
    console.log(currentFormData);
    return (
      currentFormData.inspectionItems &&
      currentFormData.inspectionItems.every(item => item.status !== undefined && item.status !== '' && item.status !== null) &&
      currentFormData.images &&
      currentFormData.images.every(image => image.url && image.comment)
    );
  };




  const hasSpecialCharacters = (str) => {
    const regex = /[^a-zA-Z0-9 ]/; // Allows letters, numbers, and spaces only
    return regex.test(str);
  };

  const isNumeric = (str) => {
  const regex = /^[0-9]+$/;
  return regex.test(str);
};

  const handleNext = async () => {
    if (currentStep === 0 || isFormValid()) {
      setError('');
      if (currentStep < formData.steps.length) {
        dispatch(setCurrentStep(currentStep + 1));
      } else {
        navigate('/reports');
      }
    } else {
      setError('Please fill in all fields before proceeding to the next step.');
    }
  };

  const handleStart = () => {
    const {
      client, itemDescription, sku, poNumber, quantity, factory,
      inspectedBy, dateOfInspection, inspectionResult, product, img_url
    } = formData;
    if (client && itemDescription && sku && poNumber && quantity && factory &&
        inspectedBy && dateOfInspection && inspectionResult && product && img_url) {
      dispatch(setCurrentStep(1));
      setError('');
    } else {
      alert('Please fill in all fields to start.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateOfInspection'){
      dispatch(updateFormData({ step: 0, data: { [name]: value } }));
    } else if (name === 'quantity' && !isNumeric(value)){
      alert('Only numbers are allowed')
    } else if (hasSpecialCharacters(value)){
      alert('Special charcters are not allowed')
    } else{
      dispatch(updateFormData({ step: 0, data: { [name]: value } }));
    }
  };

  const handleClientChange = (e) => {
    const value = e.target.value;
    setClientInput(value);
    setShowDropdown(value.length > 0);
    dispatch(updateFormData({ step: 0, data: { client: value } }));
  };

  const handleClientSelect = (client) => {
    setClientInput(client);
    dispatch(updateFormData({ step: 0, data: { client } }));
    setShowDropdown(false);
  };

  const handleAddNewClient = () => {
    setClientList([...clientList, clientInput]);
    
    setShowDropdown(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadFile(currentStep, file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {currentStep === 0 ? (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Enter Inspection Details</h2>
          <form className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="client"
                value={clientInput}
                onChange={handleClientChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Client"
                autoComplete="off"
              />
              {showDropdown && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto">
                  {clientList
                    .filter(client => client.toLowerCase().includes(clientInput.toLowerCase()))
                    .map((client, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 border"
                        onClick={() => handleClientSelect(client)}
                      >
                        {client}
                      </li>
                    ))}
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 font-bold"
                    onClick={handleAddNewClient}
                  >
                    Add "{clientInput}" as new client
                  </li>
                </ul>
              )}
            </div>
            <input type="text" name="itemDescription" value={formData.itemDescription} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Item Descriptions" />
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="SKU" />
            <input type="text" name="poNumber" value={formData.poNumber} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="PO No." />
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Qty." />
            <input type="text" name="factory" value={formData.factory} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Factory" />
            <input type="text" name="inspectedBy" value={formData.inspectedBy} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Inspected By" />
            <div>
              <label htmlFor="dateOfInspection" className="block text-sm font-medium text-gray-700">
                Date of Inspection
              </label>
              <input
                type="date"
                name="dateOfInspection"
                value={formData.dateOfInspection}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <input type="text" name="inspectionResult" value={formData.inspectionResult} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Inspection Result" />
            <input type="text" name="product" value={formData.product} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Product" />
            <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleStart}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start QC Process
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">QC Step {currentStep} of {formData.steps.length}</h2>
          <QCForm step={currentStep} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentStep < formData.steps.length ? 'Next' : 'Complete QC'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QCProcess;
