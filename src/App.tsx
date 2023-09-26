import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import getCodes from 'api/getCodes';
import CodeTable from 'CodeTable';
import useAsyncRequest from 'hooks/useAsyncRequest';
import Loading from 'Loading';

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

const Container = styled(Box)`
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
  max-height: 700px;
  overflow: scroll;
`;

const App = () => {
  const asyncRequest = useAsyncRequest(getCodes, { eager: true });

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
        {asyncRequest.isLoading ? (
          <Loading />
        ) : (
          <>
            {asyncRequest.data ? (
              <Container sx={{ width: '80%' }}>
                <CodeTable codes={asyncRequest.data} />
              </Container>
            ) : null}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
