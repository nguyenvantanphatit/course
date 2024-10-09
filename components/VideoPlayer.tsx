'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function VideoPlayer({ videoId, onComplete }: VideoPlayerProps) {
  const playerRef = useRef<any>(null)
  const [isReady, setIsReady] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        setIsReady(true)
      }
    } else {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (!isReady) return

    if (playerRef.current) {
      playerRef.current.destroy()
    }

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '460',
      width: '1080',
      videoId: videoId,
      playerVars: {
        controls: user?.isVip ? 1 : 0,
      },
      events: {
        onStateChange: onPlayerStateChange,
      },
    })

    setIsVideoEnded(false)

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [isReady, videoId, user])

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      setIsVideoEnded(true)
    }
  }

  const handleCompleteLesson = () => {
    onComplete()
  }

  return (
    <div>
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