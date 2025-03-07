import { Flex, Image, Layout, Space, Typography } from "antd"

import React from "react"

const { Content } = Layout
const { Title, Paragraph } = Typography

const App = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Content className="text-center">
      <Space className="max-w-md">
        <Image
          src="./assets/films/2025-01-30-mountains-1-65455.jpg"
          width={183}
          height={281}
          style={{ objectFit: "cover" }}
        />
        <Flex vertical>
          <Typography>
            <Title
              style={{ fontSize: "20px", fontWeight: "400" }}
              align="start"
            >
              Header
            </Title>
            <Paragraph align="start">
              A former basketball all-star, who has lost his wife and family
              foundation in a struggle with addiction attempts to regain his
              soul and salvation by becoming the coach of a disparate ethnically
              mixed high ...
            </Paragraph>
          </Typography>
        </Flex>
      </Space>
    </Content>
  </Layout>
)

export default App
