import React from 'react';
import {
	AppBar,
	Avatar,
	Box,
	Button, ButtonGroup, CircularProgress,
	Container,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography
} from "@mui/material";
import Menu from '@mui/material/Menu';
import HouseIcon from '@mui/icons-material/House';
import {Link} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import {selectIsAuth, selectNickname} from "../../api/auth/userSlice";
import {useLogoutMutation} from "../../api/auth/authApiSlice";

const Header = () => {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [logout] = useLogoutMutation();
	const isAuth = useSelector(selectIsAuth);
	const nickname = useSelector(selectNickname, {equalityFn: shallowEqual});
	const avatarLetter = nickname?.slice(0, 1)?.toUpperCase();
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<AppBar position="absolute" >
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{display: 'flex', flexGrow: 1}}>
						<Link to={'/'}>
							<ButtonGroup sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
								<HouseIcon sx={{mr: 1 }} />
								<Typography
									variant="h4"
									noWrap
									sx={{
										mr: 2,
										fontWeight: 700,
										letterSpacing: '.3rem',
										color: 'inherit',
										textDecoration: 'none',
									}}
								>
									qPost
								</Typography>
							</ButtonGroup>
						</Link>
					</Box>

					{/*Profile*/}
					{isAuth === null ? <CircularProgress/>: isAuth
						?
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<Avatar sx={{ bgcolor: 'white', p: 0 }} onClick={handleOpenUserMenu}>{avatarLetter || 'q'}</Avatar>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>

								<MenuItem onClick={() => {
									handleCloseUserMenu();
								}
								}>
									<Link to={`/user/${nickname}`}>
										<Typography textAlign="center">Profile</Typography>
									</Link>
								</MenuItem>
								<MenuItem onClick={() => {
									handleCloseUserMenu();
									logout()
								}
								}>
									<Typography textAlign="center">Log out</Typography>
								</MenuItem>

							</Menu>
						</Box>
						:
						<ButtonGroup size={'large'} color={'secondary'}>
							<Link to={'/signup'}>
								<Button sx={{color: '#FFFFFF'}}>
									Sign Up
								</Button>
							</Link>
							<Link to={'/login'}>
								<Button variant={'contained'} sx={{color: '#FFFFFF'}}>
									Log in
								</Button>
							</Link>
						</ButtonGroup>
					}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;