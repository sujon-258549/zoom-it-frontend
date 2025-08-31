import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import { useAllBlogQuery } from '@/redux/fetures/auth/authApi';

const StackCard = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch all blog data
  const { data: usageAllBlog, isLoading } = useAllBlogQuery('');

  // Update cards state when data is loaded
  useEffect(() => {
    if (usageAllBlog) {
      setCards(usageAllBlog);
    }
  }, [usageAllBlog]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;
  if (!cards.length) return <div className="text-center mt-20">No cards available</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Stack Card Component</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          A visually appealing stack of cards with smooth transitions and interactive controls.
        </p>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        {cards.map((card, index) => {
          const position = (index - activeIndex + cards.length) % cards.length;
          const isActive = position === 0;

          let transform = '';
          let zIndex = cards.length - position;
          let opacity = position < 3 ? 1 - position * 0.2 : 0;

          if (position === 0) transform = 'translateX(0) scale(1)';
          else if (position === 1) transform = 'translateX(40px) scale(0.9)';
          else if (position === 2) transform = 'translateX(80px) scale(0.8)';
          else {
            transform = 'translateX(100px) scale(0.8)';
            opacity = 0;
          }

          return (
            <div
              key={card.id}
              className={`absolute w-80 bg-white rounded-xl shadow-lg transition-all duration-500 ease-in-out cursor-pointer ${
                isActive ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{ transform, zIndex, opacity }}
              onClick={() => handleCardClick(index)}
            >
              <div className="h-48 overflow-hidden rounded-t-xl">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{card.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{card.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{card.createdAt.slice(0, 10)}</span>
                  <Comments data={card} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
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

      {/* Pagination Dots */}
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
