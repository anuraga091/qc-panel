import { setFileMetadata } from '../slices/qcSlice';

export const uploadFile = (step, file) => async (dispatch) => {
  try {
    const fileMetadata = {
      name: file.name,
      url: URL.createObjectURL(file),
    };
    dispatch(setFileMetadata({ step, fileMetadata }));
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
