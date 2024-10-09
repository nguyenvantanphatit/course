'use client'

import { useState, useEffect } from 'react';

type Question = {
  id: string;
  front: string;
  back: string;
};

type Flashcard = {
  id: string;
  question: Question;
};

type Course = {
  id: string;
  title: string;
  description: string;
  flashcards: Flashcard[];
};

const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Basics",
    description: "Learn the fundamentals of React.",
    flashcards: [
      {
        id: "1",
        question: {
          id: '1',
          front: 'What is React?',
          back: 'A JavaScript library for building user interfaces',
        },
      },
      {
        id: "2",
        question: {
          id: '2',
          front: 'What is a component in React?',
          back: 'A reusable piece of UI that can be composed to create complex interfaces',
        },
      },
    ],
  },
  {
    id: "2",
    title: "Advanced React",
    description: "Dive deeper into React with advanced concepts.",
    flashcards: [
      {
        id: "3",
        question: {
          id: '3',
          front: 'What is JSX?',
          back: 'A syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files',
        },
      },
      {
        id: "4",
        question: {
          id: '4',
          front: 'What is a Hook in React?',
          back: 'A function that lets you use state and other React features without writing a class',
        },
      },
      {
        id: "5",
        question: {
          id: '5',
          front: 'What is the virtual DOM?',
          back: 'A lightweight copy of the actual DOM that React uses to optimize rendering performance',
        },
      },
    ],
  },
];

export default function FlashcardSystem() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  const flipCard = () => {
    setShowBack(!showBack);
  };

  const nextCard = () => {
    const currentCourse = courses[currentCourseIndex];
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % currentCourse.flashcards.length);
    setShowBack(false);
  };

  const prevCard = () => {
    const currentCourse = courses[currentCourseIndex];
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + currentCourse.flashcards.length) % currentCourse.flashcards.length);
    setShowBack(false);
  };

  const selectCourse = (index: number) => {
    setCurrentCourseIndex(index);
    setCurrentCardIndex(0);
    setShowBack(false);
  };

  if (courses.length === 0) {
    return <div className="text-center">Loading flashcards...</div>;
  }

  const currentCourse = courses[currentCourseIndex];
  const currentCard = currentCourse.flashcards[currentCardIndex];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Flashcard Study System</h2>
      
      <div className="mb-4">
        {courses.map((course, index) => (
          <button
            key={course.id}
            className={`py-2 px-4 rounded m-1 ${currentCourseIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
            onClick={() => selectCourse(index)}
          >
            {course.title}
          </button>
        ))}
      </div>


      <div
        className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={flipCard}
      >
        <p className="text-xl text-center">
          {showBack ? currentCard.question.back : currentCard.question.front}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={prevCard}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={nextCard}
        >
          Next
        </button>
      </div>
      <p className="text-center mt-2">
        Card {currentCardIndex + 1} of {currentCourse.flashcards.length}
      </p>
      <p className="text-center mt-2">
        Course: {currentCourse.title}
      </p>
    </div>
  );
}
