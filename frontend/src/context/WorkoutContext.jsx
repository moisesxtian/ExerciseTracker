import {createContext} from "react";
import { useReducer } from "react";
export const WorkoutContext = createContext();

export const workoutsReducer= (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload 
            }
        case 'CREATE_WORKOUT':
            console.log("test",state);
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload)
            }
        case 'UPDATE_WORKOUT':
            return{
                workouts: state.workouts.map((w) => 
                    w._id === action.payload._id ? action.payload: w
                )
            }
        }
}

export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null});
    return (
    <WorkoutContext.Provider value={{...state, dispatch}}>
      {children}
    </WorkoutContext.Provider>
  );
}
export default WorkoutContextProvider;