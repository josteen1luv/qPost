import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
const Footer = () => {
	return (
		<Box sx={{ textAlign: 'center', color: 'secondary.main', display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'flex-end', mb: 1, flexGrow: 1}}>
			<Divider color={'#FFFFFF'} variant={'middle'}/>
			<Typography>
				<a href={'https://github.com/josteen1luv/qPost'}><GitHubIcon/> App repository</a>
			</Typography>

		</Box>
	);
};

export default Footer;