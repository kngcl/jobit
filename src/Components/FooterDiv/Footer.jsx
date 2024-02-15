import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer p-[5rem] mb-4 bg-[#915EFF] rounded-[10px] flex flex-wrap gap-14 items-center justify-center">
            <div className="w-full sm:w-1/2 md:w-auto mb-10">
                <div className="logoDiv">
                    <h1 className="logo text-[25px] text-white pb-[1.5rem]">
                        <strong>job</strong>Search
                    </h1>
                </div>
                <div className="w-full sm:w-[300px]">
                    <p className="text-white pb-[13px] w-full opacity-70 leading-7">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iste eum impedit
                        voluptatum quia
                    </p>
                </div>
            </div>
            <div className="w-full sm:w-1/4 md:w-auto mb-10">
                <span className="divTitle text-[18px] font-semibold pb-[1.5rem] text-white">
                    Company
                </span>
                <div className="grid gap-3">
                    <li className="text-white opacity-[.7] hover:opacity-[1]">About Us</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Features</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">News</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">FAQ</li>
                </div>
            </div>
            <div className="w-full sm:w-1/4 md:w-auto mb-10">
                <span className="divTitle text-[18px] font-semibold pb-[1.5rem] text-white">
                    Resources
                </span>
                <div className="grid gap-3">
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Account</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Support</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Feedback</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Contact Us</li>
                </div>
            </div>
            <div className="w-full sm:w-1/4 md:w-auto mb-10">
                <span className="divTitle text-[18px] font-semibold pb-[1.5rem] text-white mt-5 ">Support </span>
                <div className="grid gap-3">
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Events</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Promo</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Req Demo</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Careers</li>
                </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-auto mb-10">
                <span className="divTitle text-[18px] font-semibold pb-[1.5rem] text-white">Contact Info </span>
                <div>
                    <small className="text-[14px] text-white">ketchasso72@gmail.com</small>
                    <div className="icons flex gap-4 py-[1rem]">
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="bg-white p-[8px] h-[35px] w-[35px] rounded-full icon text-[#915EFF]" />
                        </a>
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="bg-white p-[8px] h-[35px] w-[35px] rounded-full icon text-[#915EFF]" />
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                            <AiOutlineTwitter className="bg-white p-[8px] h-[35px] w-[35px] rounded-full icon text-[#915EFF]" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;