import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { postNewArticle, putNewArticle, deleteMyArticle, fetchServices } from '../../services/services'

const createNewBlogSlice = createSlice({
  name: 'createNewBlog',
  initialState: {
    resultBlog: null,
    errorBlog: null,
  },
  reducers: {
    onClearState: (state) => {
      state.resultBlog = null
      state.errorBlog = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(creatingNewBlog.fulfilled, (state) => {
        state.resultBlog = 'create'
        state.errorBlog = null
      })
      .addCase(creatingNewBlog.rejected, (state, action) => {
        state.errorBlog = action.payload
      })

      .addCase(updatingMyBlog.fulfilled, (state) => {
        state.resultBlog = 'update'
        state.errorBlog = null
      })
      .addCase(updatingMyBlog.rejected, (state, action) => {
        state.errorBlog = action.payload
      })

      .addCase(deletingMyBlog.fulfilled, (state) => {
        state.resultBlog = 'delete'
        state.errorBlog = null
      })
      .addCase(deletingMyBlog.rejected, (state, action) => {
        state.errorBlog = action.payload
      })
  },
})

export const creatingNewBlog = createAsyncThunk('creatingNewBlog', async (data) => {
  return fetchServices(postNewArticle, data)
})

export const updatingMyBlog = createAsyncThunk('updatingMyBlog', async (data) => {
  return fetchServices(putNewArticle, data)
})

export const deletingMyBlog = createAsyncThunk('deletingMyBlog', async (data) => {
  return fetchServices(deleteMyArticle, data)
})

export const { onClearState } = createNewBlogSlice.actions
export default createNewBlogSlice.reducer
