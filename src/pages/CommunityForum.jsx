import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Plus, Heart, Trash2, User, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { formatTimeAgo, getUserDisplayName } from '@/lib/utils';

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showForm, setShowForm] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const savedPosts = localStorage.getItem('forumPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const samplePosts = [
        { id: 1, title: 'Finding Hope in Dark Times', content: 'Remember that it\'s okay to not be okay, and seeking help is a sign of strength.', userId: 'user_sample1', username: 'HopefulSoul', createdAt: new Date(Date.now() - 86400000).toISOString(), likes: 12 },
        { id: 2, title: 'Meditation Changed My Life', content: 'A daily meditation practice has greatly improved my mood and stress levels.', userId: 'user_sample2', username: 'ZenSeeker', createdAt: new Date(Date.now() - 172800000).toISOString(), likes: 8 }
      ];
      setPosts(samplePosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('forumPosts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!user) {
        toast({ title: "Please sign in to post", variant: "destructive" });
        return;
    }
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const post = {
      id: Date.now(),
      ...newPost,
      userId: user.id,
      username: user.email.split('@')[0],
      createdAt: new Date().toISOString(),
      likes: 0
    };
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '' });
    setShowForm(false);
    toast({ title: "Post shared! 🎉" });
  };

  const handleLikePost = (postId) => {
    if (!user) {
        toast({ title: "Please sign in to like posts", variant: "destructive" });
        return;
    }
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const userLikedKey = `liked_forum_${postId}_${user.id}`;
        const hasLiked = localStorage.getItem(userLikedKey);
        if (hasLiked) {
          localStorage.removeItem(userLikedKey);
          return { ...post, likes: post.likes - 1 };
        } else {
          localStorage.setItem(userLikedKey, 'true');
          return { ...post, likes: post.likes + 1 };
        }
      }
      return post;
    }));
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast({ title: "Post deleted" });
  };

  const hasUserLiked = (postId) => user && localStorage.getItem(`liked_forum_${postId}_${user.id}`) === 'true';

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6"><span className="gradient-text">Community Forum</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">Connect, share, and find support.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-8 text-center">
          {user ? (
            <Button onClick={() => setShowForm(!showForm)} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-5 w-5 mr-2" />{showForm ? 'Cancel' : 'Share Your Story'}
            </Button>
          ) : (
             <Card className="glass-effect p-6">
                <div className="flex items-center justify-center space-x-4">
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    <p className="text-slate-700 font-medium">Please <Link to="/signin" className="text-emerald-600 underline">sign in</Link> to post and interact.</p>
                </div>
            </Card>
          )}
        </motion.div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Card className="glass-effect"><CardHeader><CardTitle className="flex items-center space-x-2"><MessageCircle className="h-6 w-6 text-emerald-600" /><span>Share with the Community</span></CardTitle><CardDescription>Your story might help someone else.</CardDescription></CardHeader><CardContent><form onSubmit={handleSubmitPost} className="space-y-6"><div><label className="block text-sm font-medium text-slate-700 mb-2">Post Title</label><Input value={newPost.title} onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))} placeholder="What would you like to share?" required /></div><div><label className="block text-sm font-medium text-slate-700 mb-2">Your Message</label><Textarea value={newPost.content} onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))} placeholder="Share your thoughts..." rows={6} required /></div><div className="flex space-x-4"><Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Share Post</Button><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button></div></form></CardContent></Card>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold text-slate-800">Community Posts</h2><div className="flex items-center space-x-2 text-slate-600"><MessageCircle className="h-5 w-5" /><span>{posts.length} posts</span></div></div>
          {posts.length === 0 ? (<Card className="glass-effect"><CardContent className="p-12 text-center"><MessageCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" /><h3 className="text-xl font-semibold text-slate-600 mb-2">No posts yet</h3><p className="text-slate-500">Be the first to share your story!</p></CardContent></Card>) : (<div className="space-y-6">{posts.map((post, index) => (<motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}><Card className="glass-effect hover:shadow-lg transition-all"><CardHeader><div className="flex items-start justify-between"><div className="flex-1"><CardTitle className="text-xl mb-2">{post.title}</CardTitle><div className="flex items-center space-x-4 text-sm text-slate-500"><div className="flex items-center space-x-1"><User className="h-4 w-4" /><span>{getUserDisplayName(user, post.userId, post.username)}</span></div><div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{formatTimeAgo(post.createdAt)}</span></div></div></div>{(isAdmin || (user && user.id === post.userId)) && (<Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>)}</div></CardHeader><CardContent className="space-y-4"><p className="text-slate-700 whitespace-pre-wrap">{post.content}</p><div className="flex items-center justify-between pt-4 border-t"><Button variant="ghost" size="sm" onClick={() => handleLikePost(post.id)} className={`flex items-center space-x-2 ${hasUserLiked(post.id) ? 'text-red-500 hover:text-red-600' : 'text-slate-500 hover:text-red-500'}`}><Heart className={`h-4 w-4 ${hasUserLiked(post.id) ? 'fill-current' : ''}`} /><span>{post.likes}</span></Button>{isAdmin && (<span className="text-xs text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-full">Moderator View</span>)}</div></CardContent></Card></motion.div>))}</div>)}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityForum;