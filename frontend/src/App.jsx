import MainPage from "./pages/MainPage"
import Navbar from "./components/Navbar";

import {BrowserRouter, Route, Routes} from "react-router-dom"
function App() {

  return (
    console.log("App component rendered"),
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
