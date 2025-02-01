import { Pagination } from 'antd'

const AppPagination = ({ onChangePage, countPage, page }) => {
  return (
    <Pagination
      className="pagination"
      onChange={onChangePage}
      current={page}
      total={countPage}
      pageSize={1}
      defaultCurrent={1}
      showSizeChanger={false}
    />
  )
}

export default AppPagination
