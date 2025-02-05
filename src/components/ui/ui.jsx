import { Alert, Spin } from 'antd'

import './ui.scss'

const ArticleTags = ({ tags }) => {
  if (!tags || tags.length === 0) return <p className="article__details-tags-item details-tags-item">No tag</p>

  return tags.map((tag, index) => (
    <p key={index} className="article__details-tags-item details-tags-item">
      {tag ? tag : 'No tag'}
    </p>
  ))
}

const Error = ({ err }) => {
  return (
    <div className="alert">
      <Alert message={err.name} description={err.message} type="error" closable />
    </div>
  )
}

const Loading = () => {
  return (
    <div className="alert">
      <Spin tip="Loading...">
        <Alert message="Загрузка данных" description="Еще чуть-чуть и вы увидите статьи" type="info" />
      </Spin>
    </div>
  )
}
const LoadingHeart = () => {
  return <Spin size="small" />
}

export { ArticleTags, Error, Loading, LoadingHeart }
