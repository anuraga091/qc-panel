import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../redux/slices/qcSlice';
import { uploadFile } from '../redux/action/qcActions';

const QCForm = ({ step }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.qc.formData[step]) || {
    freeText: '',
    dropdown: '',
    imageUpload: null,
    comments: '',
    toggle: false,
  };

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateFormData({
      step,
      data: { ...formData, [name]: type === 'checkbox' ? checked : value }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      dispatch(uploadFile(step, file));
    } else {
      alert('Please upload a valid image file.');
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [step]);

  return (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="freeText" className="block text-sm font-medium text-gray-700">Text</label>
        <input
          type="text"
          id="freeText"
          name="freeText"
          value={formData.freeText}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">Dropdown with Search</label>
        <select
          id="dropdown"
          name="dropdown"
          value={formData.dropdown}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
          defaultValue=""
        >
          <option value="" disabled hidden>Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="na">N/A</option>
        </select>
      </div>
      <div>
        <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700"> Upload Image</label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
        {formData.imageUpload && formData.imageUpload.url && (
          <>
            <p className="mt-2 text-sm text-gray-500">{formData.imageUpload.name}</p>
            <img
              src={formData.imageUpload.url}
              alt="Uploaded"
              className="mt-2 max-w-full h-auto"
              style={{ maxHeight: '300px', maxWidth: '100%' }}
            />
          </>
        )}
      </div>
      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mt-4">Comments</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="toggle"
          name="toggle"
          checked={formData.toggle}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="toggle" className="ml-2 block text-sm text-gray-900">Toggle Button</label>
      </div>
    </form>
  );
};

export default QCForm;
