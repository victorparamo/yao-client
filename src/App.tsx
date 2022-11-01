import { useState } from 'react';

import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3fb5a8',
    },
    secondary: {
      main: '#f5c400',
    },
  },
});
theme = responsiveFontSizes(theme);

const StyledInput = styled(TextField)`
  width: 45%;
  margin: 40px 0;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const App = () => {
  const [text, setText] = useState<string>('');
  const [text2, setText2] = useState<string>('');

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <Typography variant="h1">Yao Logistics</Typography>
        <Container>
          <StyledInput
            id="outlined-name"
            label="Texto obtenido"
            value={text}
            onChange={(event) => setText(event.target.value)}
            multiline
            rows={5}
            variant="standard"
          />
          <StyledInput
            id="outlined-name"
            label="Texto esperado"
            value={text2}
            onChange={(event) => setText2(event.target.value)}
            multiline
            rows={5}
            variant="standard"
          />
        </Container>
        <Button variant="contained" color="success">
          Comparar
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default App;
