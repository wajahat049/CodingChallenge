import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ButtonState {
  button1: boolean;
  button2: boolean;
  button3: boolean;
}

const initialState: ButtonState = {
  button1: false,
  button2: false,
  button3: false,
};

const buttonSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    toggleButton(state, action: PayloadAction<number>) {
      switch (action.payload) {
        case 1:
          state.button1 = !state.button1;
          break;
        case 2:
          state.button2 = !state.button2;
          break;
        case 3:
          state.button3 = !state.button3;
          break;
      }
    },
  },
});

export const {toggleButton} = buttonSlice.actions;
export default buttonSlice.reducer;
