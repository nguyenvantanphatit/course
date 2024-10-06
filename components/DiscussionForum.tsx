'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

type ForumPost = {
  id: string
  userId: string
  username: string
  title: string
  content: string
  timestamp: number
  replies: ForumReply[]
}

type ForumReply = {
  id: string
  userId: string
  username: string
  content: string
  timestamp: number
}

export default function DiscussionForum() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)
  const [newReplyContent, setNewReplyContent] = useState('')

  useEffect(() => {
    // In a real app, fetch this data from an API
    const mockPosts: ForumPost[] = [
      {
        id: '1',
        userId: '101',
        username: 'JohnDoe',
        title: 'Help with React Hooks',
        content: 'I\'m having trouble understanding useEffect. Can someone explain?',
        timestamp: Date.now() - 86400000, // 1 day ago
        replies: [
          {
            id: '101',
            userId: '102',
            username: 'JaneSmith',
            content: 'useEffect is used for side effects in functional components. It runs after every render by default.',
            timestamp: Date.now() - 43200000, // 12 hours ago
          }
        ]
      },
      {
        id: '2',
        userId: '103',
        username: 'BobJohnson',
        title: 'Best practices for state management',
        content: 'What are some recommended approaches for managing state in a large React application?',
        timestamp: Date.now() - 172800000, // 2 days ago
        replies: []
      }
    ]
    setPosts(mockPosts)
  }, [])

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newPostTitle.trim() || !newPostContent.trim()) return

    const newPost: ForumPost = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.name,
      title: newPostTitle,
      content: newPostContent,
      timestamp: Date.now(),
      replies: []
    }

    setPosts(prevPosts => [newPost, ...prevPosts])
    setNewPostTitle('')
    setNewPostContent('')
  }

  const handleCreateReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !selectedPost || !newReplyContent.trim()) return

    const newReply: ForumReply = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.name,
      content: newReplyContent,
      timestamp: Date.now()
    }

    const updatedPost = {
      ...selectedPost,
      replies: [...selectedPost.replies, newReply]
    }

    setPosts(prevPosts => prevPosts.map(post => post.id === selectedPost.id ? updatedPost : post))
    setSelectedPost(updatedPost)
    setNewReplyContent('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discussion Forum</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <form onSubmit={handleCreatePost} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="postTitle"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="postContent"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Post
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
          {posts.map(post => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer" onClick={() => setSelectedPost(post)}>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {post.username} - {new Date(post.timestamp).toLocaleString()}</p>
              <p className="text-gray-800">{post.content.substring(0, 100)}...</p>
              <p className="text-sm text-gray-600 mt-2">{post.replies.length} replies</p>
            </div>
          ))}
        </div>

        {selectedPost && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Selected Post</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h3 className="text-xl font-semibold mb-2">{selectedPost.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {selectedPost.username} - {new Date(selectedPost.timestamp).toLocaleString()}</p>
              <p className="text-gray-800 mb-4">{selectedPost.content}</p>
              <h4 className="text-lg font-semibold mb-2">Replies</h4>
              {selectedPost.replies.map(reply => (
                <div key={reply.id} className="bg-gray-100 p-3 rounded mb-2">
                  <p className="text-sm text-gray-600 mb-1">by {reply.username} - {new Date(reply.timestamp).toLocaleString()}</p>
                  <p className="text-gray-800">{reply.content}</p>
                </div>
              ))}
              <form onSubmit={handleCreateReply} className="mt-4">
                <textarea
                  value={newReplyContent}
                  onChange={(e) => setNewReplyContent(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Write a reply..."
                  required
                ></textarea>
                <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Post Reply
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}