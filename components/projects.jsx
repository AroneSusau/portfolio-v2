import {
  Grid,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Chip,
  Link,
} from '@mui/material'
import { useEffect, useState } from 'react'
import * as uuid from 'uuid'

function ToProjectCard({ name, description, topics, url }) {
  return (
    <Card key={uuid.v4()} sx={{ width: 250, backgroundColor: '#ffffff22' }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          justifyContent="space-between"
        >
          <Link
            noopener="true"
            noreferal="true"
            target="_blank"
            color="#ffffff"
            href={url}
          >
            <Typography variant="h5" color="#ffffff">
              {name
                .split('-')
                .map((word) => word[0].toUpperCase() + word.substring(1))
                .join(' ')}
            </Typography>
          </Link>
          <Typography variant="body2" color="#ffffff">
            {description}
          </Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
            {topics.map((topic) => (
              <Chip
                key={uuid.v4()}
                label={topic}
                size="small"
                sx={{
                  color: '#d0d0d0',
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function Projects() {
  const host = process.env.NEXT_PUBLIC_HOST
  const [projects, setProjects] = useState([])

  useEffect(async () => {
    fetch(host + 'api/projects')
      .then((res) => (res.status == 200 ? res.json() : []))
      .then((res) => setProjects(res.map(ToProjectCard)))
  }, [])

  if (projects.length == 0) {
    return <div></div>
  }

  return (
    <Container
      id="projects"
      maxWidth={false}
      sx={{ paddingY: '40px', backgroundColor: '#transparent' }}
    >
      <Box maxWidth={1000} margin="auto">
        <Typography
          variant="h3"
          fontWeight="light"
          fontFamily="'Didact Gothic', sans-serif"
          marginBottom={3}
          color="#ffffff"
        >
          Some things I've built
        </Typography>
      </Box>
      <Grid container sx={{ margin: 'auto' }}>
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={4}
            padding={4}
            sx={{
              backgroundColor: 'transparent',
              borderRadius: '5px',
            }}
          >
            {/* 
              TODO: - pagination is a nice to have, especially on mobile. 
                    - Also transition effects on scroll-into-view.
            */}
            {projects}
          </Box>
        </Box>
      </Grid>
    </Container>
  )
}
