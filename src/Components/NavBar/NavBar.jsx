import React, { useState } from "react";
import { close, menu } from "../../assets";

const NavBar = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div className="navbar flex justify-between items-center p-3 sm:p-6">
            <div className="logoDiv">
                <h1 className="logo text-2xl sm:text-3xl text-[#915EFF]">
                    <b>Tech-Job</b> Search
                </h1>
            </div>
            <ul className="menu hidden sm:flex gap-8 sm:flex-wrap">
                <li className="menuList text-[#6f6f6f] hover:text-[#915EFF]">Jobs</li>
                <li className="menuList text-[#6f6f6f] hover:text-[#915EFF]">
                    Companies
                </li>
                <li className="menuList text-[#6f6f6f] hover:text-[#915EFF]">
                    Contact
                </li>
            </ul>
            <div className="sm:hidden flex justify-end items-center">
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
            {
                toggle ? (
                    <div
                        className={`flex p-6 black-gradient absolute  top-20 right-0  mx-4 -my-7 min-w-[140px] z-10 rounded-xl bg-[#915EFF]`}
                    >
                        <ul className="list-none sm:hidden flex flex-col gap-4 text-[#fff] hover:text-[#915EFF] ">
                            <li className="menuList ">Jobs</li>
                            <li className="menuList ">Companies</li>
                            <li className="menuList ">Contact</li>
                            <li className="menuList ">About</li>
                        </ul>
                    </div>
                ) : (
                    <div
                        className="hidden sm:hidden"
                    >
                        <ul className="list-none sm:hidden flex flex-col gap-4  hover:text-[#915EFF]">
                            <li className="menuList ">Jobs</li>
                            <li className="menuList ">Companies</li>
                            <li className="menuList ">Contact</li>
                            <li className="menuList ">About</li>
                        </ul>
                    </div>
                )
            }

        </div>
    );
};

export default NavBar;