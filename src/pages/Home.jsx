import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Brain, Users, BookOpen, Phone, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'Understanding Mental Health',
      description: 'Learn about mental health concepts and get essential information',
      link: '/understanding',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Common Conditions',
      description: 'Explore information about anxiety, depression, and other conditions',
      link: '/conditions',
      color: 'text-red-500'
    },
    {
      icon: Compass,
      title: 'Treatment & Coping',
      description: 'Discover professional treatments and coping strategies',
      link: '/treatment',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Find a Professional',
      description: 'Search for mental health professionals in your area',
      link: '/find-professional',
      color: 'text-purple-600'
    },
    {
      icon: Phone,
      title: 'Crisis Resources',
      description: 'Access immediate help and crisis support hotlines',
      link: '/crisis',
      color: 'text-orange-600'
    },
    {
      icon: BookOpen,
      title: 'Mindfulness Tools',
      description: 'Practice breathing exercises and grounding techniques',
      link: '/mindfulness',
      color: 'text-teal-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-teal-100/50" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Mental Health</span>
              <br />
              <span className="text-slate-700">& Wellness Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Your comprehensive resource for mental health support, professional guidance, and community connection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/understanding">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/crisis">Crisis Support</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 floating-animation">
          <div className="w-20 h-20 bg-emerald-200/30 rounded-full blur-xl" />
        </div>
        <div className="absolute bottom-20 right-10 floating-animation" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-teal-200/30 rounded-full blur-xl" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Comprehensive Mental Health Resources
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our range of tools and resources designed to support your mental health journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer glass-effect border-white/50">
                  <Link to={feature.link}>
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-3 rounded-full bg-white/50 w-fit group-hover:scale-110 transition-transform">
                        <feature.icon className={`h-8 w-8 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl text-slate-800">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-slate-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Interactive Wellness Tools
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Engage with our interactive features designed to support your daily wellness routine
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Mindfulness Exercises', link: '/mindfulness', icon: '🧘‍♀️' },
              { title: 'Mood Journal', link: '/journal', icon: '📝' },
              { title: 'Community Forum', link: '/forum', icon: '💬' },
              { title: 'Wellness Blog', link: '/blog', icon: '📚' }
            ].map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer glass-effect">
                  <Link to={tool.link}>
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">{tool.title}</h3>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect p-12 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Take the first step towards better mental health with our comprehensive resources and supportive community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/understanding">Learn More</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/forum">Join Community</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;