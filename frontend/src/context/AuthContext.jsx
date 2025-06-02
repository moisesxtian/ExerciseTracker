import {useContext,useReducer} from "react";

export const AuthContext= createContext();


//AuthReducer function to handle different actions
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        case 'UPDATE_USER':
            return {
                user: action.payload
            }
        default:
            return state;
    }
}

//AuthContextProvider
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;