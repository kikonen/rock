import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import opponentReducer from './opponentReducer'
import gameReducer from './gameReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    opponent: opponentReducer,
    game: gameReducer,
  },
})
