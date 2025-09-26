import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={`bg-blue-700 text-white h-screen p-4 transition-width duration-300 ${
          isOpen ? "w-64" : "w-16"
        } flex flex-col`}
      >
        <button
          className="mb-6 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Sidebar"
        >
          {isOpen ? "⏪" : "⏩"}
        </button>

        <nav className="flex flex-col space-y-4">
          <Link to="/" className="hover:bg-blue-600 rounded px-2 py-1">
            {isOpen ? "🏠 Home" : "🏠"}
          </Link>
          <Link to="/pacientes" className="hover:bg-blue-600 rounded px-2 py-1">
            {isOpen ? "👥 Pacientes" : "👥"}
          </Link>
          <Link to="/cirurgias" className="hover:bg-blue-600 rounded px-2 py-1">
            {isOpen ? "🔪 Cirurgias" : "🔪"}
          </Link>
          <Link to="/financeiro" className="hover:bg-blue-600 rounded px-2 py-1">
            {isOpen ? "💰 Financeiro" : "💰"}
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Conteúdo principal</h1>
      </div>
    </div>
  );
}
