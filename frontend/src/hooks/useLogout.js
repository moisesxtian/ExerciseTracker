
import { useAuthContext } from "./useAuthContext";
export const useLogout = () => {
    const logout= () => {
        // remove user from local storage
        localStorage.removeItem('user');
        // update AuthContext
        dispatch({ type: 'LOGOUT' });
    }
    return { logout };
}