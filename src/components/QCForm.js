import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../redux/slices/qcSlice';
import { uploadFile } from '../redux/action/qcActions';

const QCForm = ({ step }) => {
  const dispatch = useDispatch();
  const stepData = useSelector((state) => state.qc.steps[step - 1]) || { stepName: '', inspectionItems: [], images: [] };
  const [stepName, setStepName] = useState(stepData.stepName);
  const [inspectionItems, setInspectionItems] = useState(stepData.inspectionItems);
  const [images, setImages] = useState(stepData.images);
    const fileInputRef = useRef(null);


  useEffect(() => {
    setStepName(stepData.stepName);
    setInspectionItems(stepData.inspectionItems);
    setImages(stepData.images);
  }, [stepData]);

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [step]);

  const handleStepNameChange = (e) => {
    setStepName(e.target.value);
    dispatch(updateFormData({ step, data: { stepName: e.target.value } }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    const updatedItems = inspectionItems.map(item =>
      item.id === parseInt(name) ? { ...item, status: value } : item
    );
    setInspectionItems(updatedItems);
    dispatch(updateFormData({ step, data: { inspectionItems: updatedItems } }));
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    const updatedImages = images.map((image, index) =>
      index === parseInt(name) ? { ...image, comment: value } : image
    );
    setImages(updatedImages);
    dispatch(updateFormData({ step, data: { images: updatedImages } }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadFile(step, file));
    } else {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor={`step-name-${step}`} className="block text-sm font-medium text-gray-700">Step Name</label>
        <input
          type="text"
          id={`step-name-${step}`}
          name="stepName"
          value={stepName}
          onChange={handleStepNameChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Step Name"
        />
      </div>
      {inspectionItems.map(item => (
        <div key={item.id}>
          <label htmlFor={`item-${item.id}`} className="block text-sm font-medium text-gray-700">{item.question}</label>
          <select
            id={`item-${item.id}`}
            name={String(item.id)}
            value={item.status}
            onChange={handleItemChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled hidden>Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="na">N/A</option>
          </select>
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      {images.map((image, index) => (
        <div key={index}>
          {image.url && (
            <img src={image.url} alt={`Uploaded ${index}`} className="mt-2 max-w-full h-auto" style={{ maxHeight: '300px', maxWidth: '100%' }} />
          )}
          <label htmlFor={`comment-${index}`} className="block text-sm font-medium text-gray-700">Comment</label>
          <input
            type="text"
            id={`comment-${index}`}
            name={String(index)}
            value={image.comment}
            onChange={handleCommentChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
    </form>
  );
};

export default QCForm;
