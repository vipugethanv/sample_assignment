import React from "react";
import Signup from "./Signup";
import theme from "./Theme";
import { useTheme,ThemeProvider, withTheme } from '@emotion/react'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Signup />
      </div>
    </ThemeProvider>
  );
};

export default App;
