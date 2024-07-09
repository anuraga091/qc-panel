import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSteps } from '../redux/slices/qcSlice';

const QCConfig = ({ onSetSteps }) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.qc.steps);
  const [newSteps, setNewSteps] = useState(steps);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSteps(newSteps));
    onSetSteps();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Configure QC Steps</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700">Number of Steps</label>
          <input
            type="number"
            id="steps"
            name="steps"
            value={newSteps}
            onChange={(e) => setNewSteps(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium
            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Set Steps
        </button>
      </form>
    </div>
  );
};

export default QCConfig;