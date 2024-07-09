import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steps: 3,
  currentStep: 0, 
  formData: {},
};

const qcSlice = createSlice({
  name: 'qc',
  initialState,
  reducers: {
    setSteps(state, action) {
      state.steps = action.payload;
    },
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    updateFormData(state, action) {
      const { step, data } = action.payload;
      state.formData[step] = data;
    },
    setFileMetadata(state, action) {
      const { step, fileMetadata } = action.payload;
      state.formData[step] = {
        ...state.formData[step],
        imageUpload: fileMetadata,
      };
    },
  },
});

export const { setSteps, setCurrentStep, updateFormData, setFileMetadata } = qcSlice.actions;
export default qcSlice.reducer;
