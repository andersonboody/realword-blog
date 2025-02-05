import axios from 'axios'

const getOptionApiKey = () => {
  const apiKey = localStorage.getItem('Token')
  return {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  }
}

const getBlog = async (page = 0) => {
  const limit = 10
  const offset = (page - 1) * 10
  const rest = await axios.get(`https://blog-platform.kata.academy/api/articles`, {
    params: { limit: limit, offset: offset },
  })
  return rest.data
}

const getBlogSlug = async (slug) => {
  const rest = await axios.get(`https://blog-platform.kata.academy/api/articles/${slug}`)
  return rest.data
}

const authUser = async (data) => {
  const userData = {
    email: data.email,
    password: data.passwordNoValidation,
  }
  const response = await axios.post(
    'https://blog-platform.kata.academy/api/users/login',
    { user: userData },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  localStorage.setItem('Token', response.data.user.token)
  return response
}

const postNewUsers = async (data) => {
  const userData = {
    username: data.userName,
    email: data.email,
    password: data.password,
  }

  const response = await axios.post(
    'https://blog-platform.kata.academy/api/users',
    { user: userData },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  localStorage.setItem('Token', response.data.user.token)
  return response
}

const getProfileUpdateUser = async (data) => {
  const userData = {
    username: data.userName,
    email: data.email,
    password: data.password,
    image: data.imageUser,
  }
  if (userData.password.length === 0) {
    delete userData.password
  }
  const response = await axios.put('https://blog-platform.kata.academy/api/user', { user: userData }, getOptionApiKey())
  return response
}

const postNewArticle = async (data) => {
  const articleData = {
    title: data.title,
    description: data.shortDescription,
    body: data.text,
    tagList: data.tags,
  }
  const response = await axios.post(
    'https://blog-platform.kata.academy/api/articles',
    { article: articleData },
    getOptionApiKey()
  )
  return response
}

const putNewArticle = async (data) => {
  const articleData = {
    title: data.title,
    description: data.shortDescription,
    body: data.text,
    tagList: data.tags,
  }
  const response = await axios.put(
    `https://blog-platform.kata.academy/api/articles/${data.slug}`,
    { article: articleData },
    getOptionApiKey()
  )
  return response
}

const deleteMyArticle = async (slug) => {
  const response = await axios.delete(`https://blog-platform.kata.academy/api/articles/${slug}`, getOptionApiKey())
  return response
}

const postFavoriteArticle = async (slug) => {
  const response = await axios.post(
    `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
    {},
    getOptionApiKey()
  )
  return response.data
}

const deleteFavoriteArticle = async (slug) => {
  const response = await axios.delete(
    `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
    getOptionApiKey()
  )
  return response.data
}

const fetchServices = async (fn, data) => {
  try {
    const response = await fn(data)
    return response.data
  } catch (err) {
    const errors = JSON.parse(err.request.response)
    throw `${Object.keys(errors.errors)} ${Object.values(errors.errors)}`
  }
}

export {
  getBlog,
  getBlogSlug,
  authUser,
  postNewUsers,
  getProfileUpdateUser,
  postNewArticle,
  putNewArticle,
  deleteMyArticle,
  fetchServices,
  postFavoriteArticle,
  deleteFavoriteArticle,
}
