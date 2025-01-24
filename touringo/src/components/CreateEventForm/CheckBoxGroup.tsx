import React from "react";

interface CheckboxGroupProps {
  label: string;
  items: string[];
  values: boolean[];
  disabledItems?: boolean[];
  onChange: (index: number) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  items,
  values,
  disabledItems = [],
  onChange,
}) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">{label}</label>
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <label key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values[index]}
            onChange={() => onChange(index)}
            disabled={disabledItems[index]}
          />
          {item}
        </label>
      ))}
    </div>
  </div>
);

export default CheckboxGroup;
