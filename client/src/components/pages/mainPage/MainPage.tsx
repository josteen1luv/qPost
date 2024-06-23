import React from 'react';
import PostList from "../../postList/postList";
import {Box, Container} from "@mui/material";
import PostForm from "../../postForm/PostForm";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../../api/auth/userSlice";
import RegisteredUsers from "../../registeredUsers/RegisteredUsers";

const MainPage = () => {
	const isAuth = useSelector(selectIsAuth);
	return (
		<Container maxWidth={'lg'} sx={{ pt:{xs:9, sm: 10}, display:'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 0, md: 2}}}>
			<Box sx={{flexGrow: 1}}>
				{isAuth && <PostForm action={'publish'}/>}
				<PostList/>
			</Box>
			<Box>
				<RegisteredUsers/>
			</Box>
		</Container>
	);
};

export default MainPage;