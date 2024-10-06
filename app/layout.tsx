import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Learning Platform</Link>
          <div className="space-x-4">
            <Link href="/courses">Courses</Link>
            <Link href="/progress">Progress</Link>
            <Link href="/schedule">Schedule</Link>
            <Link href="/forum">Forum</Link>
            <Link href="/help">Help</Link>
            <Link href="/achievements">Achievements</Link>
          </div>
        </div>
      </nav>
      <AuthProvider>{children}</AuthProvider>
      <footer className="bg-gray-200 p-4 mt-8">
        <div className="container mx-auto text-center">
          © 2023 Learning Platform. All rights reserved.
        </div>
      </footer>
    </body>
  </html>
  )
}