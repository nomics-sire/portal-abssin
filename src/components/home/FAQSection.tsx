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
      question: "HOW DO I CREATE MY PERSONAL ABSSIN?",
      answer:
        "Go to the url: https://abssin.com/individual/create, and type in your BVN or NIN, enter your email and click on Continue. An OTP number will be sent to you immediately, then type in the numbers correctly and fill up the form in the next page. Or you can click on No ID if you do not have BVN/NIN.",
    },
    {
      question: "I CANNOT REMEMBER MY ABSSIN?",
      answer: "Go to the link: https://abssin.com/abssin/retrieve Input your phone number and it will send an OTP to your phone.Type in the OTP and submit, it will display your ABSSIN.",
    },
    {
      question: "I CANNOT REMEMBER MY PASSWORD?",
      answer: "Go to:  https://abssin.com/forgot-password, To reset via phone number. Enter your ABSSIN Ensure phone number option is selected, An OTP will be sent to your registered phone number, Enter the received OTP And your new password, Click submit. To reset via email, Enter your ABSSIN Ensure email is selected And a reset link will be sent to your email Click on the received link to reset your password",
    },
    {
      question: "I NO LONGER HAVE ACCESS TO THE NUMBER I USED TO REGISTER MY BVN OR NIN, SO I CANNOT GET OTP ?",
      answer: "go to: https://abiapay.com/individual/create, and select No ID, Enter your email and phone number, An email carrying a link would be sent to the email you inputted, and an OTP (One time Password) would be sent to the mobile number. Enter your OTP, and click the “Verify Account” button, You would be directed to a page to enter your other details.When you’re done entering your details, Click the “Submit” button, A message would be sent to your mobile number, carrying your ABSSIN.",
    },
    {
      question: "WHEN I TAKE PICTURES, IT DOESN'T CAPTURE ?",
      answer: "Ensure your phone allows camera access for the browser, also try using a different browser",
    },
    {
      question: "WHAT CATEGORY DO I FALL INTO AS A CIVIL SERVANT ?",
      answer: "This is not a mandatory field, kindly leave it blank.",
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
