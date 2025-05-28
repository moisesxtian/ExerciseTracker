import MainPage from "./pages/MainPage"
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import {BrowserRouter, Route, Routes} from "react-router-dom"
function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
