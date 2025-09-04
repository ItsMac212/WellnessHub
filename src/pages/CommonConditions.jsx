import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommonConditions = () => {
  const conditions = [
    {
      id: 'anxiety',
      title: 'Anxiety Disorders',
      icon: '😰',
      description: 'Excessive worry, fear, or nervousness that interferes with daily activities.',
      details: {
        symptoms: [
          'Persistent worry or fear',
          'Restlessness or feeling on edge',
          'Difficulty concentrating',
          'Physical symptoms like rapid heartbeat',
          'Avoiding certain situations or places'
        ],
        types: [
          'Generalized Anxiety Disorder (GAD)',
          'Panic Disorder',
          'Social Anxiety Disorder',
          'Specific Phobias',
          'Agoraphobia'
        ],
        prevalence: 'Affects about 18% of adults in the US each year'
      }
    },
    {
      id: 'depression',
      title: 'Depression',
      icon: '😔',
      description: 'Persistent feelings of sadness, hopelessness, and loss of interest in activities.',
      details: {
        symptoms: [
          'Persistent sad or empty mood',
          'Loss of interest in activities',
          'Fatigue or decreased energy',
          'Changes in appetite or weight',
          'Sleep disturbances',
          'Feelings of worthlessness or guilt'
        ],
        types: [
          'Major Depressive Disorder',
          'Persistent Depressive Disorder',
          'Seasonal Affective Disorder',
          'Postpartum Depression',
          'Bipolar Depression'
        ],
        prevalence: 'Affects about 8.5% of adults in the US each year'
      }
    },
    {
      id: 'bipolar',
      title: 'Bipolar Disorder',
      icon: '🎭',
      description: 'Extreme mood swings between manic highs and depressive lows.',
      details: {
        symptoms: [
          'Manic episodes: elevated mood, increased energy',
          'Depressive episodes: sadness, hopelessness',
          'Rapid speech during manic phases',
          'Impulsive behavior',
          'Sleep disturbances',
          'Difficulty concentrating'
        ],
        types: [
          'Bipolar I Disorder',
          'Bipolar II Disorder',
          'Cyclothymic Disorder',
          'Other Specified Bipolar Disorders'
        ],
        prevalence: 'Affects about 2.8% of adults in the US each year'
      }
    },
    {
      id: 'ptsd',
      title: 'Post-Traumatic Stress Disorder (PTSD)',
      icon: '⚡',
      description: 'Mental health condition triggered by experiencing or witnessing a traumatic event.',
      details: {
        symptoms: [
          'Intrusive memories or flashbacks',
          'Nightmares about the trauma',
          'Avoiding trauma-related triggers',
          'Negative changes in thinking and mood',
          'Hypervigilance or being easily startled',
          'Emotional numbness'
        ],
        types: [
          'Acute Stress Disorder',
          'Complex PTSD',
          'Combat-related PTSD',
          'Childhood trauma PTSD'
        ],
        prevalence: 'Affects about 3.5% of adults in the US each year'
      }
    },
    {
      id: 'ocd',
      title: 'Obsessive-Compulsive Disorder (OCD)',
      icon: '🔄',
      description: 'Unwanted, intrusive thoughts (obsessions) and repetitive behaviors (compulsions).',
      details: {
        symptoms: [
          'Persistent, unwanted thoughts',
          'Repetitive behaviors or mental acts',
          'Fear of contamination',
          'Need for symmetry or order',
          'Aggressive or disturbing thoughts',
          'Checking behaviors'
        ],
        types: [
          'Contamination OCD',
          'Checking OCD',
          'Symmetry and Ordering',
          'Intrusive Thoughts',
          'Hoarding Disorder'
        ],
        prevalence: 'Affects about 1.2% of adults in the US each year'
      }
    },
    {
      id: 'adhd',
      title: 'Attention-Deficit/Hyperactivity Disorder (ADHD)',
      icon: '🌪️',
      description: 'Persistent pattern of inattention and/or hyperactivity-impulsivity.',
      details: {
        symptoms: [
          'Difficulty paying attention',
          'Hyperactivity and restlessness',
          'Impulsive behavior',
          'Difficulty organizing tasks',
          'Forgetfulness in daily activities',
          'Trouble following instructions'
        ],
        types: [
          'Predominantly Inattentive Type',
          'Predominantly Hyperactive-Impulsive Type',
          'Combined Type'
        ],
        prevalence: 'Affects about 4.4% of adults in the US'
      }
    }
  ];

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
            <span className="gradient-text">Common Mental Health</span>
            <br />
            <span className="text-slate-700">Conditions</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Understanding common mental health conditions can help reduce stigma and encourage seeking appropriate help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-effect mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Explore Mental Health Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-600 mb-6">
                Click on each condition below to learn more about symptoms, types, and prevalence.
              </p>
              
              <Accordion type="single" collapsible className="space-y-4">
                {conditions.map((condition, index) => (
                  <motion.div
                    key={condition.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AccordionItem 
                      value={condition.id} 
                      className="glass-effect border rounded-lg px-6 py-2"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl">{condition.icon}</span>
                          <div className="text-left">
                            <h3 className="text-lg font-semibold text-slate-800">{condition.title}</h3>
                            <p className="text-sm text-slate-600">{condition.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-3">Common Symptoms</h4>
                            <ul className="space-y-1 text-sm text-slate-600">
                              {condition.details.symptoms.map((symptom, idx) => (
                                <li key={idx}>{symptom}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-3">Types</h4>
                            <ul className="space-y-1 text-sm text-slate-600">
                              {condition.details.types.map((type, idx) => (
                                <li key={idx}>{type}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-3">Prevalence</h4>
                            <p className="text-sm text-slate-600">{condition.details.prevalence}</p>
                            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                              <p className="text-xs text-emerald-700 font-medium">
                                Remember: These conditions are treatable. Professional help is available and effective.
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-effect border-blue-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Important Note</h3>
              <p className="text-slate-700 leading-relaxed">
                If you recognize symptoms in yourself or others, remember that mental health conditions are medical conditions that can be effectively treated. 
                The first step is reaching out to a mental health professional for proper evaluation and treatment.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CommonConditions;