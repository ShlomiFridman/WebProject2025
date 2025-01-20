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
  const [loading, setLoading] = useState<boolean>(true); // To track if data is loading

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
        if (response.status == 204) return null;
        return response.json();
      })
      .then((resBody) => {
        if (resBody == null) {
          console.log(`No review for booking ${booking.booking_id}`);
          setReview(null);
        } else if (resBody.message) {
          alert(resBody.message);
        } else {
          const review = resBody.result as Review;
          console.log(`Review found for booking ${booking.booking_id}`);
          setReview(review);
          setRating(review.score);
          setFeedback(review.description);
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Make sure loading state is set to false in case of error
      });
  }, [booking.booking_id]);

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

      if (response.status < 500) {
        const resBody = await response.json();
        if (resBody.result) {
          const review = resBody.result as Review;
          console.log(`Review created successfully:`, review);
          setReview(review);
          return true;
        } else {
          alert(resBody.message);
          setIsActive(false);
          return false;
        }
      } else {
        alert(`Server error: ${response.statusText}`);
        return false;
      }
    } catch (error) {
      console.error("Error creating review:", error);
      alert("An unexpected error occurred while submitting the review.");
      return false;
    }
  };

  const handleReviewToggle = () => {
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
      // resetForm();
    } else {
      setStatus('error');
    }
  };

  // const resetForm = () => {
  //   setRating(null);
  //   setFeedback('');
  //   setStatus('idle');
  //   setIsActive(false); // Close form after submission
  // };

  // Add condition to check for loading before rendering the button
  if (loading) {
    return <LoadingBox />;
  }

  return (
    <div>
      <button
        className={`bg-green-500 px-4 py-2 rounded hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600`}
        onClick={handleReviewToggle}
      >
        {review == null ? (isActive ? 'Close Review' : 'Leave a Review') : "View review"}
      </button>
      {isActive && (
        <form onSubmit={handleFormSubmit} className="border border-gray-700 dark:border-gray-300 p-4 mt-2 rounded-md">
          <div>
            <p className="text-lg mb-4">Rate your experience<br/>(1 - Worst, 5 - Best)</p>
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  disabled={status === 'submitting' || review != null}
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`w-10 h-10 rounded-full border border-gray-700 dark:border-gray-300 flex items-center justify-center text-lg ${rating === num ? 'bg-green-400' : ''}`}
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
              className="w-full h-20 p-2 rounded-md border border-gray-700 dark:border-gray-300 resize-none"
              disabled={status === 'submitting' || review != null}
            />
          </div>
          <button
            type="submit"
            className={`mt-4 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 ${review != null? "hidden":""}`}
            disabled={review != null || status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingReviewButton;
