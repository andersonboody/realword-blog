import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { postNewUsers, authUser, getProfileUpdateUser, fetchServices } from '../../services/services'

const initialState = {
  userName: null,
  email: null,
  image: null,
  auth: false,
  errorUser: null,
  resultUser: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = false
      state.userName = null
      state.email = null
      state.errorUser = null
      state.resultUser = null
    },
    onClearStateUser: (state) => {
      state.resultUser = null
      state.errorUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      // регистрация
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.userName = action.payload.user.username
        state.email = action.payload.user.email
        state.auth = true
        state.errorUser = null
        state.resultUser = 'registration'
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.userName = action.meta.arg.userName
        state.errorUser = action.error.message
      })
      // авторизация
      .addCase(authorizationUser.fulfilled, (state, action) => {
        state.userName = action.payload.user.username
        state.email = action.payload.user.email
        state.auth = true
        state.errorUser = null
        state.resultUser = 'login'
      })
      .addCase(authorizationUser.rejected, (state, action) => {
        state.errorUser = action.error.message
        state.auth = false
      })
      // обновление данных
      .addCase(updateDataUser.fulfilled, (state, action) => {
        state.userName = action.payload.user.username
        state.email = action.payload.user.email
        state.image = action.payload.user.image
        state.auth = true
        state.errorUser = null
        state.resultUser = 'update'
      })
      .addCase(updateDataUser.rejected, (state, action) => {
        state.errorUser = action.error.message
      })
  },
})

export const registrationUser = createAsyncThunk('registrationUser', async (data) => {
  return fetchServices(postNewUsers, data)
})

export const authorizationUser = createAsyncThunk('authorizationUser', async (data) => {
  return fetchServices(authUser, data)
})

export const updateDataUser = createAsyncThunk('updateDataUser', async (data) => {
  return fetchServices(getProfileUpdateUser, data)
})

export const { logout, onClearStateUser } = usersSlice.actions
export default usersSlice.reducer
