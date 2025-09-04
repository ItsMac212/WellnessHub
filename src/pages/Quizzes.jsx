import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const stressQuiz = {
  title: "What's Your Stress Profile?",
  questions: [
    {
      question: "How often do you feel overwhelmed by your responsibilities?",
      options: [
        { text: "Rarely or never", score: 1 },
        { text: "Sometimes", score: 2 },
        { text: "Often", score: 3 },
        { text: "Almost always", score: 4 },
      ],
    },
    {
      question: "How well do you sleep at night?",
      options: [
        { text: "Very well, I feel rested", score: 1 },
        { text: "Fairly well, with some interruptions", score: 2 },
        { text: "Poorly, I often wake up tired", score: 3 },
        { text: "Very poorly, I struggle with insomnia", score: 4 },
      ],
    },
    {
      question: "How often do you experience physical symptoms of stress (e.g., headaches, stomach issues)?",
      options: [
        { text: "Rarely", score: 1 },
        { text: "Occasionally", score: 2 },
        { text: "Frequently", score: 3 },
        { text: "Daily", score: 4 },
      ],
    },
    {
      question: "How easily do you get irritated or angered?",
      options: [
        { text: "Not easily at all", score: 1 },
        { text: "Sometimes", score: 2 },
        { text: "Fairly easily", score: 3 },
        { text: "Very easily", score: 4 },
      ],
    },
    {
      question: "How much time do you make for relaxing activities you enjoy?",
      options: [
        { text: "Plenty of time", score: 1 },
        { text: "Some time, but not enough", score: 2 },
        { text: "Very little time", score: 3 },
        { text: "Almost no time", score: 4 },
      ],
    },
  ],
  results: [
    {
      score: 5,
      profile: "Low Stress",
      description: "You seem to have a good handle on your stress levels. Keep up the great work with your healthy coping strategies!",
    },
    {
      score: 10,
      profile: "Mild Stress",
      description: "You're experiencing some stress, which is normal. It might be helpful to incorporate more relaxation techniques into your routine.",
    },
    {
      score: 15,
      profile: "Moderate Stress",
      description: "Your stress levels are notable. It's important to actively manage this through self-care, and consider exploring new coping strategies.",
    },
    {
      score: 20,
      profile: "High Stress",
      description: "Your stress levels are high and may be impacting your well-being. Prioritizing stress management is crucial. Consider talking to a professional for support.",
    },
  ],
};

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < stressQuiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = newAnswers.reduce((acc, val) => acc + val, 0);
      setTotalScore(finalScore);
      setShowResults(true);
      toast({
        title: "Quiz Completed! 🎉",
        description: "Here are your results.",
      });
    }
  };

  const getResultProfile = () => {
    let result = stressQuiz.results[0];
    for (const res of stressQuiz.results) {
      if (totalScore <= res.score) {
        result = res;
        break;
      }
    }
    return result;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setTotalScore(0);
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
            <span className="gradient-text">Self-Assessments</span>
            <br />
            <span className="text-slate-700">& Quizzes</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Engage with these simple quizzes to gain general insights into your well-being.
          </p>
        </motion.div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-emerald-600" />
              <span>{stressQuiz.title}</span>
            </CardTitle>
            <CardDescription>
              This is not a diagnostic tool. It's for informational purposes only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showResults ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mb-6">
                  <BarChart className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800">Your Result: {getResultProfile().profile}</h3>
                  <p className="text-lg text-slate-600 mt-2">{getResultProfile().description}</p>
                </div>
                <Button onClick={restartQuiz} size="lg">Take Quiz Again</Button>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-slate-800 mb-2">
                    Question {currentQuestion + 1} of {stressQuiz.questions.length}
                  </p>
                  <h3 className="text-xl text-slate-700">
                    {stressQuiz.questions[currentQuestion].question}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stressQuiz.questions[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto py-4 text-left justify-start"
                        onClick={() => handleAnswer(option.score)}
                      >
                        <CheckCircle className="h-5 w-5 mr-3 text-slate-400" />
                        <span>{option.text}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quizzes;