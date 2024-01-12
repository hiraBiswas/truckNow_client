import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const FaqSection = () => {
  const questions = [
    {
      question: 'You must register to rent car from us.',
      image: 'https://i.ibb.co/ZcS5gvL/Screenshot-267.png',
      content: 'You can simply register with your name, email, image and password. ',
    },
    {
      question: 'You can explore our collection of trucks.',
      image: 'https://i.ibb.co/J5yzbwj/Screenshot-268.png',
      content: 'Trucks are displayed with relevant information like category, rent per day, capacity etc.',
    },
    {
      question: 'Choose suitable truck for your purpose.',
      image: 'https://i.ibb.co/Rz50Pr2/Screenshot-270.png',
      content: 'We have variety of collection of trucks particularly suitable for some purpose. You can choose according to your purpose.',
    },

    {
      question: 'Fill up the rent form.',
      image: 'https://i.ibb.co/w05CqmB/Screenshot-269.png',
      content: 'Finally fill up the rent from with your desired time and date, address and other additional information to request for rent',
    },
  ];

  const [openQuestion, setOpenQuestion] = useState(0); // Set the initial state to 0

  const handleClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="container mx-auto mt-16">
    <div className='flex  justify-evenly'>
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
                enter="transition-transform duration-300 ease-out"
                enterFrom="transform scale-0 opacity-0"
                enterTo="transform scale-0 opacity-100"
                leave="transition-transform duration-300 ease-in"
                leaveFrom="transform scale-0 opacity-100"
                leaveTo="transform scale-0 opacity-0"
              >
              <div className="collapse-content flex items-center">
  <p
    className={`text-black pl-5 ${
      openQuestion !== null && openQuestion === index ? 'h-auto' : 'h-0 overflow-hidden'
    }`}
  >
    {question.content}
  </p>
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
          <img className='h-96 w-80'
            src={questions[openQuestion].image}
            alt={questions[openQuestion].question}
          />
        )}
      </div>
    </div>
  </div>
);
};


export default FaqSection;
