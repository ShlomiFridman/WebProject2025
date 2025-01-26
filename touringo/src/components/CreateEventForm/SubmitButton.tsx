import { myStyles } from "@/components/styles"; // Importing custom styles
import React from "react"; // Import React for component creation

// Define interface for props
interface SubmitButtonProps {
  isSubmitting: boolean; // A boolean to indicate whether the form is being submitted
}

// Functional component to render the Submit button
const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => (
  <div> {/* Wrapper div for the button */}
    <button
      type="submit" // Button type is 'submit' to submit the form
      disabled={isSubmitting} // Button is disabled when submitting
      className={`w-full p-2 rounded  ${isSubmitting
          ? "bg-gray-500 cursor-not-allowed dark:bg-gray-600" // Styles when submitting
          : myStyles.button_blue}`} // Styles when not submitting (using custom styles)
    >
      {/* Text changes based on isSubmitting state */}
      {isSubmitting ? "Submitting..." : "Create Event"}
    </button>
  </div>
);

export default SubmitButton; // Export the component for usage elsewhere
