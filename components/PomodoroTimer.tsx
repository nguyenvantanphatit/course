'use client'

import { useState, useEffect } from 'react'

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          clearInterval(interval as NodeJS.Timeout)
          setIsActive(false)
          if (mode === 'work') {
            setMode('break')
            setMinutes(5)
          } else {
            setMode('work')
            setMinutes(25)
          }
        }
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds, mode])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMode('work')
    setMinutes(25)
    setSeconds(0)
  }

  return (
    <div className="bg-white shadow-md flex items-center justify-end gap-2">
      <div className="text-2xl font-bold text-center">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="flex justify-center space-x-4 my-2">
        <button
          onClick={toggleTimer}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-4 rounded"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  )
}