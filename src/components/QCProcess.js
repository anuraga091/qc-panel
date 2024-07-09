import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep, updateFormData } from '../redux/slices/qcSlice';
import QCForm from './QCForm';
import generatePDF from '../utils/generatePDF';

const QCProcess = () => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.qc.steps);
  const currentStep = useSelector((state) => state.qc.currentStep);
  const formData = useSelector((state) => state.qc.formData);
  const currentFormData = formData[currentStep] || {};
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const isFormValid = () => {
    return (
      currentFormData.freeText &&
      currentFormData.dropdown &&
      currentFormData.imageUpload &&
      currentFormData.comments &&
      currentFormData.toggle !== undefined
    );
  };

  const handleNext = async () => {
    if (isFormValid()) {
      setError('');
      if (currentStep < steps) {
        dispatch(setCurrentStep(currentStep + 1));
      } else {
        await generatePDF(formData, name);
        dispatch(setCurrentStep(0)); 
      }
    } else {
      setError('Please fill in all fields before proceeding to the next step.');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStart = () => {
    if (name.trim() !== '') {
      dispatch(updateFormData({ step: 0, data: { name } }));
      dispatch(setCurrentStep(1));
    } else {
      setError('Please enter a name to start.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {currentStep === 0 ? (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Enter Your Name</h2>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your name"
          />
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
          <h2 className="text-lg font-medium text-gray-900 mb-4">QC Step {currentStep} of {steps}</h2>
          <QCForm step={currentStep} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentStep < steps ? 'Next' : 'Complete QC'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QCProcess;
