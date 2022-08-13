import { Box, Typography, Button, Fade } from '@mui/material'
import { useCallback, useState, useEffect } from 'react'
import { scroller } from 'react-scroll'

function NavButton(props) {
  const scrollTo = useCallback(() => {
    scroller.scrollTo(props.to.toLowerCase(), {
      duration: 1500,
      delay: 100,
      smooth: true,
    })
  })

  return (
    <Button
      variant="none"
      onClick={() => {
        scrollTo()
      }}
    >
      <Typography
        variant="subtitle2"
        fontWeight="light"
        color="#ffffff"
        fontFamily="'Didact Gothic', sans-serif"
      >
        {props.to}
      </Typography>
    </Button>
  )
}

export default function Header() {
  const [showHeader, setShowHeader] = useState(true)

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY < 100) {
        setShowHeader(true)
      } else if (window.scrollY > 100) {
        setShowHeader(false)
      }
    })
  }, [])

  return (
    <Fade in={showHeader} timeout={1000}>
      <Box
        width="100%"
        height="50px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        zIndex={1}
        top={0}
        left={0}
        // backgroundColor="#ffffff"
        flexDirection="row"
        // borderBottom="1px solid #d3d3d3"
      >
        <Box display="flex" paddingRight={1}>
          <NavButton to="About" />
          <NavButton to="Work" />
          <NavButton to="Projects" />
          <NavButton to="Contact" />
        </Box>
      </Box>
    </Fade>
  )
}
