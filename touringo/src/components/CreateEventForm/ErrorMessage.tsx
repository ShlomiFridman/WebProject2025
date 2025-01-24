import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="mb-4 text-red-500">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
