import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import opponentReducer from './opponentReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    opponent: opponentReducer,
  },
})
