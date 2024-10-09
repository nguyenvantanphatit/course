'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

type VideoPlayerProps = {
  videoId: string
  onComplete: () => void
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT: any
  }
}
type Segment = {
  start: number
  end: number
}
export default function VideoPlayer({ videoId, onComplete }: VideoPlayerProps) {
  const playerRef = useRef<any>(null)
  const [isReady, setIsReady] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const { user } = useAuth()
  const [videoDuration, setVideoDuration] = useState(0)
  const [segments, setSegments] = useState([{ start: 0, end: 120 }])

  const calculateSegments = useCallback((duration: number): Segment[] => {
    if (duration <= 60) {
      return [{ start: 0, end: duration }]
    } else if (duration <= 3600) {
      return [
        { start: 0, end: 60 },
        { start: 60, end: duration }
      ]
    } else if (duration <= 7200) {
      return [
        { start: 0, end: 60 },
        { start: 60, end: 3600 },
        { start: 3600, end: duration }
      ]
    } else {
      return [
        { start: 0, end: 60 },
        { start: 60, end: 3600 },
        { start: 3600, end: 7200 },
        { start: 7200, end: duration }
      ]
    }
  }, [])
  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = () => setIsReady(true)
    }

    if (!window.YT) {
      loadYouTubeAPI()
    } else {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (!isReady) return

    const initializePlayer = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId,
        playerVars: {
          controls: user?.isVip ? 1 : 0,
        },
        events: {
          onStateChange: onPlayerStateChange,
          onReady: (event: any) => {
            const duration = event.target.getDuration()
            setVideoDuration(duration)
            setSegments(calculateSegments(duration))
          },
        },
      })
    }

    if (playerRef.current) {
      playerRef.current.destroy()
    }
    initializePlayer()
    setIsVideoEnded(false)

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [isReady, videoId, user])

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      setIsVideoEnded(true);
      onComplete();
    }
  }

  const handleCompleteLesson = () => {
    onComplete()
  }

  return (
    <div className="video-container">
      <div id="youtube-player"></div>
      {isVideoEnded && (
        <button
          onClick={handleCompleteLesson}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Complete Lesson
        </button>
      )}
    </div>
  )
}
