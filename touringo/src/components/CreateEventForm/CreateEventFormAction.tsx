import React from "react";

interface CreateEventFormActionsProps {
  isSubmitting: boolean;
}

export const CreateEventFormActions: React.FC<CreateEventFormActionsProps> = ({ isSubmitting }) => (
  <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400" disabled={isSubmitting}>
    {isSubmitting ? "Submitting..." : "Create Event"}
  </button>
);
