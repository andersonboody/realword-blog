import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Markdown from 'react-markdown'

import { fetchBlogsFavorite, fetchBlogsFavoriteDelete } from '../../store/slices/createBlogSlice'
import '../../styles/AppBlog.scss'
import { ArticleTags, Loading } from '../ui/ui.jsx'
import { deletingMyBlog } from '../../store/slices/createNewBlogSlice.js'
import { getBlogToSlug, setBlogDetail } from '../../store/slices/BlogToSlugSlice.js'

const AppBlogDetails = () => {
  const { slug } = useParams()
  const { blogDetail, loading } = useSelector((state) => state.blogToSlug)
  const { userName } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')

  useEffect(() => {
    dispatch(getBlogToSlug(slug))
  }, [slug, dispatch])

  const onDeleteBlog = (slug) => {
    dispatch(deletingMyBlog(slug))
    navigate('/')
  }

  const onClickFavorite = async (slug) => {
    const response = await dispatch(fetchBlogsFavorite(slug))
    dispatch(setBlogDetail(response.payload.article))
  }
  const onClickFavoriteDelete = async (slug) => {
    const response = await dispatch(fetchBlogsFavoriteDelete(slug))
    dispatch(setBlogDetail(response.payload.article))
  }

  const { confirm } = Modal
  const showConfirm = () => {
    confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onDeleteBlog(blogDetail.slug)
      },
    })
  }

  return (
    <>
      {loading && <Loading />}
      {blogDetail && (
        <article className="article">
          <div className="details">
            <div className="details-header">
              <h5 className="details-title">{blogDetail.title}</h5>
              {blogDetail.favorited ? (
                <span className="details-like">
                  <button
                    className="details-like-btn details-like-btn--active"
                    onClick={() => onClickFavoriteDelete(blogDetail.slug)}
                  ></button>
                  {blogDetail.favoritesCount}
                </span>
              ) : (
                <span className="details-like">
                  <button className="details-like-btn" onClick={() => onClickFavorite(blogDetail.slug)}></button>
                  {blogDetail.favoritesCount}
                </span>
              )}
            </div>
            <div className="details-tags">
              <ArticleTags tags={blogDetail.tagList} />
            </div>
            <div className="details-text details-text--grey">{blogDetail.description}</div>
            <Markdown>{blogDetail.body}</Markdown>
          </div>
          <div className="card">
            <div>
              <h6 className="card-name">{blogDetail.author.username}</h6>
              <p className="card-date">{format(blogDetail.createdAt, 'MMM dd, yyyy')}</p>
            </div>
            <img src={blogDetail.author.image} alt="Photo" className="card-avatar" />
          </div>
          {blogDetail.author.username === userName && (
            <div className="details__group-button">
              <button className="btn detail-button blog-button blog-button--delete" onClick={showConfirm}>
                Delete
              </button>
              <Link
                to={`/articles/${blogDetail.slug}/edit`}
                className="btn detail-button blog-button blog-button--edit"
              >
                Edit
              </Link>
            </div>
          )}
        </article>
      )}
    </>
  )
}

export default AppBlogDetails
