import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Brain, Heart, Users, Pill, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TreatmentStrategies = () => {
  const treatments = [
    {
      icon: MessageCircle,
      title: 'Psychotherapy (Talk Therapy)',
      description: 'Working with a mental health professional to identify and change troubling emotions, thoughts, and behaviors.',
      types: [
        'Cognitive Behavioral Therapy (CBT)',
        'Dialectical Behavior Therapy (DBT)',
        'Psychodynamic Therapy',
        'Humanistic Therapy',
        'Family Therapy',
        'Group Therapy'
      ],
      benefits: [
        'Learn coping strategies',
        'Understand thought patterns',
        'Improve relationships',
        'Process traumatic experiences'
      ]
    },
    {
      icon: Pill,
      title: 'Medication',
      description: 'Psychiatric medications can help manage symptoms of mental health conditions.',
      types: [
        'Antidepressants',
        'Anti-anxiety medications',
        'Mood stabilizers',
        'Antipsychotics',
        'Stimulants (for ADHD)',
        'Sleep medications'
      ],
      benefits: [
        'Reduce symptoms',
        'Improve daily functioning',
        'Enhance therapy effectiveness',
        'Prevent relapse'
      ]
    },
    {
      icon: Heart,
      title: 'Lifestyle Changes',
      description: 'Healthy lifestyle choices that can significantly impact mental health and well-being.',
      types: [
        'Regular exercise',
        'Balanced nutrition',
        'Adequate sleep',
        'Stress management',
        'Mindfulness practices',
        'Social connections'
      ],
      benefits: [
        'Boost mood naturally',
        'Increase energy levels',
        'Improve sleep quality',
        'Reduce stress hormones'
      ]
    },
    {
      icon: Users,
      title: 'Support Groups',
      description: 'Connecting with others who share similar experiences and challenges.',
      types: [
        'Peer support groups',
        'Online communities',
        'Family support groups',
        '12-step programs',
        'Condition-specific groups',
        'Professional-led groups'
      ],
      benefits: [
        'Reduce isolation',
        'Share experiences',
        'Learn from others',
        'Build social connections'
      ]
    }
  ];

  const copingStrategies = [
    {
      category: 'Immediate Coping',
      strategies: [
        'Deep breathing exercises',
        'Progressive muscle relaxation',
        'Grounding techniques (5-4-3-2-1)',
        'Mindful observation',
        'Cold water on face/hands',
        'Listen to calming music'
      ]
    },
    {
      category: 'Daily Practices',
      strategies: [
        'Regular sleep schedule',
        'Daily physical activity',
        'Journaling',
        'Meditation or prayer',
        'Healthy meal planning',
        'Limit alcohol and caffeine'
      ]
    },
    {
      category: 'Long-term Strategies',
      strategies: [
        'Build strong relationships',
        'Develop hobbies and interests',
        'Set realistic goals',
        'Practice self-compassion',
        'Learn stress management',
        'Regular mental health check-ins'
      ]
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
            <span className="gradient-text">Treatment &</span>
            <br />
            <span className="text-slate-700">Coping Strategies</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore various treatment options and coping strategies that can help manage mental health conditions effectively.
          </p>
        </motion.div>

        {/* Professional Treatments */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Professional Treatment Options</h2>
            <p className="text-lg text-slate-600">Evidence-based treatments provided by mental health professionals</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full glass-effect hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-full bg-emerald-100">
                        <treatment.icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <CardTitle className="text-xl">{treatment.title}</CardTitle>
                    </div>
                    <CardDescription className="text-slate-600">
                      {treatment.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Types/Methods</h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                          {treatment.types.map((type, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-emerald-500 mr-2">•</span>
                              {type}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Benefits</h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                          {treatment.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coping Strategies */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Self-Help Coping Strategies</h2>
            <p className="text-lg text-slate-600">Practical techniques you can use to manage stress and improve mental well-being</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {copingStrategies.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full glass-effect">
                  <CardHeader>
                    <CardTitle className="text-xl text-center">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.strategies.map((strategy, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-emerald-500 mr-2 mt-1">✓</span>
                          <span className="text-slate-700">{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="glass-effect border-blue-200">
            <CardContent className="p-8 text-center">
              <Stethoscope className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Professional Guidance is Key</h3>
              <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto">
                While self-help strategies are valuable, they work best when combined with professional treatment. 
                A mental health professional can help you develop a personalized treatment plan that addresses your specific needs and circumstances.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TreatmentStrategies;