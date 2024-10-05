
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Componenet/Home.jsx";
import UserDetails from "./Componenet/Userdetail.jsx";
import "D:/React tutorial/user-management-app/src/App.css"
function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

