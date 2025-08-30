import React, { useState } from 'react';
import Comments from './Comments';

const StackCard = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      description: "Learn the basics of React and how to create your first component in this comprehensive tutorial.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "May 15, 2023"
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      description: "Explore modern CSS techniques including Grid, Flexbox, and custom properties to create responsive layouts.",
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      date: "June 2, 2023"
    },
    {
      id: 3,
      title: "JavaScript Performance Tips",
      description: "Optimize your JavaScript code with these performance tips and best practices for faster web applications.",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      date: "June 18, 2023"
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      description: "Learn the fundamental principles of UI/UX design that will help you create more intuitive user interfaces.",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      date: "July 5, 2023"
    }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleCardClick = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Stack Card Component</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          A visually appealing stack of cards with smooth transitions and interactive controls.
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        {cards.map((card, index) => {
          const position = (index - activeIndex + cards.length) % cards.length;
          const isActive = position === 0;
          
          let transform = '';
          let zIndex = cards.length - position;
          let opacity = position < 3 ? 1 - position * 0.2 : 0;
          
          if (position === 0) {
            transform = 'translateX(0) scale(1)';
          } else if (position === 1) {
            transform = 'translateX(40px) scale(0.9)';
          } else if (position === 2) {
            transform = 'translateX(80px) scale(0.8)';
          } else {
            transform = 'translateX(100px) scale(0.8)';
            opacity = 0;
          }
          
          return (
            <div
              key={card.id}
              className={`absolute w-80 bg-white rounded-xl shadow-lg transition-all duration-500 ease-in-out cursor-pointer ${isActive ? 'ring-2 ring-blue-500' : ''}`}
              style={{
                transform,
                zIndex,
                opacity,
              }}
              onClick={() => handleCardClick(index)}
            >
              <div className="h-48 overflow-hidden rounded-t-xl">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{card.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{card.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{card.date}</span>
                  <Comments data={card}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex space-x-4 mt-8">
        <button
          className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md font-medium hover:bg-gray-50 transition-colors flex items-center"
          onClick={handlePrev}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md font-medium hover:bg-blue-700 transition-colors flex items-center"
          onClick={handleNext}
        >
          Next
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex space-x-2 mt-6">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default StackCard;