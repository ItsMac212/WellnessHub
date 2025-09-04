import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import UnderstandingMentalHealth from '@/pages/UnderstandingMentalHealth';
import CommonConditions from '@/pages/CommonConditions';
import TreatmentStrategies from '@/pages/TreatmentStrategies';
import FindProfessional from '@/pages/FindProfessional';
import CrisisResources from '@/pages/CrisisResources';
import MindfulnessExercises from '@/pages/MindfulnessExercises';
import JournalMoodTracker from '@/pages/JournalMoodTracker';
import CommunityForum from '@/pages/CommunityForum';
import CommunityBlog from '@/pages/CommunityBlog';
import AdminSignIn from '@/pages/AdminSignIn';
import Quizzes from '@/pages/Quizzes';
import CbtExercises from '@/pages/CbtExercises';
import Dashboard from '@/pages/Dashboard';


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Helmet>
          <title>Mental Health & Wellness Hub - Your Journey to Better Mental Health</title>
          <meta name="description" content="Comprehensive mental health resources, tools, and community support for your wellness journey. Find professional help, practice mindfulness, and connect with others." />
          <meta property="og:title" content="Mental Health & Wellness Hub - Your Journey to Better Mental Health" />
          <meta property="og:description" content="Comprehensive mental health resources, tools, and community support for your wellness journey. Find professional help, practice mindfulness, and connect with others." />
        </Helmet>
        
        <Navbar />
        
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/understanding" element={<UnderstandingMentalHealth />} />
            <Route path="/conditions" element={<CommonConditions />} />
            <Route path="/treatment" element={<TreatmentStrategies />} />
            <Route path="/find-professional" element={<FindProfessional />} />
            <Route path="/crisis" element={<CrisisResources />} />
            <Route path="/mindfulness" element={<MindfulnessExercises />} />
            <Route path="/journal" element={<JournalMoodTracker />} />
            <Route path="/forum" element={<CommunityForum />} />
            <Route path="/blog" element={<CommunityBlog />} />
            <Route path="/admin-signin" element={<AdminSignIn />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/cbt-exercises" element={<CbtExercises />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;