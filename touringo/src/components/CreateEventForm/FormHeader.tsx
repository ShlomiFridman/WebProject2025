import React from "react";

interface FormHeaderProps {
  title: string;
  subTitle : string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subTitle }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold">{title}</h2>
    <h2 className="text-l text-red-500">{subTitle}</h2>
  </div>
);

export default FormHeader;
