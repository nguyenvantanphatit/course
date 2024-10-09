'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import VideoPlayer from '@/components/VideoPlayer'
import CommentSection from '@/components/CommentSection'
import QuizSection from '@/components/QuizSection'
import Image from 'next/image'
import PomodoroTimer from '@/components/PomodoroTimer'

type Lesson = {
  id: string
  title: string
  duration: string
  completed: boolean
  videoId: string;
  locked: any;
}

type Course = {
  id: string
  title: string
  description: string
  instructor: string
  level: string
  duration: string
  lessons: Lesson[]
  questions: {
    id: string
    question: string
    options: string[]
    correctAnswer: number
  }[]
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React, including components, state, and props.',
    instructor: 'John Doe',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: [
      { id: '1', title: 'What is React?', duration: '15 minutes', videoId: "Mcw8Mp8PYUE", completed: false, locked: false,},
      { id: '2', title: 'Creating Components', duration: '30 minutes', videoId: "TPACABQTHvM", completed: false, locked: true },
      { id: '3', title: 'State and Props', duration: '45 minutes', videoId: "u6PQ5xZAv7Q", completed: false, locked: true },
      { id: '4', title: 'Hooks in React', duration: '60 minutes', videoId: "YH6ui_dG7Ow", completed: false, locked: true },
    ],
    questions: [
      {
        id: 'q1',
        question: 'What is React?',
        options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'What is JSX?',
        options: ['A JavaScript extension', 'A React component', 'A styling framework', 'A build tool'],
        correctAnswer: 0
      },
      {
        id: 'q3',
        question: 'What is a component in React?',
        options: ['A function', 'A class', 'Both A and B', 'Neither A nor B'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        question: 'What is the virtual DOM?',
        options: ['A browser feature', 'A React concept', 'A JavaScript object', 'A CSS technique'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        question: 'What is the purpose of state in React?',
        options: ['To store static data', 'To handle user input', 'To manage component data', 'To style components'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    description: 'Dive deep into advanced JavaScript topics like closures, prototypes, and async programming.',
    instructor: 'Jane Smith',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: [
      { id: '1', title: 'Closures and Scope', duration: '45 minutes', videoId: "Mcw8Mp8PYUE", completed: false, locked: false },
      { id: '2', title: 'Prototypes and Inheritance', duration: '60 minutes', videoId: "jTRfhbWRuro", completed: false, locked: true },
      { id: '3', title: 'Async Programming with Promises', duration: '75 minutes', videoId: "yVsaCVEfPn4", completed: false, locked: true },
      { id: '4', title: 'ES6+ Features', duration: '90 minutes', videoId: "N_sUsq_y10U", completed: false, locked: true },
    ],
    questions: [
      {
        id: 'q1',
        question: 'What is React?',
        options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'What is JSX?',
        options: ['A JavaScript extension', 'A React component', 'A styling framework', 'A build tool'],
        correctAnswer: 0
      },
      {
        id: 'q3',
        question: 'What is a component in React?',
        options: ['A function', 'A class', 'Both A and B', 'Neither A nor B'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        question: 'What is the virtual DOM?',
        options: ['A browser feature', 'A React concept', 'A JavaScript object', 'A CSS technique'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        question: 'What is the purpose of state in React?',
        options: ['To store static data', 'To handle user input', 'To manage component data', 'To style components'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '3',
    title: 'Advanced NextJs Concepts',
    description: 'Dive deep into advanced JavaScript topics like closures, prototypes, and async programming.',
    instructor: 'Jane Smith',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: [
      { id: '1', title: 'Closures and Scope', duration: '45 minutes', videoId: "QzPuWB9Pius", completed: false, locked: false },
    ],
    questions: [
      {
        id: 'q1',
        question: 'What is React?',
        options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'What is JSX?',
        options: ['A JavaScript extension', 'A React component', 'A styling framework', 'A build tool'],
        correctAnswer: 0
      }
    ]
  },
]

export default function Course({ params }: { params: { learnId: string } }) {
  const { user } = useAuth()
  const learnId = params.learnId as string
  console.log("learnId",learnId)
  const [course, setCourse] = useState<Course | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  
  useEffect(() => {
    const foundCourse = courses.find(c => c.id === learnId)
    if (foundCourse) {
      const initializedLessons = foundCourse.lessons.map((lesson, index) => ({
        ...lesson,
      }))
      setCourse({ ...foundCourse, lessons: initializedLessons })
      
    }
    

    const savedProgress = localStorage.getItem(`course_${learnId}_progress`)
    if (savedProgress) {
      setCurrentLessonIndex(parseInt(savedProgress))
    }
    else {
      setCurrentLessonIndex(1)
    }
  }, [learnId])
  
  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view this course.</div>
  }
  
  if (!course) {
    return <div className="container mx-auto px-4 py-8">Course not found.</div>
  }
  
  const currentLesson = course.lessons[currentLessonIndex - 1]
  const handleLessonComplete = () => {
    setShowQuiz(true)
  }
  
  const handleQuizComplete = (score: number) => {
    const updatedLessons = [...course.lessons]
    updatedLessons[currentLessonIndex].completed = true
    
    if (currentLessonIndex < course.lessons.length - 1) {
      updatedLessons[currentLessonIndex + 1].locked = false
    }
    
    setCourse({ ...course, lessons: updatedLessons })
    
    if (currentLessonIndex < course.lessons.length - 1) {
      const nextIndex = currentLessonIndex + 1
      setCurrentLessonIndex(nextIndex)
      setShowQuiz(false)
      localStorage.setItem(`course_${learnId}_progress`, nextIndex.toString())
    } else {
      alert(`Congratulations! You've completed the course with a score of ${score}/${course.questions.length}`)
    }
  }
  
  const handleLessonClick = (index: number) => {
    if (!course.lessons[index].locked) {
      setCurrentLessonIndex(index)
      setShowQuiz(false)
    }
  }
  return (
    <>
      <PomodoroTimer />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64 md:h-96">
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center">{course.title}</h1>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Senior JavaScript Developer</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-6">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">10 weeks</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Difficulty</p>
                    <p className="font-semibold">Intermediate</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-3">
                  {showQuiz ? (
                    <QuizSection questions={course.questions} onComplete={handleQuizComplete} />
                  ) : (
                    <>
                      <div>
                        <VideoPlayer
                          videoId={currentLesson?.videoId ? currentLesson?.videoId : "Mcw8Mp8PYUE"}
                          onComplete={handleLessonComplete}
                        />
                        <div>{currentLesson.videoId}</div>
                        <div>{currentLesson.id}</div>
                      </div>
                      <h2 className="text-2xl font-semibold my-4">{currentLesson.title}</h2>
                      <p className="text-gray-600 mb-4">Duration: {currentLesson.duration}</p>
                      <CommentSection lessonId={currentLesson.id} />
                    </>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
                  <ul className="space-y-2">
                    {course.lessons.map((lesson, index) => (
                      <li
                        key={lesson.id}
                        className={`p-3 rounded ${lesson.locked
                          ? 'bg-gray-300 cursor-not-allowed'
                          : index === currentLessonIndex
                            ? 'bg-blue-100 font-semibold cursor-pointer'
                            : lesson.completed
                              ? 'bg-green-100 cursor-pointer'
                              : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                          }`}
                        onClick={() => !lesson.locked && handleLessonClick(index)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{lesson.title}</span>
                          {lesson.completed && (
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {lesson.locked && (
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="my-8">
                <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
                <p className="text-gray-600">
                  This comprehensive course will take you from intermediate to advanced level in JavaScript.
                  You'll learn about closures, prototypes, async programming, and much more. By the end of
                  this course, you'll be able to build complex applications with confidence.
                </p>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Advanced JavaScript concepts', 'Asynchronous programming', 'Design patterns', 'Performance optimization', 'Testing and debugging', 'Real-world project building'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}