'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

type Lesson = {
  id: string
  title: string
  content: string
  videoUrl: string
}

export default function OfflineLearning() {
  const { user } = useAuth()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [downloadedLessons, setDownloadedLessons] = useState<string[]>([])
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // In a real app, fetch this data from an API
    const mockLessons: Lesson[] = [
      { id: '1', title: 'Introduction to React', content: 'React is a JavaScript library...', videoUrl: 'https://example.com/video1.mp4' },
      { id: '2', title: 'State and Props', content: 'State and props are important concepts...', videoUrl: 'https://example.com/video2.mp4' },
      { id: '3', title: 'Hooks in React', content: 'Hooks are a new addition in React 16.8...', videoUrl: 'https://example.com/video3.mp4' },
    ]
    setLessons(mockLessons)

    // Check if the browser is online
    setIsOnline(navigator.onLine)
    window.addEventListener('online', () => setIsOnline(true))
    window.addEventListener('offline', () => setIsOnline(false))

    // Load downloaded lessons from localStorage
    const storedDownloadedLessons = localStorage.getItem('downloadedLessons')
    if (storedDownloadedLessons) {
      setDownloadedLessons(JSON.parse(storedDownloadedLessons))
    }

    return () => {
      window.removeEventListener('online', () => setIsOnline(true))
      window.removeEventListener('offline', () => setIsOnline(false))
    }
  }, [])

  const downloadLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId)
    if (lesson) {
      // In a real app, you would download and store the video file here
      const updatedDownloadedLessons = [...downloadedLessons, lessonId]
      setDownloadedLessons(updatedDownloadedLessons)
      localStorage.setItem('downloadedLessons', JSON.stringify(updatedDownloadedLessons))
      localStorage.setItem(`lesson_${lessonId}`, JSON.stringify(lesson))
      alert(`Lesson "${lesson.title}" has been downloaded for offline viewing.`)
    }
  }

  const removeDownloadedLesson = (lessonId: string) => {
    const updatedDownloadedLessons = downloadedLessons.filter(id => id !== lessonId)
    setDownloadedLessons(updatedDownloadedLessons)
    localStorage.setItem('downloadedLessons', JSON.stringify(updatedDownloadedLessons))
    localStorage.removeItem(`lesson_${lessonId}`)
    alert('Lesson has been removed from offline storage.')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Offline Learning</h1>
      <div className="mb-4">
        <p className="text-lg">
          Status: <span className={isOnline ? 'text-green-500' : 'text-red-500'}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map(lesson => (
          <div key={lesson.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-4">{lesson.content.substring(0, 100)}...</p>
            {downloadedLessons.includes(lesson.id) ? (
              <button
                onClick={() => removeDownloadedLesson(lesson.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove Offline
              </button>
            ) : (
              <button
                onClick={() => downloadLesson(lesson.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!isOnline}
              >
                Download for Offline
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}