import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Signup, Profile } from "./components/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
