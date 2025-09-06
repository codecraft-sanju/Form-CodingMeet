import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const FeedbackContext = createContext();

export const useFeedback = () => useContext(FeedbackContext);

export function FeedbackProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('/api/feedback/all');
      if (res.data.success) {
        setFeedbacks(res.data.feedbacks);
      } else {
        toast.error('Failed to load feedbacks.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error loading feedbacks.');
    }
  };

  // Submit new feedback & add it instantly
  const submitFeedback = async ({ name, message }) => {
    if (!message.trim()) {
      toast.error('Please enter your feedback.');
      return false;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/feedback/add', { name, message });
      if (res.data.success && res.data.feedback) {
        // Add new feedback at the top immediately
        setFeedbacks((prev) => [res.data.feedback, ...prev]);
        toast.success('Thank you for your feedback!');
        return true;
      } else {
        toast.error('Failed to submit feedback.');
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit feedback.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        loading,
        submitFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
