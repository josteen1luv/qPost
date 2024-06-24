import React from 'react';
import {useGetAllUsersQuery} from "../../api/auth/authApiSlice";
import {Box, Button, Card, CircularProgress, Divider, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const RegisteredUsers = () => {
	const {data} = useGetAllUsersQuery();

	return (
		<Card sx={{minWidth: '280px', maxWidth:{xs:900, md:280},display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3, mb: 2}} elevation={4}>
			<Typography sx={{px: 3, pt: 3}}  variant='h6'>
				Registered users
			</Typography>
			<Divider color={'black'}/>
			<Box sx={{px: 3, pb: 3, display: 'flex', flexWrap:'wrap', gap: 1}} >
				{!data? <CircularProgress/> : data.map((user, i) => (
							<Link key={user.nickname} to={`/user/${user.nickname}`}>
								<Button variant='outlined' key={i} size='small' color='secondary'>
									{user.nickname}
								</Button>
							</Link>
				))}
			</Box>
		</Card>
	);
};
export default RegisteredUsers;