import {use, useState} from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
});

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);
        
        const response = await apiClient.post('/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
        const data = response.data;
        if (!response.ok) {
            setIsLoading(false);
            setError(data.error);
            return;
        }
        localStorage.setItem('user', JSON.stringify(data));
        //update AuthContext
        dispatchEvent({type: 'LOGIN', payload: data});
        setIsLoading(false);
    }
    return {signup, isLoading, error};
}