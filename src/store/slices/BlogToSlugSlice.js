import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getBlogSlug } from '../../services/services'

export const blogToSlugSlice = createSlice({
  name: 'BlogToSlug',
  initialState: {
    blogDetail: null,
    loading: false,
    errorBlogSlug: null,
  },
  reducers: {
    setBlogDetail: (state, action) => {
      state.blogDetail = action.payload
    },
    resetBlogDetail: (state) => {
      state.errorBlogSlug = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogToSlug.pending, (state) => {
        state.loading = true
      })
      .addCase(getBlogToSlug.fulfilled, (state, action) => {
        state.loading = false
        state.errorBlogSlug = null
        state.blogDetail = action.payload.article
      })
      .addCase(getBlogToSlug.rejected, (state, action) => {
        state.loading = false
        state.errorBlogSlug = action.error.message
      })
  },
})

export const getBlogToSlug = createAsyncThunk('getBlogToSlug', async (slug) => {
  const response = await getBlogSlug(slug)
  return response
})

export const { setBlogDetail, resetBlogDetail } = blogToSlugSlice.actions
export default blogToSlugSlice.reducer
