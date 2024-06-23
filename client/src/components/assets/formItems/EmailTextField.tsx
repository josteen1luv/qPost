import {styled, TextField, TextFieldProps} from "@mui/material";

const EmailTextField = styled((props) =>  (
	<TextField
		{...props}
		required
		label="Email"
		placeholder="Email"
		type="email"
		InputLabelProps={{ shrink: true }}
		sx={{ input: { color: '#B3B3B3' }, label: { color: '#B3B3B3' }}}
	/>
))<TextFieldProps>(() => ({}));

export default EmailTextField;