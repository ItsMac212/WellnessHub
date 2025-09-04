import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Plus, Heart, Trash2, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showForm, setShowForm] = useState(false);
  const [currentUserId] = useState(() => {
    // Generate or retrieve user ID from localStorage
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  });

  // Hardcoded moderator ID for demo purposes
  const MODERATOR_ID = 'moderator_admin';
  const isModerator = currentUserId === MODERATOR_ID;

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('forumPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Add some sample posts for demonstration
      const samplePosts = [
        {
          id: 1,
          title: 'Finding Hope in Dark Times',
          content: 'I wanted to share something that has helped me through difficult periods. Remember that it\'s okay to not be okay, and seeking help is a sign of strength, not weakness.',
          userId: 'user_sample1',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          likes: 12
        },
        {
          id: 2,
          title: 'Meditation Changed My Life',
          content: 'After struggling with anxiety for years, I started a daily meditation practice. It didn\'t happen overnight, but gradually I noticed improvements in my mood and stress levels.',
          userId: 'user_sample2',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          likes: 8
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem('forumPosts', JSON.stringify(samplePosts));
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('forumPosts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both title and content are required for your post.",
        variant: "destructive"
      });
      return;
    }

    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      userId: currentUserId,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '' });
    setShowForm(false);

    toast({
      title: "Post shared! 🎉",
      description: "Your post has been added to the community forum.",
    });
  };

  const handleLikePost = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const userLikedKey = `liked_${postId}_${currentUserId}`;
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
    toast({
      title: "Post deleted",
      description: "The post has been removed from the forum.",
    });
  };

  const hasUserLiked = (postId) => {
    return localStorage.getItem(`liked_${postId}_${currentUserId}`) === 'true';
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return postDate.toLocaleDateString();
  };

  const getUserDisplayName = (userId) => {
    if (userId === MODERATOR_ID) return 'Moderator';
    if (userId === currentUserId) return 'You';
    return `User ${userId.slice(-4)}`;
  };

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
            <span className="gradient-text">Community</span>
            <br />
            <span className="text-slate-700">Forum</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with others, share your experiences, and find support in our safe and welcoming community space.
          </p>
        </motion.div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass-effect border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Community Guidelines</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
                <div>• Be respectful and supportive</div>
                <div>• Share experiences, not medical advice</div>
                <div>• Maintain privacy and confidentiality</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* New Post Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-center">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              {showForm ? 'Cancel' : 'Share Your Story'}
            </Button>
          </div>
        </motion.div>

        {/* New Post Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-emerald-600" />
                  <span>Share with the Community</span>
                </CardTitle>
                <CardDescription>
                  Your story might help someone else who's going through similar experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Post Title
                    </label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="What would you like to share?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Message
                    </label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Share your thoughts, experiences, or words of encouragement..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      Share Post
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Posts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Community Posts</h2>
            <div className="flex items-center space-x-2 text-slate-600">
              <MessageCircle className="h-5 w-5" />
              <span>{posts.length} posts</span>
            </div>
          </div>

          {posts.length === 0 ? (
            <Card className="glass-effect">
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No posts yet</h3>
                <p className="text-slate-500">Be the first to share your story with the community!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span className={post.userId === MODERATOR_ID ? 'text-emerald-600 font-medium' : ''}>
                                {getUserDisplayName(post.userId)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatTimeAgo(post.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        {(isModerator || post.userId === currentUserId) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center space-x-2 ${
                            hasUserLiked(post.id) 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-slate-500 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${hasUserLiked(post.id) ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </Button>
                        
                        {isModerator && (
                          <span className="text-xs text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-full">
                            Moderator View
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="glass-effect border-emerald-200">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">You're Not Alone</h3>
              <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto">
                This community is here to support you. Whether you're sharing your story, offering encouragement, 
                or simply reading others' experiences, remember that every step toward connection and healing matters.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityForum;