import React, { useState } from 'react';
import QCProcess from './components/QCProcess';
import Login from './components/Login';
import QCConfig from './components/QCConfig';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep } from './redux/slices/qcSlice';


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const dispatch = useDispatch();

  const handleSetSteps = () => {
    setIsConfiguring(false);
    dispatch(setCurrentStep(1));  
  };

  return (
    <div className="container mx-auto">
      {isAuthenticated ? (
        isConfiguring ? (
          <QCConfig onSetSteps={handleSetSteps}/>
        ) : (
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
            <button
              onClick={() => setIsConfiguring(true)}
              className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Configure QC Steps
            </button>
            <QCProcess />
          </div>
        )
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
