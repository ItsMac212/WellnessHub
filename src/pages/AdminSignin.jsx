import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const AdminSignIn = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // In a real application, this would be a secure authentication flow.
    // For this demo, we use a simple hardcoded password.
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      toast({
        title: 'Welcome, Admin! 🛡️',
        description: 'You have successfully signed in.',
      });
      navigate('/');
    } else {
      toast({
        title: 'Authentication Failed',
        description: 'The password you entered is incorrect.',
        variant: 'destructive',
      });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-full max-w-md glass-effect">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-emerald-100 w-fit">
              <Shield className="h-10 w-10 text-emerald-600" />
            </div>
            <CardTitle className="text-3xl">Admin Sign In</CardTitle>
            <CardDescription>
              Enter the password to access moderation tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminSignIn;