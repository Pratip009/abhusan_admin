import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import User from './pages/User';
import Login from './components/Login';
import Post from './pages/Post';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = () => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token); // Save token only if it's not empty
        } else {
            localStorage.removeItem('token'); // Clear token if empty
        }
    }, [token]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <ToastContainer />
            {token === "" ? (
                <Login setToken={setToken} />
            ) : (
                <>
                    <Navbar setToken={setToken} />
                    <hr />
                    <div className='flex w-full'>
                        <Sidebar />
                        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                            <Routes>
                                <Route path='/add' element={<Add token={token} />} />
                                <Route path='/list' element={<List token={token} />} />
                                <Route path='/orders' element={<Orders token={token} />} />
                                <Route path='/all-users' element={<User token={token} />} />
                                <Route path='/create-post' element={<Post token={token} />} />
                                <Route path='*' element={<Navigate to="/add" />} /> {/* Redirects to '/add' for unknown paths */}
                            </Routes>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
