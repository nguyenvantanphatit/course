'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const navItems = [
    { href: '/courses', label: 'Courses' },
    { href: '/learn', label: 'Learn' },
    { href: '/progress', label: 'Progress' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/forum', label: 'Forum' },
    { href: '/help', label: 'Help' },
    { href: '/achievements', label: 'Achievements' },
  ]

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Learning Platform
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blue-200 transition-colors">
              {item.label}
            </Link>
          ))}
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
            <Link
              href="/login"
              className="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100"
            >
              Login
            </Link>
          )}
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 px-4 hover:bg-blue-700 transition-colors"
              onClick={toggleMenu}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <div className="py-2 px-4">
              <span className="block mb-2">Welcome, {user.name}</span>
              <button
                onClick={() => {
                  logout()
                  toggleMenu()
                }}
                className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="block py-2 px-4 mt-2 bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}