import { Booking, Review } from '@/utils/classes';
import React, { useEffect, useState } from 'react';
import LoadingBox from '../LoadingBox';
import { getLoggedAccount } from '@/utils/util_client';
import { encryptData } from '@/utils/utils';

const BookingReviewButton: React.FC<{
  booking: Booking;
}> = ({ booking }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [review, setReview] = useState<Review | null | undefined>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const account = getLoggedAccount();
    if (account) {
      setUsername(account.username);
      setReview(null);
    }

    
        fetch(`/api/reviews/getByBookingId/${booking.booking_id}`)
              .then((response) => {
                const badRequestError = response.status >= 400 && response.status < 500;
                if (!response.ok && !badRequestError) {
                  alert(response.statusText);
                  throw new Error('Unknown Error');
                }
                if (response.status == 204)
                  return null;
                return response.json();
              })
              .then((resBody) => {
                if (resBody == null){
                  console.log(`No review for booking ${booking.booking_id}`)
                  setReview(null);
                }
                else if (resBody.message) {
                  alert(resBody.message);
                } else {
                  const review = resBody.result as Review;
                  console.log(`review found for booking ${booking.booking_id}`)
                  setReview(review);
                }
              })
              .catch((err) => {
                console.log(err);
              })

  }, [booking.booking_id]);

  // Handle review creation
  const createReview = async (rating: number, feedback: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        body: JSON.stringify({
          data: encryptData({
            newReview: new Review(
              booking.booking_id,
              username || "unknown",
              booking.event_id,
              rating,
              feedback,
              new Date().toISOString().split("T")[0]
            ),
          }),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const resBody = await response.json();
        if (resBody.result) {
          console.log(`Review created successfully:`, resBody.result);
          return true;
        }
        alert(resBody.message || "Review creation failed.");
        return false;
      } else {
        alert(`Failed to create review: ${response.statusText}`);
        return false;
      }
    } catch (error) {
      console.error("Error creating review:", error);
      alert("An unexpected error occurred while submitting the review.");
      return false;
    }
  };

  // Handle toggling the active review state (and closing previously opened forms)
  const handleReviewToggle = () => {
    // If the clicked review form is already open, close it; if not, open it and close others
    setIsActive(!isActive);
  };

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
    const success = await createReview(rating, feedback);

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
    handleReviewToggle(); // Close form after submission
  };

  return (review !== undefined) ? (
    <div>
      <button
        disabled={review != null}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600"
        onClick={handleReviewToggle} // Toggle review form visibility
      >
        {review == null ?
          (isActive ? 'Close Review' : 'Leave a Review') : "Already reviewed"}
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
              className="w-full h-20 p-2 rounded-md border border-gray-300 resize-none"
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
  ) : <LoadingBox />;
};

export default BookingReviewButton;
