import React, { useState } from 'react';
// import { useEmail } from './EmailContext'; // Adjust path
// import TailwindEditor from './TailwindEditor'; // The Tiptap editor we discussed
import { useEmail } from '../../Context/EmailProvider';
import TailwindEditor from './TailwindEditor';

const RightSide = () => {
  const { 
    sender, setSender, 
    subject, setSubject, 
    handleSentEmail, 
    loading 
  } = useEmail();

  const [emailError, setEmailError] = useState("");

  // Validation Logic before setting state
  const handleSenderChange = (e) => {
    const value = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "" || regex.test(value)) {
      setEmailError(""); // Clear error if valid or empty
    } else {
      setEmailError("Invalid email format (e.g., name@company.com)");
    }
    
    setSender(value); // We still set value to keep input controlled, but check error before "Send"
  };

  return (
    <div className="max-w-4xl   p-4 md:p-5   font-sans">
      {/* <h2 className="text-xl font-semibold  text-slate-800 mb-6"> Email Details</h2> */}

      <div className="space-y-5">
        
        {/* SENDER EMAIL FIELD */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Sender Email (Host):</label>
          <input
            type="email"
            value={sender}
            onChange={handleSenderChange}
            placeholder="your-hr@company.com"
            className={`w-full p-3 border rounded-lg outline-none transition-all ${
              emailError ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            }`}
          />
          {emailError && <span className="text-xs text-red-600 font-medium">{emailError}</span>}
        </div>

        {/* SUBJECT FIELD */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Email Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="MERN Stack Dev Role - March 2026"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* BODY (Tiptap Editor) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Message Content:</label>
          <p className="text-xs md:text-sm text-blue-800 font-medium leading-tight mt-1">
  <span className="font-bold">Note:</span> You can use{" "}
  <span className="underline decoration-blue-300">&lt;company&gt;</span>{" "}
  in your email body, and the system will automatically replace it with the
  respective company name for each recipient.
</p>
          <TailwindEditor /> {/* Uses the Tiptap logic we created earlier */}
        </div>

            <div className="mt-2 flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
  <div className="mt-0.5 text-blue-600">
    {/* Simple Info Icon (SVG) */}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  </div>
  <div>
    <p className="text-xs md:text-sm text-blue-800 font-medium leading-tight">
      <span className="font-bold">Pro Tip:</span> Please include the <span className="underline decoration-blue-300">Public URL of your resume</span> at the very end of your email body to ensure recipients can view your profile.
    </p>
  </div>
</div>
        

      </div>
    </div>
  );
};

export default RightSide;