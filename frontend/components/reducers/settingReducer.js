import { createSlice } from '@reduxjs/toolkit';
import { loadRecordsFromLocalStorage, saveRecordsToLocalStorage } from '../helper/localStorageHelpers';


export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    loading: false,
    alert: [],
    selected: null,
    isLogin: false,
    isChatbotOpen: false,
    userInputLatest: '',
    fromForum: '',
    username: '',
    records: loadRecordsFromLocalStorage(), 
    uploadedfile: null,
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setSelected: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    setIsLogin: (state, action) => ({
      ...state,
      isLogin: action.payload,
    }),
    setIsChatbotOpen: (state, action) => ({
      ...state,
      isChatbotOpen: action.payload,
    }),
    setUserInputLatest: (state, action) => ({
      ...state,
      userInputLatest: action.payload,
    }),
    setFromForum: (state, action) => ({
      ...state,
      fromForum: action.payload,
    }),
    setAlert: (state, action) => ({
      ...state,
      alert: action.payload,
    }),
    setUsername: (state, action) => ({
      ...state,
      username: action.payload,
    }),
    setInitialRecords: (state, action) => ({  
      ...state,
      initialRecords: action.payload,
    }),
    addRecord: (state, action) => {
      const newRecord = action.payload
      state.records.push(newRecord); // Now this should work
      saveRecordsToLocalStorage(state.records); // Sync with localStorage
    },
    deleteRecord: (state, action) => {
      state.records = state.records.filter((record) => record.id !== action.payload);
      saveRecordsToLocalStorage(state.records); // Sync with localStorage
    },
    setUploadedFile: (state, action) => ({
      ...state,
      uploadedfile: action.payload,
    }),

  },
});

// Action creators are generated for each case reducer function
const { reducer: setting, actions } = settingSlice;
export const { setLoading,setSelected, setIsChatbotOpen, setSelectedConfig } = settingSlice.actions;
export const SettingActions = actions;
export default setting;
