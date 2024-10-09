'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

type VideoPlayerProps = {
  videoId: string
  onComplete: () => void
}

type Segment = {
  start: number
  end: number
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT: any
  }
}

export default function Component({ videoId, onComplete }: VideoPlayerProps) {
  const playerRef = useRef<any>(null)
  const [isReady, setIsReady] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const { user } = useAuth()
  const [videoDuration, setVideoDuration] = useState(0)
  const [currentSegment, setCurrentSegment] = useState(0)
  const [segments, setSegments] = useState<Segment[]>([])

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

  const handleSegmentChange = useCallback(() => {
    if (currentSegment < segments.length - 1) {
      setCurrentSegment((prevSegment) => prevSegment + 1)
      playerRef.current.seekTo(segments[currentSegment + 1].start)
    } else {
      setIsVideoEnded(true)
    }
  }, [currentSegment, segments])

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
    try {
      if (!isReady || !videoId) return;
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '460',
        width: '1080',
        videoId: videoId,
        playerVars: {
          controls: user?.isVip ? 1 : 0,
          start: segments[currentSegment]?.start || 0,
          end: segments[currentSegment]?.end || undefined,
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

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy()
        }
      }
    } catch (error) {
      console.error("Error accessing videoId:", error);
    }
  }, [isReady, videoId, user, currentSegment, segments, calculateSegments])

  const onPlayerStateChange = useCallback((event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      handleSegmentChange()
    }
  }, [handleSegmentChange])

  useEffect(() => {
    if (!playerRef.current) return

    const checkTime = () => {
      const currentTime = playerRef.current.getCurrentTime()
      if (currentTime >= segments[currentSegment].end - 1) {
        handleSegmentChange()
      }
    }

    const intervalId = setInterval(checkTime, 1000)

    return () => clearInterval(intervalId)
  }, [currentSegment, segments, handleSegmentChange])

  const handleCompleteLesson = () => {
    onComplete()
  }

  return (
    <div className="flex flex-col items-center">
      <div id="youtube-player" className="w-full max-w-4xl"></div>
      {isVideoEnded && (
        <button
          onClick={handleCompleteLesson}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Complete Lesson
        </button>
      )}
    </div>
  )
}