import React from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import { Home as HomeIcon } from '@mui/icons-material';

const Page404 = () => {

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				textAlign: 'center'
			}}
		>
			<Box
				sx={{
					mb: 3
				}}
			>
				<Typography variant="h1" component="div" gutterBottom sx={{color: 'text.primary'}}>
					404
				</Typography>
				<Typography variant="h4" component="div" gutterBottom sx={{color: 'text.primary'}}>
					Page Not Found
				</Typography>
				<Typography variant="body1" component="div" gutterBottom sx={{color: 'text.secondary'}}>
					The page you are looking for doesn't exist or an other error occurred.
				</Typography>
			</Box>
			<Link to={'/'}>
				<Button
					variant="contained"
					color="primary"
					startIcon={<HomeIcon />}
					sx={{borderRadius: 4}}
				>
					Go to Homepage
				</Button>
			</Link>

		</Container>
	);
};

export default Page404;