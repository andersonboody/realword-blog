import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getBlog, postFavoriteArticle, deleteFavoriteArticle } from '../../services/services'

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  countPage: 1,
  currentPage: 1,
}

export const createBlogSlice = createSlice({
  name: 'createBlog',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false
        state.blogs = action.payload.articles
        state.countPage = Math.floor(action.payload.articlesCount / 10)
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(fetchBlogsFavorite.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBlogsFavorite.fulfilled, (state, action) => {
        state.loading = false
        const updatedArticle = action.payload.article
        state.blogs = state.blogs.map((elem) => {
          if (elem.slug === updatedArticle.slug) return updatedArticle
          return elem
        })
      })
      .addCase(fetchBlogsFavorite.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(fetchBlogsFavoriteDelete.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBlogsFavoriteDelete.fulfilled, (state, action) => {
        state.loading = false
        const updatedArticle = action.payload.article
        state.blogs = state.blogs.map((elem) => {
          if (elem.slug === updatedArticle.slug) return updatedArticle
          return elem
        })
      })
      .addCase(fetchBlogsFavoriteDelete.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  },
})

export const fetchBlogs = createAsyncThunk('fetchBlogs', async (page = 1) => {
  const response = await getBlog(page)
  return response
})

export const fetchBlogsFavorite = createAsyncThunk('fetchBlogsFavorite', async (slug) => {
  const response = await postFavoriteArticle(slug)
  return response
})

export const fetchBlogsFavoriteDelete = createAsyncThunk('fetchBlogsFavoriteDelete', async (slug) => {
  const response = await deleteFavoriteArticle(slug)
  return response
})

export default createBlogSlice.reducer
export const { setCurrentPage } = createBlogSlice.actions
