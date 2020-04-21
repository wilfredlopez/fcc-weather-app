import { Grid, Box, Text, Spinner } from "@chakra-ui/core"
import React, { useState } from "react"
import { getWeatherData } from "./Weather/getWeatherData"
import TempertureBox from "./Weather/TempertureBox"
import WeatherHeader from "./Weather/WeatherHeader"
import { WEATHER_ICONS } from "./Weather/weatherIcons"
import fetchWeatherFromFCC, {
  FCCTemperture,
} from "./Weather/fetchWeatherFromFcc"
// import { GOOGLE_MAP_API_KEY } from "../config"

interface Props {}

// function getMapImageString(lat: number, lng: number, zoom: number) {
//   return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
//     &markers=color:red%7Clabel:Place%7C${lat},${lng}
//     &key=${GOOGLE_MAP_API_KEY}`
// }

// function getWeatherText(type: WeatherIconType) {
//   switch (type) {
//     case "hotDesert":
//       return "Its Hot Right Now"
//     case "mountain":
//       return "Nice Weather!"
//     case "rainy":
//       return "Rain rain and more rain"
//     case "snowy":
//       return "brr! so cold!"
//     case "storm":
//       return "Stormy Weather"
//     default:
//       return "Whats the Weather like?"
//   }
// }

const DateFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}

export type TempType = "Fahrenheit" | "Celsius"
const WeatherStats = (_: Props) => {
  const [type, setType] = useState<TempType>("Celsius")
  // const [weatherType, setWeatherType] = useState<WeatherIconType>("hotDesert")
  const [icon, setIcon] = useState<{ icon: string; label: string }>(
    WEATHER_ICONS["hotDesert"],
  )
  const [loading, setLoading] = useState(true)
  const [isAvailable, setisAvailable] = useState(false)
  const [temp, setTemp] = useState<FCCTemperture>({
    humidity: 0,
    pressure: 0,
    temp: 9,
    temp_max: 0,
    temp_min: 0,
  })
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  })
  const [status, setStatus] = useState("")

  React.useLayoutEffect(() => {
    function getWeather() {
      getWeatherData((data) => {
        setStatus(data.status)
        if (data.isAvailable) {
          setStatus(data.status)
          setisAvailable(data.isAvailable)
          setLocation({
            lat: data.position.coords.latitude,
            lng: data.position.coords.longitude,
          })
        }
      })
    }
    getWeather()
  }, [])

  React.useLayoutEffect(() => {
    function handleSetWeatherType(current: number) {
      // if (current > 0) {
      //   if (current > 80) {
      //     setWeatherType("hotDesert")
      //   } else {
      //     setWeatherType("mountain")
      //   }
      // } else {
      //   // setWeatherType("snowy")
      //   if (current < 40) {
      //     setWeatherType("snowy")
      //   } else {
      //     setWeatherType("mountain")
      //   }
      // }
    }
    if (isAvailable) {
      fetchWeatherFromFCC(location.lat, location.lng).then((data) => {
        setLoading(false)
        if (data) {
          console.log(data)
          setTemp(data.main)
          if (data.weather && data.weather[0]) {
            setIcon({
              label: data.weather[0].description,
              icon: data.weather[0].icon,
            })
          }

          handleSetWeatherType(data.main.temp)
        }
      })
    }
    //eslint-disable-next-line
  }, [location])

  function CelsiusToFaran(cels: number) {
    return (cels * 9) / 5 + 32
  }

  const weatherInType =
    type === "Celsius"
      ? `${temp.temp}°C`
      : CelsiusToFaran(temp.temp).toString() + "°F"

  return (
    <>
      <Grid
        maxW={800}
        alignContent="center"
        alignItems="center"
        margin="auto"
        // justifyContent="center"
        // justifyItems="center"
      >
        {loading && (
          <Box textAlign="center">
            <Spinner size="xl">Loading...</Spinner>
          </Box>
        )}

        {!status && isAvailable && !loading ? (
          <React.Fragment>
            <WeatherHeader
              // weatherType={weatherType}
              icon={icon}
              color={WEATHER_ICONS["hotDesert"].color}
            />

            <TempertureBox
              //   message={getWeatherText(weatherType)}
              message={icon.label}
              location={location}
              currentWeather={weatherInType}
              type={type}
              setType={setType}
              //   imageSrc={getMapImageString(location.lat, location.lng, 20)}
            />

            <Box mt={20}>
              <Text fontSize="md" textAlign="center" mb="10px" as="h2">
                <i>
                  {Intl.DateTimeFormat("en-us", DateFormatOptions).format(
                    Date.now(),
                  )}
                </i>
              </Text>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box textAlign="center" p={6}>
              <h2>{status}</h2>
            </Box>
          </React.Fragment>
        )}
      </Grid>
    </>
  )
}

export default WeatherStats
