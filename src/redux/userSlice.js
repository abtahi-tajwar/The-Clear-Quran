import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
      init: (state, action) => action.payload,
      update: (state, action) => {
        const resultState = { 
          ...state,
          userName: action.payload.name,
          emailId: action.payload.email,
          aboutUs: action.payload.about,
          address: action.payload.address,
          city: action.payload.city,
          country: action.payload.country,
          zipcode: action.payload.zipcode
        }
        localStorage.setItem("user", JSON.stringify(resultState))
        return resultState
      },
      makeUserPaid: (state, action) => ({ ...state, isPaid: true })
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { init, update, makeUserPaid } = userSlice.actions
  
  export default userSlice.reducer