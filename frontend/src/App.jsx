import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import History from "./pages/History"
import Status from "./pages/Status"
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
        <div className="max-w-6xl mx-auto py-10 px-6">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/status" element={<Status />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
