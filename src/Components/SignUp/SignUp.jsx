import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import {
    FaFacebookF,
    FaGoogle,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa6";
import axios from "axios";


const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const naviagte = useNavigate()
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        /*     const name= form.name.value
            const email = form.email.value;
            const password = form.password.value;
         */
        const values = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        }

        // Add your login logic here
        // You can use a service or API to handle the login process
        // If the login is successful, navigate to the desired page
        // If there's an error, update the errorMessage state

        // Example error handling
        if (!email || !password) {
            setErrorMessage("Please provide a valid email and password.");
        } else {
            axios.post("http://localhost:8001/signup", values)
                .then((res) => {
                    naviagte('/')
                    console.log("Signup successful:", res.data);
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.error("Server responded with error:", error.response.data);
                        console.error("Status code:", error.response.status);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error("No response received from server");
                    } else {
                        // Something else happened in making the request
                        console.error("Error:", error.message);
                    }
                });
        }
    };

    // Add your Google, Facebook, LinkedIn, and Instagram login handlers here

    return (
        <div className="h-screen mx-auto container flex items-center justify-center min-w-full bg-[#915EFF]">
            <div className="w-full max-w-xs mx-auto">
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
                    <h3 className="text-xl font-semibold mb-4">Please SignUp!</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="john Doe"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="name@email.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-xs italic">{errorMessage}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <input
                            className=" bg-[#915EFF] w-full hover:bg-violet-400 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            value="Sign Up"
                        />
                    </div>
                    <div className="mt-4">

                        <p>already have an account ?
                            <Link to={"/"}>
                                <u>login</u>
                            </Link>
                        </p>

                    </div>
                   {/*  <div className="mt-8 text-center w-full mx-auto">
                        <p className="mb-4">Sign up with Social</p>
                        <div className="flex items-center justify-center gap-4 w-full mx-auto">
                            <button
                                className="border-2 text-blue hover:text-white hover:bg-blue font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                                type="button"
                            // onClick={handleGoogleLogin}
                            >
                                <FaGoogle />
                            </button>
                            <button
                                className="border-2 text-blue hover:text-white hover:bg-blue font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                                type="button"
                            // onClick={handleFacebookLogin}
                            >
                                <FaFacebookF />
                            </button>
                            <button
                                className="border-2 text-blue hover:text-white hover:bg-blue font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                                type="button"
                            // onClick={handleLinkedinLogin}
                            >
                                <FaLinkedin />
                            </button>
                            <button
                                className="border-2 text-blue hover:text-white hover:bg-blue font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                                type="button"
                            // onClick={handleInstagramLogin}
                            >
                                <FaInstagram />
                            </button>
                        </div>
                    </div> */}
                </form>
                <p className="text-center text-white text-xs">
                    &copy;2024 JobIT. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SignUp;