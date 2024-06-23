import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, Card, Modal, TextField, Typography} from "@mui/material";
import {useEditMutation, usePublishMutation} from "../../api/post/postApiSlice";
import * as Yup from "yup";
import {useFormik} from "formik";
import {InitialPostFormValues} from "../../models/formsInitialValues/InitialPostFormValues";
import {selectIsActivated} from "../../api/auth/userSlice";
import {useSelector} from "react-redux";

const validationSchema = Yup.object().shape({
	title:  Yup.string()
		.min(3, 'Title should be of minimum 3 characters length')
		.max(64, 'Title should be of maximum 64 characters length')
		.required('Required field!'),
	description: Yup.string()
		.min(3, 'Description should be of minimum 3 characters length')
		.max(1024, 'Description should be of maximum 1024 characters length')
		.required('Required field!')
});
const localInitialValues:  InitialPostFormValues = {
	title: '',
	description: ''
}
interface IPostForm {
	action: string,
	initialValues?: InitialPostFormValues,
	onClose?: () => void;
	postId?: number;
}
const PostForm = ({action, initialValues, onClose, postId}: IPostForm) => {
	const [isExpanded, setIsExpanded] = useState(action !== 'publish');

	const isActivated = useSelector(selectIsActivated);
	const [open, setOpen] = useState(false);

	const [publish] = usePublishMutation();
	const [edit] = useEditMutation();
	const formik = useFormik({
		initialValues: initialValues || localInitialValues,
		validationSchema: validationSchema,
		onSubmit: (values, {resetForm}) => {
			if(action === 'publish'){
				publish({title: values.title, description: values.description});
			}
			if(action === 'edit'){
				const credentials = {title: values.title, description: values.description}
				edit({credentials, postId});
			}
			setIsExpanded(false);
			resetForm();
			if(onClose) onClose();
		},
	});

	const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		e.stopPropagation();
	}, []);

	useEffect(() => {
		setOpen(!isActivated);
	}, [isActivated]);
	return (
		<>
			<Modal
				disableAutoFocus={true}
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="email-confirmation-modal"
				aria-describedby="email-confirmation-description"
			>
				<Box sx={{
					maxWidth: 400,
					width: '90%',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					p: 4,
					borderRadius: 4,
					bgcolor: 'background.paper',
					color: "text.primary",
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 3
				}}>
					<Typography id="email-confirmation-modal" variant="h6" component="h2">
						Email Confirmation Required
					</Typography>
					<Typography id="email-confirmation-description" sx={{color:'warning.main'}}>
						Please confirm your email to be able to create posts.
					</Typography>
					<Typography sx={{color:'text.secondary'}} variant={'subtitle2'}>
						(reload page, if you confirmed it, but still don't able to create posts)
					</Typography>
					<Button variant='outlined' color='secondary' onClick={() => setOpen(false)}>Close this window</Button>
				</Box>
			</Modal>
			<Card
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={formik.handleSubmit}
				elevation={4}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					padding: 3,
					backgroundColor: 'background.paper',
					borderRadius: 3,
					color: 'text.primary',
					mb: action === 'publish' ? 2 : 0
				}}
				onFocus={() => setIsExpanded(true)}

			>
				<>
					<Typography variant='h6' color='text.primary'>{action === 'publish' ? 'Create a Post' : 'Edit a Post'}</Typography>
					<TextField
						disabled ={!isActivated}
						id='title'
						value={formik.values.title}
						onChange={formik.handleChange}
						error={formik.touched.title && Boolean(formik.errors.title) && isExpanded}
						helperText={formik.touched.title && isExpanded && formik.errors.title }
						onBlur={formik.handleBlur}

						label='Enter a title'
						variant='standard'
						multiline
						InputLabelProps={{ style: { color: 'text.secondary' } }}
						InputProps={{ style: { color: 'text.primary' } }}
						onKeyDown={onKeyDown}
					/>
				</>
				{isExpanded && (
					<>
						<TextField
							disabled ={!isActivated}
							id='description'
							value={formik.values.description}
							onChange={formik.handleChange}
							error={formik.touched.description && Boolean(formik.errors.description) && isExpanded}
							helperText={formik.touched.description && isExpanded && formik.errors.description}
							onBlur={formik.handleBlur}

							label='Enter a description'
							variant='standard'
							multiline
							fullWidth
							InputLabelProps={{ style: { color:'text.secondary' } }}
							InputProps={{ style: { color: 'text.primary' } }}
							onKeyDown={onKeyDown}
						/>
						<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
							<Button
								type='submit'
								variant='contained'
								color={action === 'publish' ? 'primary' : 'warning'}
								sx={{width: '100px', borderRadius: 5}}
							>
								{action === 'publish' ? 'Publish' : 'Edit'}
							</Button>
							<Button
								color='secondary'
								onClick={() => {
									setIsExpanded(false);
									if (onClose) {
										onClose();
									}
								}}
							>
								{action === 'publish' ? 'Hide' : 'Close'}
							</Button>
						</Box>

					</>
				)}
			</Card>
		</>
	);
}

export default PostForm;