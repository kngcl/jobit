import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // Generate a random color for the dropdown icon on each render
    const [randomColor, setRandomColor] = useState(getRandomColor());

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/loggedUser/${user}`);
                setLoggedUser(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserName();
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // Close the dropdown when clicking outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.relative')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showDropdown]);

    // Update the background color of the dropdown icon on each render
    useEffect(() => {
        setRandomColor(getRandomColor());
    }, [user]);

    return (
        <nav className="bg-[#915EFF] text-white py-4 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logoDiv">
                    <Link to="/" className="text-xl font-bold pl-2">
                        Job Portal
                    </Link>
                </div>
                <div className="flex items-center gap-4 pr-2">
                    {loading ? (
                        <div>Loading...</div>
                    ) : loggedUser ? (
                        <div className="relative">
                            <div
                                className={`rounded-full w-8 h-8 bg-black flex items-center justify-center cursor-pointer`}
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                {loggedUser.name.charAt(0).toUpperCase()}
                            </div>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md">
                                    <div className="px-4 py-3 border-b">
                                        <div className="font-bold text-gray-500">{loggedUser.name}</div>
                                        <div className="text-gray-500">{loggedUser.email}</div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="hover:text-gray-300">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-gray-300">
                                Register
                            </Link>
                        </div>
                    )}
                    {/*   <div className="sm:hidden flex justify-end items-center">
                        <svg
                            className="w-6 h-6 text-gray-700"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => setToggle(!toggle)}
                        >
                            <path
                                d="M4 6H20M4 12H20M4 18H20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    {toggle && (
                        <div className="flex p-6 black-gradient absolute top-20 right-0 mx-4 -my-7 min-w-[140px] z-10 rounded-xl bg-[#915EFF]">
                            <ul className="list-none sm:hidden flex flex-col gap-4 text-[#fff] hover:text-[#915EFF]">
                                <li className="menuList">Jobs</li>
                                <li className="menuList">Companies</li>
                                <li className="menuList">Contact</li>
                                <li className="menuList">About</li>
                            </ul>
                        </div>
                    )} */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// Helper function to generate a random color
function getRandomColor() {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
}