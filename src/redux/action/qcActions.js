import { setFileMetadata, updateFormData } from '../slices/qcSlice';

export const uploadFile = (step, file) => async (dispatch, getState) => {
  try {
    const fileMetadata = {
      name: file.name,
      url: URL.createObjectURL(file),
    };

    const state = getState();
    //const currentImages = state.qc.steps[step - 1]?.images || [];

    const updatedImages = fileMetadata;
    console.log(updatedImages, step)
    dispatch(setFileMetadata({ step, data: { images: updatedImages } }));
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
