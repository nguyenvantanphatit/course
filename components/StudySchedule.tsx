'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

type StudyEvent = {
  id: string
  title: string
  start: Date
  end: Date
  courseId: string
  lessonId: string
}

type Course = {
  id: string
  title: string
}

type Lesson = {
  id: string
  title: string
  courseId: string
}

export default function StudySchedule() {
  const { user } = useAuth()
  const [events, setEvents] = useState<StudyEvent[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [selectedLesson, setSelectedLesson] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedDuration, setSelectedDuration] = useState<number>(30)

  useEffect(() => {
    // In a real app, fetch this data from an API
    const mockEvents: StudyEvent[] = [
      {
        id: '1',
        title: 'Study React Basics',
        start: new Date(2023, 5, 1, 10, 0),
        end: new Date(2023, 5, 1, 11, 0),
        courseId: '1',
        lessonId: '1-1'
      },
      {
        id: '2',
        title: 'JavaScript Advanced Concepts',
        start: new Date(2023, 5, 3, 14, 0),
        end: new Date(2023, 5, 3, 15, 30),
        courseId: '2',
        lessonId: '2-1'
      }
    ]
    setEvents(mockEvents)

    const mockCourses: Course[] = [
      { id: '1', title: 'Introduction to React' },
      { id: '2', title: 'Advanced JavaScript' }
    ]
    setCourses(mockCourses)

    const mockLessons: Lesson[] = [
      { id: '1-1', title: 'React Basics', courseId: '1' },
      { id: '1-2', title: 'React Components', courseId: '1' },
      { id: '2-1', title: 'Closures', courseId: '2' },
      { id: '2-2', title: 'Prototypes', courseId: '2' }
    ]
    setLessons(mockLessons)
  }, [])

  const handleAddEvent = () => {
    if (!selectedCourse || !selectedLesson || !selectedDate) return

    const course = courses.find(c => c.id === selectedCourse)
    const lesson = lessons.find(l => l.id === selectedLesson)

    if (!course || !lesson) return

    const newEvent: StudyEvent = {
      id: Date.now().toString(),
      title: `${course.title}: ${lesson.title}`,
      start: selectedDate,
      end: new Date(selectedDate.getTime() + selectedDuration * 60000),
      courseId: selectedCourse,
      lessonId: selectedLesson
    }

    setEvents(prevEvents => [...prevEvents, newEvent])
    alert('Study session added to your schedule!')
  }

  const handleSelectEvent = (event: StudyEvent) => {
    alert(`Selected event: ${event.title}`)
    // You can add more functionality here, like editing or deleting the event
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Study Schedule</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Add Study Session</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="lesson" className="block text-sm font-medium text-gray-700">Lesson</label>
              <select
                id="lesson"
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select a lesson</option>
                {lessons.filter(lesson => lesson.courseId === selectedCourse).map(lesson => (
                  <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date and Time</label>
              <input
                type="datetime-local"
                id="date"
                value={selectedDate.toISOString().slice(0, 16)}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                id="duration"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                min="15"
                step="15"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Schedule
            </button>
          </form>
        </div>

        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Your Study Calendar</h2>
          <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '500px' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              style={{ height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}