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
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={onToggle} // Toggle review form visibility
      >
        {isActive ? 'Close Review' : 'Leave a Review'}
      </button>
      {isActive && (
        <form
          onSubmit={handleFormSubmit}
          style={{
            border: '1px solid #ccc',
            padding: '1em',
            marginTop: '0.5em',
            borderRadius: '5px',
          }}
        >
          <div>
            <p>Rate your experience (1-5):</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  style={{
                    backgroundColor: rating === num ? 'lightblue' : 'white',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
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
              style={{
                width: '100%',
                height: '80px',
                padding: '0.5em',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
              disabled={status === 'submitting'}
            />
          </div>
          <button
            type="submit"
            style={{
              marginTop: '1em',
              padding: '0.5em 1em',
              borderRadius: '5px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
            }}
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
