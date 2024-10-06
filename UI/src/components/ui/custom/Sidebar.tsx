import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path:string) => {
    navigate(path);
  };

  return (
    <div className="w-1/5 h-screen bg-gray-800 p-4 flex flex-col justify-between sticky top-0">
      {/* Top Section */}
      <div className="space-y-6">
        <Button
          className="text-white font-semibold hover:bg-gray-700 p-2 w-full"
          onClick={() => handleNavigate("/")}
        >
          Home
        </Button>
        <Button
          className="text-white font-semibold hover:bg-gray-700 p-2 w-full"
          onClick={() => handleNavigate("/settings")}
        >
          Settings
        </Button>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6">
        <Button
          className="text-white font-semibold hover:bg-gray-700 p-2 w-full"
          onClick={() => handleNavigate("/help")}
        >
          Help
        </Button>
        <Button
          className="text-white font-semibold hover:bg-red-700 p-2 w-full"
          onClick={() => handleNavigate("/logout")}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;