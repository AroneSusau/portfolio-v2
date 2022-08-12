import { Fade, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Engine from '../src/providers/three/engine'

const engine = new Engine()
let engineSetup = false

function LandingContent() {
  const [showHeader, setShowHeader] = useState(true)

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY < 50) {
        setShowHeader(true)
      } else if (window.scrollY > 50) {
        setShowHeader(false)
      }
    })
  }, [])

  return (
    <Fade appear in={showHeader} timeout={1000}>
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        sx={{
          maxWidth: '100%',
          margin: 'auto',
          backgroundColor: 'none',
        }}
      >
        <Box
          position="relative"
          textAlign="left"
          maxWidth="800px"
          padding={5}
          sx={{ backgroundColor: 'none' }}
        >
          <Typography
            variant="h1"
            gutterBottom
            color="#ffffff"
            fontFamily="'Didact Gothic', sans-serif"
          >
            Arone Susau
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            color="#ffffff"
            fontFamily="'Didact Gothic', sans-serif"
          >
            Melbourne, Australia
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="light"
            color="#ffffff"
            gutterBottom
            fontFamily="'Didact Gothic', sans-serif"
          >
            I'm a software engineer specializing in building web application
            using cloud technologies. Currently, I'm focused on creating
            scalable and performant products at{' '}
            <Link
              href="https://www.blackmagicdesign.com/"
              color="#ffffff"
              target="_blank"
              rel="noreferrer"
            >
              Blackmagic Design
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Fade>
  )
}

export default function ThreeCanvas() {
  const [win, setWindow] = useState(undefined)
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)

  useEffect(() => {
    setWindow(window)

    setCanvasWidth(window.innerWidth)
    setCanvasHeight(window.innerHeight)

    window.addEventListener('resize', () => {
      setCanvasWidth(window.innerWidth)
      setCanvasHeight(window.innerHeight)
    })
  }, [])

  useEffect(() => {
    if (win !== undefined) {
      if (!engineSetup) {
        engine.setup()
        engineSetup = true

        const animate = () => {
          engine.run()
          requestAnimationFrame(animate)
        }

        animate()
      }
    }
  }, [win])

  return win !== undefined ? (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <LandingContent />
      <canvas
        style={{
          zIndex: -255,
          width: canvasWidth ?? win.innerWidth,
          height: canvasHeight ?? win.innerHeight,
          position: 'fixed',
          backgroundColor: 'transparent',
        }}
      ></canvas>
    </Box>
  ) : (
    <div></div>
  )
}
