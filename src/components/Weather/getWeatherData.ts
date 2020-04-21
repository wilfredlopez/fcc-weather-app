export interface CallBackData {
  mapLink: MapLinkI
  status: string
  isAvailable: false
  position: null
}
export interface CallBackDataSuccess {
  mapLink: MapLinkI
  status: string
  isAvailable: true
  position: Position
}

export interface MapLinkI {
  href: string
  textContent: string
}
export function getWeatherData(
  callback: (data: CallBackData | CallBackDataSuccess) => void,
) {
  let status = ""
  //   let isAvailable = false

  let mapLink: MapLinkI = {
    href: "",
    textContent: "",
  }

  const success: PositionCallback = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    status = ""
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`

    callback({
      isAvailable: true,
      mapLink,
      status,
      position: position,
    })
  }

  function error() {
    status = "Unable to retrieve your location"
    // isAvailable = false
    callback({
      isAvailable: false,
      mapLink,
      status,
      position: null,
    })
  }

  if (!navigator.geolocation) {
    status = "Geolocation is not supported by your browser"
    // isAvailable = false
  } else {
    // isAvailable = true
    status = "Locating…"
    navigator.geolocation.getCurrentPosition(success, error)
  }
}
