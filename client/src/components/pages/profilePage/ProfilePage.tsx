import React, {useState} from 'react';
import {Avatar, CircularProgress, Container, Typography, Box, Tabs, Tab} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetUserQuery} from "../../../api/auth/authApiSlice";
import PostList from "../../postList/postList";
import Page404 from "../404/Page404";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}
function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const ProfilePage = () => {
	const [value, setValue] = useState(0);

	const { nickname } = useParams();
	const { data, isLoading, isError } = useGetUserQuery(nickname);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	if(isError) return <Page404/>
	if(isLoading) return <CircularProgress />
	return (
		<Container maxWidth={'lg'} sx={{ pt:{xs:9, sm: 10}, display:'flex', alignItems: 'center', flexDirection: 'column', gap: 2}}>
			<Avatar  sx={{ width: 80, height: 80 }}>{data.nickname[0].toUpperCase()}</Avatar>
			<Box>
				<Typography variant={'h1'} sx={{color:'text.primary', display:{xs:'none', sm: 'block'}}}>
					{data.nickname}
				</Typography>
				<Typography variant={'h2'} sx={{color:'text.primary', display:{xs:'block', sm: 'none'}}}>
					{data.nickname}
				</Typography>
			</Box>
			<Tabs value={value} onChange={handleChange}>
				<Tab label={'User posts'} {...a11yProps(0)}/>
				<Tab label={'User liked posts'} {...a11yProps(1)}/>
			</Tabs>
			<Box sx={{width: '100%'}}>
				<CustomTabPanel value={value} index={0} >
					<PostList filterBy={'owner'} id={data.id}/>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<PostList filterBy={'likes'} id={data.id}/>
				</CustomTabPanel>
			</Box>
		</Container>
	);
};

export default ProfilePage;