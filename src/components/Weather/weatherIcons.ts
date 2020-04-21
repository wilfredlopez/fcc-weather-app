//http://unicode.org/emoji/charts-13.0/full-emoji-list.html
const GLOUD = "☁"

const STORM = "⛈",
  SUNNY = "⛅",
  RAINY = "🌧",
  SNOW = "❄"
//snowy mountain, hot desert
export const WEATHER_ICONS = {
  mountain: {
    icon: GLOUD,
    label: "Gloudy",
    color: "white",
  },
  storm: {
    icon: STORM,
    label: "Storm",
    color: "gray",
  },
  hotDesert: {
    icon: SUNNY,
    label: "hot desert",
    color: "yellow",
  },
  rainy: {
    icon: RAINY,
    label: "Rainy",
    color: "gray",
  },
  snowy: {
    icon: SNOW,
    label: "Snowy",
    color: "white",
  },
} as const

export type WeatherIconType = keyof typeof WEATHER_ICONS
