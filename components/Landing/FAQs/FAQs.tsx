'use client'
import "./FAQs.css"
import { faqs } from "@/utils/FAQAnswers";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from 'react';

export default function FAQs() {
   const [openIndex, setOpenIndex] = useState(0);
   const handleToggle = (index: number) => {
      setOpenIndex(openIndex === index ? 0 : index); // Close if already open, otherwise open the clicked one
   };

   return (
      <section className="faq-section-container" id="faqs">
         <h2>Frequently Asked Questions</h2>
         <div className="faq-list-space">
            {faqs.map((faq, index) => (
               <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
               />
            ))}
         </div>
      </section>
   );
}


function FaqItem({ question, answer, isOpen, onToggle }: { question: string, answer: ReactNode, isOpen: boolean, onToggle: () => void }) {
   return (
      <div className="faq-item-container">
         <button className="faq-button" onClick={onToggle} aria-expanded={isOpen}>
            <span>{question}</span>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
         </button>
         <div className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}>
            <div className="faq-answer-content">{answer}</div>
         </div>
      </div>
   );
}