import {useState} from 'react';
const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login form submitted with email:", email, "and password:", password);
    }
        
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue to-pastel-mint font-poppins animate-fade-in-up">
            <div className={`rounded-2xl shadow-2xl p-8 w-full max-w-sm border transition-colors duration-300 backdrop-blur-md ${document.body.classList.contains('dark-mode') ? 'bg-[#232d23] border-gray-700' : 'bg-white/80 border-gray-200'} flex flex-col items-center justify-center animate-card-fade-in`}>
                <h2 className={`text-3xl font-extrabold mb-6 text-center tracking-tight animate-slide-down ${document.body.classList.contains('dark-mode') ? 'text-pastel-green' : 'text-pastel-navy'}`}>Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5 w-full flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-full">
                        <label htmlFor="email" className={`block text-sm font-semibold mb-1 ${document.body.classList.contains('dark-mode') ? 'text-pastel-green' : 'text-gray-700'}`}>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            className={`w-full border rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 bg-[#f8f9fa] placeholder-gray-400 ${document.body.classList.contains('dark-mode') ? 'bg-[#232d23] text-pastel-green placeholder-pastel-green/60 focus:ring-pastel-green/40 border-gray-700' : 'text-gray-800 focus:ring-pastel-green/40 border-gray-300'}`}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className={`block text-sm font-semibold mb-1 ${document.body.classList.contains('dark-mode') ? 'text-pastel-green' : 'text-gray-700'}`}>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            className={`w-full border rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 bg-[#f8f9fa] placeholder-gray-400 ${document.body.classList.contains('dark-mode') ? 'bg-[#232d23] text-pastel-green placeholder-pastel-green/60 focus:ring-pastel-green/40 border-gray-700' : 'text-gray-800 focus:ring-pastel-green/40 border-gray-300'}`}
                        />
                    </div>
                    <button type="submit" className={`w-full bg-pastel-green dark:bg-pastel-navy text-pastel-navy dark:text-pastel-green font-bold py-2 rounded-xl shadow-md hover:bg-pastel-navy hover:text-pastel-green dark:hover:bg-pastel-green dark:hover:text-pastel-navy transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pastel-green/40 mt-2 animate-bounce-short`}>Login</button>
                </form>
                <div className="w-full text-center mt-6 animate-fade-in-up">
                    <span className={`${document.body.classList.contains('dark-mode') ? 'text-pastel-green/80' : 'text-pastel-navy/80'} text-sm`}>Don't have an account yet? </span>
                    <a href="/signup" className="font-bold underline text-pastel-green dark:text-pastel-green hover:text-pastel-navy dark:hover:text-pastel-navy transition-colors duration-200">Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default Login;