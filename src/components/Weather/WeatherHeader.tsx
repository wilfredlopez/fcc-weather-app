import React from "react"
import { Box, Text } from "@chakra-ui/core"
import { WEATHER_ICONS, WeatherIconType } from "./weatherIcons"
import "./weather.css"
interface Props {
  color: string
  weatherType?: WeatherIconType
  icon: {
    label: string
    icon: string
  }
}

const WeatherHeader = ({ weatherType, ...props }: Props) => {
  return (
    <Box
      //   bg="green.500"
      className={`color-${weatherType}`}
      //   background={WEATHER_ICONS[weatherType].color}
      //   rounded="5px"
      marginY={6}
    >
      <Text
        fontSize="2xl"
        textAlign="center"
        fontWeight="bold"
        letterSpacing={3}
      >
        It's
        {props.icon && props.icon.icon ? (
          <img
            src={props.icon.icon}
            alt={props.icon.label}
            className="weather-image"
          />
        ) : (
          <span aria-label={"Hot"}>{WEATHER_ICONS["hotDesert"].icon}</span>
        )}
        Right Now!
      </Text>
    </Box>
  )
}

export default WeatherHeader
