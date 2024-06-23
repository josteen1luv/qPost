import React, {useEffect} from 'react';
import {useRegistrationMutation} from "../../../../api/auth/authApiSlice";
import '../authForm.scss';
import {
	Box,
	Button,
	Container,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import EmailTextField from "../../../assets/formItems/EmailTextField";
import PasswordTextField from "../../../assets/formItems/PasswordTextField";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {IInitialRegistrationValues} from "../../../../models/formsInitialValues/IInitialRegistrationValues";
import NicknameTextField from "../../../assets/formItems/NicknameTextField";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../../../api/auth/userSlice";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validationSchema = Yup.object({
	nickname: Yup.string()
		.matches(/\w/gm, 'Please enter valid name')
		.min(3)
		.max(32)
		.required('Required field!'),
	email:  Yup.string()
		.email('Enter a valid email')
		.required('Required field!'),
	password: Yup.string()
		.matches(passwordRules, 'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
		.required('Required field!'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
});

const initialValues : IInitialRegistrationValues = {
	nickname: '',
	email: '',
	password: '',
	confirmPassword: '',
};
const RegistrationForm = () => {
	const [registration, error ] = useRegistrationMutation();
	const isAuth = useSelector(selectIsAuth);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values, {resetForm}) => {
			registration({email: values.email, password: values.password, nickname: values.nickname});
			resetForm();
		},
	});

	useEffect(() => {
		if (isAuth) {
			navigate('/')
		}
	}, [isAuth]);
	return (
		<Container className={'authForm__container'} maxWidth='sm' sx={{minHeight: '100vh'}}>
			<Box component="form"
				 noValidate
				 className={'authForm'}
				 autoComplete="off"
				 onSubmit={formik.handleSubmit}>
				<h1 className={'authForm__title'}>Sign up for qPost</h1>
				<div className={'authForm__inputs-wrapper'}>
					<NicknameTextField
						id='nickname'
						value={formik.values.nickname}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.nickname && Boolean(formik.errors.nickname)}
						helperText={formik.touched.nickname && formik.errors.nickname}
						className={'authForm__inputs-wrapper__item'}
					/>
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
					<PasswordTextField
						id='confirmPassword'
						label='Confirm password'
						placeholder="Confirm password"
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
						helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
						Sign Up
					</Button>
					<label className={'authForm__label'}>{'Already have an account? '}
						<Link to={'/login'}>
							<span className={'authForm__link'}>
								Log In
							</span>
						</Link>
					</label>


				</div>
			</Box>
		</Container>
	);
};

export default RegistrationForm;