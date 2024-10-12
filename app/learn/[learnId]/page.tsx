'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import VideoPlayer from '@/components/VideoPlayer'
import CommentSection from '@/components/CommentSection'
import QuizSection from '@/components/QuizSection'
import Image from 'next/image'
import PomodoroTimer from '@/components/PomodoroTimer'

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    bio: string;
    avatar: string;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tags: string[];
  prerequisites: string[];
  lessons: Lesson[];
  courseQuiz: Quiz;
  progress: number;
  rating: {
    average: number;
    count: number;
  };
  certificate: {
    title: string;
    description: string;
  };
  forum: {
    id: string;
    url: string;
  };
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoId: string;
  completed: boolean;
  locked: boolean;
  resources: Resource[];
  quiz: Quiz | null;
  comments: Comment[];
}

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'code' | 'image';
  url: string;
}

interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
  replies: Comment[];
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React, including components, state, and props.',
    instructor: {
      id: 'inst1',
      name: 'John Doe',
      bio: 'Experienced React developer and educator',
      avatar: 'https://example.com/john-doe-avatar.jpg',
    },
    level: 'Beginner',
    duration: '4 weeks',
    tags: ['React', 'JavaScript', 'Web Development'],
    prerequisites: ['Basic JavaScript knowledge', 'HTML and CSS familiarity'],
    lessons: [
      {
        id: 1,
        title: 'What is React?',
        description: 'An introduction to React and its core concepts',
        duration: '15 minutes',
        videoId: "TPACABQTHvM",
        completed: false,
        locked: false,
        resources: [
          {
            id: 'res1',
            title: 'React Documentation',
            type: 'link',
            url: 'https://reactjs.org/docs/getting-started.html',
          },
        ],
        quiz: null,
        comments: [],
      },
      {
        id: 2,
        title: 'Creating Components',
        description: 'Learn how to create and use React components',
        duration: '30 minutes',
        videoId: "Mcw8Mp8PYUE",
        completed: false,
        locked: true,
        resources: [
          {
            id: 'res2',
            title: 'Component Basics',
            type: 'pdf',
            url: 'https://example.com/react-components.pdf',
          },
        ],
        quiz: {
          id: 'q2',
          questions: [
            {
              id: 'q2_1',
              question: 'What is a React component?',
              options: ['A function', 'A class', 'Both A and B', 'Neither A nor B'],
              correctAnswer: 2,
              explanation: 'In React, a component can be defined as either a function or a class.',
            },
          ],
          passingScore: 1,
        },
        comments: [],
      },
    ],
    courseQuiz: {
      id: 'final_quiz',
      questions: [
        {
          id: 'q1',
          question: 'What is React?',
          options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
          correctAnswer: 1,
          explanation: 'React is a JavaScript library for building user interfaces.',
        },
      ],
      passingScore: 4,
    },
    progress: 0,
    rating: {
      average: 4.7,
      count: 1250,
    },
    certificate: {
      title: 'React Fundamentals',
      description: 'Successfully completed the Introduction to React course',
    },
    forum: {
      id: 'forum1',
      url: 'https://example.com/courses/1/forum',
    },

  },
  {
    id: '2',
    title: 'Introduction to NodeJs',
    description: 'Learn the basics of NodeJs, including components, state, and props.',
    instructor: {
      id: 'inst1',
      name: 'John Doe',
      bio: 'Experienced React developer and educator',
      avatar: 'https://example.com/john-doe-avatar.jpg',
    },
    level: 'Beginner',
    duration: '4 weeks',
    tags: ['React', 'JavaScript', 'Web Development'],
    prerequisites: ['Basic JavaScript knowledge', 'HTML and CSS familiarity'],
    lessons: [
      {
        id: 1,
        title: 'What is React?',
        description: 'An introduction to React and its core concepts',
        duration: '15 minutes',
        videoId: "TPACABQTHvM",
        completed: false,
        locked: false,
        resources: [
          {
            id: 'res1',
            title: 'React Documentation',
            type: 'link',
            url: 'https://reactjs.org/docs/getting-started.html',
          },
        ],
        quiz: null,
        comments: [],
      },
      {
        id: 2,
        title: 'Creating Components',
        description: 'Learn how to create and use React components',
        duration: '30 minutes',
        videoId: "Mcw8Mp8PYUE",
        completed: false,
        locked: true,
        resources: [
          {
            id: 'res2',
            title: 'Component Basics',
            type: 'pdf',
            url: 'https://example.com/react-components.pdf',
          },
        ],
        quiz: {
          id: 'q2',
          questions: [
            {
              id: 'q2_1',
              question: 'What is a React component?',
              options: ['A function', 'A class', 'Both A and B', 'Neither A nor B'],
              correctAnswer: 2,
              explanation: 'In React, a component can be defined as either a function or a class.',
            },
          ],
          passingScore: 1,
        },
        comments: [],
      },
    ],
    courseQuiz: {
      id: 'final_quiz',
      questions: [
        {
          id: 'q1',
          question: 'What is React?',
          options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
          correctAnswer: 1,
          explanation: 'React is a JavaScript library for building user interfaces.',
        },
      ],
      passingScore: 4,
    },
    progress: 0,
    rating: {
      average: 4.7,
      count: 1250,
    },
    certificate: {
      title: 'React Fundamentals',
      description: 'Successfully completed the Introduction to React course',
    },
    forum: {
      id: 'forum1',
      url: 'https://example.com/courses/1/forum',
    },

  },
];

