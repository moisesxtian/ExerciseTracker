import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import NewWorkout from "../components/NewWorkout";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
const mainPage = () => {
  const {workouts, dispatch} = useWorkoutsContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);


  const handleOpenForm = () => {
    setShowForm(true);
  }; 
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/workouts/${id}`);
      dispatch({type:"DELETE_WORKOUT", payload: id});

    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };
  const handleAddWorkout = async(workout) => {
    setSelectedWorkout(null);
    handleOpenForm();
  }
  const handleEdit = (workout) => {
    setSelectedWorkout(workout);
    setShowForm(true);
  };
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/workouts");
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
        console.log("Fetched workouts:", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center mt-8">
        <h1 className="text-3xl font-bold text-[#2ee96b] mb-8 text-center">
          Workouts
        </h1>
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAddWorkout}
            className="bg-[#2ee96b] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#1b2b1b] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add New Workout
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts &&
            workouts.map((workout) => (
              <div
                key={workout._id}
                className="relative bg-white/5 backdrop-blur-lg border border-[#2ee96b]/20 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(workout)} // Define this function
                    className="p-1 bg-[#2ee96b] text-white rounded-full hover:bg-[#1b2b1b] transition"
                    title="Edit Workout"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(workout._id)} // Define this function
                    className="p-1 bg-red-500 text-white rounded-full hover:bg-red-700 transition"
                    title="Delete Workout"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-[#2ee96b] mb-2">
                  {workout.title}
                </h2>
                <p className="text-gray-600 text-md mb-1">
                  Reps:{" "}
                  <span className="font-bold text-lg">{workout.reps}</span>
                </p>
                <p className="text-gray-600 text-md mb-1">
                  Load:{" "}
                  <span className="font-bold text-lg">{workout.load} kg</span>
                </p>
                <p className="text-gray-500 text-xs mt-4">
                  Added on:{" "}
                  {new Date(workout.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
        </div>
      </div>

      {showForm && <NewWorkout onClose={handleCloseForm} workout={selectedWorkout} />}
    </div>
  );
};

export default mainPage;
