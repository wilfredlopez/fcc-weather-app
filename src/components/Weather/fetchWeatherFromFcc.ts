export interface FCCTemperture {
  temp: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
  feels_like?: number
  sea_level?: number
  grnd_level?: number
}
interface ResponseData {
  coord: {
    lon: number
    lat: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    },
  ]
  base: string
  main: FCCTemperture
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  id: number
  name: string
  cod: number
}

const fetchWeatherFromFCC = async (lng: number, lat: number) => {
  const URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lng}`

  return fetch(URL)
    .then<ResponseData>((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}

export default fetchWeatherFromFCC
