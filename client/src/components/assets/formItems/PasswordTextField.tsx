import {styled, TextField, TextFieldProps} from "@mui/material";
const PasswordTextField =  styled((props) =>  (
	<TextField
		{...props}
		required
		type="password"
		InputLabelProps={{ shrink: true }}
		sx={{ input: { color: '#B3B3B3' }, label: { color: '#B3B3B3' }}}
	/>
))<TextFieldProps>(() => ({}))

export default PasswordTextField;