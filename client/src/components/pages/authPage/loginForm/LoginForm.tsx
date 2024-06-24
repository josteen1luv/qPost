import '../authForm.scss';
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {selectIsAuth} from '../../../../api/auth/userSlice'
import {useLoginMutation} from "../../../../api/auth/authApiSlice";

import EmailTextField from "../../../assets/formItems/EmailTextField";
import PasswordTextField from "../../../assets/formItems/PasswordTextField";
import {Box, Button, Container} from "@mui/material";

import {IInitialLoginValues} from "../../../../models/formsInitialValues/IInitialLoginValues";

import * as Yup from 'yup';
import {useFormik} from "formik";

const validationSchema = Yup.object().shape({
	email:  Yup.string()
		.email('Enter a valid email')
		.required('Required field!'),
	password: Yup.string()
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Required field!')
});

const initialValues : IInitialLoginValues = {
	email: '',
	password: ''
};
const LoginForm = React.memo(() => {
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const [login, error ] = useLoginMutation();

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values, {resetForm}) => {
			login({email: values.email.trim(), password: values.password});
			resetForm();
		},
	});
	useEffect(() => {
		if (isAuth) {
			navigate('/')
		}
	}, [isAuth]);
	return (
		<Container className={'authForm__container'} maxWidth='sm'>
			<Box component="form"
				 noValidate
				 className={'authForm'}
				 autoComplete="off"
				 onSubmit={formik.handleSubmit}>
				<h1 className={'authForm__title'}>Log In to qPost</h1>
				<div className={'authForm__inputs-wrapper'}>
					<EmailTextField
						id='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						className={'authForm__inputs-wrapper__item'}
					/>

					<PasswordTextField
						id='password'
						label='Password'
						placeholder="Password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						className={'authForm__inputs-wrapper__item'}
					/>
				</div>
				<div className={'authForm__buttons-wrapper'}>
					{error.status === 'rejected' ? <label className={'authForm__error'}>Wrong email or password</label> : null}
					<Button
						variant="contained"
						type='submit'
						className={'authForm__buttons-wrapper__item'}
					>
						Log in
					</Button>
					<label className={'authForm__label'}>{'Don\'t have an account? '}
						<Link to={'/signup'}>
							<span className={'authForm__link'}>
								Sign Up
							</span>
						</Link>
					</label>


				</div>
			</Box>
		</Container>
	);
});
export default LoginForm;