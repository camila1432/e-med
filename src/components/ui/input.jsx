import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 " +
        className
      }
      {...props}
    />
  );
}
