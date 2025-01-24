import React from "react";

interface FormHeaderProps {
  title: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold">{title}</h2>
  </div>
);

export default FormHeader;
