import {styled, TextField, TextFieldProps} from "@mui/material";

const NicknameTextField = styled((props) =>  (
	<TextField
		{...props}
		required
		label="Nickname"
		placeholder="Nickname"
		type="text"
		InputLabelProps={{ shrink: true }}
		sx={{ input: { color: '#B3B3B3' }, label: { color: '#B3B3B3' }}}
	/>
))<TextFieldProps>(() => ({}));

export default NicknameTextField;