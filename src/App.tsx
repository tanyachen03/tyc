import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ChapterPage } from './pages/ChapterPage';
import { QuizPage } from './pages/QuizPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/course/:courseId/chapter/:chapterId" element={<ChapterPage />} />
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/project/:projectId" element={<ProjectDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
