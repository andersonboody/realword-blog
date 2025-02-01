import { useDispatch, useSelector } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { updatingMyBlog } from '../../store/slices/createNewBlogSlice'
import { InputShortDescription, InputTags, InputText, InputTitle } from '../ui/formValidatorNewArticle'
import { setBlogDetail } from '../../store/slices/BlogToSlugSlice'

const AppBlogEdit = () => {
  const dispatch = useDispatch()
  const { blogDetail } = useSelector((state) => state.blogToSlug)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: 'onBlur', defaultValues: { tags: [...blogDetail.tagList] } })

  const submitHandle = async (data) => {
    const blogData = { ...data, slug: blogDetail.slug }
    const result = await dispatch(updatingMyBlog(blogData))
    dispatch(setBlogDetail(result.payload.article))
    navigate(`/articles/${result.payload.article.slug}`)
  }
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  // решить с уведомлениями

  return (
    <article className="article article-new">
      <form className="form form-article" onSubmit={handleSubmit(submitHandle)}>
        <h3 className="form-title form-article__title">Edit article</h3>
        <InputTitle register={register} errors={errors} defaultValue={blogDetail.title} />
        <InputShortDescription register={register} errors={errors} defaultValue={blogDetail.description} />
        <InputText register={register} errors={errors} defaultValue={blogDetail.body} />
        <InputTags register={register} errors={errors} fields={fields} append={append} remove={remove} />
        <button className="form-button form-article__button">Send</button>
      </form>
    </article>
  )
}

export default AppBlogEdit
