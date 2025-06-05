
import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";
export const useLogout = () => {
    const { dispatch: workoutsDispatch } = useWorkoutsContext();
    const { dispatch } = useAuthContext();
    const logout= () => {
        // remove user from local storage
        localStorage.removeItem('user');
        // update AuthContext
        dispatch({ type: 'LOGOUT' });
        // update WorkoutsContext
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });

    }
    return { logout };
}