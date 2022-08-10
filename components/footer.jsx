import { Box, Fade, Slide, Typography, IconButton } from '@mui/material'

import { LinkedIn, GitHub } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'

export default function Footer() {
  const hoverStyles = useMemo(
    () => [
      {
        '&:hover': {
          color: '#aaaaaa',
        },
      },
      {
        transition: '500ms',
      },
    ],
    []
  )

  const [showFooter, setShowFooter] = useState(false)

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
        onScroll={(e) => {
          console.log('wassap')
        }}
      >
        <Fade in={showFooter} timeout={1000}>
          <Box
            width="100%"
            height="100%"
            backgroundColor="#ffffff"
            display="flex"
            justifyContent="space-between"
            borderTop="1px solid rgba(0, 0, 0, 0.2)"
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              paddingX={3}
              width="50%"
            >
              <Typography variant="subtitle2" fontWeight="light" marginY="auto">
                &copy; 2022 Arone Susau
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              width="50%"
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
