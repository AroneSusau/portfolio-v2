import { Typography, Container, Grid } from '@mui/material'

export default function About() {
  return (
    <Container
      id="about"
      maxWidth={false}
      sx={{ paddingY: '40px', backgroundColor: '#ffffff' }}
    >
      <Grid container sx={{ maxWidth: 800, margin: 'auto' }}>
        <Typography
          variant="h3"
          fontWeight="light"
          fontFamily="'Playfair Display', serif"
        >
          About Me
        </Typography>
      </Grid>
    </Container>
  )
}
