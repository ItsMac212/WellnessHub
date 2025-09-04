import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Smile, BookOpen, Award, Download, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import jsPDF from 'jspdf';

const UserDashboard = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
  }, []);

  const calculateStreak = () => {
    if (journalEntries.length === 0) return 0;
    const sortedDates = journalEntries
      .map(entry => new Date(entry.date).setHours(0, 0, 0, 0))
      .sort((a, b) => b - a);
    const uniqueDates = [...new Set(sortedDates)];

    let streak = 0;
    if (uniqueDates.length > 0) {
      const today = new Date().setHours(0, 0, 0, 0);
      const yesterday = new Date(today).setDate(new Date(today).getDate() - 1);
      
      if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
        streak = 1;
        for (let i = 0; i < uniqueDates.length - 1; i++) {
          const day = uniqueDates[i];
          const prevDay = uniqueDates[i+1];
          const expectedPrevDay = new Date(day).setDate(new Date(day).getDate() - 1);
          if (prevDay === expectedPrevDay) {
            streak++;
          } else {
            break;
          }
        }
      }
    }
    return streak;
  };
  
  const journalStreak = calculateStreak();

  const badges = [
    { name: 'First Entry', condition: journalEntries.length >= 1, icon: '✍️' },
    { name: '5 Entries', condition: journalEntries.length >= 5, icon: '📚' },
    { name: '10 Entries', condition: journalEntries.length >= 10, icon: '📖' },
    { name: '3-Day Streak', condition: journalStreak >= 3, icon: '🔥' },
    { name: '7-Day Streak', condition: journalStreak >= 7, icon: '🌟' },
  ];

  const handleDownloadReport = () => {
    if (journalEntries.length === 0) {
      toast({
        title: "No Data to Export",
        description: "Write some journal entries to generate a report.",
        variant: "destructive"
      });
      return;
    }
    
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Mental Wellness Journal Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Report generated on: ${new Date().toLocaleDateString()}`, 14, 28);
    
    let y = 40;
    journalEntries.slice().reverse().forEach((entry, index) => {
      if (y > 280) { // New page if content overflows
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`${entry.title} (${new Date(entry.date).toLocaleDateString()})`, 14, y);
      y += 6;
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.text(`Mood: ${entry.mood}`, 14, y);
      y += 6;
      const contentLines = doc.splitTextToSize(entry.content, 180);
      doc.text(contentLines, 14, y);
      y += (contentLines.length * 5) + 10;
    });

    doc.save('wellness-report.pdf');
    toast({
      title: "Report Downloaded",
      description: "Your journal report has been successfully generated."
    });
  };


  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">My Progress</span>
          </h1>
          <p className="text-xl text-slate-600">
            Track your habits, celebrate your achievements, and see your wellness journey unfold.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Journaling Streak */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <Card className="glass-effect h-full">
              <CardHeader><CardTitle className="flex items-center"><Calendar className="mr-2 text-emerald-600" /> Journaling Streak</CardTitle></CardHeader>
              <CardContent className="text-center">
                <p className="text-6xl font-bold text-emerald-600">{journalStreak}</p>
                <p className="text-slate-500">{journalStreak === 1 ? 'Day' : 'Days'}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Entries */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <Card className="glass-effect h-full">
              <CardHeader><CardTitle className="flex items-center"><BookOpen className="mr-2 text-blue-600" /> Total Entries</CardTitle></CardHeader>
              <CardContent className="text-center">
                <p className="text-6xl font-bold text-blue-600">{journalEntries.length}</p>
                <p className="text-slate-500">Journal Entries</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Average Mood (Placeholder) */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <Card className="glass-effect h-full">
              <CardHeader><CardTitle className="flex items-center"><Smile className="mr-2 text-purple-600" /> Average Mood</CardTitle></CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold text-purple-600">😊 Good</p>
                <p className="text-slate-500">Based on last 7 entries</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Badges and Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="glass-effect mb-12">
            <CardHeader><CardTitle className="flex items-center"><Award className="mr-2 text-yellow-500" /> Badges & Achievements</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                {badges.map(badge => (
                  <div key={badge.name} className={`text-center ${!badge.condition ? 'opacity-40' : ''}`}>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-2 ${badge.condition ? 'bg-yellow-100' : 'bg-gray-100'}`}>{badge.icon}</div>
                    <p className="text-sm font-medium text-slate-700">{badge.name}</p>
                    {badge.condition && <CheckCircle className="h-5 w-5 text-green-500 mx-auto mt-1" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Habit Trackers (Placeholder) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="glass-effect mb-12">
            <CardHeader><CardTitle>Weekly Habit Trackers</CardTitle><CardDescription>This is a placeholder for future habit tracking functionality.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Sleep (Target: 8 hours)</label>
                <Progress value={85} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Exercise (Target: 3 times/week)</label>
                <Progress value={66} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Mindfulness (Target: 5 mins/day)</label>
                <Progress value={100} className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Download Report */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="glass-effect">
            <CardHeader><CardTitle>Your Data</CardTitle></CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-slate-600 mb-4 md:mb-0">Download a PDF report of your journal and mood data to share with a professional or for your own records.</p>
              <Button onClick={handleDownloadReport} className="bg-emerald-600 hover:bg-emerald-700">
                <Download className="mr-2 h-4 w-4" /> Download Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;