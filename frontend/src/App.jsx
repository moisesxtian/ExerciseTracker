import MainPage from "./pages/MainPage"
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {useAuthContext} from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <MainPage /> : <Login />} />
          <Route path="/login" element={!user? <Login /> : <MainPage />} />
          <Route path="/signup" element={!user? <Signup /> : <MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
