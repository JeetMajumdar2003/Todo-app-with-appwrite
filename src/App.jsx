import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login, Signup, Profile, TodoForm, TodoList } from "./components/index"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
