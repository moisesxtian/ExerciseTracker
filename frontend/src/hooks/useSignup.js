import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
});

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    // Accept username as a parameter
    const signup = async (email, password, username) => {
        setIsLoading(true);
        setError(null);
        try {
            // Send only the user data, not method/headers/body (axios handles this)
            const response = await apiClient.post('/users/signup', {
                username,
                email,
                password
            });
            const data = response.data;
            // update AuthContext
            dispatch({ type: 'SIGNUP', payload: data });
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data }); // Automatically log in after signup
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || 'Signup failed');
        }
    }
    return { signup, isLoading, error };
}