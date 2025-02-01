import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createBlogSlice from './slices/createBlogSlice'
import blogToSlugSlice from './slices/BlogToSlugSlice'
import usersSlice from './slices/usersSlice'
import createNewBlogSlice from './slices/createNewBlogSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users', 'blogToSlug'],
}

const rootReducer = combineReducers({
  createBlogs: createBlogSlice,
  blogToSlug: blogToSlugSlice,
  users: usersSlice,
  createNewBlog: createNewBlogSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persister = persistStore(store)
export { store, persister }
