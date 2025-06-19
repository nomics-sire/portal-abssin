"use client";

import { useState, FC } from "react";

interface FAQItemProps {
  faq: { question: string; answer?: string };
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const FAQItem: FC<FAQItemProps> = ({ faq, index, activeIndex, setActiveIndex }) => {
  const isOpen = activeIndex === index;

  return (
    <div>
      <button
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className="w-full flex justify-between items-center text-left font-medium text-gray-900 py-3"
      >
        <span>{faq.question}</span>
        <span className="text-gray-500 text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && faq.answer && (
        <p className="text-sm text-gray-600 pl-1 pb-3 border-b border-gray-200">
          {faq.answer}
        </p>
      )}
    </div>
  );
};

const FAQSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs: { question: string; answer?: string }[] = [
    {
      question: "Who can access the portal?",
      answer:
        "The portal is accessible to three types of users: Agents, Staff, and Admins. Each role has access to specific features relevant to their responsibilities.",
    },
    {
      question: "How do I register a new school in the portal?",
      answer: "You can register a school from the agent dashboard by filling out the required school information form.",
    },
    {
      question: "Can I assign teachers to specific classes or subjects?",
      answer: "Yes, admin users have access to assign teachers based on class and subject structure in the portal.",
    },
    {
      question: "Is the portal secure for storing student data?",
      answer: "Yes, all data is encrypted and stored in compliance with security best practices and privacy regulations.",
    },
    {
      question: "What kind of data can staff members manage?",
      answer: "Staff can manage student biodata, attendance, performance records, and class assignments.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        <div>
          <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-4 py-1 rounded-full mb-4">
            Questions & Answers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            Porta gravida elit convallis in eu. Venenatis euismod libero non sed in dolor feugiat.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-red-600">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Live Chat Support</p>
                <p className="text-sm text-gray-600">Get real-time assistance from our support team</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-red-600">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.2 1.52.57 2.98 1.1 4.35a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45 19.86 19.86 0 0 1 4.35 1.1A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Contact Us</p>
                <p className="text-sm text-gray-600">Need further help? Reach out to us</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
