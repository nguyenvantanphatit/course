import CoursePreview from '@/components/CoursePreview'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Our Learning Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/courses" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Courses</h2>
          <p className="text-gray-600">Explore our wide range of courses and start learning today.</p>
        </Link>
        <Link href="/learn" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Learn</h2>
          <p className="text-gray-600">Access your current lessons and continue your learning journey.</p>
        </Link>
        <Link href="/progress" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Progress</h2>
          <p className="text-gray-600">Track your learning progress and achievements.</p>
        </Link>
        <Link href="/schedule" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Schedule</h2>
          <p className="text-gray-600">Manage your study schedule and set reminders.</p>
        </Link>
        <Link href="/forum" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Discussion Forum</h2>
          <p className="text-gray-600">Engage with other learners and discuss course topics.</p>
        </Link>
        <Link href="/help" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">AI Assistant</h2>
          <p className="text-gray-600">Get help from our AI-powered learning assistant.</p>
        </Link>
        <Link href="/achievements" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Achievements</h2>
          <p className="text-gray-600">View your achievements and compete on the leaderboard.</p>
        </Link>
      </div>
        <CoursePreview /> 
    </div>
  )
}