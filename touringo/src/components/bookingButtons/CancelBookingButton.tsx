import { Booking, Review } from "@/utils/classes";
import React, { useEffect, useState } from "react";
import LoadingBox from "../LoadingBox";
import { getLoggedAccount } from "@/utils/util_client";
import { encryptData } from "@/utils/utils";
import { myStyles } from "@/components/styles";

const BookingReviewButton: React.FC<{
  booking: Booking; // Props: A Booking object containing details about the current booking
}> = ({ booking }) => {
  // State variables for managing user inputs, review data, and UI status
  const [rating, setRating] = useState<number | null>(null); // User's selected rating
  const [username, setUsername] = useState<string | null>(null); // Logged-in user's username
  const [feedback, setFeedback] = useState(""); // User's feedback text
  const [review, setReview] = useState<Review | null | undefined>(undefined); // Existing review for the booking
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle"); // Submission status
  const [isActive, setIsActive] = useState<boolean>(false); // Visibility state of the review form
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching data

  // Fetch review data and user information when the component mounts
  useEffect(() => {
    const account = getLoggedAccount();
    if (account) {
      setUsername(account.username); // Set the username from the logged-in account
      setReview(null); // Reset review state
    }

    fetch(`/api/reviews/getByBookingId/${booking.booking_id}`) // Fetch existing review for the booking
      .then((response) => {
        const badRequestError = response.status >= 400 && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText); // Notify user if the error is unexpected
          throw new Error("Unknown Error");
        }
        if (response.status == 204) return null; // No content found
        return response.json();
      })
      .then((resBody) => {
        if (resBody == null) {
          console.log(`No review for booking ${booking.booking_id}`);
          setReview(null); // No review exists
        } else if (resBody.message) {
          alert(resBody.message); // Display any error message from the response
        } else {
          const review = resBody.result as Review;
          console.log(`Review found for booking ${booking.booking_id}`);
          setReview(review); // Set the fetched review
          setRating(review.score); // Prepopulate the rating
          setFeedback(review.description); // Prepopulate the feedback
        }
        setLoading(false); // Mark loading as complete
      })
      .catch((err) => {
        console.log(err); // Log any errors during the fetch
        setLoading(false); // Ensure loading is marked complete
      });
  }, [booking.booking_id]);

  // Function to create a new review
  const createReview = async (rating: number, feedback: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        body: JSON.stringify({
          data: encryptData({
            newReview: new Review(
              booking.booking_id,
              username || "unknown", // Use "unknown" if username is unavailable
              booking.event_id,
              rating,
              feedback,
              new Date().toISOString().split("T")[0] // Format the current date
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
          setReview(review); // Update the state with the created review
          return true; // Return success
        } else {
          alert(resBody.message); // Notify user of any issues
          setIsActive(false); // Close the review form
          return false;
        }
      } else {
        alert(`Server error: ${response.statusText}`); // Notify user of server error
        return false;
      }
    } catch (error) {
      console.error("Error creating review:", error); // Log unexpected errors
      alert("An unexpected error occurred while submitting the review.");
      return false;
    }
  };

  // Toggle the visibility of the review form
  const handleReviewToggle = () => {
    setIsActive(!isActive);
  };

  // Handle form submission for creating a review
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (rating === null) {
      alert("Please select a rating."); // Validate rating
      return;
    }
    if (!feedback.trim()) {
      alert("Please provide some feedback."); // Validate feedback
      return;
    }
    setStatus("submitting"); // Set submission state
    const success = await createReview(rating, feedback);

    if (success) {
      setStatus("success"); // Mark as successful
      alert("Thank you for your feedback!");
    } else {
      setStatus("error"); // Mark as failed
    }
  };

  // Show a loading indicator while data is being fetched
  if (loading) {
    return <LoadingBox />;
  }

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
                  disabled={status === "submitting" || review != null} // Disable if review already exists
                  key={num}
                  type="button"
                  onClick={() => setRating(num)} // Update rating state
                  className={`w-10 h-10 rounded-full border border-gray-700 dark:border-gray-300 flex items-center justify-center text-lg ${
                    rating === num ? "bg-green-400" : "" // Highlight selected rating
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div>
            <textarea
              value={feedback} // Bind feedback to state
              onChange={(e) => setFeedback(e.target.value)} // Update feedback state
              placeholder="Leave your feedback here..."
              className="w-full h-20 p-2 rounded-md border border-gray-700 dark:border-gray-300 resize-none"
              disabled={status === "submitting" || review != null} // Disable if review exists
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className={`mt-4 px-4 py-2 rounded-md ${myStyles.button_blue} ${review != null ? "hidden" : ""}`}
              disabled={review != null || status === "submitting"} // Disable while submitting
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
