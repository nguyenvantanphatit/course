'use client'

import { useState, useEffect } from 'react'

const challenges = [
  "Học một từ vựng mới và sử dụng nó trong một câu",
  "Giải một bài toán logic",
  "Đọc một bài báo khoa học và tóm tắt nó",
  "Thực hành 15 phút code",
  "Học cách nói 'Xin chào' bằng một ngôn ngữ mới"
]

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState('')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const todayChallenge = localStorage.getItem('dailyChallenge')
    const todayChallengeCompleted = localStorage.getItem('dailyChallengeCompleted')
    const today = new Date().toDateString()

    if (todayChallenge && localStorage.getItem('challengeDate') === today) {
      setChallenge(todayChallenge)
      setCompleted(todayChallengeCompleted === 'true')
    } else {
      const newChallenge = challenges[Math.floor(Math.random() * challenges.length)]
      setChallenge(newChallenge)
      localStorage.setItem('dailyChallenge', newChallenge)
      localStorage.setItem('challengeDate', today)
      localStorage.setItem('dailyChallengeCompleted', 'false')
      setCompleted(false)
    }
  }, [])

  const handleComplete = () => {
    setCompleted(true)
    localStorage.setItem('dailyChallengeCompleted', 'true')
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Daily Challenge</h2>
      <p className="mb-4">{challenge}</p>
      {!completed ? (
        <button
          onClick={handleComplete}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Complete Challenge
        </button>
      ) : (
        <p className="text-green-500 font-bold">Challenge completed! Great job!</p>
      )}
    </div>
  )
}