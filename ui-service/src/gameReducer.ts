import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: null,
  },
  reducers: {
    setGame: (state, game: any) => {
      console.log("reduce-payload", game.payload);
      state.game = game.payload;
    },
  },
})

export const { setGame } = gameSlice.actions
export const selectGame = (state: any) => state.game;

export default gameSlice.reducer
