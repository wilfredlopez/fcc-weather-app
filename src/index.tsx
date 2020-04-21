import React, { PropsWithChildren } from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core"
import customTheme from "./styles/theme"

const ThemeContainer = (props: PropsWithChildren<{}>) => {
  // Use at the root of your app
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ThemeProvider>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <ThemeContainer>
      <App />
    </ThemeContainer>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
