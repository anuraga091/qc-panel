import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  client: '',
  itemDescription: '',
  sku: '',
  poNumber: '',
  quantity: '',
  factory: '',
  inspectedBy: '',
  dateOfInspection: '',
  inspectionResult: '',
  product: '',
  img_url: '',
  steps: [
    {
      stepName: "",
      inspectionItems: [
        {
            id: 1,
            question: "Construction of the item was made according to 'Approved Sample'?",
            status: ""
        },
        {
            id: 2,
            question: "The materials of the item are all according to the client's approved specifications.",
            status: ""
        },
        {
            id: 3,
            question: "Colors/finish of the bulk production is as per the approved finish Swatch.",
            status: ""
        },
        {
            id: 4,
            question: "Aesthetic, distressing, and antiquing finished are as per the approved sample & finish swatch?",
            status: ''
        },
        {
            id: 5,
            question: "Color/finish of the production units are even and consistent.",
            status: ''
        },
        {
            id: 6,
            question: "Gloss/Sheen finished off the production units are per the approved finish swatch?",
            status: ''
        },
        {
            id: 7,
            question: "Have you gathered all the SKUs/styles of the collection and compared overall color and gloss finish; to ensure color and gloss are event and consistent?",
            status: ''
        },
        {
            id: 8,
            question: "The format and statement content of the Warning, Cautionary, and Regulatory labels are as per the client's approval?",
            status: ''
        },
        {
            id: 9,
            question: "Have you performed the moisture check on the wooden parts of the item?",
            status: ''
        }
      ],
      images: [
        
      ]
    },
    {
      stepName: "",
      inspectionItems: [
        {
          id: 1,
          question: "Colors/finish of the bulk production is as per the approved finish Swatch.",
          status: ""
        },
        {
          id: 2,
          question: "Aesthetic, distressing, and antiquing finished are as per the approved sample & finish swatch?",
          status: ""
        }
      ],
      images: [
        
      ]
    },
    {
      stepName: "",
      inspectionItems: [
        {
          id: 1,
          question: "Color/finish of the production units are even and consistent.",
          status: ""
        },
        {
          id: 2,
          question: "Gloss/Sheen finished off the production units are per the approved finish swatch?",
          status: ""
        },
        {
          id: 3,
          question: "Have you gathered all the SKUs/styles of the collection and compared overall color and gloss finish; to ensure color and gloss are event and consistent?",
          status: ""
        },
        {
          id: 4,
          question: "The format and statement content of the Warning, Cautionary, and Regulatory labels are as per the client's approval?",
          status: ""
        },
        {
          id: 5,
          question: "Have you performed the moisture check on the wooden parts of the item?",
          status: ""
        }
      ],
      images: [
        
      ]
    }
  ],
  currentStep: 0,
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
      if (step === 0) {
        Object.assign(state, data);
      } else {
        if (!state.steps[step - 1]) {
          state.steps[step - 1] = { stepName: '', inspectionItems: [], images: [] };
        }
        Object.assign(state.steps[step - 1], data);
      }
    },
    setFileMetadata(state, action) {
      const { step, fileMetadata } = action.payload;
      if (step === 0) {
        state.img_url = fileMetadata.url;
      } else {
        if (!state.steps[step - 1]) {
          state.steps[step - 1] = { stepName: '', inspectionItems: [], images: [] };
        }
        state.steps[step - 1].images.push(fileMetadata);
      }
    },
    resetFormData(state) {
      return initialState;
    },
  },
});

export const { setSteps, setCurrentStep, updateFormData, setFileMetadata, resetFormData } = qcSlice.actions;
export default qcSlice.reducer;
