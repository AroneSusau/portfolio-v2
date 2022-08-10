import {
  Grid,
  Typography,
  Container,
  Box,
  Card,
  Button,
  CardContent,
  Chip,
  Link,
} from '@mui/material'
import { useEffect, useState } from 'react'

import path from 'path'
import * as uuid from 'uuid'

function ToProjectCard({ name, description, topics, url }) {
  return (
    <Card key={uuid.v4()} sx={{ width: 250 }}>
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
            color="#000000"
            href={url}
          >
            <Typography variant="h5" color="black">
              {name
                .split('-')
                .map((word) => word[0].toUpperCase() + word.substring(1))
                .join(' ')}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
            {topics.map((topic) => (
              <Chip key={uuid.v4()} label={topic} size="small" />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function Projects() {
  const host = process.env.NEXT_PUBLIC_HOST
  const githubUser = process.env.NEXT_PUBLIC_GITHUB_USER
  const githubPublicKey = process.env.NEXT_PUBLIC_GITHUB_KEY

  const [projects, setProjects] = useState([])

  useEffect(async () => {
    const data = await fetch(host + 'api/projects').then((res) =>
      res.status == 200 ? res.json() : []
    )

    setProjects(data.map(ToProjectCard))
  }, [])

  if (projects.length == 0) {
    return <div></div>
  }

  return (
    <Container
      id="projects"
      maxWidth={false}
      sx={{ paddingY: '40px', backgroundColor: '#ffffff' }}
    >
      <Box maxWidth={1200} margin="auto">
        <Typography
          variant="h3"
          fontWeight="light"
          fontFamily="'Playfair Display', serif"
          marginBottom={3}
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
              backgroundColor: '#eeeeee',
              borderRadius: '5px',
            }}
          >
            {projects}
          </Box>
        </Box>
      </Grid>
    </Container>
  )
}
