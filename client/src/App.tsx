import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/pages/mainPage/MainPage";
import LoginForm from "./components/pages/authPage/loginForm/LoginForm";
import RegistrationForm from "./components/pages/authPage/registrationForm/RegistrationForm";
import Header from "./components/header/Header";
import {useRefreshQuery} from "./api/auth/authApiSlice";
import {CircularProgress, Container} from "@mui/material";
import ProfilePage from "./components/pages/profilePage/ProfilePage";
import Page404 from "./components/pages/404/Page404";

function App() {
    useRefreshQuery();
    return (
        <BrowserRouter>
            <Suspense fallback={<CircularProgress/>}>
                <Container sx={{ minHeight: '100vh'}} disableGutters>
                    <Header/>
                    <Routes>
                        <Route path={"/"} element={<MainPage/>}/>
                        <Route path={"/login"} element={<LoginForm/>}/>
                        <Route path={"/signup"} element={<RegistrationForm/>}/>
                        <Route path={"user/:nickname"} element={<ProfilePage/>}/>
                        <Route path={"*"} element={<Page404/>}/>
                    </Routes>
                </Container>

            </Suspense>
        </BrowserRouter>

    );
}

export default App;
