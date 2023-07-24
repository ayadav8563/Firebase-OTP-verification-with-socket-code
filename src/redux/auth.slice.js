import {
    createEntityAdapter,
    createAsyncThunk,
    createSlice,
  } from '@reduxjs/toolkit';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const AUTH_FEATURE_KEY = 'auth';
  const authAdapter = createEntityAdapter();
  
  export const initialAuthState = authAdapter.getInitialState({
    hasSeenOnboarding: false,
    email: '',
    password: '',
    registerLoadingStatus: false,
    isMailPasswordVerified: false,
    imageData: null,
    imageLoading: false,
  });
  
  export const userRegisterAction = createAsyncThunk(
    'auth/registerAction',
    async (params, thunkAPI) => {
      try {
        const result = params;
        return result;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
      }
    },
  );

  export const loginAction = createAsyncThunk(
    'auth/loginAction',
    async (params, thunkAPI) => {
      try {
        const result = params;
        return result;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
      }
    },
  );

  export const getImageAction = createAsyncThunk(
    'auth/getImageAction',
    async (_, thunkAPI) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
        const data = await response.json();
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  )
  
  /**
   * Slice for all reducres
   */
  export const authSlice = createSlice({
    name: AUTH_FEATURE_KEY,
    initialState: initialAuthState,
    reducers: {
      setOnboardingCompleted: state => {
        state.hasSeenOnboarding = true;
      },
      updateRegisterLoadingStatus: state => {
        state.registerLoadingStatus= false;
      }
    },
    extraReducers: builder => {
      builder
        .addCase(userRegisterAction.pending, state => {
          state.registerLoadingStatus = 'loading';
        })
        .addCase(userRegisterAction.fulfilled, (state, action) => {
          state.email = action.payload.email;
          state.password = action.payload.password;
          state.registerLoadingStatus = 'loaded';
        })
        .addCase(userRegisterAction.rejected, (state, action) => {
          state.registerLoadingStatus = 'error';
        })
        .addCase(loginAction.pending, state => {
          state.registerLoadingStatus = 'loading';
        })
        .addCase(loginAction.fulfilled, (state, action) => {
          if(state.email === action.payload.email && state.password == action.payload.password){
            state.isMailPasswordVerified = true;
            state.registerLoadingStatus = 'loaded';
          } else {
            alert('Credentials are not matched.')
            state.registerLoadingStatus = 'error';
          }
        })
        .addCase(loginAction.rejected, (state, action) => {
          state.registerLoadingStatus = 'error';
        })
        .addCase(getImageAction.pending, state => {
          state.imageLoading = 'loading';
        })
        .addCase(getImageAction.fulfilled, (state, action) => {
          state.imageData = action.payload;
          state.imageLoading = 'loaded';
        })
        .addCase(getImageAction.rejected, (state, action) => {
          state.imageLoading = 'error';
        });
    },
  });
  
  /*
   * Export reducer for store configuration.
   */
  export const authReducer = authSlice.reducer;
  export const authActions = authSlice.actions;