import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "../api/auth/authApiSlice";
import user from "../api/auth/userSlice"
const index = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		user
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
	devTools: process.env.NODE_ENV !== 'production',
})

export default index;

export type RootState = ReturnType<typeof index.getState>;