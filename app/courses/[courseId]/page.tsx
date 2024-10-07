'use client'
import { useState, useEffect } from 'react'

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

export default function Course({ params }: { params: { courseId: string } }) {
  const courseId = params.courseId as string
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
          { id: '1-1', title: 'Introduction to React', description: 'Overview of React and why it is popular.', videoUrl: 'https://example.com/video1.mp4', duration: 10 },
          { id: '1-2', title: 'JSX in React', description: 'Learn JSX syntax and how it works with React.', videoUrl: 'https://example.com/video2.mp4', duration: 12 },
          { id: '1-3', title: 'React Components', description: 'How to create and use functional and class components.', videoUrl: 'https://example.com/video3.mp4', duration: 15 },
          { id: '1-4', title: 'Props and State', description: 'Understanding props and state management in components.', videoUrl: 'https://example.com/video4.mp4', duration: 20 },
          { id: '1-5', title: 'Handling Events', description: 'How to handle user inputs and events in React.', videoUrl: 'https://example.com/video5.mp4', duration: 18 },
          { id: '1-6', title: 'Conditional Rendering', description: 'Learn how to conditionally render elements in React.', videoUrl: 'https://example.com/video6.mp4', duration: 14 },
          { id: '1-7', title: 'Lists and Keys', description: 'Rendering lists of data and understanding the importance of keys.', videoUrl: 'https://example.com/video7.mp4', duration: 16 },
          { id: '1-8', title: 'Forms in React', description: 'How to work with forms and user input handling.', videoUrl: 'https://example.com/video8.mp4', duration: 22 },
          { id: '1-9', title: 'Lifting State Up', description: 'Sharing state between components by lifting state up.', videoUrl: 'https://example.com/video9.mp4', duration: 19 },
          { id: '1-10', title: 'React Lifecycle Methods', description: 'Understanding the lifecycle methods in class components.', videoUrl: 'https://example.com/video10.mp4', duration: 21 },
          { id: '1-11', title: 'Hooks Overview', description: 'Introduction to React hooks and why they are used.', videoUrl: 'https://example.com/video11.mp4', duration: 25 },
          { id: '1-12', title: 'useState Hook', description: 'Learn how to use the useState hook for state management.', videoUrl: 'https://example.com/video12.mp4', duration: 18 },
          { id: '1-13', title: 'useEffect Hook', description: 'Understanding the useEffect hook for side effects in components.', videoUrl: 'https://example.com/video13.mp4', duration: 22 },
          { id: '1-14', title: 'Custom Hooks', description: 'How to create and use custom hooks in React.', videoUrl: 'https://example.com/video14.mp4', duration: 26 },
          { id: '1-15', title: 'Context API', description: 'Using the Context API for managing global state.', videoUrl: 'https://example.com/video15.mp4', duration: 28 },
          { id: '1-16', title: 'React Router Basics', description: 'Introduction to React Router for navigation.', videoUrl: 'https://example.com/video16.mp4', duration: 24 },
          { id: '1-17', title: 'Nested Routes', description: 'Working with nested routes in React Router.', videoUrl: 'https://example.com/video17.mp4', duration: 20 },
          { id: '1-18', title: 'Protected Routes', description: 'How to implement protected routes in your React app.', videoUrl: 'https://example.com/video18.mp4', duration: 25 },
          { id: '1-19', title: 'Code Splitting', description: 'Optimizing React apps with code splitting using React.lazy.', videoUrl: 'https://example.com/video19.mp4', duration: 30 },
          { id: '1-20', title: 'Error Boundaries', description: 'Handling errors gracefully with error boundaries.', videoUrl: 'https://example.com/video20.mp4', duration: 22 },
          { id: '1-21', title: 'React Fragments', description: 'Using fragments to return multiple elements in a component.', videoUrl: 'https://example.com/video21.mp4', duration: 14 },
          { id: '1-22', title: 'Portals in React', description: 'Rendering components outside the main DOM hierarchy with portals.', videoUrl: 'https://example.com/video22.mp4', duration: 18 },
          { id: '1-23', title: 'Refs and DOM Manipulation', description: 'Using refs to access and manipulate DOM elements.', videoUrl: 'https://example.com/video23.mp4', duration: 26 },
          { id: '1-24', title: 'React.memo and Performance Optimization', description: 'Using React.memo to optimize performance by preventing unnecessary re-renders.', videoUrl: 'https://example.com/video24.mp4', duration: 30 },
          { id: '1-25', title: 'Higher-Order Components (HOCs)', description: 'Understanding and using higher-order components to reuse logic.', videoUrl: 'https://example.com/video25.mp4', duration: 32 },
          { id: '1-26', title: 'Render Props', description: 'Learning the render props pattern in React.', videoUrl: 'https://example.com/video26.mp4', duration: 20 },
          { id: '1-27', title: 'Handling Side Effects with Redux', description: 'Using Redux for state management and handling side effects.', videoUrl: 'https://example.com/video27.mp4', duration: 35 },
          { id: '1-28', title: 'Redux Toolkit', description: 'Simplifying Redux with the Redux Toolkit.', videoUrl: 'https://example.com/video28.mp4', duration: 40 },
          { id: '1-29', title: 'Testing React Components', description: 'Introduction to testing React components with Jest and React Testing Library.', videoUrl: 'https://example.com/video29.mp4', duration: 30 },
          { id: '1-30', title: 'Deploying React Apps', description: 'Learn how to deploy React applications on popular hosting platforms.', videoUrl: 'https://example.com/video30.mp4', duration: 20 },
        ]
      },
      {
        id: '2',
        title: 'Advanced JavaScript Concepts',
        description: 'Dive deep into advanced JavaScript topics like closures, prototypes, and async programming.',
        lessons: [
          { id: '2-1', title: 'Closures', description: 'Understanding closures in JavaScript.', videoUrl: 'https://example.com/video1.mp4', duration: 18 },
          { id: '2-2', title: 'Prototypes and Inheritance', description: 'Exploring prototypal inheritance in JavaScript.', videoUrl: 'https://example.com/video2.mp4', duration: 22 },
          { id: '2-3', title: 'Async Programming', description: 'Working with Promises and async/await.', videoUrl: 'https://example.com/video3.mp4', duration: 25 },
          { id: '2-4', title: 'The Event Loop', description: 'Understanding the JavaScript event loop and how asynchronous code is executed.', videoUrl: 'https://example.com/video4.mp4', duration: 20 },
          { id: '2-5', title: 'Execution Context and Hoisting', description: 'Learn how execution context and hoisting work in JavaScript.', videoUrl: 'https://example.com/video5.mp4', duration: 19 },
          { id: '2-6', title: 'This Keyword', description: 'Understanding the behavior of the "this" keyword in different contexts.', videoUrl: 'https://example.com/video6.mp4', duration: 18 },
          { id: '2-7', title: 'Call, Apply, and Bind', description: 'Learn how to use call, apply, and bind methods in JavaScript.', videoUrl: 'https://example.com/video7.mp4', duration: 21 },
          { id: '2-8', title: 'Higher-Order Functions', description: 'Understanding higher-order functions and their usage in JavaScript.', videoUrl: 'https://example.com/video8.mp4', duration: 22 },
          { id: '2-9', title: 'Currying', description: 'An introduction to function currying in JavaScript.', videoUrl: 'https://example.com/video9.mp4', duration: 20 },
          { id: '2-10', title: 'Debouncing and Throttling', description: 'Learn the concepts of debouncing and throttling for performance optimization.', videoUrl: 'https://example.com/video10.mp4', duration: 24 },
          { id: '2-11', title: 'Modules in JavaScript', description: 'Exploring ES6 modules and their use in modern JavaScript development.', videoUrl: 'https://example.com/video11.mp4', duration: 23 },
          { id: '2-12', title: 'Generators and Iterators', description: 'Working with generator functions and iterators in JavaScript.', videoUrl: 'https://example.com/video12.mp4', duration: 26 },
          { id: '2-13', title: 'Error Handling', description: 'Understanding error handling with try, catch, and throw.', videoUrl: 'https://example.com/video13.mp4', duration: 20 },
          { id: '2-14', title: 'Memory Management', description: 'Learn how JavaScript manages memory and how garbage collection works.', videoUrl: 'https://example.com/video14.mp4', duration: 28 },
          { id: '2-15', title: 'Event Delegation', description: 'Understanding the concept of event delegation for efficient event handling.', videoUrl: 'https://example.com/video15.mp4', duration: 21 }
        ]
      },
      {
        id: '3',
        title: 'Node.js Course',
        description: 'Learn the fundamentals and advanced concepts of Node.js for backend development.',
        lessons: [
          { id: '3-1', title: 'Introduction to Node.js', description: 'What is Node.js and why use it for server-side development.', videoUrl: 'https://example.com/video1.mp4', duration: 15 },
          { id: '3-2', title: 'Node.js Modules', description: 'Understanding the CommonJS module system and using built-in modules.', videoUrl: 'https://example.com/video2.mp4', duration: 20 },
          { id: '3-3', title: 'File System in Node.js', description: 'Working with the file system (fs) module for reading and writing files.', videoUrl: 'https://example.com/video3.mp4', duration: 22 },
          { id: '3-4', title: 'Creating a Web Server', description: 'Learn how to create a simple web server using the http module.', videoUrl: 'https://example.com/video4.mp4', duration: 18 },
          { id: '3-5', title: 'Express.js Basics', description: 'Introduction to Express.js for building web applications and APIs.', videoUrl: 'https://example.com/video5.mp4', duration: 25 },
          { id: '3-6', title: 'Middleware in Express.js', description: 'Understanding and using middleware in Express.js.', videoUrl: 'https://example.com/video6.mp4', duration: 28 },
          { id: '3-7', title: 'Routing in Express.js', description: 'How to set up and manage routes in an Express.js application.', videoUrl: 'https://example.com/video7.mp4', duration: 24 },
          { id: '3-8', title: 'Asynchronous Programming in Node.js', description: 'Working with callbacks, Promises, and async/await in Node.js.', videoUrl: 'https://example.com/video8.mp4', duration: 30 },
          { id: '3-9', title: 'Connecting to Databases', description: 'Learn how to connect to databases (MongoDB, MySQL) using Node.js.', videoUrl: 'https://example.com/video9.mp4', duration: 35 },
          { id: '3-10', title: 'Deploying Node.js Applications', description: 'How to deploy Node.js applications to production.', videoUrl: 'https://example.com/video10.mp4', duration: 20 }
        ]
      },
      {
        id: '4',
        title: 'Full Stack Development with Next.js',
        description: 'Build complete web applications using Next.js, React, and Tailwind CSS.',
        lessons: [
          { id: '4-1', title: 'Introduction to Next.js', description: 'Overview of Next.js and its features.', videoUrl: 'https://example.com/video1.mp4', duration: 15 },
          { id: '4-2', title: 'Setting Up a Next.js Project', description: 'How to create a new Next.js application from scratch.', videoUrl: 'https://example.com/video2.mp4', duration: 20 },
          { id: '4-3', title: 'Pages and Routing', description: 'Understanding pages and routing in Next.js applications.', videoUrl: 'https://example.com/video3.mp4', duration: 22 },
          { id: '4-4', title: 'Static Generation (SSG)', description: 'Learn about static generation and how to use it in Next.js.', videoUrl: 'https://example.com/video4.mp4', duration: 25 },
          { id: '4-5', title: 'Server-Side Rendering (SSR)', description: 'Understanding server-side rendering and when to use it.', videoUrl: 'https://example.com/video5.mp4', duration: 30 },
          { id: '4-6', title: 'Dynamic Routing', description: 'Creating dynamic routes in Next.js applications.', videoUrl: 'https://example.com/video6.mp4', duration: 27 },
          { id: '4-7', title: 'API Routes', description: 'Building API routes in Next.js for server-side logic.', videoUrl: 'https://example.com/video7.mp4', duration: 28 },
          { id: '4-8', title: 'Data Fetching Methods', description: 'Exploring various data fetching methods in Next.js (getStaticProps, getServerSideProps, etc.).', videoUrl: 'https://example.com/video8.mp4', duration: 35 },
          { id: '4-9', title: 'Using Environment Variables', description: 'How to manage environment variables in Next.js.', videoUrl: 'https://example.com/video9.mp4', duration: 20 },
          { id: '4-10', title: 'Styling in Next.js', description: 'Learn about different styling options available in Next.js, including CSS modules and Tailwind CSS.', videoUrl: 'https://example.com/video10.mp4', duration: 25 },
          { id: '4-11', title: 'Image Optimization', description: 'Using Next.js Image component for optimized images.', videoUrl: 'https://example.com/video11.mp4', duration: 22 },
          { id: '4-12', title: 'Deploying Next.js Applications', description: 'How to deploy your Next.js application to Vercel or other platforms.', videoUrl: 'https://example.com/video12.mp4', duration: 30 },
          { id: '4-13', title: 'Internationalization (i18n)', description: 'Implementing internationalization in your Next.js applications.', videoUrl: 'https://example.com/video13.mp4', duration: 25 },
          { id: '4-14', title: 'Optimizing Performance', description: 'Tips and tricks for optimizing performance in Next.js applications.', videoUrl: 'https://example.com/video14.mp4', duration: 30 },
          { id: '4-15', title: 'Advanced Features in Next.js', description: 'Exploring advanced features like middleware and incremental static regeneration.', videoUrl: 'https://example.com/video15.mp4', duration: 35 }
        ]
      }
      
      
      
    ]

    setCourses(mockCourses)

    const courseToSelect = mockCourses.find(course => course.id === courseId)
    if (courseToSelect) {
      setSelectedCourse(courseToSelect)
    }
  }, [courseId])

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    setPreviewLesson(null)
  }

  const handleLessonPreview = (lesson: Lesson) => {
    setPreviewLesson(lesson)
  }

  console.log("selectedCourse", selectedCourse)

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Course Preview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
            {courses.map(course =>
              course.id === courseId && (
                <div
                  key={course.id}
                  className={`bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer ${selectedCourse?.id === course.id ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => handleCourseSelect(course)}
                >
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
              )
            )}

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
    </>
  )
}
