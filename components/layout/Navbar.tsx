"use client"
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    const { user, logout } = useAuth()
    return (
        <>
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
                        {user ? (
                            <>
                                <span>Welcome, {user.name}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

        </>
    )
}
