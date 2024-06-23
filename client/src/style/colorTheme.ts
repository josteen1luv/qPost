import { createTheme} from '@mui/material/styles';

const theme = createTheme({
	palette: {
		background: {
			default: '#121212',
			paper: '#1E1E1E',
		},
		primary: {
			main: '#BB86FC',
			contrastText: '#FFFFFF'
		},
		secondary: {
			main: '#03DAC6',
			contrastText: '#B3B3B3'
		},
		error: {
			main: '#CF6679',
		},
		warning: {
			main: '#FFCC00'
		},
		success: {
			main: '#03C03C'
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#B3B3B3',
		}
	},
});

export default theme
