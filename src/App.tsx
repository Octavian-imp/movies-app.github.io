import { ConfigProvider, Layout } from "antd"

import React from "react"
import MovieCard from "./components/movieCard"

const { Content } = Layout

const App = () => (
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
      <Content className="text-center">
        <MovieCard />
      </Content>
    </Layout>
  </ConfigProvider>
)

export default App
