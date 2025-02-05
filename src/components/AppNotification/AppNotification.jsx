import { notification } from 'antd'
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { onClearState } from '../../store/slices/createNewBlogSlice'
import { onClearStateUser } from '../../store/slices/usersSlice'
import { resetBlogDetail } from '../../store/slices/BlogToSlugSlice'
import { resetError } from '../../store/slices/createBlogSlice'

const AppNotification = () => {
  const { errorUser, resultUser } = useSelector((state) => state.users)
  const { resultBlog, errorBlog } = useSelector((state) => state.createNewBlog)
  const { errorBlogSlug } = useSelector((state) => state.blogToSlug)
  const { error } = useSelector((state) => state.createBlogs)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')

  const showNotification = useCallback((type, message) => {
    notification[type]({ message, duration: 4 })
  }, [])

  const notificationUser = useCallback(() => {
    let message
    if (resultUser === 'registration') {
      message = 'Successfully registered!'
    } else if (resultUser === 'login') {
      message = 'You have successfully logged into the website!'
    } else if (resultUser === 'update') {
      message = 'The data has been saved!'
    }
    dispatch(onClearStateUser())
    showNotification('success', message)
    navigate('/')
  }, [resultUser, dispatch, showNotification, navigate])

  const notificationArticle = useCallback(() => {
    let message
    if (resultBlog === 'create') {
      message = 'The article was created successfully!'
    } else if (resultBlog === 'update') {
      message = 'The article was edited successfully!'
    } else if (resultBlog === 'delete') {
      message = 'The article was successfully deleted!'
    }
    dispatch(onClearState())
    showNotification('success', message)
  }, [resultBlog, dispatch, showNotification])

  useEffect(() => {
    if (resultBlog) {
      notificationArticle()
    }
    if (resultUser) {
      notificationUser()
    }
    if (errorBlogSlug) {
      showNotification(
        'error',
        'Most likely, there is no article with this address. Check that the address is correct!'
      )
      dispatch(resetBlogDetail())
      navigate('/')
    }
    if (errorUser) {
      showNotification('error', errorUser)
      dispatch(onClearStateUser())
    }
    if (errorBlog) {
      showNotification('error', errorBlog)
      dispatch(onClearState())
    }
    if (error) {
      showNotification('error', error)
      dispatch(resetError())
    }
  }, [
    errorUser,
    resultBlog,
    resultUser,
    errorBlog,
    notificationArticle,
    notificationUser,
    showNotification,
    dispatch,
    errorBlogSlug,
    navigate,
    error,
  ])

  return null
}

export { AppNotification }
