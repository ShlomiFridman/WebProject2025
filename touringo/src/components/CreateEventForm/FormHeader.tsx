import React from "react";

interface FormHeaderProps {
  title: string;
  subTitle : string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subTitle }) => (
  <div className="mb-6">
    <div className="text-xl font-bold">{title}</div>
    <div className="text-l text-red-500">{subTitle}</div>
  </div>
);

export default FormHeader;
