import { Typography, Container, Box, Grid, Link } from '@mui/material'

export default function About() {
  return (
    <Container
      id="about"
      maxWidth={false}
      sx={{ paddingY: '40px', backgroundColor: 'none' }}
    >
      <Grid container sx={{ maxWidth: 1200, margin: 'auto' }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography
            variant="h3"
            fontWeight="light"
            fontFamily="'Didact Gothic', sans-serif"
            color="#ffffff"
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            fontWeight="light"
            color="#ffffff"
            fontFamily="'Didact Gothic', sans-serif"
          >
            <b>Hello!</b> My name is Arone and I enjoy building, breaking and
            tinkering with all sorts of things in all sorts of domains. Whether
            that be software engineering, video game development or music
            production.
          </Typography>
          <Typography
            variant="body1"
            fontWeight="light"
            color="#ffffff"
            fontFamily="'Didact Gothic', sans-serif"
          >
            My interest in software development started back in 2017 when I
            decided to try to create video games using the Javascript Canvas API
            — turns out hacking together a flappy bird clone taught me a lot
            about engineering fundamentals and web technologies.
          </Typography>
          <Typography
            variant="body1"
            fontWeight="light"
            color="#ffffff"
            fontFamily="'Didact Gothic', sans-serif"
          >
            Fast-forward to today, and I've had the privilege of working at a
            huge corporation building machine learning infrastructure, and at
            one of the worlds leading producers of film and television studio
            products. My main focus these days is building scalable and
            performant cloud products at{' '}
            <Link
              href="https://www.blackmagicdesign.com/"
              noopener="true"
              noreferer="true"
              target="_blank"
              color="#ffffff"
            >
              Blackmagic Design
            </Link>
            .
          </Typography>
        </Box>
      </Grid>
    </Container>
  )
}
