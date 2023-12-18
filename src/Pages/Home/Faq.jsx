import React, { useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

const Faq = () => {
  const questions = [
    {
      question: 'What is your favorite color?',
      image: '/images/color.png',
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

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleClick = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <Accordion defaultActiveKey="0">
      {questions.map((question, index) => (
        <Card key={index}>
          <Accordion.Toggle as={Card.Header} eventKey={index.toString()} onClick={() => handleClick(index)}>
            {question.question}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
              <img src={question.image} alt={question.question} style={{ maxWidth: '100%' }} />
              <p>{question.content}</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default Faq;
