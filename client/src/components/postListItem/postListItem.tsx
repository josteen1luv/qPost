import React, {useState, useEffect, useRef} from 'react';
import {Avatar, Box, Button, Card, IconButton, MenuItem, Modal, Tooltip, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from "@mui/material/Menu";
import {selectId} from "../../api/auth/userSlice";
import {useSelector} from "react-redux";
import {useDeleteMutation, useLikeMutation} from "../../api/post/postApiSlice";
import {IUser} from "../../models/IUser";
import PostForm from "../postForm/PostForm";

interface IPostListItem {
	title: string;
	description: string;
	nickname: string;
	created: string;
	edited: string | null;
	id: number;
	userId: number;
	likes: Omit<IUser, 'isActivated' | 'email'>[];
}
const PostListItem = ({title, description, nickname, created, edited, id, userId, likes}: IPostListItem) => {
	const [isTruncated, setIsTruncated] = useState(true);
	const [showToggle, setShowToggle] = useState(false);
	const [open, setOpen] = useState(false);
	const [isDeletion, setIsDeletion] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const descriptionRef = useRef<HTMLDivElement>(null);

	const [like] = useLikeMutation();
	const [deletePost] = useDeleteMutation();

	const stateUserId = useSelector(selectId);
	const isLikeMine = likes.some(item => item.id === stateUserId);
	const isPostMine = userId === stateUserId;
	const handleToggle = () => {
		setIsTruncated(!isTruncated);
	};
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		const {current} = descriptionRef;
		if (current) {
			setShowToggle(current.scrollHeight > current.clientHeight);
		}
	}, [description]);

	return (
		<Card
			elevation={4}
			sx={{
				backgroundColor: '#1E1E1E',
				mb: 2,
				display: 'flex',
				flexDirection: 'column',
				alignContent: 'space-around',
				minHeight: '240px',
				p: 3,
				borderRadius: 3,
				gap: 1
			}}
		>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
				<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
					<Avatar sx={{ bgcolor: '#B3B3B3', p: 0 }}>{nickname[0].toUpperCase()}</Avatar>
					<Box>
						<Typography color='secondary' variant='subtitle1' sx={{pl:'1px'}}>
							{nickname}
						</Typography>
						<Typography sx={{color: '#828282'}} variant='subtitle2'>
							{created}
							{edited}
						</Typography>
					</Box>
				</Box>
				<IconButton color='secondary' sx={{p:0.5}}  id={`${id}`} onClick={handleClick}>
					<MoreHorizIcon/>
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': `${id}`,
					}}
					sx={{ mt: 4 }}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>

					<MenuItem onClick={() => {setIsDeletion(false); setOpen(true);}} disabled={!isPostMine}>
						<Typography textAlign="center">Edit</Typography>
					</MenuItem>
					<MenuItem onClick={() => {setIsDeletion(true); setOpen(true);}} disabled={!isPostMine}>
						<Typography textAlign="center">Delete</Typography>
					</MenuItem>
					<Modal
						open={open}
						onClose={() => {
							handleClose();
							setOpen(false);
						}}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '90%',
							maxWidth: 400,

						}}>
							{
								isDeletion ?
									<Card sx={{p: 4,
										display: 'flex',
										flexDirection: 'column',
										bgcolor: 'background.paper',
										gap: 1,
										borderRadius: 3,
									}} elevation={4} >
										<Typography variant='h6' color='text.primary' id="modal-modal-title">
											Post deletion
										</Typography>
										<Typography variant='subtitle2' color={'text.secondary'} sx={{span: {color: 'error.main'}}} id="modal-modal-description">
											Are you sure you want to <span>delete</span> this post?<br/>
											This action is <span>irreversible.</span>
										</Typography>
										<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
											<Button variant='contained' color='error' onClick={() => {deletePost(id); handleClose(); setOpen(false);}}>Yes</Button>
											<Button variant='outlined' onClick={() => { handleClose(); setOpen(false);}}>No</Button>
										</Box>
									</Card>
									:
									<PostForm action={'edit'} initialValues={{title, description}} onClose={() => { handleClose(); setOpen(false); }} postId={id}/>
							}
						</Box>
					</Modal>
				</Menu>
			</Box>

			<Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto', maxHeight: isTruncated ? '160px' : 'none', gap: 1 }}>
				<Box>
					<Typography variant='h5' sx={{ height: '32px', color: '#FFFFFF' }} >
						{title}
					</Typography>
					<Typography ref={descriptionRef} component='div' variant='body2' sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: isTruncated ? "3" : "none",
						WebkitBoxOrient: "vertical",
						color: 'text.secondary',
						maxHeight: isTruncated ? '72px' : 'none',
						wordBreak: 'break-word'
					}}>
						{description}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1}}>
					<Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', color: '#FFFFFF'}}>
						<Tooltip title="Like" sx={{color: '#FFFFFF', p: 0, }}>
							<IconButton onClick={() => like(id)} >
								<FavoriteIcon sx={{color: isLikeMine ? '#BB86FC' : 'inherit'}}/>
							</IconButton>
						</Tooltip>
						<Typography>
							{likes.length}
						</Typography>
					</Box>
					{showToggle && (
						<Button size='small' color='secondary' onClick={handleToggle}>
							{isTruncated ? 'more' : 'less'}
						</Button>
					)}
				</Box>
			</Box>
		</Card>
	);
};

export default PostListItem;
