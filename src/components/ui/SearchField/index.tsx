import { Input } from "antd"
import { debounce } from "lodash"
import React, { useContext, useEffect, useState } from "react"
import MovieContext from "../../../store/MovieProvider"

const SearchField = () => {
  const [value, setValue] = useState("")
  const { setQuery } = useContext(MovieContext)

  useEffect(() => {
    setQuery(value)
  }, [value])

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  const debouncedChange = debounce(onChange, 1000)

  return (
    <Input
      placeholder="Type to search ..."
      onChange={debouncedChange}
      style={{ height: "fit-content" }}
    />
  )
}

export default SearchField
