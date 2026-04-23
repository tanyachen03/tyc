import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/auth/Profile";
import CodeRunner from "@/pages/CodeRunner";
import Progress from "@/pages/Progress";
import Exercises from "@/pages/learning/Exercises";
import Projects from "@/pages/projects/Projects";
import Recommendations from "@/pages/Recommendations";
import Community from "@/pages/community/Community";
import Achievements from "@/pages/Achievements";
import Examples from "@/pages/Examples";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/code" element={<CodeRunner />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/community" element={<Community />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}
