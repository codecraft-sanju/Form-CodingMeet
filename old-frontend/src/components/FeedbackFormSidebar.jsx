// import React, { useState } from 'react';
// import { Toaster } from 'react-hot-toast';
// import { useFeedback } from '../context/FeedbackContext';
// import { X, User, MessageSquare } from 'lucide-react';

// export default function FeedbackFormSidebar({ isOpen, onClose }) {
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
//   const { loading, submitFeedback } = useFeedback();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await submitFeedback({ name, message });
//     if (success) {
//       setName('');
//       setMessage('');
//       onClose();
//     }
//   };

//   const handleMessageChange = (e) => {
//     const input = e.target.value;
//     const words = input.trim().split(/\s+/);
//     if (words.length <= 20) {
//       setMessage(input);
//     } else {
//       setMessage(words.slice(0, 20).join(' '));
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-right" />
//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-br from-[#0f172a]/80 to-black/60 backdrop-blur-xl border-l border-white/10 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transform ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         } transition-transform duration-500 z-50 flex flex-col`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
//           <h2 className="text-lg font-bold tracking-wide flex items-center gap-2">
//             Share Your Feedback
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-white/10 transition"
//           >
//             <X size={20} className="text-white/80" />
//           </button>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-5 px-6 py-6 overflow-y-auto flex-1"
//         >
//           <div className="relative">
//             <User className="absolute top-3.5 left-3 text-indigo-400" size={18} />
//             <input
//               type="text"
//               placeholder="Your Name (optional)"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-indigo-500/20 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
//             />
//           </div>

//           <div className="relative">
//             <MessageSquare className="absolute top-3.5 left-3 text-indigo-400" size={18} />
//             <textarea
//               placeholder="Write your feedback..."
//               value={message}
//               onChange={handleMessageChange}
//               className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-indigo-500/20 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition h-32 resize-none"
//             ></textarea>
//             <p className="text-right text-xs text-white/50 mt-1">
//               {message.trim() ? message.trim().split(/\s+/).length : 0}/20 words
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all font-bold disabled:opacity-50 shadow-lg"
//           >
//             {loading ? 'Submitting...' : 'Send Feedback'}
//           </button>
//         </form>

//         {/* Sticky Footer */}
//         <p className="text-xs text-center text-white/40 px-6 py-4 border-t border-white/10">
//           We appreciate your time!
//         </p>
//       </div>
//     </>
//   );
// }
