import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/auth/Profile";
import Courses from "@/pages/courses/Courses";
import Chapter from "@/pages/courses/Chapter";
import CodeExercise from "@/pages/learning/CodeExercise";
import Exercises from "@/pages/learning/Exercises";
import Projects from "@/pages/projects/Projects";
import CodeRunner from "@/pages/CodeRunner";
import Community from "@/pages/community/Community";
import Progress from "@/pages/Progress";
import Achievements from "@/pages/Achievements";
import Recommendations from "@/pages/Recommendations";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId/chapters/:chapterId" element={<Chapter />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/code-exercises" element={<CodeExercise />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Projects />} />
          <Route path="/code" element={<CodeRunner />} />
          <Route path="/community" element={<Community />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </Layout>
    </Router>
  );
}
