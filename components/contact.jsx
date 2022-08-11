import { SecurityUpdateWarningRounded } from '@mui/icons-material'
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
  Button,
  Box,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
  Fade,
  FormHelperText,
} from '@mui/material'
import { useCallback, useState } from 'react'

import * as uuid from 'uuid'

function ContactInfo() {
  return (
    <Grid item>
      <Typography
        variant="h3"
        fontWeight="light"
        gutterBottom
        fontFamily="'Playfair Display', serif"
      >
        Get in touch
      </Typography>
      <Typography variant="body1" fontWeight="light" gutterBottom>
        Whether you want to talk about tech, work or just wanted to say hello.
        My inbox is always open. I'll try my best to get back to you!
      </Typography>
    </Grid>
  )
}

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

function ContactForm() {
  const host = process.env.NEXT_PUBLIC_HOST
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [alerts, setAlerts] = useState([])
  const [disabled, setDisabled] = useState(false)

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value)
  })

  const onSubjectChange = useCallback((e) => {
    setSubject(e.target.value)
  })

  const onMessageChange = useCallback((e) => {
    setMessage(e.target.value)
  })

  const onAlertClose = useCallback((alert) => {
    setAlerts(alerts.filter((other) => other.key != alert.key))
  })

  const newAlert = useCallback((severity, message) => {
    return (
      <Snackbar
        open
        autoHideDuration={6000}
        onClose={onAlertClose}
        key={uuid.v4()}
      >
        <Alert severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    )
  })

  const onSubmit = useCallback((e) => {
    e.preventDefault()

    setDisabled(true)

    if (!emailRegex.test(email)) {
      setAlerts([
        ...alerts,
        newAlert('error', "Hmm.. that email address doesn't look right."),
      ])

      return
    }

    fetch(host + 'api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        subject,
        message,
      }),
    })
      .then((_) => {
        setEmail('')
        setSubject('')
        setMessage('')
        setDisabled(false)

        setAlerts([
          ...alerts,
          newAlert(
            'success',
            "Thanks for reaching out, I'll get back to you shortly."
          ),
        ])
      })
      .catch((_) => {
        setDisabled(false)
        setAlerts([
          ...alerts,
          newAlert('error', 'Something went wrong, please try again later..'),
        ])
      })
  })

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      {alerts}
      <Grid container item gap={5} direction="column">
        <FormControl>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            onChange={onEmailChange}
            required
            id="email"
            type="email"
            aria-describedby="contact email"
            value={email}
            disabled={disabled}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="subject">Subject</InputLabel>
          <Input
            onChange={onSubjectChange}
            required
            id="subject"
            aria-describedby="message subject"
            value={subject}
            disabled={disabled}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="message">Message</InputLabel>
          <Input
            onChange={onMessageChange}
            required
            id="message"
            aria-describedby="message body"
            multiline
            minRows={4}
            value={message}
            disabled={disabled}
          />
          <FormHelperText id="message">
            Press enter to add more lines.
          </FormHelperText>
        </FormControl>
        <Box display="flex" flexDirection="row" gap={3}>
          <Button
            type="submit"
            color="black"
            variant="outlined"
            sx={{ borderRadius: 100, minWidth: 200 }}
            fullWidth={false}
            disabled={disabled}
          >
            Send
          </Button>
          <CircularProgress
            color="black"
            sx={{
              display: disabled ? 'box' : 'none',
            }}
          />
        </Box>
      </Grid>
    </form>
  )
}

export default function Contact() {
  return (
    <Container
      id="contact"
      maxWidth={false}
      sx={{
        paddingTop: '40px',
        paddingBottom: '100px',
        backgroundColor: '#ffffff',
      }}
    >
      <Grid container gap={4} sx={{ maxWidth: 1200, margin: 'auto' }}>
        <ContactInfo />
        <ContactForm />
      </Grid>
    </Container>
  )
}
