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
        <Landing />
        <Divider /> {/* TODO: delete me later */}
        <About />
        <Divider /> {/* TODO: delete me later */}
        <Work />
        <Divider /> {/* TODO: delete me later */}
        <Projects />
        <Divider /> {/* TODO: delete me later */}
        <Contact />
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
