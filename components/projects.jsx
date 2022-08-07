import { Grid, Typography, Container } from '@mui/material'

export default function Projects() {
  return (
    <Container
      id="projects"
      maxWidth={false}
      sx={{ paddingY: '40px', backgroundColor: '#ffffff' }}
    >
      <Grid container sx={{ maxWidth: 800, margin: 'auto' }}>
        <Typography
          variant="h3"
          fontWeight="light"
          fontFamily="'Playfair Display', serif"
        >
          Some things I've built
        </Typography>
      </Grid>
    </Container>
  )
}
