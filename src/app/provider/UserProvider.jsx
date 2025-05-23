'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('userData');
            const storedToken = Cookies.get('token');

            console.log('token', token);


            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.error('Error loading user data from cookies:', error);
            // Clear potentially corrupted cookies
            Cookies.remove('userData');
            Cookies.remove('token');
        }
    }, []);

    const setlogin = (userData, tokenValue) => {
        try {

            localStorage.setItem('userData', JSON.stringify(userData));
            Cookies.set('token', tokenValue, { expires: 7 });


            setUser(userData);
            setToken(tokenValue);
        } catch (error) {
            console.error('Error setting login data:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('emailtoSignup')
        localStorage.removeItem('userData')


        Cookies.remove('token');
        setUser(null);
        setToken(null);
    };

    return (
        <UserContext.Provider value={{ user, setlogin, logout, token }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);