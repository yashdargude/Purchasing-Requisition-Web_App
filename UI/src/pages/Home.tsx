import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRightCircle, MenuIcon } from "lucide-react";

type sugType = {
  id: string;
  name: string;
};
const Home = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<sugType[]>([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // Fetch search suggestions
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/products/search?query=${searchQuery}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Navigation Handlers
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex relative h-screen bg-gray-100">
      <div
        className={`absolute   bg-red-300 top-[20%] left-0 rounded-r-full lg:hidden block lg:w-0 transition-all duration-75`}
      >
        <ChevronRightCircle
          className="w-12 h-12 py-2"
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>
      {/* Sidebar */}
      <div
        className={`fixed ${
          open ? "-translate-x-0" : "-translate-x-96"
        } ease-in-out lg:translate-x-0 transition-all delay-75  lg:left-0 top-0 z-50`}
      >
        <div
          className={`w-64 bg-white border-r-2 border-brightred border-opacity-15 p-4  h-screen relative`}
        >
          <ul className="space-y-6 mt-20">
            <li>
              <Button
                className="flex w-full text-center  text-brightred text-sm font-semibold items-center gap-2 bg-brightred bg-opacity-15 px-3 py-2 rounded-lg"
                onClick={() => handleNavigate("/")}
              >
                Home
              </Button>
            </li>
            <li>
              <Button
                className="flex w-full text-center  text-brightred text-sm font-semibold items-center gap-2 bg-brightred bg-opacity-15 px-3 py-2 rounded-lg"
                onClick={() => handleNavigate("/settings")}
              >
                Settings
              </Button>
            </li>
          </ul>

          <ul className="space-y-6 absolute w-full px-4 left-0 bottom-[8%] ">
            <li>
              <Button
                className="flex w-full text-center  text-brightred text-sm font-semibold items-center gap-2 bg-brightred bg-opacity-15 px-3 py-2 rounded-lg"
                onClick={() => handleNavigate("/")}
              >
                Help
              </Button>
            </li>
            <li>
              <Button
                className="flex w-full text-center  text-brightred text-sm font-semibold items-center gap-2 bg-brightred bg-opacity-15 px-3 py-2 rounded-lg"
                onClick={() => handleNavigate("/")}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 lg:ml-[16rem] relative w-full h-screen">
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="relative w-full">
            <Input
              type="text"
              value={query}
              onChange={handleSearch}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Search products..."
            />

            {/* Autocomplete Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-2">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/product/${suggestion.id}`)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-around">
          <Button onClick={() => handleNavigate("/category/software")}>
            Software
          </Button>

          <Button onClick={() => handleNavigate("/category/laptop")}>
            Laptop
          </Button>

          <Button onClick={() => handleNavigate("/new-supplier")}>
            New Supplier
          </Button>

          <Button onClick={() => handleNavigate("/add-product")}>
            New Item
          </Button>
        </div>
      </div>
      {open && (
        <div
          className="h-screen w-screen transition-all ease-in-out delay-75 absolute left-0 top-0 bg-black bg-opacity-70 "
          onClick={() => setOpen(!open)}
        ></div>
      )}
    </div>
  );
};

export default Home;
