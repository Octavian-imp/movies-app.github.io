import { gray } from "@ant-design/colors"
import { Button, Flex, Image, Typography } from "antd"
import { format } from "date-fns"
import React, { CSSProperties, RefObject, useRef } from "react"

type Props = {
  title: string
  releaseDate: string
  genres: string[]
  description: string
  posterURL: string
}

const { Title, Paragraph } = Typography

const styles: Record<string, CSSProperties> = {
  body: {
    boxShadow: "0 4px 12px rgb(0 0 0 / 15%)",
    height: "auto",
    columnGap: "20px",
    width: "451px",
    maxHeight: "279px",
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

const MovieCard = ({
  description,
  genres,
  releaseDate,
  title,
  posterURL,
}: Props) => {
  return (
    <Flex style={styles.body}>
      <Image
        src={process.env.IMAGE_URL + posterURL}
        width={183}
        height={279}
        style={{ objectFit: "cover" }}
        wrapperStyle={{ flex: "none" }}
      />
      <Flex vertical style={{ padding: "10px 20px 10px 0" }}>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.releaseDate}>
          {format(
            Date.parse(releaseDate.length === 0 ? "0" : releaseDate),
            "MMMM dd, yyyy"
          )}
        </Paragraph>
        <Flex gap={"8px"}>
          {genres.map((genre, index) => (
            <Button key={index} style={styles.genre}>
              {genre}
            </Button>
          ))}
        </Flex>
        <Paragraph style={styles.description}>{description}</Paragraph>
      </Flex>
    </Flex>
  )
}

export default MovieCard
