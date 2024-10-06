'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function AIAssistant() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')

    try {
      // In a real app, you would send the message to your AI service here
      // For this example, we'll use a mock response
      const assistantMessage: Message = { role: 'assistant', content: mockAIResponse(input) }
      setMessages(prevMessages => [...prevMessages, assistantMessage])
    } catch (error) {
      console.error('Error sending message to AI:', error)
    }
  }

  const mockAIResponse = (input: string): string => {
    // This is a very simple mock AI. In a real app, you'd integrate with an actual AI service.
    if (input.toLowerCase().includes('react')) {
      return "React is a popular JavaScript library for building user interfaces. It's known for its component-based architecture and efficient rendering through the virtual DOM."
    } else if (input.toLowerCase().includes('javascript')) {
      return "JavaScript is a versatile programming language primarily used for web development. It allows you to add interactivity and dynamic content to websites."
    } else {
      return "I'm sorry, I don't have specific information about that topic. Could you please ask something related to web development or programming?"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Learning Assistant</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="h-96 overflow-y-auto mb-4 p-4 border border-gray-200 rounded">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {message.content}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a question..."
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}