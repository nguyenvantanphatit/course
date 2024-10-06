'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

type Course = {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

type Lesson = {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: number
}

export default function CoursePreview() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Introduction to React',
        description: 'Learn the basics of React, including components, state, and props.',
        lessons: [
          { id: '1-1', title: 'What is React?', description: 'An overview of React and its core concepts.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 10 },
          { id: '1-2', title: 'Creating Components', description: 'Learn how to create and use React components.', videoUrl: 'https://videos.pexels.com/video-files/4114797/4114797-uhd_2560_1440_25fps.mp4', duration: 15 },
          { id: '1-3', title: 'State and Props', description: 'Understanding state and props in React.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 20 },
        ]
      },
      {
        id: '2',
        title: 'Advanced JavaScript Concepts',
        description: 'Dive deep into advanced JavaScript topics like closures, prototypes, and async programming.',
        lessons: [
          { id: '2-1', title: 'Closures', description: 'Understanding closures in JavaScript.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 18 },
          { id: '2-2', title: 'Prototypes and Inheritance', description: 'Exploring prototypal inheritance in JavaScript.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 22 },
          { id: '2-3', title: 'Async Programming', description: 'Working with Promises and async/await.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 25 },
        ]
      }
    ]
    setCourses(mockCourses)
  }, [])

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    setPreviewLesson(null)
  }

  const handleLessonPreview = (lesson: Lesson) => {
    setPreviewLesson(lesson)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Preview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
          {courses.map(course => (
            <div
              key={course.id}
              className={`bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer ${selectedCourse?.id === course.id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => handleCourseSelect(course)}
            >
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>

        {selectedCourse && (
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{selectedCourse.title}</h2>
            <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
            <h3 className="text-xl font-semibold mb-2">Lessons</h3>
            {selectedCourse.lessons.map(lesson => (
              <div key={lesson.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h4 className="text-lg font-semibold mb-2">{lesson.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                <p className="text-sm text-gray-600 mb-2">Duration: {lesson.duration} minutes</p>
                <button
                  onClick={() => handleLessonPreview(lesson)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Preview Lesson
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {previewLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-4">{previewLesson.title} - Preview</h2>
            <video
              src={previewLesson.videoUrl}
              controls
              className="w-full mb-4"
              style={{ maxHeight: '400px' }}
            >
              Your browser does not support the video tag.
            </video>
            <p className="text-gray-600 mb-4">{previewLesson.description}</p>
            <button
              onClick={() => setPreviewLesson(null)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  )
}