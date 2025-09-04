import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Edit, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const CbtExercises = () => {
  const [thoughtRecord, setThoughtRecord] = useState({
    situation: '',
    automaticThought: '',
    emotions: '',
    evidenceFor: '',
    evidenceAgainst: '',
    alternativeThought: '',
    outcome: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThoughtRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Thought Record Saved! ✨",
      description: "Great job on completing the exercise. Reflection is a key step.",
    });
  };

  const handleReset = () => {
    setThoughtRecord({
      situation: '',
      automaticThought: '',
      emotions: '',
      evidenceFor: '',
      evidenceAgainst: '',
      alternativeThought: '',
      outcome: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">CBT Exercises</span>
            <br />
            <span className="text-slate-700">Thought Record</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Use this Cognitive Behavioral Therapy tool to identify, challenge, and reframe negative thoughts.
          </p>
        </motion.div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-emerald-600" />
              <span>Challenging Your Thoughts</span>
            </CardTitle>
            <CardDescription>
              Follow the steps below to analyze an automatic negative thought.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-emerald-50 rounded-lg"
              >
                <CheckSquare className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">Exercise Complete!</h3>
                <p className="text-lg text-slate-600 mt-2 mb-6">
                  You've successfully completed the thought record. Take a moment to reflect on your new, more balanced perspective.
                </p>
                <Button onClick={handleReset} size="lg">Start a New Record</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="font-semibold text-slate-800">1. Situation</label>
                  <p className="text-sm text-slate-600">What happened? Where were you? Who were you with?</p>
                  <Textarea name="situation" value={thoughtRecord.situation} onChange={handleChange} placeholder="e.g., I made a mistake in a presentation at work." required />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-800">2. Automatic Thought(s)</label>
                  <p className="text-sm text-slate-600">What went through your mind? What did you think would happen?</p>
                  <Textarea name="automaticThought" value={thoughtRecord.automaticThought} onChange={handleChange} placeholder="e.g., 'I'm so incompetent. Everyone thinks I'm a failure.'" required />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-800">3. Emotions</label>
                  <p className="text-sm text-slate-600">What did you feel? Rate the intensity (0-100%).</p>
                  <Input name="emotions" value={thoughtRecord.emotions} onChange={handleChange} placeholder="e.g., Anxiety (90%), Shame (80%)" required />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-800">4. Evidence FOR the thought</label>
                  <p className="text-sm text-slate-600">What facts support this thought?</p>
                  <Textarea name="evidenceFor" value={thoughtRecord.evidenceFor} onChange={handleChange} placeholder="e.g., I stumbled over a few words." />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-800">5. Evidence AGAINST the thought</label>
                  <p className="text-sm text-slate-600">What facts contradict this thought?</p>
                  <Textarea name="evidenceAgainst" value={thoughtRecord.evidenceAgainst} onChange={handleChange} placeholder="e.g., My boss said it was a good presentation overall. A colleague told me they found it helpful." />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-800">6. Alternative/Balanced Thought</label>
                  <p className="text-sm text-slate-600">What's a more realistic way of looking at the situation?</p>
                  <Textarea name="alternativeThought" value={thoughtRecord.alternativeThought} onChange={handleChange} placeholder="e.g., 'I made a small mistake, but it doesn't mean I'm a failure. Most of the presentation went well, and I can learn from this.'" required />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-800">7. Outcome</label>
                  <p className="text-sm text-slate-600">How do you feel now? Rate your emotions again.</p>
                  <Input name="outcome" value={thoughtRecord.outcome} onChange={handleChange} placeholder="e.g., Anxiety (40%), Relief (60%)" required />
                </div>
                <div className="flex space-x-4 pt-4">
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Complete Record
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CbtExercises;