"use client";

import { FC, useState } from "react";

interface FAQ {
  question: string;
  answer?:
    | string
    | { text?: string; list?: string[]; listType?: "bullet" | "number" };
}

interface FAQItemProps {
  faq: FAQ;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const FAQItem: FC<FAQItemProps> = ({
  faq,
  index,
  activeIndex,
  setActiveIndex,
}) => {
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
        <div className="text-sm text-gray-600 pl-1 pb-3 border-b border-gray-200 space-y-2">
          {typeof faq.answer === "string" ? (
            <p>{faq.answer}</p>
          ) : (
            <>
              {faq.answer.text && <p>{faq.answer.text}</p>}
              {faq.answer.list && (
                <ul
                  className={`${
                    faq.answer.listType === "number"
                      ? "list-decimal"
                      : "list-disc"
                  } pl-6 space-y-1`}
                >
                  {faq.answer.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const FAQSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What is ABSSIN?",
      answer:
        "ABSSIN stands for Abia State Social Identification Number. It is a unique identification number issued to citizens and businesses in Abia state for streamlined access to government services and benefits.",
    },
    {
      question: "Is ABSSIN mandatory?",
      answer: {
        text: "Yes. ABSSIN is essential for:",
        list: [
          "Interacting with state government agencies",
          "Accessing public services",
          "School enrollment",
        ],
        listType: "bullet",
      },
    },
    {
      question: "How much does it cost to get an ABSSIN?",
      answer: "The ABSSIN is free of charge to all citizens.",
    },
    {
      question: "What are the benefits of ABSSIN?",
      answer: {
        text: "Having an ABSSIN enables you to:",
        list: [
          "Access a wide range of government services",
          "Qualify for government grants",
          "Apply for state-sponsored job opportunities",
          "Participate in scholarship programs",
          "Enroll in digital and tech training initiatives",
        ],
        listType: "bullet",
      },
    },
    {
      question: "How do I create or register for my ABSSIN?",
      answer: {
        text: "To create your ABSSIN:",
        list: [
          "On the portal home page.",
          "Click on “Create Personal ABSSIN.”",
          "Enter your BVN or NIN and your email address, then click Submit.",
          "An OTP (One-Time Password) will be sent to your phone.",
          "Enter the OTP to complete registration.",
        ],
        listType: "number",
      },
    },
    {
      question: "I don't have a BVN or NIN can I still get an ABSSIN?",
      answer:
        "Yes. Select the “Create ABSSIN with No ID” option on the portal and fill in your details manually.",
    },
    {
      question: "How do I register my child (dependent) for an ABSSIN?",
      answer:
        "A parent or guardian can register a dependent by selecting the “Create Dependent ABSSIN” option and providing the child’s details.",
    },
    {
      question: "How do I register for ABSSIN Using the USSD code?",
      answer: {
        text: "Dial *347*458# (using the phone number linked to your NIN or BVN). Follow the on-screen prompts to:",
        list: [
          "Create My ABSSIN – Start your registration process.",
          "Enter NIN to Create ABSSIN – Input your NIN to generate your ABSSIN.",
          "Retrieve My ABSSIN – Access your ABSSIN if you’ve already registered.",
        ],
        listType: "bullet",
      },
    },
    {
      question: "I completed registration but didn't get my ABSSIN?",
      answer: {
        list: [
          "Check your SMS inbox and email (including spam folder) for a message from ABSSIN.",
          "If you still did not receive it, use the “Retrieve ABSSIN” feature on the portal.",
        ],
        listType: "bullet",
      },
    },
    {
      question: "How do I retrieve my ABSSIN?",
      answer: {
        list: [
          "On the portal home page, click “Retrieve ABSSIN.”",
          "Enter your phone number or email address.",
          "An OTP will be sent to you.",
          "Enter the OTP and your ABSSIN will be displayed.",
        ],
        listType: "number",
      },
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
            Porta gravida elit convallis in eu. Venenatis euismod libero non sed
            in dolor feugiat.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-red-600">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Live Chat Support</p>
                <p className="text-sm text-gray-600">
                  Get real-time assistance from our support team
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-red-600">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.2 1.52.57 2.98 1.1 4.35a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45 19.86 19.86 0 0 1 4.35 1.1A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Contact Us</p>
                <p className="text-sm text-gray-600">
                  Need further help? Reach out to us
                </p>
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
