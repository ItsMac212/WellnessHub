import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Waves, Eye, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const MindfulnessExercises = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale'); // inhale, hold, exhale, pause
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [breathingCycle, setBreathingCycle] = useState(0);

  const breathingPhases = {
    inhale: { duration: 4, instruction: 'Breathe In', color: 'bg-blue-400' },
    hold: { duration: 7, instruction: 'Hold', color: 'bg-purple-400' },
    exhale: { duration: 8, instruction: 'Breathe Out', color: 'bg-green-400' },
    pause: { duration: 1, instruction: 'Pause', color: 'bg-gray-400' }
  };

  const groundingSteps = [
    {
      number: 5,
      sense: 'See',
      instruction: 'Name 5 things you can see around you',
      icon: Eye,
      color: 'text-blue-600',
      examples: ['A book on the table', 'The color of the walls', 'Light coming through the window', 'Your hands', 'A piece of furniture']
    },
    {
      number: 4,
      sense: 'Touch',
      instruction: 'Name 4 things you can touch or feel',
      icon: Hand,
      color: 'text-green-600',
      examples: ['The texture of your clothes', 'The temperature of the air', 'The surface you\'re sitting on', 'Your feet in your shoes']
    },
    {
      number: 3,
      sense: 'Hear',
      instruction: 'Name 3 things you can hear',
      icon: Waves,
      color: 'text-purple-600',
      examples: ['Background noise', 'Your own breathing', 'Sounds from outside', 'The hum of electronics']
    },
    {
      number: 2,
      sense: 'Smell',
      instruction: 'Name 2 things you can smell',
      icon: '👃',
      color: 'text-orange-600',
      examples: ['The air freshener', 'Coffee', 'Your perfume/cologne', 'Food cooking']
    },
    {
      number: 1,
      sense: 'Taste',
      instruction: 'Name 1 thing you can taste',
      icon: '👅',
      color: 'text-red-600',
      examples: ['The taste in your mouth', 'Gum or mint', 'Lingering taste from a drink', 'Take a sip of water']
    }
  ];

  useEffect(() => {
    let interval;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          const currentPhase = breathingPhases[breathingPhase];
          if (prev >= currentPhase.duration) {
            // Move to next phase
            const phases = Object.keys(breathingPhases);
            const currentIndex = phases.indexOf(breathingPhase);
            const nextIndex = (currentIndex + 1) % phases.length;
            const nextPhase = phases[nextIndex];
            
            setBreathingPhase(nextPhase);
            
            if (nextPhase === 'inhale') {
              setBreathingCycle(cycle => cycle + 1);
            }
            
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase]);

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingTimer(0);
    setBreathingCycle(0);
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    setBreathingTimer(0);
  };

  const resetBreathing = () => {
    setBreathingActive(false);
    setBreathingPhase('inhale');
    setBreathingTimer(0);
    setBreathingCycle(0);
  };

  const handleGroundingComplete = () => {
    toast({
      title: "Great job! 🌟",
      description: "You've completed the 5-4-3-2-1 grounding technique. How do you feel?",
    });
  };

  const currentPhase = breathingPhases[breathingPhase];
  const progress = (breathingTimer / currentPhase.duration) * 100;

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
            <span className="gradient-text">Mindfulness &</span>
            <br />
            <span className="text-slate-700">Coping Exercises</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Practice these evidence-based mindfulness techniques to reduce stress, anxiety, and improve your overall well-being.
          </p>
        </motion.div>

        {/* 4-7-8 Breathing Exercise */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-effect">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl flex items-center justify-center space-x-2">
                  <Waves className="h-8 w-8 text-blue-600" />
                  <span>4-7-8 Breathing Exercise</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  A powerful technique to reduce anxiety and promote relaxation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Instructions */}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800">How it works:</h3>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Inhale (4s)</div>
                      <div className="text-blue-600">Breathe in through your nose</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-purple-800">Hold (7s)</div>
                      <div className="text-purple-600">Hold your breath</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Exhale (8s)</div>
                      <div className="text-green-600">Breathe out through your mouth</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-800">Pause (1s)</div>
                      <div className="text-gray-600">Brief pause before repeating</div>
                    </div>
                  </div>
                </div>

                {/* Breathing Circle */}
                <div className="flex flex-col items-center space-y-8">
                  <div className="relative">
                    <div className={`w-64 h-64 rounded-full ${currentPhase.color} transition-all duration-1000 flex items-center justify-center ${breathingActive ? 'breathing-circle' : ''}`}>
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold mb-2">{currentPhase.instruction}</div>
                        <div className="text-lg">{currentPhase.duration - breathingTimer}s</div>
                        {breathingCycle > 0 && (
                          <div className="text-sm mt-2">Cycle: {breathingCycle}</div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-64 h-64 transform -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="white"
                        strokeWidth="4"
                        fill="transparent"
                        strokeOpacity="0.3"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="white"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 120}`}
                        strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                  </div>

                  {/* Controls */}
                  <div className="flex space-x-4">
                    {!breathingActive ? (
                      <Button onClick={startBreathing} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                        <Play className="h-5 w-5 mr-2" />
                        Start Exercise
                      </Button>
                    ) : (
                      <Button onClick={stopBreathing} size="lg" variant="outline">
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={resetBreathing} size="lg" variant="outline">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* 5-4-3-2-1 Grounding Technique */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-effect">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">5-4-3-2-1 Grounding Technique</CardTitle>
                <CardDescription className="text-lg">
                  Use your five senses to ground yourself in the present moment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center mb-8">
                  <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto">
                    This technique helps interrupt anxious thoughts and brings your attention back to the present. 
                    Work through each step slowly and mindfully.
                  </p>
                </div>

                <div className="space-y-6">
                  {groundingSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <Card className="glass-effect border-l-4 border-l-emerald-500">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-emerald-700">{step.number}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                {typeof step.icon === 'string' ? (
                                  <span className="text-2xl">{step.icon}</span>
                                ) : (
                                  <step.icon className={`h-6 w-6 ${step.color}`} />
                                )}
                                <h3 className="text-xl font-semibold text-slate-800">
                                  {step.instruction}
                                </h3>
                              </div>
                              <div className="text-slate-600 mb-3">
                                Focus on your sense of {step.sense.toLowerCase()} and identify {step.number} thing{step.number > 1 ? 's' : ''}.
                              </div>
                              <div className="text-sm text-slate-500">
                                <span className="font-medium">Examples: </span>
                                {step.examples.join(', ')}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center pt-6">
                  <Button 
                    onClick={handleGroundingComplete} 
                    size="lg" 
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    I've Completed the Exercise
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="glass-effect border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Benefits of Regular Mindfulness Practice
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Mental Clarity</h4>
                  <p className="text-sm text-slate-600">Improved focus, concentration, and decision-making abilities</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">😌</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Stress Reduction</h4>
                  <p className="text-sm text-slate-600">Lower cortisol levels and reduced anxiety symptoms</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💤</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Better Sleep</h4>
                  <p className="text-sm text-slate-600">Improved sleep quality and easier time falling asleep</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MindfulnessExercises;