import React, { useState } from 'react';

const BookingReviewButton: React.FC<{
  isActive: boolean;
  onToggle: () => void;
  onSubmit: (rating: number, feedback: string) => Promise<boolean>;
}> = ({ isActive, onToggle, onSubmit }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) {
      alert('Please select a rating.');
      return;
    }
    if (!feedback.trim()) {
      alert('Please provide some feedback.');
      return;
    }
    setStatus('submitting');
    const success = await onSubmit(rating, feedback);

    if (success) {
      setStatus('success');
      alert('Thank you for your feedback!');
      resetForm();
    } else {
      setStatus('error');
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const resetForm = () => {
    setRating(null);
    setFeedback('');
    setStatus('idle');
    onToggle(); // Close form after submission
  };

  return (
    <div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600"
        onClick={onToggle} // Toggle review form visibility
      >
        {isActive ? 'Close Review' : 'Leave a Review'}
      </button>
      {isActive && (
        <form
          onSubmit={handleFormSubmit}
          className="border border-gray-300 p-4 mt-2 rounded-md"
        >
          <div>
            <p className="text-lg mb-4">Rate your experience</p>
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-lg ${rating === num ? 'bg-green-400' : ''}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Leave your feedback here..."
              className="w-full h-20 p-2 rounded-md border border-gray-300"
              disabled={status === 'submitting'}
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingReviewButton;
