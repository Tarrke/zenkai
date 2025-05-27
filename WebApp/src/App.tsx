import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import TaskContainer from './components/TaskContainer';

// Zenkai theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#db4c3f',
    },
    background: {
      default: '#fafafa',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <TaskContainer />
      </Container>
    </ThemeProvider>
  );
}

export default App; 