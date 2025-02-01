import { createSlice } from '@reduxjs/toolkit'

export const blogToSlugSlice = createSlice({
  name: 'BlogToSlug',
  initialState: {
    blogDetail: null,
  },
  reducers: {
    setBlogDetail: (state, action) => {
      state.blogDetail = action.payload
    },
  },
})

export const { setBlogDetail } = blogToSlugSlice.actions
export default blogToSlugSlice.reducer
