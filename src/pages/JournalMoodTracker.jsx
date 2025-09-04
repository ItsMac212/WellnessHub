import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Smile, Frown, Meh, Plus, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const JournalMoodTracker = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [showForm, setShowForm] = useState(false);

  const moods = [
    { value: 'excellent', label: 'Excellent', icon: '😄', color: 'text-green-600' },
    { value: 'good', label: 'Good', icon: '😊', color: 'text-green-500' },
    { value: 'okay', label: 'Okay', icon: '😐', color: 'text-yellow-500' },
    { value: 'poor', label: 'Poor', icon: '😔', color: 'text-orange-500' },
    { value: 'terrible', label: 'Terrible', icon: '😢', color: 'text-red-500' }
  ];

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newEntry.title.trim() || !newEntry.content.trim() || !newEntry.mood) {
      toast({
        title: "Please fill in all fields",
        description: "Title, content, and mood are required for your journal entry.",
        variant: "destructive"
      });
      return;
    }

    const entry = {
      id: Date.now(),
      ...newEntry,
      createdAt: new Date().toISOString()
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({
      title: '',
      content: '',
      mood: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);

    toast({
      title: "Entry saved! 📝",
      description: "Your journal entry has been saved successfully.",
    });
  };

  const getMoodIcon = (moodValue) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.icon : '😐';
  };

  const getMoodColor = (moodValue) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.color : 'text-gray-500';
  };

  const getMoodStats = () => {
    if (entries.length === 0) return null;

    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});

    const mostCommonMood = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0]] > moodCounts[b[0]] ? a : b
    )[0];

    return {
      totalEntries: entries.length,
      mostCommonMood,
      moodCounts
    };
  };

  const stats = getMoodStats();

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
            <span className="gradient-text">My Journal &</span>
            <br />
            <span className="text-slate-700">Mood Tracker</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Track your daily thoughts, feelings, and moods. Journaling can help improve mental clarity and emotional well-being.
          </p>
        </motion.div>

        {/* Stats Section */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                  <span>Your Mood Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{stats.totalEntries}</div>
                    <div className="text-slate-600">Total Entries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">{getMoodIcon(stats.mostCommonMood)}</div>
                    <div className="text-slate-600">Most Common Mood</div>
                    <div className="text-sm text-slate-500 capitalize">{stats.mostCommonMood}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center space-x-2 mb-2">
                      {moods.map(mood => (
                        <div key={mood.value} className="text-center">
                          <div className="text-lg">{mood.icon}</div>
                          <div className="text-xs text-slate-500">{stats.moodCounts[mood.value] || 0}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-slate-600">Mood Distribution</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Add Entry Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-center">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              {showForm ? 'Cancel' : 'New Journal Entry'}
            </Button>
          </div>
        </motion.div>

        {/* Entry Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                  <span>Write Your Entry</span>
                </CardTitle>
                <CardDescription>
                  Take a moment to reflect on your day and how you're feeling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Entry Title
                      </label>
                      <Input
                        value={newEntry.title}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="How was your day?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Date
                      </label>
                      <Input
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      How are you feeling today?
                    </label>
                    <Select value={newEntry.mood} onValueChange={(value) => setNewEntry(prev => ({ ...prev, mood: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your mood" />
                      </SelectTrigger>
                      <SelectContent>
                        {moods.map(mood => (
                          <SelectItem key={mood.value} value={mood.value}>
                            <div className="flex items-center space-x-2">
                              <span>{mood.icon}</span>
                              <span>{mood.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Thoughts
                    </label>
                    <Textarea
                      value={newEntry.content}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write about your day, your feelings, thoughts, or anything that's on your mind..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      Save Entry
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Entries List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Your Journal Entries</h2>
            <div className="flex items-center space-x-2 text-slate-600">
              <Calendar className="h-5 w-5" />
              <span>{entries.length} entries</span>
            </div>
          </div>

          {entries.length === 0 ? (
            <Card className="glass-effect">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No entries yet</h3>
                <p className="text-slate-500">Start your journaling journey by writing your first entry!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{entry.title}</CardTitle>
                          <CardDescription className="flex items-center space-x-4 mt-2">
                            <span>{new Date(entry.date).toLocaleDateString()}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{getMoodIcon(entry.mood)}</span>
                              <span className={`capitalize font-medium ${getMoodColor(entry.mood)}`}>
                                {entry.mood}
                              </span>
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {entry.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="glass-effect border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Benefits of Journaling & Mood Tracking
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Mental Clarity</h4>
                  <p className="text-sm text-slate-600">Organize thoughts and gain insights into your mental patterns</p>
                </div>
                <div className="text-center">
                  <div className="w-16h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Track Progress</h4>
                  <p className="text-sm text-slate-600">Monitor mood patterns and identify triggers or improvements</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💝</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Emotional Release</h4>
                  <p className="text-sm text-slate-600">Express feelings safely and reduce stress through writing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default JournalMoodTracker;