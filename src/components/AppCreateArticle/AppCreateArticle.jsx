import { useDispatch, useSelector } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import './AppCreateArticle.scss'
import { creatingNewBlog } from '../../store/slices/createNewBlogSlice'
import { setBlogDetail } from '../../store/slices/BlogToSlugSlice'
import { InputShortDescription, InputTags, InputText, InputTitle } from '../ui/formValidatorNewArticle'

const AppCreateArticle = () => {
  const { auth } = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: 'onBlur', defaultValues: { tags: [''] } })

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  const submitHandle = async (data) => {
    try {
      const result = await dispatch(creatingNewBlog(data))
      const newArticle = result.payload
      dispatch(setBlogDetail(newArticle.article))
      navigate(`/articles/`)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if (!auth) {
      navigate('/sign-in')
    }
  }, [auth, navigate])
  return (
    <article className="article article-new">
      <form className="form form-article" onSubmit={handleSubmit(submitHandle)}>
        <h3 className="form-title form-article__title">Create new article</h3>
        <InputTitle register={register} errors={errors} />
        <InputShortDescription register={register} errors={errors} />
        <InputText register={register} errors={errors} />
        <InputTags register={register} errors={errors} fields={fields} append={append} remove={remove} />
        <button className="form-button form-article__button">Send</button>
      </form>
    </article>
  )
}

export default AppCreateArticle
