import React from "react";
import clsx from "clsx"; 

export function Badge({ children, variant = "default", className = "" }) {
  const baseStyles = "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";

  const variants = {
    default: "bg-gray-200 text-gray-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={clsx(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
