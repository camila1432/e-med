import React from "react";

export function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger(props) {
  return <Select {...props} />;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}

export function SelectItem({ value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
}

export function SelectValue({ children }) {
  return <span>{children}</span>;
}
