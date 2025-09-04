import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import BlogList from '@/components/blog/BlogList';
import BlogPost from '@/components/blog/BlogPost';
import BlogForm from '@/components/blog/BlogForm';
import { useAuth } from '@/contexts/AuthContext';

const CommunityBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    } else {
      const samplePosts = [
        { id: 1, title: 'My Journey to Self-Acceptance', excerpt: 'Learning to accept myself wasn\'t easy...', content: 'Full content here...', userId: 'user_blogger1', username: 'Alex', createdAt: new Date(Date.now() - 259200000).toISOString(), views: 45, readTime: '5 min read' },
        { id: 2, title: 'A Guide to Healthy Boundaries', excerpt: 'Setting boundaries isn\'t selfish...', content: 'Full content here...', userId: 'user_blogger2', username: 'Jordan', createdAt: new Date(Date.now() - 432000000).toISOString(), views: 67, readTime: '7 min read' }
      ];
      setBlogPosts(samplePosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  const handleSubmitPost = (newPostData) => {
    if (!user) {
      toast({ title: "Please sign in to post", variant: "destructive" });
      return;
    }
    const post = {
      id: Date.now(),
      ...newPostData,
      userId: user.id,
      username: user.email.split('@')[0],
      createdAt: new Date().toISOString(),
      views: 0,
      readTime: Math.ceil(newPostData.content.split(' ').length / 200) + ' min read'
    };
    setBlogPosts(prev => [post, ...prev]);
    setShowForm(false);
    toast({ title: "Blog post published! 📝" });
  };

  const handleViewPost = (post) => {
    setBlogPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, views: (p.views || 0) + 1 } : p
    ));
    setSelectedPost(post);
  };

  const handleDeletePost = (postId) => {
    setBlogPosts(prev => prev.filter(p => p.id !== postId));
    setSelectedPost(null);
    toast({ title: "Blog Post Deleted" });
  };

  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} onDelete={isAdmin ? handleDeletePost : null} />;
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6"><span className="gradient-text">Community Blog</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">Share longer-form content, insights, and stories.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8 text-center">
          {user ? (
            <Button onClick={() => setShowForm(!showForm)} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-5 w-5 mr-2" />{showForm ? 'Cancel' : 'Write Blog Post'}
            </Button>
          ) : (
            <div className="max-w-xl mx-auto">
                <div className="glass-effect p-6 rounded-lg flex items-center justify-center space-x-4">
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    <p className="text-slate-700 font-medium">Please <Link to="/signin" className="text-emerald-600 underline">sign in</Link> to write a blog post.</p>
                </div>
            </div>
          )}
        </motion.div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <BlogForm onSubmit={handleSubmitPost} onCancel={() => setShowForm(false)} />
          </motion.div>
        )}

        <BlogList posts={blogPosts} onPostSelect={handleViewPost} />
      </div>
    </div>
  );
};

export default CommunityBlog;