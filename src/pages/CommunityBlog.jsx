import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, User, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const CommunityBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', excerpt: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentUserId] = useState(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  });

  // Load blog posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    } else {
      // Add some sample blog posts for demonstration
      const samplePosts = [
        {
          id: 1,
          title: 'The Journey to Self-Acceptance: My Story',
          excerpt: 'Learning to accept myself wasn\'t easy, but it was the most important journey I\'ve ever taken. Here\'s what I learned along the way.',
          content: `Learning to accept myself wasn't easy, but it was the most important journey I've ever taken. For years, I struggled with self-doubt and negative self-talk that seemed to follow me everywhere.

The turning point came when I realized that self-acceptance doesn't mean giving up on growth or improvement. Instead, it means acknowledging where you are right now while still working toward where you want to be.

Here are some key insights that helped me:

1. **Practice self-compassion**: Treat yourself with the same kindness you'd show a good friend.

2. **Challenge negative thoughts**: When you catch yourself being self-critical, ask if you'd say the same thing to someone you care about.

3. **Celebrate small wins**: Every step forward, no matter how small, is worth acknowledging.

4. **Embrace imperfection**: Nobody has it all figured out, and that's perfectly okay.

The journey to self-acceptance is ongoing, and some days are harder than others. But I've learned that being gentle with myself makes all the difference. Remember, you are worthy of love and acceptance exactly as you are right now.`,
          userId: 'user_blogger1',
          createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          views: 45,
          readTime: '5 min read'
        },
        {
          id: 2,
          title: 'Building Healthy Boundaries: A Practical Guide',
          excerpt: 'Setting boundaries isn\'t selfish—it\'s essential for mental health. Here\'s how to start building healthier relationships.',
          content: `Setting boundaries isn't selfish—it's essential for mental health and building healthier relationships. I used to think that saying "no" made me a bad person, but I've learned that boundaries are actually acts of self-care and respect.

**What are boundaries?**
Boundaries are limits we set to protect our physical, emotional, and mental well-being. They help us define what we're comfortable with and how we want to be treated.

**Types of boundaries:**
- **Physical boundaries**: Personal space and physical touch
- **Emotional boundaries**: Protecting your feelings and energy
- **Time boundaries**: How you spend your time and availability
- **Digital boundaries**: Social media and technology limits

**How to set boundaries:**

1. **Identify your limits**: What makes you uncomfortable? What drains your energy?

2. **Start small**: Begin with low-stakes situations to practice.

3. **Be clear and direct**: Use "I" statements like "I need some time to think about this."

4. **Stay consistent**: Boundaries only work if you maintain them.

5. **Expect pushback**: Some people might not like your boundaries, and that's okay.

Remember, setting boundaries is a skill that takes practice. Be patient with yourself as you learn to prioritize your well-being. You deserve relationships that respect your limits and support your growth.`,
          userId: 'user_blogger2',
          createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
          views: 67,
          readTime: '7 min read'
        }
      ];
      setBlogPosts(samplePosts);
      localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
    }
  }, []);

  // Save blog posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.excerpt.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Title, excerpt, and content are required for your blog post.",
        variant: "destructive"
      });
      return;
    }

    const post = {
      id: Date.now(),
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      userId: currentUserId,
      createdAt: new Date().toISOString(),
      views: 0,
      readTime: Math.ceil(newPost.content.split(' ').length / 200) + ' min read'
    };

    setBlogPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', excerpt: '' });
    setShowForm(false);

    toast({
      title: "Blog post published! 📝",
      description: "Your blog post has been added to the community blog.",
    });
  };

  const handleViewPost = (post) => {
    // Increment view count
    setBlogPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    ));
    setSelectedPost(post);
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
    if (userId === currentUserId) return 'You';
    return `User ${userId.slice(-4)}`;
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              variant="outline" 
              onClick={() => setSelectedPost(null)}
              className="mb-8"
            >
              ← Back to Blog
            </Button>
            
            <Card className="glass-effect">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl leading-tight">{selectedPost.title}</CardTitle>
                <div className="flex items-center space-x-6 text-sm text-slate-500 pt-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{getUserDisplayName(selectedPost.userId)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeAgo(selectedPost.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{selectedPost.views} views</span>
                  </div>
                  <span>{selectedPost.readTime}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                    {selectedPost.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
            <span className="gradient-text">Community</span>
            <br />
            <span className="text-slate-700">Blog</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Share longer-form content, insights, and stories with the community. Read and learn from others' experiences.
          </p>
        </motion.div>

        {/* New Post Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-center">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              {showForm ? 'Cancel' : 'Write Blog Post'}
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
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                  <span>Write a Blog Post</span>
                </CardTitle>
                <CardDescription>
                  Share your insights, experiences, or helpful tips with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Blog Post Title
                    </label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="What's your blog post about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Excerpt (Brief Summary)
                    </label>
                    <Textarea
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Write a brief summary that will appear in the blog list..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Blog Content
                    </label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your full blog post here. Share your story, insights, tips, or experiences..."
                      rows={12}
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      Publish Post
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

        {/* Blog Posts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Latest Blog Posts</h2>
            <div className="flex items-center space-x-2 text-slate-600">
              <BookOpen className="h-5 w-5" />
              <span>{blogPosts.length} posts</span>
            </div>
          </div>

          {blogPosts.length === 0 ? (
            <Card className="glass-effect">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No blog posts yet</h3>
                <p className="text-slate-500">Be the first to share a longer-form story with the community!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full glass-effect hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <div onClick={() => handleViewPost(post)}>
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{getUserDisplayName(post.userId)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatTimeAgo(post.createdAt)}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views} views</span>
                            </div>
                            <span>{post.readTime}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                            Read More →
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Inspiration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="glass-effect border-purple-200">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Share Your Voice</h3>
              <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Your experiences and insights matter. By sharing your story, you might help someone who's going through 
                similar challenges. Every blog post contributes to our collective understanding and support for mental health.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityBlog;