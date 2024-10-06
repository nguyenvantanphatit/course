'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

export default function Achievements() {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    // In a real app, fetch this data from an API
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'First Lesson Completed',
        description: 'You completed your first lesson!',
        icon: '🎉',
        unlocked: true,
      },
      {
        id: '2',
        title: 'Perfect Quiz Score',
        description: 'You got 100% on a quiz!',
        icon: '🏆',
        unlocked: true,
      },
      {
        id: '3',
        title: 'Study Streak',
        description: 'You studied for 7 days in a row!',
        icon: '🔥',
        unlocked: false,
      },
      {
        id: '4',
        title: 'Course Completed',
        description: 'You finished an entire course!',
        icon: '🎓',
        unlocked: false,
      },
    ]
    setAchievements(mockAchievements)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-white p-6 rounded-lg shadow-md ${
              achievement.unlocked ? 'border-2 border-yellow-400' : 'opacity-50'
            }`}
          >
            <div className="text-4xl mb-2">{achievement.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{achievement.title}</h2>
            <p className="text-gray-600">{achievement.description}</p>
            {achievement.unlocked ? (
              <p className="mt-2 text-green-500">Unlocked!</p>
            ) : (
              <p className="mt-2 text-gray-500">Locked</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}