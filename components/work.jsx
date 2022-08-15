import {
  Box,
  Grid,
  Typography,
  Container,
  Tab,
  Chip,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material'
import { TabPanel, TabContext, TabList } from '@mui/lab'
import { useCallback, useState } from 'react'
import { ArrowRight } from '@mui/icons-material'
import * as uuid from 'uuid'

function WorkListItem(props) {
  return (
    <ListItem divider>
      <ListItemIcon color="#ffffff">
        <ArrowRight color="#ffffff" />
      </ListItemIcon>
      <Typography
        variant="body2"
        fontWeight="light"
        fontFamily="'Didact Gothic', sans-serif"
        color="#ffffff"
      >
        {props.children}
      </Typography>
    </ListItem>
  )
}

function Chips(...list) {
  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {list.map((item) => (
        <Chip
          key={uuid.v4()}
          label={item}
          size="small"
          variant="filled"
          sx={{
            color: '#ffffff',
            borderColor: '#ffffff',
          }}
        ></Chip>
      ))}
    </Box>
  )
}

export default function Work() {
  const [value, setValue] = useState('1')

  const onChange = useCallback((event, newValue) => {
    setValue(newValue)
  })

  return (
    <TabContext value={value}>
      <Container
        id="work"
        maxWidth={false}
        sx={{ paddingY: '40px', backgroundColor: 'transparent' }}
      >
        <Grid container sx={{ maxWidth: 1000, margin: 'auto' }} gap={2}>
          <Typography
            variant="h3"
            fontWeight="light"
            width="100%"
            color="#ffffff"
            fontFamily="'Didact Gothic', sans-serif"
          >
            Where I've worked
          </Typography>

          <TabList
            onChange={onChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="work history tabs"
            allowScrollButtonsMobile={true}
            sx={{
              width: '100%',
            }}
          >
            <Tab
              label="Blackmagic Design"
              value="1"
              color="#ffffff"
              sx={{
                color: '#ffffff',
              }}
            />
            <Tab
              label="Zendesk"
              value="2"
              sx={{
                color: '#ffffff',
              }}
            />
          </TabList>

          <TabPanel value="1">
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography
                variant="h6"
                fontWeight="light"
                fontFamily="'Didact Gothic', sans-serif"
                color="#ffffff"
              >
                Software Engineer @ Blackmagic Design
              </Typography>
              <Typography
                variant="caption"
                fontWeight="light"
                fontFamily="'Didact Gothic', sans-serif"
                color="#ffffff"
              >
                Nov 2021 - Present
              </Typography>
              {Chips('Golang', 'Javascript', 'AWS', 'Full Stack')}
              <List disablePadding>
                <WorkListItem>
                  Write modern, performant, maintainable code as part of the
                  core services platform.
                </WorkListItem>
                <WorkListItem>
                  Built and assisted designs of Stripe integration and webhook
                  services for billing events and notification.
                </WorkListItem>
                <WorkListItem>
                  Work with a variety of different languages, platforms and
                  frameworks such as Golang, JavaScript, TypeScript, React, AWS,
                  Gitlab and more.
                </WorkListItem>
                <WorkListItem>
                  Communicate with multi-disciplinary teams of engineers,
                  designers, producers, and clients on a daily basis.
                </WorkListItem>
              </List>
            </Box>
          </TabPanel>

          <TabPanel value="2">
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6" fontWeight="light" color="#ffffff">
                Intern Software Engineer @ Zendesk
              </Typography>
              <Typography variant="caption" fontWeight="light" color="#ffffff">
                Aug 2019 - Apr 2020
              </Typography>
              {Chips('Scala', 'Data Engineering', 'AWS', 'Backend')}
              <WorkListItem>
                An 8 month internship in Zendesk's Melbourne office, working
                with their Data Engineering Platform team to help build their
                AWS Machine Learning infrastructure.
              </WorkListItem>
              <WorkListItem variant="body2" fontWeight="light">
                Developed a Scala data validation tool that could be added to an
                AWS EMR pipeline allowing users to define thresholds for feature
                anomolies before creating an alert.
              </WorkListItem>
            </Box>
          </TabPanel>
        </Grid>
      </Container>
    </TabContext>
  )
}
