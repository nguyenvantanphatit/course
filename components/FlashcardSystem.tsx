'use client'

import { useState, useEffect } from 'react';

type Flashcard = {
  id: string;
  front: string;
  back: string;
};

export default function FlashcardSystem() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setFlashcards(mockFlashcards);
  }, []);

  const flipCard = () => {
    setShowBack(!showBack);
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowBack(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setShowBack(false);
  };

  if (flashcards.length === 0) {
    return <div className="text-center">Loading flashcards...</div>;
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Flashcard Study System</h2>
      <div
        className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={flipCard}
      >
        <p className="text-xl text-center">
          {showBack ? currentCard.back : currentCard.front}
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
        Card {currentCardIndex + 1} of {flashcards.length}
      </p>
    </div>
  );
}

const mockFlashcards: Flashcard[] = [
  { id: '1', front: 'What is React?', back: 'A JavaScript library for building user interfaces' },
  { id: '2', front: 'What is a component in React?', back: 'A reusable piece of UI that can be composed to create complex interfaces' },
  { id: '3', front: 'What is JSX?', back: 'A syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files' },
  { id: '4', front: 'What is a Hook in React?', back: 'A function that lets you use state and other React features without writing a class' },
  { id: '5', front: 'What is the virtual DOM?', back: 'A lightweight copy of the actual DOM that React uses to optimize rendering performance' }
];
