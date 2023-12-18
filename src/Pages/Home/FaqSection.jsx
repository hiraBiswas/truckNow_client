import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const FaqSection = () => {
  const questions = [
    {
      question: 'What is your favorite color?',
      image: 'https://i.ibb.co/LSJFDGt/Hanover-removebg-preview-2.png',
      content: 'My favorite color is blue.',
    },
    {
      question: 'What is your favorite animal?',
      image: '/images/animal.png',
      content: 'My favorite animal is the cat.',
    },
    {
      question: 'What is your favorite food?',
      image: '/images/food.png',
      content: 'My favorite food is pizza.',
    },
  ];

  const [openQuestion, setOpenQuestion] = useState(0); // Set the initial state to 0

  const handleClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="container mx-auto mt-16">
      <div className='flex'>
        <div className='flex-1'>
          {questions.map((question, index) => (
            <div key={index} className="mb-3">
              <div
                className="collapse collapse-plus bg-amber-100 cursor-pointer"
                onClick={() => handleClick(index)}
              >
                <div className="collapse-title text-xl font-medium">
                  {question.question}
                </div>
                <Transition
                  show={openQuestion === index}
                  enter="transition-transform duration-00 ease-out"
                  enterFrom="transform scale-0 opacity-0"
                  enterTo="transform scale-00 opacity-100"
                  leave="transition-transform duration-00 ease-in"
                  leaveFrom="transform scale-0 opacity-100"
                  leaveTo="transform scale-0 opacity-0"
                >
                    <div>
                    <p className='text-black pl-5'>{question.content}</p>
                    </div>
                  <div className="collapse-content flex items-center">
                    <img
                      src={question.image}
                      alt={question.question}
                      className="mr-3 max-w-full"
                      
                    />
                   
                  </div>
                </Transition>
              </div>
            </div>
          ))}
        </div>
        <div className='flex-1'>
          {openQuestion !== null && (
            <img
              src={questions[openQuestion].image}
              alt={questions[openQuestion].question}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