export default function Course({ params }: { params: { learnId: string } }) {
  const { user } = useAuth()
  const learnId = params.learnId
  const [course, setCourse] = useState<Course | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === learnId)
    if (foundCourse) {
      const initializedLessons = foundCourse.lessons.map((lesson, index) => ({
        ...lesson,
        locked: index !== 0
      }))
      setCourse({ ...foundCourse, lessons: initializedLessons })
    }

    const savedProgress = localStorage.getItem(`course_${learnId}_progress`)
    if (savedProgress) {
      setCurrentLessonIndex(parseInt(savedProgress))
    } else {
      setCurrentLessonIndex(0)
    }
  }, [learnId])

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view this course.</div>
  }

  if (!course) {
    return <div className="container mx-auto px-4 py-8">Course not found.</div>
  }

  const currentLesson = course.lessons[currentLessonIndex]

  const handleLessonComplete = () => {
    if (currentLessonIndex === course.lessons.length - 1) {
      setShowQuiz(true);  
    } else {
      const updatedLessons = [...course.lessons];
      updatedLessons[currentLessonIndex].completed = true;

      const nextLessonIndex = currentLessonIndex + 1;
      updatedLessons[nextLessonIndex].locked = false;
      setCourse({ ...course, lessons: updatedLessons });
      setCurrentLessonIndex(nextLessonIndex);
      localStorage.setItem(`course_${learnId}_progress`, nextLessonIndex.toString());
    }
  }

  const handleQuizComplete = (score: number) => {
    const updatedLessons = [...course.lessons]
    updatedLessons[currentLessonIndex].completed = true

    let nextLessonIndex = currentLessonIndex + 1
    if (nextLessonIndex < course.lessons.length) {
      updatedLessons[nextLessonIndex].locked = false
      setCurrentLessonIndex(nextLessonIndex)
      setShowQuiz(false)
      localStorage.setItem(`course_${learnId}_progress`, nextLessonIndex.toString())
    } else {
      alert(`Congratulations! You've completed the course with a score of ${score}/${course.courseQuiz.questions.length}`)
    }

    setCourse({ ...course, lessons: updatedLessons })
  }

  const handleLessonClick = (index: number) => {
    if (!course.lessons[index].locked) {
      setCurrentLessonIndex(index)
      setShowQuiz(false)
    }
  }
  console.log("course",course)
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
                  {showQuiz && (
                    <QuizSection questions={course.courseQuiz.questions} onComplete={handleQuizComplete} />
                  )
                  }
                  <div>
                    <VideoPlayer
                      videoId={currentLesson?.videoId}
                      onComplete={handleLessonComplete}
                    />
                    <div>{currentLesson.id}</div>
                  </div>
                  <h2 className="text-2xl font-semibold my-4">{currentLesson.title}</h2>
                  <p className="text-gray-600 mb-4">Duration: {currentLesson.duration}</p>
                  <CommentSection lessonId={currentLesson.id} />
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
                <p className="text-gray-600">{course.description}</p>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.tags.map((tag, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
                <ul className="list-disc list-inside">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="text-gray-600">{prerequisite}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Course Forum</h2>
                <a href={course.forum.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Join the discussion
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}