import { Box, Typography, Fade, Link } from '@mui/material'

function LandingContent() {
  return (
    <Fade appear in timeout={2500}>
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: '100%',
          margin: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <Box position="relative" textAlign="left" maxWidth="800px" padding={5}>
          <Typography
            variant="h1"
            gutterBottom
            color="#ffffff"
            fontFamily="'Playfair Display', serif"
          >
            Arone Susau
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            color="#d3d3d3"
            fontFamily="'Playfair Display', serif"
          >
            Melbourne, Australia
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="light"
            color="#e5e5e5"
            gutterBottom
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

export function Landing() {
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        '&::after, &::before': {
          boxSizing: 'border-box',
        },
        '&::after': {
          content: "''",
          width: '100vw',
          height: '100vh',
          display: 'flex',
          position: 'fixed',
          backgroundSize: 'cover',
          backgroundImage: 'url("/banner-large.jpeg")',
          minHeight: '100%',
          minWidth: '100%',
          zIndex: -1,
          left: 0,
          top: 0,
        },
      }}
    >
      <LandingContent />
    </Box>
  )
}
