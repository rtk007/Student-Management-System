import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const GlobalLoader = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        gap: 3
      }}
    >
      <DotLottieReact
        src="https://lottie.host/411c61a3-488c-4e87-9c02-2d37de674661/z1UIQkskpp.lottie"
        loop
        autoplay
        style={{ width: 200, height: 200 }}
      />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      <CircularProgress size={40} />
    </Box>
  );
};

export default GlobalLoader;