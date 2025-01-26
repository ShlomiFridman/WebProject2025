import { Booking, Review } from "@/utils/classes";
import React, { useEffect, useState } from "react";
import LoadingBox from "../LoadingBox";
import { getLoggedAccount } from "@/utils/util_client";
import { encryptData } from "@/utils/utils";
import { myStyles } from "@/components/styles";

// BookingReviewButton component allows users to leave or view a review for a booking
const BookingReviewButton: React.FC<{
  booking: Booking; // The booking object for which the review is related
}> = ({ booking }) => {
  // State variables to manage review form, submission, and data
  const [rating, setRating] = useState<number | null>(null); // Stores the selected rating
  const [username, setUsername] = useState<string | null>(null); // Stores the logged-in user's username
  const [feedback, setFeedback] = useState(""); // Stores the feedback text
  const [review, setReview] = useState<Review | null | undefined>(undefined); // Stores the fetched review for this booking
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle"); // Tracks submission status
  const [isActive, setIsActive] = useState<boolean>(false); // Tracks whether the review form is active
  const [loading, setLoading] = useState<boolean>(true); // Tracks if data is being loaded

  // Effect hook to fetch the review for the booking on component mount
  useEffect(() => {
    const account = getLoggedAccount();
    if (account) {
      setUsername(account.username); // Set the username of the logged-in account
      setReview(null); // Reset review state on mount
    }

    // Fetch existing review for the booking
    fetch(`/api/reviews/getByBookingId/${booking.booking_id}`)
      .then((response) => {
        const badRequestError = response.status >= 400 && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText);
          throw new Error("Unknown Error");
        }
        if (response.status == 204) return null;
        return response.json();
      })
      .then((resBody) => {
        if (resBody == null) {
          console.log(`No review for booking ${booking.booking_id}`);
          setReview(null); // No review found
        } else if (resBody.message) {
          alert(resBody.message); // Show error message from response
        } else {
          const review = resBody.result as Review;
          console.log(`Review found for booking ${booking.booking_id}`);
          setReview(review); // Set fetched review
          setRating(review.score); // Set rating from review
          setFeedback(review.description); // Set feedback from review
        }
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false on error
      });
  }, [booking.booking_id]); // Re-fetch review when the booking ID changes

  // Function to create a new review and submit to the server
  const createReview = async (rating: number, feedback: string): Promise<boolean> => {
    try {
      // Send POST request to create a new review
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        body: JSON.stringify({
          data: encryptData({
            newReview: new Review(
              booking.booking_id,
              username || "unknown", // Use 'unknown' if no username is available
              booking.event_id,
              rating,
              feedback,
              new Date().toISOString().split("T")[0] // Set current date for review
            ),
          }),
        }),
        headers: { "Content-Type": "application/json" },
      });

      // Check for successful response
      if (response.status < 500) {
        const resBody = await response.json();
        if (resBody.result) {
          const review = resBody.result as Review;
          console.log(`Review created successfully:`, review);
          setReview(review); // Set the newly created review
          return true;
        } else {
          alert(resBody.message); // Show error message from server
          setIsActive(false); // Reset form state if creation fails
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

  // Toggle the visibility of the review form
  const handleReviewToggle = () => {
    setIsActive(!isActive);
  };

  // Handle form submission for new review
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) {
      alert("Please select a rating.");
      return;
    }
    if (!feedback.trim()) {
      alert("Please provide some feedback.");
      return;
    }
    setStatus("submitting"); // Set status to submitting during form submission
    const success = await createReview(rating, feedback);

    if (success) {
      setStatus("success");
      alert("Thank you for your feedback!"); // Show success message
    } else {
      setStatus("error");
    }
  };

  // If data is still loading, display loading indicator
  if (loading) {
    return <LoadingBox />;
  }

  // If review data exists, display the review button or review form
  return review !== undefined ? (
    <div className="flex flex-col items-center">
      {/* Button to toggle the review form or view the review */}
      <button
        className={`bg-green-500 px-4 py-2 rounded hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600`}
        onClick={handleReviewToggle}
      >
        {review == null ? (isActive ? "Close Review" : "Leave a Review") : "View review"}
      </button>
      {isActive && (
        // Review form for submitting feedback
        <form onSubmit={handleFormSubmit} className="border border-gray-700 dark:border-gray-300 p-4 mt-2 rounded-md ">
          <div>
            <p className="text-lg mb-4">Rate your experience<br />(1 - Worst, 5 - Best)</p>
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  disabled={status === "submitting" || review != null}
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`w-10 h-10 rounded-full border border-gray-700 dark:border-gray-300 flex items-center justify-center text-lg ${
                    rating === num ? "bg-green-400" : ""
                  }`}
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
              disabled={status === "submitting" || review != null}
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className={`mt-4 px-4 py-2 rounded-md ${myStyles.button_blue} ${review != null ? "hidden" : ""}`}
              disabled={review != null || status === "submitting"}
            >
              {status === "submitting" ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  ) : (
    <LoadingBox />
  );
};

export default BookingReviewButton;
