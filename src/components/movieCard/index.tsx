import { gray } from "@ant-design/colors"
import { Button, Flex, Image, Typography } from "antd"
import { format } from "date-fns"
import React, { CSSProperties } from "react"

type Props = {}

const { Title, Paragraph } = Typography

const styles: Record<string, CSSProperties> = {
  body: {
    boxShadow: "0 4px 12px rgb(0 0 0 / 15%)",
    height: "fit-content",
    columnGap: "20px",
    width: "451px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "400",
    textAlign: "start",
    lineHeight: "28px",
    verticalAlign: "middle",
  },
  releaseDate: { fontSize: "14px", textAlign: "start", color: gray[3] },
  genre: {
    padding: "2px 4px 3px 5px",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "100%",
    color: gray[3],
  },
  description: { fontSize: "14px", textAlign: "start" },
}

const MovieCard = (props: Props) => {
  return (
    <Flex style={styles.body}>
      <Image
        src="./assets/films/2025-01-30-mountains-1-65455.jpg"
        width={183}
        height={281}
        style={{ objectFit: "cover" }}
        wrapperStyle={{ flex: "none" }}
      />
      <Flex vertical style={{ padding: "10px 20px 10px 0" }}>
        <Typography>
          <Title style={styles.title}>Header</Title>
          <Paragraph style={styles.releaseDate}>
            {format(new Date(), "MMMM dd, yyyy")}
          </Paragraph>
          <Flex gap={"8px"}>
            <Button style={styles.genre}>Action</Button>
            <Button style={styles.genre}>Action</Button>
          </Flex>
          <Paragraph style={styles.description}>
            A former basketball all-star, who has lost his wife and family
            foundation in a struggle with addiction attempts to regain his soul
            and salvation by becoming the coach of a disparate ethnically mixed
            high ...
          </Paragraph>
        </Typography>
      </Flex>
    </Flex>
  )
}

export default MovieCard
