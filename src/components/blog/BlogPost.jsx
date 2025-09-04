import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BlogPost = ({ post, onBack, onDelete }) => {
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInDays = Math.floor((now - postDate) / (1000 * 60 * 60 * 24));
    if (diffInDays < 1) return 'Today';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return postDate.toLocaleDateString();
  };

  const getUserDisplayName = (userId) => `User ${userId.slice(-4)}`;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <Button variant="outline" onClick={onBack}>← Back to Blog</Button>
            {onDelete && (
              <Button variant="destructive" onClick={() => onDelete(post.id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete Post
              </Button>
            )}
          </div>
          
          <Card className="glass-effect">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl md:text-4xl leading-tight">{post.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 pt-4">
                <div className="flex items-center space-x-1"><User className="h-4 w-4" /><span>{getUserDisplayName(post.userId)}</span></div>
                <div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{formatTimeAgo(post.createdAt)}</span></div>
                <div className="flex items-center space-x-1"><Eye className="h-4 w-4" /><span>{post.views || 0} views</span></div>
                <span>{post.readTime}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;