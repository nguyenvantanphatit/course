

// // const lessons = [
// //   { id: '1', title: 'Lesson 1', videoId: 'y2TIEmGgMLc' },
// //   { id: '2', title: 'Lesson 2', videoId: 'BoyAlCrHL8M' },
// //   { id: '3', title: 'Lesson 3', videoId: 'B17yoLxkbPA' },
// // ]
// 'use client'

// import { useState, useEffect } from 'react'
// import { useAuth } from '@/context/AuthContext'
// import VideoPlayer from '@/components/VideoPlayer'
// import CommentSection from '@/components/CommentSection'
// import QuizSection from '@/components/QuizSection'
// import CoursePreview from '@/components/CoursePreview'
// import { useParams } from 'next/navigation'

// type Course = {
//   id: string
//   title: string
//   description: string
//   lessons: Lesson[]
// }

// type Lesson = {
//   id: string
//   title: string
//   videoId: string
//   questions: {
//     id: string
//     question: string
//     options: string[]
//     correctAnswer: number
//   }[]
// }

// const lessons: Lesson[] = [
//   {
//     id: '1',
//     title: 'Introduction to React',
//     videoId: 'j8lV8GY1OV8',
//     questions: [
//       {
//         id: 'q1',
//         question: 'What is React?',
//         options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
//         correctAnswer: 1
//       },
//       {
//         id: 'q2',
//         question: 'What is JSX?',
//         options: ['A JavaScript extension', 'A React component', 'A styling framework', 'A build tool'],
//         correctAnswer: 0
//       },
//       {
//         id: 'q3',
//         question: 'What is a component in React?',
//         options: ['A function', 'A class', 'Both A and B', 'Neither A nor B'],
//         correctAnswer: 2
//       },
//       {
//         id: 'q4',
//         question: 'What is the virtual DOM?',
//         options: ['A browser feature', 'A React concept', 'A JavaScript object', 'A CSS technique'],
//         correctAnswer: 2
//       },
//       {
//         id: 'q5',
//         question: 'What is the purpose of state in React?',
//         options: ['To store static data', 'To handle user input', 'To manage component data', 'To style components'],
//         correctAnswer: 2
//       }
//     ]
//   },
//   {
//     id: '1',
//     title: 'Introduction to React',
//     videoId: 'BoyAlCrHL8M',
//     questions: [
//       {
//         id: 'q1',
//         question: 'What is React?',
//         options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
//         correctAnswer: 1
//       },
//       {
//         id: 'q2',
//         question: 'What is JSX?',
//         options: ['A JavaScript extension', 'A React component', 'A styling framework', 'A build tool'],
//         correctAnswer: 0
//       },
//       {
//         id: 'q3',
//         question: 'What is a component in React?',
//         options: ['A function', 'A class', 'Both A and B', 'Neither A nor B'],
//         correctAnswer: 2
//       },
//       {
//         id: 'q4',
//         question: 'What is the virtual DOM?',
//         options: ['A browser feature', 'A React concept', 'A JavaScript object', 'A CSS technique'],
//         correctAnswer: 2
//       },
//       {
//         id: 'q5',
//         question: 'What is the purpose of state in React?',
//         options: ['To store static data', 'To handle user input', 'To manage component data', 'To style components'],
//         correctAnswer: 2
//       }
//     ]
//   },
// ]




// const mockCourses: Course[] = [
//   {
//     id: '1',
//     title: 'Introduction to React',
//     description: 'Learn the basics of React, including components, state, and props.',
//     lessons: [
//       { id: '1-1', title: 'What is React?', description: 'An overview of React and its core concepts.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 10 },
//       { id: '1-2', title: 'Creating Components', description: 'Learn how to create and use React components.', videoUrl: 'https://videos.pexels.com/video-files/4114797/4114797-uhd_2560_1440_25fps.mp4', duration: 15 },
//       { id: '1-3', title: 'State and Props', description: 'Understanding state and props in React.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 20 },
//     ]
//   },
//   {
//     id: '2',
//     title: 'Advanced JavaScript Concepts',
//     description: 'Dive deep into advanced JavaScript topics like closures, prototypes, and async programming.',
//     lessons: [
//       { id: '2-1', title: 'Closures', description: 'Understanding closures in JavaScript.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 18 },
//       { id: '2-2', title: 'Prototypes and Inheritance', description: 'Exploring prototypal inheritance in JavaScript.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 22 },
//       { id: '2-3', title: 'Async Programming', description: 'Working with Promises and async/await.', videoUrl: 'https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/04/file_example_MP4_640_3MG.mp4', duration: 25 },
//     ]
//   }
// ]
// export default function Course({ params }: { params: { courseId: string } }) {
//   const { courseId } = useParams()
//   const [course, setCourse] = useState<Course | null>(null)

//   useEffect(() => {
//     const fetchedCourse = coursesData.find(c => c.id === courseId)
//     setCourse(fetchedCourse || null)
//   }, [courseId])

//   if (!course) {
//     return <div>Course not found</div>
//   }
//   const { user } = useAuth()
//   const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
//   const [showQuiz, setShowQuiz] = useState(false)

//   useEffect(() => {
//     const savedProgress = localStorage.getItem(`course_${params.courseId}_progress`)
//     if (savedProgress) {
//       setCurrentLessonIndex(parseInt(savedProgress))
//     }
//   }, [params.courseId])

//   const handleLessonComplete = () => {
//     setShowQuiz(true)
//   }

//   const handleQuizComplete = (score: number) => {
//     if (currentLessonIndex < lessons.length - 1) {
//       const nextIndex = currentLessonIndex + 1
//       setCurrentLessonIndex(nextIndex)
//       setShowQuiz(false)
//       localStorage.setItem(`course_${params.courseId}_progress`, nextIndex.toString())
//     }
//   }

//   if (!user) {
//     return <div className="container mx-auto px-4 py-8">Please log in to view this course.</div>
//   }

//   const currentLesson = lessons[currentLessonIndex]

//   return (
//     <>
//     <CoursePreview />
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Course {params.courseId}</h1>
//       <div className="mb-4">
//         {showQuiz ? (
//           <QuizSection questions={currentLesson.questions} onComplete={handleQuizComplete} />
//         ) : (
//           <>
//             <VideoPlayer
//               videoId={currentLesson.videoId}
//               onComplete={handleLessonComplete}
//             />
//             <CommentSection lessonId={currentLesson.id} />
//           </>
//         )}
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Lessons</h2>
//         <ul>
//           {lessons.map((lesson, index) => (
//             <li
//               key={lesson.id}
//               className={`py-2 ${
//                 index === currentLessonIndex ? 'font-bold' : 'text-gray-600'
//               }`}
//             >
//               {lesson.title}
//               {index < currentLessonIndex && (
//                 <span className="ml-2 text-green-500">✓</span>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//     </>
//   )
// }