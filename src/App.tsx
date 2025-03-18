import { ConfigProvider, Layout } from "antd"

import React from "react"
const MoviesList = React.lazy(() => import("./components/MoviesList"))

const { Content } = Layout

const App = () => {
  return (
    <ConfigProvider theme={{ hashed: false }}>
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "#fff",
          width: "fit-content",
          margin: "0 auto",
          padding: "31px 20px",
        }}
      >
        <Content
          className="text-center"
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            maxWidth: "1010px",
          }}
        >
          <MoviesList />
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
