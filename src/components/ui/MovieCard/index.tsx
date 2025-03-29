import { gray } from "@ant-design/colors"
import { Button, Flex, Image, Rate, Typography } from "antd"
import { format } from "date-fns"
import React, {
  CSSProperties,
  useContext,
  useEffect,
  useRef
} from "react"
import MovieApi from "../../../services/MovieApi"
import MovieContext from "../../../store/MovieProvider"

type Props = {
  title: string
  releaseDate: string
  genreIds: number[]
  description: string
  posterURL: string
  ratingAverage: number
  id: number
}

const { Title, Paragraph } = Typography

const styles: Record<string, CSSProperties> = {
  body: {
    boxShadow: "0 4px 12px rgb(0 0 0 / 15%)",
    height: "auto",
    columnGap: "20px",
    width: "451px",
    maxHeight: "279px",
    overflow: "hidden",
  },
  title: {
    fontSize: "20px",
    fontWeight: "400",
    textAlign: "start",
    lineHeight: "28px",
    verticalAlign: "middle",
  },
  ratingWrapper: {
    borderRadius: "50%",
    padding: "5px",
    height: "fit-content",
    width: "fit-content",
    fontSize: "12px",
  },
  releaseDate: { fontSize: "14px", textAlign: "start", color: gray[3] },
  genre: {
    padding: "2px 4px 3px 5px",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "100%",
    color: gray[3],
  },
  description: { fontSize: "14px", textAlign: "start", wordBreak: "break-all" },
}

function truncateText(elementRef: HTMLElement) {
  // получаем высоту дочерних элементов контейнера карточки

  function getTotalHeight(el: HTMLElement) {
    let acc = 0

    //@ts-ignore
    for (const child of el.parentNode.childNodes) {
      //@ts-ignore
      acc +=
        //@ts-ignore
        child.clientHeight +
        //@ts-ignore
        parseInt(getComputedStyle(child).marginBottom) +
        //@ts-ignore
        parseInt(getComputedStyle(child).marginTop) +
        //@ts-ignore
        parseInt(getComputedStyle(child).paddingTop) +
        //@ts-ignore
        parseInt(getComputedStyle(child).paddingBottom)
    }

    return acc
  }
  const totalHeight = getTotalHeight(elementRef)
  const lineHeightStr = getComputedStyle(elementRef).lineHeight
  const lineHeight = parseInt(
    lineHeightStr.substring(0, lineHeightStr.length - 2)
  )

  const parentEl = elementRef.parentElement

  //сумма отступов родителя
  const clientMargin =
    parseFloat(getComputedStyle(parentEl!).paddingTop) +
    parseFloat(getComputedStyle(parentEl!).paddingBottom) +
    parseFloat(getComputedStyle(parentEl!).marginTop) +
    parseFloat(getComputedStyle(parentEl!).marginBottom)

  const parentClientHeight = parentEl!.clientHeight - clientMargin
  const freeHeight = parentClientHeight - totalHeight
  const symbolsPerLine = 29
  const freeLines = Math.floor(freeHeight / lineHeight)
  const totalLines = Math.floor(elementRef.clientHeight / lineHeight)
  const deletedLines = totalLines - Math.abs(freeLines)


  if (freeLines <= 0) {
    const truncatedText = elementRef.textContent?.substring(
      0,
      deletedLines * symbolsPerLine
    )
    const lastSpaceIndex = truncatedText?.lastIndexOf(" ")
    if (typeof lastSpaceIndex !== "undefined") {
      elementRef.textContent = truncatedText?.substring(0, lastSpaceIndex+1) + "..."
    }
  }
}

const MovieCard = ({
  description,
  genreIds,
  releaseDate,
  title,
  posterURL,
  ratingAverage,
  id,
}: Props) => {
  const descriptionRef = useRef(null)

  useEffect(() => {
    if (descriptionRef.current !== null) {
      truncateText(descriptionRef.current)
    }
  }, [])

  const ratingColor =
    ratingAverage >= 7
      ? "#66E900"
      : ratingAverage >= 5
      ? "#E9D100"
      : ratingAverage >= 3
      ? "#E97E00"
      : "#E90000"

  const {
    genres: genresList,
    movieRatedIds,
    setMovieRatedIds,
  } = useContext(MovieContext)

  const genreNames = genreIds.map((id) =>
    genresList.find((genre) => genre.id === id)
  )

  function onChangeRating(newRating: number) {
    MovieApi.addRating(id, newRating)
    setMovieRatedIds((prev) => {
      const indexMovies = prev.findIndex((item) => item.id === id)

      if (indexMovies !== -1) {
        prev[indexMovies].rating = newRating
        return prev
      }
      return [...prev, { id, rating: newRating }]
    })
  }

  return (
    <Flex style={styles.body}>
      <Image
        src={MovieApi.imgUrl + posterURL}
        width={183}
        height={279}
        style={{ objectFit: "cover" }}
        wrapperStyle={{ flex: "none" }}
        fallback="data:image/png;base64,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"
      />
      <Flex vertical style={{ padding: "10px 10px 10px 0", width: "100%" }}>
        <Flex style={{ justifyContent: "space-between" }}>
          <Title style={styles.title}>{title}</Title>
          <div
            style={{
              ...styles.ratingWrapper,
              border: `2px solid ${ratingColor}`,
            }}
          >
            <span>{ratingAverage.toFixed(1)}</span>
          </div>
        </Flex>
        <Paragraph style={styles.releaseDate}>
          {format(
            Date.parse(releaseDate.length === 0 ? "0" : releaseDate),
            "MMMM dd, yyyy"
          )}
        </Paragraph>
        <Flex gap={"8px"} wrap>
          {genreNames.map((genre) => (
            <Button key={genre?.id} style={styles.genre}>
              {genre?.name}
            </Button>
          ))}
        </Flex>
        <Paragraph ref={descriptionRef} style={styles.description}>
          {description}
        </Paragraph>
        <Rate
          allowHalf
          style={{ alignSelf: "baseline" }}
          defaultValue={
            movieRatedIds.find((movie) => movie.id === id)?.rating ?? 0
          }
          count={10}
          onChange={onChangeRating}
        />
      </Flex>
    </Flex>
  )
}

export default MovieCard
