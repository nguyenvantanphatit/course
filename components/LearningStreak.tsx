'use client'

import { useState, useEffect } from 'react'

export default function LearningStreak() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const lastLogin = localStorage.getItem('lastLogin')
    const currentStreak = parseInt(localStorage.getItem('streak') || '0')
    const today = new Date().toDateString()

    if (lastLogin === today) {
      setStreak(currentStreak)
    } else if (lastLogin === new Date(Date.now() - 86400000).toDateString()) {
      const newStreak = currentStreak + 1
      setStreak(newStreak)
      localStorage.setItem('streak', newStreak.toString())
    } else {
      setStreak(1)
      localStorage.setItem('streak', '1')
    }

    localStorage.setItem('lastLogin', today)
  }, [])

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Learning Streak</h2>
      <p className="text-4xl font-bold text-center">{streak} {streak === 1 ? 'day' : 'days'}</p>
      <p className="text-center mt-2">Keep up the great work!</p>
    </div>
  )
}