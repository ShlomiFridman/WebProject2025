import React, { useState } from 'react';

const BookingReviewButton: React.FC<{ onSubmit: (rating: number, feedback: string) => void }> = ({ onSubmit }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (rating === null) {
      alert('Please select a rating.');
      return;
    }
    if (!feedback.trim()) {
      alert('Please provide some feedback.');
      return;
    }
    onSubmit(rating, feedback);
    setDropdownVisible(false);
    setRating(null);
    setFeedback('');
    alert('Thank you for your feedback!');
  };

  return (
    <div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setDropdownVisible((prev) => !prev)}
      >
        {dropdownVisible ? 'Close Review' : 'Leave a Review'}
      </button>
      {dropdownVisible && (
        <form
          onSubmit={handleFormSubmit}
          style={{ border: '1px solid #ccc', padding: '1em', marginTop: '0.5em', borderRadius: '5px' }}
        >
          <div>
            <p>How much did you enjoy the event?</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
              {['😞', '😕', '😐', '🙂', '😄'].map((emoji, index) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  style={{
                    backgroundColor: rating === index + 1 ? 'lightblue' : 'white',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  {emoji}
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
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingReviewButton;
