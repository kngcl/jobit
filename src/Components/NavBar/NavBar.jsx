import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [modalType, setModalType] = useState('');
    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [logo, setLogo] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalType === 'job') {
                await axios.post('http://localhost:8001/api/jobs', {
                    jobTitle,
                    jobDescription,
                    salary,
                    location,
                    logo,
                });
            } else {
                await axios.post('http://localhost:8001/signup', {
                    name,
                    email,
                    password,
                    role,
                });
            }
            // Reset form fields
            setJobTitle('');
            setJobDescription('');
            setSalary('');
            setLocation('');
            setLogo('');
            setName('');
            setEmail('');
            setPassword('');
            setRole('');
            setShowModal(false)
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

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

    // Handle adding a new job
    const handleAddJob = () => {
        // Code to handle adding a new job
        setModalType('job')
        setShowModal(true);

    };
    const handleAddEmployee = () => {
        // Code to handle adding a new job
        setModalType('add employee')
        setShowModal(true);
    };

    return (
        <nav className="bg-[#915EFF] text-white py-0 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logoDiv">
                    <Link to="/" className="text-xl font-bold pl-2">
                        Job Portal
                    </Link>
                </div>

                <div className="flex items-center gap-4 pr-2">
                    {loggedUser && loggedUser.role === 'admin' && (
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    <div onClick={handleAddJob} className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-white hover:text-gray-200 hover:border-gray-950 transition duration-150 ease-in-out cursor-pointer">
                                        Add Job
                                    </div>
                                    <div onClick={handleAddEmployee} className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-white hover:text-gray-200 hover:border-gray-950 transition duration-150 ease-in-out cursor-pointer">
                                        Add Employee
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <div>Loading...</div>
                    ) : loggedUser ? (
                        <div className="relative pt-4 pb-4">
                            <div className={`rounded-full w-8 h-8 bg-black flex items-center justify-center cursor-pointer`} onClick={() => setShowDropdown(!showDropdown)}>
                                {loggedUser.name.charAt(0).toUpperCase()}
                            </div>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md">
                                    <div className="px-4 py-3 border-b">
                                        <div className="font-bold text-gray-500">{loggedUser.name}</div>
                                        <div className="text-gray-500">{loggedUser.email}</div>
                                    </div>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100">
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

                </div>
            </div>

            {/* Modal for Add Job */}
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                            {modalType === 'job' ? 'Add Job' : 'Add Employee'}
                                        </h3>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {modalType === 'job' ? (
                                                <>
                                                    <div>
                                                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                                                            Job Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="jobTitle"
                                                            name="jobTitle"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                                                            onChange={(e) => setJobTitle(e.target.value)}
                                                            required
                                                            placeholder="Enter job title"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                                                            Job Description
                                                        </label>
                                                        <textarea
                                                            id="jobDescription"
                                                            name="jobDescription"
                                                            rows="3"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                                                            onChange={(e) => setJobDescription(e.target.value)}
                                                            required
                                                            placeholder="Enter job description"
                                                        ></textarea>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                                                            Salary
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="salary"
                                                            name="salary"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                                                            onChange={(e) => setSalary(e.target.value)}
                                                            required
                                                            placeholder="Enter salary"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                            Location
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="location"
                                                            name="location"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                                                            onChange={(e) => setLocation(e.target.value)}
                                                            required
                                                            placeholder="Enter job location"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                                                            Logo
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="logo"
                                                            name="logo"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                                                            onChange={(e) => setLogo(e.target.value)}
                                                            required
                                                            placeholder="Upload job logo"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                                                            onChange={(e) => setName(e.target.value)}
                                                            required
                                                            placeholder="Enter employee name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                            placeholder="Enter employee email"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                            placeholder="Enter employee password"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                            Role
                                                        </label>
                                                        <select
                                                            id="role"
                                                            name="role"
                                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-600 border-gray-300 focus:outline-none focus:ring-[#915EFF] focus:border-[#915EFF] sm:text-sm rounded-md"
                                                            onChange={(e) => setRole(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select a role</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="employee">Employee</option>
                                                        </select>
                                                    </div>
                                                </>
                                            )}
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                <button
                                                    type="submit"
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#915EFF] text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                    {modalType === 'job' ? 'Add Job' : 'Add Employee'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

// Helper function to generate a random color
function getRandomColor() {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
}