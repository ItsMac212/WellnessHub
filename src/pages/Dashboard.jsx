import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Award, Flame, BarChart, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [mindfulnessSessions, setMindfulnessSessions] = useState(0);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    setJournalEntries(savedEntries);
    
    const savedSessions = parseInt(localStorage.getItem('mindfulnessSessions') || '0', 10);
    setMindfulnessSessions(savedSessions);
  }, []);

  const getDailyCheckInStreak = () => {
    if (journalEntries.length === 0) return 0;
    const sortedEntries = [...journalEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const entryDates = [...new Set(sortedEntries.map(e => {
      const date = new Date(e.date);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }))];

    if (entryDates.length === 0) return 0;

    const mostRecentEntryDate = new Date(entryDates[0]);
    const diffTime = today.getTime() - mostRecentEntryDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) return 0;

    streak = 1;
    for (let i = 0; i < entryDates.length - 1; i++) {
      const currentDate = new Date(entryDates[i]);
      const previousDate = new Date(entryDates[i + 1]);
      const dayDiff = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);
      if (dayDiff === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getBadges = () => {
    const badges = [];
    if (journalEntries.length >= 1) badges.push({ icon: '📝', name: 'First Entry' });
    if (journalEntries.length >= 10) badges.push({ icon: '✍️', name: 'Consistent Journalist' });
    if (mindfulnessSessions >= 1) badges.push({ icon: '🧘', name: 'Mindful Start' });
    if (mindfulnessSessions >= 10) badges.push({ icon: '🧘‍♀️', name: 'Zen Master' });
    if (getDailyCheckInStreak() >= 7) badges.push({ icon: '🔥', name: 'Week Streak' });
    return badges;
  };

  const downloadReport = () => {
    const reportElement = document.getElementById('report-content');
    if (!reportElement) {
      toast({ title: "Error", description: "Could not find report content.", variant: "destructive" });
      return;
    }

    toast({ title: "Generating Report...", description: "Please wait a moment." });

    html2canvas(reportElement, { backgroundColor: '#f8fafc' }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const imgWidth = pdfWidth - 20;
      const imgHeight = imgWidth / ratio;
      
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20);

      while (heightLeft > 0) {
        position -= (pdfHeight - 20);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }
      
      pdf.save(`wellness-report-${new Date().toISOString().split('T')[0]}.pdf`);
      toast({ title: "Report Downloaded!", description: "Your PDF report has been saved." });
    });
  };

  const streak = getDailyCheckInStreak();
  const badges = getBadges();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Your Wellness</span>
            <br />
            <span className="text-slate-700">Dashboard</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Track your progress, celebrate your achievements, and gain insights into your wellness journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-effect h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2"><Flame className="h-6 w-6 text-orange-500" /><span>Daily Check-in Streak</span></CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-bold text-orange-500">{streak}</div>
                <p className="text-slate-600 mt-2">{streak === 1 ? 'Day' : 'Days'}</p>
                <p className="text-sm text-slate-500 mt-4">Keep it up! Consistency is key.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass-effect h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2"><Award className="h-6 w-6 text-yellow-500" /><span>Achievements</span></CardTitle>
              </CardHeader>
              <CardContent>
                {badges.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {badges.map(badge => (
                      <div key={badge.name} className="text-center" title={badge.name}>
                        <div className="text-4xl p-3 bg-yellow-100 rounded-full">{badge.icon}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">Complete activities to earn badges!</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="glass-effect h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2"><BarChart className="h-6 w-6 text-blue-500" /><span>Activity Stats</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Journal Entries</span>
                  <span className="font-bold text-emerald-600">{journalEntries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Mindfulness Sessions</span>
                  <span className="font-bold text-emerald-600">{mindfulnessSessions}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2"><Download className="h-6 w-6 text-emerald-600" /><span>Download Your Report</span></CardTitle>
              <CardDescription>Generate a PDF of your journal entries to review or share with a professional.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={downloadReport} disabled={journalEntries.length === 0}>
                {journalEntries.length === 0 ? "No entries to report" : "Download PDF Report"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <div id="report-container" className="absolute -top-[9999px] -left-[9999px]">
          <div id="report-content" className="p-8 bg-slate-50 w-[800px]">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Wellness Hub Report</h1>
            <p className="text-slate-600 mb-8">Generated on: {new Date().toLocaleDateString()}</p>
            <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-4 border-b pb-2">Journal Entries</h2>
            {journalEntries.length > 0 ? journalEntries.map(entry => (
              <div key={entry.id} className="mb-6 pb-4 border-b last:border-b-0">
                <h3 className="text-xl font-bold text-slate-800">{entry.title}</h3>
                <p className="text-sm text-slate-500 mb-2">Date: {new Date(entry.date).toLocaleDateString()} | Mood: {entry.mood}</p>
                <p className="text-slate-700 whitespace-pre-wrap">{entry.content}</p>
              </div>
            )) : <p>No journal entries found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;