import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
});
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.post('/users/login', { email, password });
            const data = response.data;
            localStorage.setItem('user', JSON.stringify(data));
            // update AuthContext
            dispatch({ type: 'LOGIN', payload: data });
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || 'Login failed');
        }
    }

    return { login, isLoading, error };
}