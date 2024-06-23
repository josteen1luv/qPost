import React, {useCallback, useState} from 'react';
import {Box, Button, Card, TextField, Typography} from "@mui/material";
import {useEditMutation, usePublishMutation} from "../../api/post/postApiSlice";
import * as Yup from "yup";
import {useFormik} from "formik";
import {InitialPostFormValues} from "../../models/formsInitialValues/InitialPostFormValues";

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
	return (
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
	);
}

export default PostForm;