import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contextapi/AuthProvider.jsx";
import { VscThreeBars } from "react-icons/vsc";

const Navbar = ({ setQuery, clearNotes }) => {
  const { user, setUser } = useAuth(); // assuming setUser is available in context
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    // logout logic here:
    localStorage.removeItem("token");
    clearNotes();
    setUser(""); // clear user (simulate logout)
    setDropdownOpen(false); // close dropdown
  };

  return (
    <nav className="flex justify-around items-center bg-blue-950 text-white py-3">
      <Link to="/" className="flex text-2xl font-bold items-center gap-2  ">
        NoteApp
      </Link>

      <div>
        <input
          className="text-white sm:w-60 md:w-96 lg:w-2xl rounded-md py-2 px-4 bg-gray-700 focus:outline-0"
          type="search"
          placeholder="Search notes..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <div className="flex justify-around items-center relative">
        {!user ? (
          <>
            <Link
              className="hidden md:block px-4 hover:bg-amber-500 rounded-2xl py-2 "
              to="/login"
            >
              Login
            </Link>
            <Link
              className="hidden md:block px-4 hover:bg-amber-500 rounded-2xl py-2 "
              to="/signup"
            >
              SignUp
            </Link>
          </>
        ) : (
          <>
            {/* Large Screen: Show Normally */}
            <span className="hidden md:block px-4">{user.name}</span>
            <button
              onClick={handleLogout}
              className="hidden md:block px-4 hover:bg-amber-500 rounded-2xl py-2"
            >
              Logout
            </button>

            {/* Small/Medium Screens: Dropdown */}
            <div className="block md:hidden relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-amber-500 rounded-2xl"
              >
                <VscThreeBars />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-10">
                  <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
                    <span className="block px-4 py-2 border-b border-gray-200">
                      {user.name}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* When user is logged out, show Login/Signup in dropdown */}
        {!user && (
          <div className="block md:hidden relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-amber-500 rounded-2xl"
            >
              <VscThreeBars />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-10">
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
