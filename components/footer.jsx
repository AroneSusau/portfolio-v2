import { Box, Fade, Slide, Typography, IconButton, Link } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import { LinkedIn, GitHub } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'

export default function Footer() {
  const hoverStyles = useMemo(
    () => [
      {
        '&:hover': {
          color: '#3d3d3d',
        },
      },
      {
        transition: '500ms',
        color: '#ffffff',
      },
    ],
    []
  )

  const [showFooter, setShowFooter] = useState(false)
  const mediaSm = useMediaQuery('(min-width:800px)')

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 100) {
        setShowFooter(true)
      } else if (window.scrollY < 100) {
        setShowFooter(false)
      }
    })
  }, [])

  return (
    <Slide in={showFooter} direction="up" timeout={500}>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          paddingY: 2,
          width: '100%',
          height: 50,
          zIndex: 1,
        }}
      >
        <Fade in={showFooter} timeout={1000}>
          <Box
            width="100%"
            height="100%"
            backgroundColor="#ffffff22"
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="flex-start" paddingX={3}>
              <Typography
                variant="subtitle2"
                fontWeight="light"
                marginY="auto"
                color="#ffffff"
              >
                &copy; 2022 Arone Susau
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                fontWeight="light"
                variant="caption"
                display={!mediaSm ? 'none' : 'inline'}
                color="#ffffff"
              >
                This website was built with{' '}
                <Link
                  href="https://reactjs.org/"
                  noopener="true"
                  noreferer="true"
                >
                  React
                </Link>{' '}
                using{' '}
                <Link
                  href="https://nextjs.org/"
                  noopener="true"
                  noreferer="true"
                >
                  NextJS
                </Link>{' '}
                and{' '}
                <Link href="https://mui.com/" noopener="true" noreferer="true">
                  Material UI
                </Link>
                , deployed to{' '}
                <Link
                  href="https://vercel.com/"
                  noopener="true"
                  noreferer="true"
                >
                  Vercel
                </Link>
                .
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              paddingX={3}
              gap={3}
            >
              <IconButton
                href="https://www.linkedin.com/in/arone-susau/"
                noopener="true"
                noreferer="true"
                target="_blank"
              >
                <LinkedIn sx={hoverStyles} />
              </IconButton>
              <IconButton
                href="https://github.com/AroneSusau"
                noopener="true"
                noreferer="true"
                target="_blank"
              >
                <GitHub sx={hoverStyles} />
              </IconButton>
            </Box>
          </Box>
        </Fade>
      </div>
    </Slide>
  )
}
