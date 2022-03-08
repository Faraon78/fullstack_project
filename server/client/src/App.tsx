import React from 'react';

import { useAuth } from './Hooks/auth.hook';
//import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import { useAppSelector } from './Hooks/storeHook';
import MainPage from './Pages/MainPage/MainPage.component';
import PostPage from './Pages/PostPage/PostPage.component';
import UserPage from './Pages/UserPage/UserPage.component';
import UserListPage from './Pages/UserListPage/UserListPage.component';
import AuthPage from './Pages/AuthPage/AuthPage.component';
import ProfilePage from './Pages/ProfilePage/ProfilePage.component';
import NavigateMenu from './Components/NavigateMenu/NavigateMenu.component';
import RegisterPage from './Pages/RegisterPage/RegisterPage.component';
import AddPostPage from './Pages/AddPostPage/AddPostPage.component';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './App.css';

const App: React.FC = (): JSX.Element => {
    // check if there is a saved token and if authentication is needed
    const token = useAppSelector((state) => state.currentUser.token);
    const isAuthenticated: boolean = !!token;

    //connect the logout function from the hook
    const { logout } = useAuth();

    return (
        <div className="app" id="app">
            <header className="app-header">
                <Typography variant="h3" component="div">
                    MyChat
                </Typography>

                {isAuthenticated && (
                    <Button //the LOGOUT button is only rendered if the user is logged in
                        variant="contained"
                        size="large"
                        className="main-navigate-buttons"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                )}
            </header>

            <div className="content">
                {isAuthenticated && <NavigateMenu />}

                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <MainPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute isAuthenticated={isAuthenticated}>
                                <AuthPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute isAuthenticated={isAuthenticated}>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/:page"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <MainPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/post/:id"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <PostPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users/:id"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <UserPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <UserListPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/myprofile"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/addpost"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <AddPostPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
