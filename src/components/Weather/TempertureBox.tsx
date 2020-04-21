import React from "react"
import {
  Grid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Select,
} from "@chakra-ui/core"

import { TempType } from "../WeatherStats"

interface Props {
  currentWeather: string
  message: string
  setType: (val: TempType) => void
  type: TempType
  imageSrc?: string
  location: {
    lng: number
    lat: number
  }
}

const TempertureBox = ({ currentWeather, setType, type, ...props }: Props) => {
  const times = props.imageSrc ? 3 : 2
  return (
    <Grid
      templateColumns={{
        md: `repeat(${times}, 1fr)`,
      }}
      gap={6}
    >
      <Box w="90%" m="auto" h="100%" bg="white.500" padding={2} border="1px">
        <Box margin="auto" textAlign="center">
          <Stat m="auto">
            <StatLabel>Weather</StatLabel>
            <StatNumber>{currentWeather}</StatNumber>
            <StatHelpText>{props.message}</StatHelpText>
          </Stat>
        </Box>
        <Box margin="auto" maxW={200}>
          <Select
            onChange={(e) => {
              setType(e.target.value as any)
            }}
            placeholder="Tempeture In"
            value={type}
            size="sm"
          >
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
          </Select>
        </Box>
      </Box>
      <Box
        w="90%"
        h="100%"
        bg="white.500"
        m="auto"
        padding={2}
        textAlign="center"
        border="1px"
      >
        <Stat m="auto">
          <StatLabel>Latitude</StatLabel>
          <StatNumber>{props.location.lat.toFixed(4)}</StatNumber>
        </Stat>
        <Stat m="auto">
          <StatLabel>Longitude</StatLabel>
          <StatNumber>{props.location.lng.toFixed(4)}</StatNumber>
        </Stat>
      </Box>
      {props.imageSrc && (
        <Box w="100%" h="10" bg="blue.500">
          <img src={props.imageSrc} alt="Map" />
        </Box>
      )}
    </Grid>
  )
}

export default TempertureBox
