import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, user: any) => {
      state.user = user.payload;
    },
  },
})

export const { setUser } = userSlice.actions
export const selectUser = (state: any) => state.user;

export default userSlice.reducer
