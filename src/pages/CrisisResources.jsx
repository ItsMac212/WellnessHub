import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Globe, AlertTriangle, Heart, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CrisisResources = () => {
  const crisisHotlines = [
    {
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      description: '24/7 free and confidential support for people in distress',
      availability: '24/7',
      languages: 'English, Spanish',
      icon: Phone,
      color: 'text-red-600'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text message',
      availability: '24/7',
      languages: 'English, Spanish',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      name: 'National Domestic Violence Hotline',
      number: '1-800-799-7233',
      description: 'Support for domestic violence survivors',
      availability: '24/7',
      languages: 'Multiple languages',
      icon: Phone,
      color: 'text-purple-600'
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information service',
      availability: '24/7',
      languages: 'English, Spanish',
      icon: Phone,
      color: 'text-green-600'
    },
    {
      name: 'National Sexual Assault Hotline',
      number: '1-800-656-4673',
      description: 'Support for sexual assault survivors',
      availability: '24/7',
      languages: 'English, Spanish',
      icon: Phone,
      color: 'text-orange-600'
    },
    {
      name: 'Trans Lifeline',
      number: '877-565-8860',
      description: 'Crisis support for transgender individuals',
      availability: 'Varies',
      languages: 'English',
      icon: Phone,
      color: 'text-pink-600'
    }
  ];

  const emergencySigns = [
    'Thoughts of suicide or self-harm',
    'Plans to hurt yourself or others',
    'Hearing voices or seeing things',
    'Severe depression or hopelessness',
    'Substance abuse emergency',
    'Domestic violence situation',
    'Sexual assault or abuse',
    'Panic attacks or severe anxiety'
  ];

  const immediateSteps = [
    {
      step: '1',
      title: 'Ensure Safety',
      description: 'If you or someone else is in immediate danger, call 911 or go to the nearest emergency room.'
    },
    {
      step: '2',
      title: 'Reach Out',
      description: 'Contact a crisis hotline, trusted friend, family member, or mental health professional.'
    },
    {
      step: '3',
      title: 'Stay Connected',
      description: 'Don\'t isolate yourself. Stay with someone you trust or in a safe environment.'
    },
    {
      step: '4',
      title: 'Remove Means',
      description: 'Remove or secure any items that could be used for self-harm.'
    },
    {
      step: '5',
      title: 'Follow Up',
      description: 'Make a plan for ongoing support and professional help.'
    }
  ];

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
            <span className="gradient-text">Crisis Support &</span>
            <br />
            <span className="text-slate-700">Emergency Resources</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            If you're in crisis or need immediate support, help is available 24/7. You are not alone.
          </p>
        </motion.div>

        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <h2 className="text-2xl font-bold text-red-800">Emergency Situations</h2>
              </div>
              <p className="text-center text-red-700 text-lg font-medium mb-4">
                If you or someone you know is in immediate danger, call 911 or go to your nearest emergency room.
              </p>
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  <Phone className="h-6 w-6" />
                  <span>Call 988 for Crisis Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Crisis Hotlines */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Crisis Hotlines & Support</h2>
            <p className="text-lg text-slate-600">Free, confidential support available 24/7</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crisisHotlines.map((hotline, index) => (
              <motion.div
                key={hotline.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full glass-effect hover:shadow-lg transition-all duration-300 pulse-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-full bg-white/50">
                        <hotline.icon className={`h-6 w-6 ${hotline.color}`} />
                      </div>
                      <CardTitle className="text-lg">{hotline.name}</CardTitle>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 mb-2">
                      {hotline.number}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-slate-700">
                      {hotline.description}
                    </CardDescription>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">{hotline.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">{hotline.languages}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Warning Signs */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  <span>When to Seek Immediate Help</span>
                </CardTitle>
                <CardDescription className="text-center">
                  Contact emergency services or a crisis hotline if you or someone you know is experiencing:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {emergencySigns.map((sign, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                      className="flex items-center space-x-3 p-3 bg-orange-50/50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-slate-700">{sign}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Immediate Steps */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">What to Do in a Crisis</h2>
            <p className="text-lg text-slate-600">Follow these steps to ensure safety and get help</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {immediateSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                <Card className="h-full text-center glass-effect">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="glass-effect border-emerald-200">
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">You Are Not Alone</h3>
              <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Crisis situations are temporary, and help is always available. Reaching out for support is a sign of strength, not weakness. 
                Mental health professionals, crisis counselors, and support networks are here to help you through difficult times.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CrisisResources;