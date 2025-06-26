import { useEffect, useState } from 'react';
import axios from 'axios';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import '../App.css'; // Corrected import path
import { useAuthContext } from '../hooks/useAuthContext';

//viteAPI from env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure this is set correctly
});
const NewWorkout = ({ onClose, workout = null }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [showError, setShowError] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  // Detect dark mode from body class for sync with Navbar
  const [isDark, setIsDark] = useState(() => document.body.classList.contains('dark-mode'));
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark-mode'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalid = [];
    if (title.trim() === '') invalid.push('title');
    if (reps === '') invalid.push('reps');
    if (load === '') invalid.push('load');
    if (invalid.length > 0) {
      setIsFormValid(false);
      setInvalidFields(invalid);
      setShowError(false); // Reset to re-trigger animation
      setTimeout(() => setShowError(true), 10); // Short delay to re-trigger
      return;
    }
    setIsFormValid(true);
    setInvalidFields([]);
    setShowError(false);
    try {

      if (workout) {
        const response = await apiClient.patch(`workouts/${workout._id}`,{ 
          title: title.trim(),
          reps,
          load
        },{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
        );
        dispatch({ type: 'UPDATE_WORKOUT', payload: response.data.workout }); // Use the actual workout object
      } else {
        const response = await apiClient.post(`/workouts`, {
          title: title.trim(),
          reps,
          load,
        },{
          headers:{
            Authorization: `Bearer ${user.token}`,
          }
        });
        dispatch({ type: 'CREATE_WORKOUT', payload: response.data });
      }
      onClose();
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  useEffect(() => {
    if (workout) {
      setTitle(workout.title);
      setReps(workout.reps);
      setLoad(workout.load);
    } else {
      setTitle('');
      setReps('');
      setLoad('');
    }
    setIsFormValid(true);
    setInvalidFields([]);
    setShowError(false);
  }, [workout]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 font-poppins backdrop-blur-md ${isDark ? 'bg-black/80' : 'bg-black/30'}`}>
      <div className={`rounded-2xl shadow-2xl p-8 w-full max-w-md border transition-colors duration-300 ${isDark ? 'bg-[#232d23] border-gray-700' : 'bg-white border-[#e0e0e0]'}`}>
        <h2 className={`text-2xl font-extrabold mb-6 tracking-tight text-center transition-colors duration-300 ${isDark ? 'text-pastel-green' : 'text-[#2ee96b]'}`}>
          {workout ? 'Edit Workout' : 'Add New Workout'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className={`block text-sm font-semibold mb-1 transition-colors duration-300 ${isDark ? 'text-pastel-green' : 'text-gray-700'}`}>Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 bg-[#f8f9fa] placeholder-gray-400 ${isDark ? 'bg-[#232d23] text-pastel-green placeholder-pastel-green/60 focus:ring-pastel-green/60 border-gray-700' : 'text-gray-800 focus:ring-[#2ee96b]/60 border-gray-300'} ${invalidFields.includes('title') ? 'border-red-500 focus:ring-red-400' : ''}`}
              placeholder="Workout Title"
            />
          </div>
          <div>
            <label htmlFor="reps" className={`block text-sm font-semibold mb-1 transition-colors duration-300 ${isDark ? 'text-pastel-green' : 'text-gray-700'}`}>Reps</label>
            <input
              type="number"
              id="reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 bg-[#f8f9fa] placeholder-gray-400 ${isDark ? 'bg-[#232d23] text-pastel-green placeholder-pastel-green/60 focus:ring-pastel-green/60 border-gray-700' : 'text-gray-800 focus:ring-[#2ee96b]/60 border-gray-300'} ${invalidFields.includes('reps') ? 'border-red-500 focus:ring-red-400' : ''}`}
              placeholder="Number of Reps"
            />
          </div>
          <div>
            <label htmlFor="load" className={`block text-sm font-semibold mb-1 transition-colors duration-300 ${isDark ? 'text-pastel-green' : 'text-gray-700'}`}>Load (kg)</label>
            <input
              type="number"
              id="load"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 bg-[#f8f9fa] placeholder-gray-400 ${isDark ? 'bg-[#232d23] text-pastel-green placeholder-pastel-green/60 focus:ring-pastel-green/60 border-gray-700' : 'text-gray-800 focus:ring-[#2ee96b]/60 border-gray-300'} ${invalidFields.includes('load') ? 'border-red-500 focus:ring-red-400' : ''}`}
              placeholder="Load in kg"
            />
          </div>
          {!isFormValid && (
            <div
              className={`text-red-500 text-sm font-semibold text-center mt-2 animate-shake ${showError ? 'animate-shake' : ''}`}
              style={{ minHeight: 24 }}
            >
              Please fill in all the fields!
            </div>
          )}
          <div className="flex justify-end space-x-2 pt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2 rounded-lg font-semibold shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 border ${isDark ? 'bg-[#ff4d4f] hover:bg-pastel-navy text-white border-gray-700' : 'bg-pastel-red hover:bg-red-600 text-white border-gray-300'} focus:ring-red-300`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-lg font-semibold shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 border ${isDark ? 'bg-pastel-navy hover:bg-pastel-green text-pastel-green border-gray-700' : 'bg-pastel-green hover:bg-[#2ee96b] text-pastel-navy border-gray-300'} focus:ring-[#2ee96b]/40`}
            >
              {workout ? 'Edit' : 'Add'} Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewWorkout;
