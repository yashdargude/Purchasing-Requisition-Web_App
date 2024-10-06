// src/components/Header.jsx

import React, { FC } from "react";

interface headerProps {
    searchQuery: string;
    setSearchQuery: (searchQuery: string) =>void;
}

const Header:FC<headerProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-blue-500 text-white p-4 sticky top-0">
      <h1 className="text-xl">Purchasing Requisition App</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mt-2 w-full"
      />
    </header>
  );
};

export default Header;
