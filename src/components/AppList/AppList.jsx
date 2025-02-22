import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import '../../styles/AppBlog.scss'
import { ArticleTags, Error, Loading, LoadingHeart } from '../ui/ui'
import AppPagination from '../AppPagination/AppPagination'
import { visibleTitle } from '../../utils/utils'
import {
  fetchBlogs,
  setCurrentPage,
  fetchBlogsFavorite,
  fetchBlogsFavoriteDelete,
} from '../../store/slices/createBlogSlice'
import { getBlogToSlug } from '../../store/slices/BlogToSlugSlice'

const AppList = () => {
  const [loadingHeart, setLoadingHeart] = useState(false)
  const dispatch = useDispatch()
  const { blogs, loading, error, countPage, currentPage } = useSelector((state) => state.createBlogs)
  const { auth } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  const onChangePage = (page) => {
    dispatch(fetchBlogs(page))
    dispatch(setCurrentPage(page))
  }
  const onClickBlogElement = (element) => {
    dispatch(getBlogToSlug(element))
  }
  const onClickFavorite = async (slug) => {
    await dispatch(fetchBlogsFavorite(slug))
  }
  const onClickFavoriteDelete = async (slug) => {
    dispatch(fetchBlogsFavoriteDelete(slug))
  }

  const blog = blogs.map((elem) => {
    return (
      <article className="article" key={elem.slug}>
        <div className="details">
          <div className="details-header">
            <Link to={`/articles/${elem.slug}`}>
              <h5 className="details-title" onClick={() => onClickBlogElement(elem.slug)}>
                {visibleTitle(elem.title)}
              </h5>
            </Link>
            {loadingHeart && <LoadingHeart />}
            {elem.favorited ? (
              <span className="details-like">
                <button
                  className="details-like-btn details-like-btn--active"
                  onClick={() => onClickFavoriteDelete(elem.slug)}
                  disabled={!auth}
                ></button>
                {elem.favoritesCount}
              </span>
            ) : (
              <span className="details-like">
                <button
                  className="details-like-btn"
                  onClick={() => onClickFavorite(elem.slug)}
                  disabled={!auth}
                ></button>
                {elem.favoritesCount}
              </span>
            )}
          </div>
          <div className="details-tags">
            <ArticleTags tags={elem.tagList} />
          </div>
          <div className="details-text">{elem.description}</div>
        </div>
        <div className="card">
          <div>
            <h6 className="card-name">{elem.author.username}</h6>
            <p className="card-date">{format(elem.createdAt, 'MMM dd, yyyy')}</p>
          </div>
          <img src={elem.author.image} alt="Photo" className="card-avatar" />
        </div>
      </article>
    )
  })

  return (
    <>
      {loading && <Loading />}
      {blog.length > 0 && (
        <>
          {blog}
          <AppPagination onChangePage={onChangePage} countPage={countPage} page={currentPage} />
        </>
      )}
      {error && <Error err={error} />}
    </>
  )
}

export default AppList
