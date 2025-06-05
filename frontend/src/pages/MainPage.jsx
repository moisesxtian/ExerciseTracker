import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import NewWorkout from "../components/NewWorkout";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

// Use the environment variable from .env (which includes "/api")
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const MainPage = () => {
  const { user } = useAuthContext();
  const { workouts, dispatch } = useWorkoutsContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleDelete = async (id) => {
    try {
      // Use apiClient here instead of axios directly
      await apiClient.delete(`/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
      dispatch({ type: "DELETE_WORKOUT", payload: id });
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleAddWorkout = () => {
    setSelectedWorkout(null);
    handleOpenForm();
  };

  const handleEdit = (workout) => {
    setSelectedWorkout(workout);
    setShowForm(true);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Use apiClient here too
        const response = await apiClient.get("/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        });
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
        console.log("Fetched workouts:", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if(user) {
    fetchWorkouts();
    }
  },[user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue to-pastel-mint font-poppins flex flex-col items-center">
      <header className="w-full flex flex-col items-center pt-16 pb-8 animate-fade-in">
        <h1 className="text-5xl font-black text-pastel-navy mb-4 tracking-tight drop-shadow-xl animate-slide-down">
          Workouts
        </h1>
        <button
          onClick={handleAddWorkout}
          className="mt-2 bg-pastel-green text-pastel-navy font-bold py-3 px-8 rounded-2xl shadow-xl hover:bg-pastel-navy hover:text-pastel-green transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pastel-green/40 animate-bounce-short"
        >
          + Add New Workout
        </button>
      </header>
      <main className="w-full flex-1 flex justify-center items-start">
        <div className="max-w-7xl w-full px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in-up">
          {workouts &&
            workouts.map((workout, idx) => (
              <div
                key={workout._id}
                className="relative bg-white/80 border-2 border-pastel-navy/20 rounded-3xl shadow-2xl p-8 flex flex-col items-start transition-all duration-300 hover:scale-105 hover:shadow-3xl group animate-card-fade-in"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="absolute top-5 right-5 flex gap-2 opacity-90 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleEdit(workout)}
                    className="p-2 bg-pastel-green text-pastel-navy rounded-full border border-gray-300 hover:bg-[#2ee96b] hover:text-white hover:filter hover:saturate-150 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-pastel-green/40"
                    title="Edit Workout"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(workout._id)}
                    className="p-2 bg-pastel-red text-white rounded-full border border-gray-300 hover:bg-[#ff4d4f] hover:text-white hover:filter hover:saturate-150 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-pastel-red/40"
                    title="Delete Workout"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <h2 className="text-2xl font-extrabold text-pastel-navy mb-2 tracking-tight drop-shadow-sm animate-slide-up">
                  {workout.title}
                </h2>
                <div className="flex gap-6 mb-2">
                  <p className="text-pastel-navy text-lg font-semibold">
                    Reps: <span className="font-black text-pastel-green drop-shadow">{workout.reps}</span>
                  </p>
                  <p className="text-pastel-navy text-lg font-semibold">
                    Load: <span className="font-black text-pastel-green drop-shadow">{workout.load} kg</span>
                  </p>
                </div>
                <p className="text-pastel-navy/70 text-xs mt-4 font-medium">
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
      </main>
      {showForm && <NewWorkout onClose={handleCloseForm} workout={selectedWorkout} />}
    </div>
  );
};

export default MainPage;
