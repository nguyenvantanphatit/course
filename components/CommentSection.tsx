'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

type Comment = {
  id: string
  userId: string
  username: string
  content: string
  timestamp: number
}

export default function CommentSection({ lessonId }: { lessonId: number }) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // In a real application, you would fetch comments from an API
    const savedComments = localStorage.getItem(`comments_${lessonId}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }
  }, [lessonId])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.name,
      content: newComment.trim(),
      timestamp: Date.now(),
    }

    const updatedComments = [...comments, comment]
    setComments(updatedComments)
    localStorage.setItem(`comments_${lessonId}`, JSON.stringify(updatedComments))
    setNewComment('')
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{comment.username}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.timestamp).toLocaleString()}
              </span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmitComment} className="mt-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>
    </div>
  )
}