import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  userName: string | null;
  userPhoto: string | null;
  userEmail: string | null;
}

const initialState: UserState = {
  userName: null,
  userPhoto: null,
  userEmail: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        userName: string;
        userPhoto: string;
        userEmail: string;
      }>,
    ) => {
      state.userName = action.payload.userName;
      state.userPhoto = action.payload.userPhoto;
      state.userEmail = action.payload.userEmail;
    },
    resetUser: state => {
      state.userName = null;
      state.userPhoto = null;
      state.userEmail = null;
    },
  },
});

export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;
