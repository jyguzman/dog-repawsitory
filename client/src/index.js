import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from './provider/AuthProvider'
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

require('dotenv').config();

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nexa',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  overrides: {
    MuiAccordion: {
      root: {
        "&::before": {
          display: "none"
        }
      }
    },
    MuiAccordionSummary: {
      content: {
        textAlign: "right"
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
	  <ThemeProvider theme={theme}>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	  </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
