import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Brain, ShieldCheck, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/cbt-exercises', label: 'CBT Exercises' },
    { path: '/quizzes', label: 'Quizzes' },
    { path: '/mindfulness', label: 'Mindfulness' },
    { path: '/journal', label: 'Journal' },
    { path: '/forum', label: 'Forum' },
    { path: '/blog', label: 'Blog' },
    { path: '/find-professional', label: 'Find Help' },
    { path: '/crisis', label: 'Crisis Support' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.1,
        type: 'spring',
        stiffness: 120,
      },
    }),
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Heart className="h-8 w-8 text-emerald-600" />
              <Brain className="h-4 w-4 text-teal-600 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold gradient-text">Wellness Hub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="relative group">
              <Button variant="ghost" size="sm">More</Button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                <div className="py-1">
                  {navItems.slice(4).map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-2 text-sm ${
                        location.pathname === item.path
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {isAdmin ? (
              <ShieldCheck className="h-6 w-6 text-emerald-600 ml-4" />
            ) : (
              <Button asChild variant="outline" size="sm" className="ml-4">
                <Link to="/admin-signin">
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 top-20 bg-white/80 backdrop-blur-xl z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-4 p-8">
              {navItems.map((item, i) => (
                <motion.div key={item.path} custom={i} variants={navLinkVariants} initial="hidden" animate="visible">
                  <Link
                    to={item.path}
                    className={`text-2xl font-semibold transition-colors ${
                      location.pathname === item.path
                        ? 'text-emerald-600'
                        : 'text-slate-700 hover:text-emerald-600'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div custom={navItems.length} variants={navLinkVariants} initial="hidden" animate="visible">
                {isAdmin ? (
                  <div className="flex items-center space-x-2 text-emerald-600 font-semibold">
                    <ShieldCheck className="h-6 w-6" />
                    <span>Admin Mode</span>
                  </div>
                ) : (
                  <Button asChild variant="outline" size="lg" onClick={() => setIsOpen(false)}>
                    <Link to="/admin-signin">
                      <LogIn className="h-4 w-4 mr-2" />
                      Admin Sign In
                    </Link>
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;