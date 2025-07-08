'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [Role, setRole] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('userData');
            const parsedUser = JSON.parse(storedUser);
            const storedToken = Cookies.get('token');
            const role = parsedUser?.role;
            console.log("role", role);


            if (storedUser) {
                setUser(parsedUser);
                setRole(role)
                
            }

            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.error('Error loading user data from cookies:', error);

            Cookies.remove('userData');
            Cookies.remove('token');
        }
    }, []);

        const setlogin = (userData, tokenValue, role) => {
        try {

            console.log("role", role);

            localStorage.setItem('userData', JSON.stringify(userData));
            Cookies.set('token', tokenValue, { expires: 7 });
            Cookies.set('role', role, { expires: 7 });

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
        <UserContext.Provider value={{ user, setlogin, logout, token, Role }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);