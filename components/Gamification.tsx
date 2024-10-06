'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

type Leaderboard = {
  userId: string
  username: string
  score: number
}

export default function Gamification() {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([])
  const [userPoints, setUserPoints] = useState(0)

  useEffect(() => {
    // In a real app, fetch this data from an API
    const mockAchievements: Achievement[] = [
      { id: '1', title: 'First Lesson', description: 'Complete your first lesson', icon: '🎉', unlocked: true },
      { id: '2', title: 'Quiz Master', description: 'Score 100% on a quiz', icon: '🏆', unlocked: false },
      { id: '3', title: 'Consistent Learner', description: 'Study for 7 days in a row', icon: '🔥', unlocked: false },
      { id: '4', title: 'Course Champion', description: 'Complete an entire course', icon: '🎓', unlocked: false },
    ]
    setAchievements(mockAchievements)

    const mockLeaderboard: Leaderboard[] = [
      { userId: '1', username: 'JohnDoe', score: 1200 },
      { userId: '2', username: 'JaneSmith', score: 1100 },
      { userId: '3', username: 'BobJohnson', score: 1000 },
      { userId: '4', username: 'AliceWilliams', score: 900 },
      { userId: '5', username: 'CharlieBrown', score: 800 },
    ]
    setLeaderboard(mockLeaderboard)

    setUserPoints(950) // Mock user points
  }, [])

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prevAchievements =>
      prevAchievements.map(achievement =>
        achievement.id === achievementId ? { ...achievement, unlocked: true } : achievement
      )
    )
    alert('Congratulations! You\'ve unlocked a new achievement!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gamification & Rewards</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Points</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-4xl font-bold text-blue-500">{userPoints} pts</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map(achievement => (
            <div key={achievement.id} className={`bg-white p-4 rounded-lg shadow-md ${achievement.unlocked ? 'border-2 border-yellow-400' : 'opacity-50'}`}>
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
              {!achievement.unlocked && (
                <button
                  onClick={() => unlockAchievement(achievement.id)}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                >
                  Unlock (Demo)
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.userId} className={entry.userId === user?.id ? 'bg-yellow-100' : ''}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{entry.username}</td>
                  <td className="px-4 py-2">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}