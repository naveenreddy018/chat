import React, { useState } from 'react';
import './help.css';

function Help() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I use Gemini AI?',
      answer: [
        'Step 1: Enter your query or request in the input box.',
        'Step 2: Press the "Submit" button to send the query to Gemini AI.',
        'Step 3: Wait for the AI to process and generate a response.',
        'Step 4: View the AI s response in the designated response area.',
        'Step 5: Modify your query for better results.',
        'Step 6: Use AI for various tasks like answering questions, generating ideas, or summarizing data.',
        'Step 7: AI learns and adapts based on your interactions.',
        'Step 8: Ask follow-up questions for more specific responses.',
        'Step 9: Provide feedback to improve accuracy.',
        'Step 10: Break complex queries into smaller parts for better results.',
      ],
    },
    {
      question: 'What can Gemini AI do?',
      answer: [
         ' Step 1: Gemini AI answers a wide range of questions.',
        ' Step 2: It summarizes text and provides key points.',
        'Step 3: Suggests improvements for writing, code, and content.',
        'Step 4: Generates ideas and brainstorming topics.',
        'Step 5: Translates text between multiple languages.',
        'Step 6: Assists in learning with explanations and breakdowns.',
        ' Step 7: Helps with decision-making by offering pros and cons.',
        ' Step 8: Integrates with systems for automation.',
        'Step 9: Simulates chatbot conversations.',
        'Step 10: Customizable for specific tasks like research, marketing, and software development.',
      ],
    },
    {
      question: 'How do I contact support?',
      answer: [
        'Step 1: Contact Gemini AI support via our contact page.',
        'Step 2: Email: support@gemini.ai',
        'Step 3: Phone: +123-456-7890',
        'Step 4: Support available 24/7.',
        'Step 5: For technical issues, provide detailed information.',
        'Step 6: For billing inquiries, include your account details.',
        'Step 7: Live chat available during business hours.',
        'Step 8: Check FAQs before reaching out.',
        'Step 9: Support available in multiple languages.',
        'Step 10: Non-urgent queries receive responses within 24-48 hours.',
      ],
    },
  ];

  return (
    <div className="help-container">
      <h1>Help & Support</h1>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="question" onClick={() => toggleAnswer(index)}>
              <h3>{faq.question}</h3>
              <span style={{ fontSize: '30px' }}>{activeQuestion === index ? '−' : '+'}</span>
            </div>
            {activeQuestion === index && (
              <div className="answer">
                <ul>
                  {faq.answer.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="how-to-use">
        <h2>How to Use Gemini AI</h2>
        <ul>
          <li>Step 1: Enter your query in the input box.</li>
          <li>Step 2: Press "Submit" to send the query.</li>
          <li>Step 3: View the AI's response.</li>
        </ul>
      </div>

      <div className="support-call">
        <h2>Support Call</h2>
        <p>Need help? Contact us:</p>
        <ul>
          <li>Email: <a href="mailto:support@gemini.ai">support@gemini.ai</a></li>
          <li>Phone: +123-456-7890</li>
        </ul>
      </div>
    </div>
  );
}

export default Help;
