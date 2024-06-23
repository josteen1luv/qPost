import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {authApi} from "./authApiSlice";
import {RootState} from "../../store";
interface IInitialState {
	user: IUser | null;
	isAuth: boolean | null;
}
const initialState:IInitialState = {
	user: null,
	isAuth: null,
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isAuth = true;
				localStorage.setItem('token', action.payload.accessToken);
			})
			.addMatcher(authApi.endpoints.registration.matchFulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isAuth = true;
				localStorage.setItem('token', action.payload.accessToken);
			})
			.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
				state.user = null;
				state.isAuth = false;
				localStorage.removeItem('token');
			})
			.addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isAuth = true
				localStorage.setItem('token', action.payload.accessToken);
			})
			.addMatcher(authApi.endpoints.refresh.matchRejected, (state) => {
				state.isAuth = false
			})
	}
})
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectNickname = (state: RootState) => state.user.user?.nickname;
export const selectIsActivated = (state: RootState) => state.user.user?.isActivated;
export const selectId = (state: RootState) => state.user.user?.id;
const {reducer } = userSlice;
export default reducer;
