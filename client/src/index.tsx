import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import index from "./store";
import './style/style.scss'
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import theme from "./style/colorTheme";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={index}>
	<StyledEngineProvider injectFirst >
	  <ThemeProvider theme={theme}>
		  <App />
	  </ThemeProvider>
	</StyledEngineProvider>
  </Provider>
);
