import { ThemeProvider } from "@mui/material"
import ItemMenu from "@pages/ItemMenu"
import theme from "assets/themes"
import { Fragment } from "react"

const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <ItemMenu/>
      </ThemeProvider>
    </Fragment>
  )
}

export default App