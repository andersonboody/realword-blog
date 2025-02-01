import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import '../../styles/AppBlog.scss'
import { ArticleTags } from '../ui/ui.jsx'
import { deletingMyBlog } from '../../store/slices/createNewBlogSlice.js'

const AppBlogDetails = () => {
  const { blogDetail } = useSelector((state) => state.blogToSlug)
  const { userName } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')

  const onDeleteBlog = (slug) => {
    dispatch(deletingMyBlog(slug))
    navigate('/')
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
    <article className="article">
      <div className="details">
        <div className="details-header">
          <h5 className="details-title">{blogDetail.title}</h5>
          <span className="details-like">
            <button className="details-like-btn"></button>
            {blogDetail.favoritesCount}
          </span>
        </div>
        <div className="details-tags">
          <ArticleTags tags={blogDetail.tagList} />
        </div>
        <div className="details-text details-text--grey">{blogDetail.description}</div>
        <div className="">{blogDetail.body}</div>
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
          <Link to={`/articles/${blogDetail.slug}/edit`} className="btn detail-button blog-button blog-button--edit">
            Edit
          </Link>
        </div>
      )}
    </article>
  )
}

export default AppBlogDetails
