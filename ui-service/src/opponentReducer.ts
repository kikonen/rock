import { createSlice } from '@reduxjs/toolkit'

export const opponentSlice = createSlice({
  name: 'opponent',
  initialState: {
    opponent: null,
  },
  reducers: {
    setOpponent: (state, opponent: any) => {
      state.opponent = opponent.payload;
    },
  },
})

export const { setOpponent } = opponentSlice.actions

export default opponentSlice.reducer
