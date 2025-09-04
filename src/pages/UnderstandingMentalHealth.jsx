import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const UnderstandingMentalHealth = () => {
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
            <span className="gradient-text">Understanding</span>
            <br />
            <span className="text-slate-700">Mental Health</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Mental health is just as important as physical health. Learn the fundamentals and take the first step toward wellness.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Brain className="h-8 w-8 text-emerald-600" />
                  <CardTitle className="text-2xl">What is Mental Health?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Mental health is important at every stage of life, from childhood and adolescence through adulthood. Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-red-500" />
                  <CardTitle className="text-2xl">Why Mental Health Matters</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Personal Well-being</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li>• Better quality of life</li>
                      <li>• Improved relationships</li>
                      <li>• Enhanced productivity</li>
                      <li>• Greater resilience</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Physical Health</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li>• Stronger immune system</li>
                      <li>• Better sleep patterns</li>
                      <li>• Reduced chronic disease risk</li>
                      <li>• Increased longevity</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-effect border-orange-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                  <CardTitle className="text-2xl text-orange-800">Important Disclaimer</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="bg-orange-50/50 rounded-lg p-6">
                <p className="text-orange-800 leading-relaxed font-medium">
                  <strong>This website is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.</strong>
                </p>
                <p className="text-orange-700 mt-4 leading-relaxed">
                  Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
                </p>
                <p className="text-orange-700 mt-4 leading-relaxed">
                  If you are experiencing a mental health emergency, please contact your local emergency services or crisis hotline immediately.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl">Signs of Good Mental Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">😊</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Emotional Balance</h3>
                    <p className="text-sm text-slate-600">Ability to manage emotions and cope with life's challenges</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Healthy Relationships</h3>
                    <p className="text-sm text-slate-600">Maintaining meaningful connections with others</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Sense of Purpose</h3>
                    <p className="text-sm text-slate-600">Having goals and finding meaning in daily activities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingMentalHealth;