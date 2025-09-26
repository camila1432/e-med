import * as React from "react";

export function Tabs({ children }) {
  return <div className="border rounded-md">{children}</div>;
}

export function TabsList({ children }) {
  return (
    <div className="flex border-b bg-gray-100 text-sm font-medium text-gray-700">
      {children}
    </div>
  );
}

export function TabsTrigger({ children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 focus:outline-none ${
        isActive ? "bg-white border-b-2 border-blue-500" : "hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, isActive }) {
  if (!isActive) return null;
  return <div className="p-4">{children}</div>;
}
