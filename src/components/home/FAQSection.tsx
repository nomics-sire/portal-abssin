"use client";

import { FC, useState } from "react";

interface FAQ {
  question: string;
  answer?:
    | string
    | { text?: string; list?: FAQListItem[]; listType?: "bullet" | "number" };
}

interface FAQListItem {
  text: string;
  list?: FAQListItem[]; // supports nested sub-items
  listType?: "bullet" | "number";
}

interface FAQItemProps {
  faq: FAQ;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const RenderList: FC<{
  items: FAQListItem[];
  listType?: "bullet" | "number";
}> = ({ items, listType }) => {
  const ListTag = listType === "number" ? "ol" : "ul";
  const listClass =
    listType === "number"
      ? "list-decimal pl-6 space-y-1"
      : "list-disc pl-6 space-y-1";

  return (
    <ListTag className={listClass}>
      {items.map((item, i) => (
        <li key={i}>
          {item.text}
          {item.list && (
            <RenderList items={item.list} listType={item.listType} />
          )}
        </li>
      ))}
    </ListTag>
  );
};

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
                <RenderList
                  items={faq.answer.list}
                  listType={faq.answer.listType}
                />
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
          { text: "Interacting with state government agencies" },
          { text: "Accessing public services" },
          { text: "School enrollment" },
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
          { text: "Access a wide range of government services" },
          { text: "Qualify for government grants" },
          { text: "Apply for state-sponsored job opportunities" },
          { text: "Participate in scholarship programs" },
          { text: "Enroll in digital and tech training initiatives" },
        ],
        listType: "bullet",
      },
    },
    {
      question: "How do I create or register for my ABSSIN?",
      answer: {
        text: "To create your ABSSIN:",
        list: [
          { text: "On the portal home page." },
          { text: "Click on “Create Personal ABSSIN.”" },
          {
            text: "Enter your BVN or NIN and your email address, then click Submit.",
          },
          { text: "An OTP (One-Time Password) will be sent to your phone." },
          { text: "Enter the OTP to complete registration." },
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
          {
            text: "Create My ABSSIN – Start your registration process.",
          },
          {
            text: "Enter NIN to Create ABSSIN – Input your NIN to generate your ABSSIN.",
          },
          {
            text: "Retrieve My ABSSIN – Access your ABSSIN if you’ve already registered.",
          },
        ],
        listType: "bullet",
      },
    },
    {
      question: "I completed registration but didn't get my ABSSIN?",
      answer: {
        list: [
          {
            text: "Check your SMS inbox and email (including spam folder) for a message from ABSSIN.",
          },
          {
            text: "If you still did not receive it, use the “Retrieve ABSSIN” feature on the portal.",
          },
        ],
        listType: "bullet",
      },
    },
    {
      question: "How do I retrieve my ABSSIN?",
      answer: {
        list: [
          { text: "On the portal home page, click “Retrieve ABSSIN.”" },
          { text: "Enter your phone number or email address." },
          { text: "An OTP will be sent to you." },
          { text: "Enter the OTP and your ABSSIN will be displayed." },
        ],
        listType: "number",
      },
    },
    {
      question: "I forgot my password, how do I log in?",
      answer: {
        listType: "number",
        list: [
          { text: "On the portal home page" },
          { text: "Click User Login and select Forgotten Password." },
          { text: "Enter your ABSSIN." },
          {
            text: "If using phone number:",
            listType: "bullet",
            list: [
              { text: "An OTP will be sent to your registered phone." },
              { text: "Enter the OTP, create a new password, and confirm it." },
            ],
          },
          {
            text: "If using email:",
            listType: "bullet",
            list: [
              { text: "A reset link will be sent to your registered email." },
              {
                text: "Click the link and follow instructions to set a new password.",
              },
            ],
          },
        ],
      },
    },
    {
      question:
        "What if I no longer have access to the phone number linked to my BVN/NIN?",
      answer: {
        text: "If you cannot receive an OTP:",
        list: [
          { text: "On the portal home page select “No ID” option." },
          { text: "Enter your new email and phone number." },
          { text: "An OTP will be sent to your phone and a verification link to your email." },
          { text: "Verify your account, fill in your details, and submit." },
          { text: "You will receive a confirmation message along with your ABSSIN." },
        ],
        listType: "number",
      },
    },
    {
      question:
        "I take pictures but it doesn't capture",
      answer: {
   
        list: [
          { text: "Ensure your phone allows camera access for your browser." },
          { text: "If the issue persists, try using a different browser." },
        ],
        listType: "bullet",
      },
    },
        {
      question: "why am I not receiving an OTP?",
      answer:
        "This may happen if the phone number linked to your BVN or NIN is inactive. You can generate your ABSSIN without BVN or NIN by selecting “Create ABSSIN without ID.”",
    },
        {
      question:
        "How does a business register for an ABSSIN?",
      answer: {
   text:"You must first create a Personal ABSSIN before creating a Business ABSSIN. steps:",
        list: [
          { text: "On the portal home page." },
          { text: "Click on “Create Business ABSSIN.”" },
          { text: "Enter your Personal ABSSIN." },
          { text: "Fill in the required information and click Submit." },
        ],
        listType: "number",
      },
    },
      {
      question:
        "How do I get a copy of my ABSSIN SLIP?",
      answer: {
   
        list: [
          { text: "After logging into the portal, use the “Generate ABSSIN Slip” feature." },
          { text: "Enter your ABSSIN to generate and print your official slip." },
        ],
        listType: "bullet",
      },
    },
           {
      question: "I made a mistake during registration, how can I correct my information?",
      answer:
        "Please contact the ABSSIN support team or visit a designated registration center for assistance with data correction.",
    },
       {
      question:
        "I am an agent/MDA staff, how do I login to the portal?",
      answer: {
   
        list: [
          { text: "Agents and MDA Staff must use the “User Roles Login” section." },
          { text: "Do not use the public registration links." },
          { text: "You will need the unique username and password provided by the ABSSIN administration." },
        ],
        listType: "bullet",
      },
    },
       {
      question:
        "what browsers are supported by the ABSSIN portal?",
      answer: {
        text: "The portal works best on modern browsers such as:",
        list: [
          { text: "Google Chrome" },
          { text: "Mozilla Firefox" },
          { text: "Microsoft Edge" },
          { text: "Safari" },
        ],
        listType: "bullet",
      },
    },
               {
      question: "I am experiencing a technical issue with the website",
      answer:
        "Report any technical glitches (e.g., error messages, pages not loading) to the ABSSIN support team via the Contact Us section on the portal.",
    },
               {
      question: "Where is the ABSSIN office located?",
      answer:
        "The physical office is located at the Ministry of Budget and Planning, Abia State. For the exact address and phone number, please see the Contact Us section of the ABSSIN website.",
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
