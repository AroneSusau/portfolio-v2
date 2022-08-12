import { Box, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Head from 'next/head'

import { Landing } from '../components/landing'
import About from '../components/about'
import Contact from '../components/contact'
import Projects from '../components/projects'
import Work from '../components/work'
import Footer from '../components/footer'
import Header from '../components/header'
import { useEffect, useMemo, useState } from 'react'
import ThreeCanvas from '../components/canvas'

const theme = createTheme({
  palette: {
    black: {
      light: '#000000',
      main: '#000000',
    },
    white: {
      light: '#ffffff',
      main: '#ffffff',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})

function BaseLanding() {
  const [win, setWindow] = useState(undefined)

  useEffect(() => {
    setWindow(window)
  })

  return win !== undefined && win.WebGLRenderingContext !== undefined ? (
    <ThreeCanvas />
  ) : (
    <Landing />
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Head>
          <title>Arone Susau</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          />
        </Head>
        <Header />
        <BaseLanding />
        <About />
        <Work />
        <Projects />
        <Contact />
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
