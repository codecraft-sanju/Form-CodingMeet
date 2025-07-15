// import React from 'react';
// import { useFeedback } from '../context/FeedbackContext';

// export default function TestimonialsSlider() {
//   const { feedbacks } = useFeedback();

//   const latestFeedbacks = feedbacks.slice(0, 8);

//   return (
//     <div className="w-full overflow-hidden relative py-7">
//       <div className="flex space-x-6 animate-scroll px-6">
//         {latestFeedbacks.map((fb) => (
//           <div
//             key={fb._id}
//             className="flex-shrink-0 backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-6 w-72 shadow-xl transition transform hover:scale-[1.03]"
//           >
//             <div className="flex items-center mb-4">
//               <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold shadow-md">
//                 {fb.name?.charAt(0).toUpperCase() || 'U'}
//               </div>
//               <span className="ml-4 font-semibold text-white text-base">
//                 {fb.name || 'Anonymous'}
//               </span>
//             </div>

//             <div className="border-b border-white/20 mb-4"></div>

//             <p className="text-gray-200 text-sm leading-relaxed italic font-serif relative pl-4 break-words before:content-['“'] before:text-4xl before:absolute before:-left-2 before:top-0 after:content-['”'] after:text-4xl after:ml-1">
//               {fb.message}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
