import { useState } from 'react';
import axios from 'axios';
//create a new workout component overlaying the main page
const NewWorkout = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/workouts', {
                title,
                reps,
                load,
            });
            console.log('Workout added:', response.data);
            onClose(); // Close the form after submission
        } catch (error) {
            console.error('Error adding workout:', error);
        }
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-[#2ee96b] mb-4">Add New Workout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Title
                </label>
                <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Workout Title"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="reps" className="block text-gray-700 text-sm font-bold mb-2">
                Reps
                </label>
                <input
                type="number"
                id="reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Number of Reps"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="load" className="block text-gray-700 text-sm font-bold mb-2">
                Load (kg)
                </label>
                <input
                type="number"
                id="load"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Load in kg"
                />
            </div>

            <div className="flex items-center justify-between">
                <button
                type="button"
                onClick={onClose}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="bg-[#2ee96b] hover:bg-[#1b2b1b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                Add Workout
                </button>
            </div>
            </form>

        </div>
        </div>
    );
}
export default NewWorkout;