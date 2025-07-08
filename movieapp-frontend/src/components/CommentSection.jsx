import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Flag, MessageSquare, Send } from 'lucide-react';
import Comment from './Comment';

const CommentSection = () => {
    // Mock data for comments
    const [comments, setComments] = useState([
        {
            _id: '1',
            content: 'This movie was amazing! The cinematography was stunning.',
            user: {
                username: 'MovieFan123',
                profileImage: '/default-avatar.png'
            },
            createdAt: new Date().toISOString(),
            likes: 15,
            dislikes: 2,
            status: 'active'
        },
        {
            _id: '2',
            content: 'I found the plot a bit confusing, but the acting was great.',
            user: {
                username: 'CinemaCritic',
                profileImage: '/default-avatar.png'
            },
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            likes: 8,
            dislikes: 1,
            status: 'active'
        }
    ]);

    const [newComment, setNewComment] = useState('');
    const [isAdmin] = useState(false); // This would come from user context in a real app

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            _id: Date.now().toString(),
            content: newComment,
            user: {
                username: 'CurrentUser', // This would come from user context in a real app
                profileImage: '/default-avatar.png'
            },
            createdAt: new Date().toISOString(),
            likes: 0,
            dislikes: 0,
            status: 'active'
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    const handleVote = (commentId, type) => {
        setComments(comments.map(comment => {
            if (comment._id === commentId) {
                return {
                    ...comment,
                    [type]: comment[type] + 1
                };
            }
            return comment;
        }));
    };

    const handleReport = async (commentId) => {
        // In a real app, this would make an API call
        setComments(comments.map(comment => {
            if (comment._id === commentId) {
                return {
                    ...comment,
                    status: 'reported'
                };
            }
            return comment;
        }));
    };

    const handleDelete = (commentId) => {
        setComments(comments.filter(comment => comment._id !== commentId));
    };

    const handleHide = (commentId) => {
        setComments(comments.map(comment => {
            if (comment._id === commentId) {
                return {
                    ...comment,
                    status: 'hidden'
                };
            }
            return comment;
        }));
    };

    return (
        <div className="mt-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
                <MessageSquare className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Yorumlar
                </h2>
            </div>

            {/* Comment Input Form */}
            <form onSubmit={handleSubmitComment} className="mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Filim hakkında düşüncelerinizi paylaşın..."
                        className="w-full h-32 bg-gray-700/30 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all duration-200"
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20"
                        >
                            <Send className="w-4 h-4" />
                            <span>Yorum Yap</span>
                        </button>
                    </div>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map(comment => (
                    <div
                        key={comment._id}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <img
                                        src={comment.user.profileImage}
                                        alt={comment.user.username}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30 shadow-lg"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-lg">{comment.user.username}</h3>
                                    <p className="text-sm text-gray-400">
                                        {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                            {comment.status === 'reported' && (
                                <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                                    Rapor Edildi
                                </span>
                            )}
                        </div>

                        <div className="bg-gray-700/30 rounded-xl p-4 mb-4">
                            <p className="text-gray-200 leading-relaxed text-lg">{comment.content}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => handleVote(comment._id, 'likes')}
                                    className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-200 group"
                                >
                                    <div className="p-2 rounded-lg bg-gray-700/30 group-hover:bg-green-500/10 transition-colors duration-200">
                                        <ThumbsUp className="w-5 h-5" />
                                    </div>
                                    <span className="ml-2 font-medium">{comment.likes}</span>
                                </button>
                                <button
                                    onClick={() => handleVote(comment._id, 'dislikes')}
                                    className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-200 group"
                                >
                                    <div className="p-2 rounded-lg bg-gray-700/30 group-hover:bg-red-500/10 transition-colors duration-200">
                                        <ThumbsDown className="w-5 h-5" />
                                    </div>
                                    <span className="ml-2 font-medium">{comment.dislikes}</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4">
                                {!isAdmin && comment.status !== 'reported' && (
                                    <button
                                        onClick={() => handleReport(comment._id)}
                                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors duration-200 hover:bg-red-500/10 rounded-lg group"
                                    >
                                        <div className="p-1.5 rounded-lg bg-gray-700/30 group-hover:bg-red-500/10 transition-colors duration-200">
                                            <Flag className="w-4 h-4" />
                                        </div>
                                        <span className="ml-2">Raporla</span>
                                    </button>
                                )}

                                {isAdmin && (
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => handleDelete(comment._id)}
                                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors duration-200 hover:bg-red-500/10 rounded-lg"
                                        >
                                            Sil
                                        </button>
                                        <button
                                            onClick={() => handleHide(comment._id)}
                                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 hover:bg-yellow-500/10 rounded-lg"
                                        >
                                            Gizle
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection; 