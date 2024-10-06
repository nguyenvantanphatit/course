// 'use client'

// import CoursePreview from '@/components/CoursePreview'
// import { useAuth } from '@/context/AuthContext'
// import Link from 'next/link'

// const courses = [
//   { id: '1', title: 'Introduction to React' },
//   { id: '2', title: 'Advanced JavaScript' },
//   { id: '3', title: 'Node.js Fundamentals' },
// ]

// export default function Courses() {
//   const { user } = useAuth()

//   if (!user) {
//     return <div>Please log in to view courses.</div>
//   }

//   return (
//     <>
//       {/* <CoursePreview /> */}
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {courses.map((course) => (
//             <Link
//               key={course.id}
//               href={`/courses/${course.id}`}
//               className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
//             >
//               <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
//                 {course.title}
//               </h5>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }
'use client'

import { useState } from 'react'
import Link from 'next/link'

type Course = {
  id: string
  title: string
  description: string
  instructor: string
  level: string
  duration: string
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React, including components, state, and props.',
    instructor: 'John Doe',
    level: 'Beginner',
    duration: '4 weeks'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    description: 'Dive deep into advanced JavaScript topics like closures, prototypes, and async programming.',
    instructor: 'Jane Smith',
    level: 'Intermediate',
    duration: '6 weeks'
  },
  {
    id: '3',
    title: 'Full Stack Development with Node.js',
    description: 'Build complete web applications using Node.js, Express, and MongoDB.',
    instructor: 'Bob Johnson',
    level: 'Advanced',
    duration: '8 weeks'
  }
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLevel === '' || course.level === selectedLevel)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Available Courses</h1>
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full md:w-64 px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-48 px-4 py-2 border rounded-md"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{course.instructor}</span>
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>
              <Link href={`/courses/${course.id}`} className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}