import { Pagination } from "antd"
import React from "react"
import MovieContext from "../../../store/MovieProvider"

const UiPagination = ({
  currentPage,
  total,
}: {
  currentPage: number | undefined
  total: number | undefined
}) => {
  const { setCurrentPage } = React.useContext(MovieContext)

  return (
    <Pagination
      defaultCurrent={currentPage}
      total={total}
      style={{ alignSelf: "center" }}
      pageSize={20}
      showSizeChanger={false}
      onChange={(page) => setCurrentPage(page)}
    />
  )
}

export default UiPagination
