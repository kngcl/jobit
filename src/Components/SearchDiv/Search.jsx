import React, { useState } from "react";
import { AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const Search = ({ onSearch }) => {
  const [searchTermClock, setSearchTermClock] = useState("");
  const [searchTermHouse, setSearchTermHouse] = useState("");
  const [searchTermLocation, setSearchTermLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchContact, setSearchContact] = useState("");

  const handleSearch = () => {
    // You can customize this logic based on your requirements
    const searchParams = {
      clock: searchTermClock,
      house: searchTermHouse,
      location: searchTermLocation,
      type: searchType,
      contract: searchContact,
    };

    // Callback to the parent component with search parameters
    onSearch(searchParams);
  };

  return (
    <div className="searchDiv grid gap-10 bg-white rounded-[10px] p-[3rem] shadow-lg shadow-gray-200 mt-16">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className="firstDiv flex flex-wrap justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 border border-gray-200">
          <div className="flex gap-2 item-center w-full sm:w-auto">
            <AiOutlineSearch className="text-[25px] icon text-gray-500" />
            <input
              type="text"
              className="bg-transparent text-[#915EFF] focus:outline-none w-full placeholder:text-gray-400"
              placeholder="Search by Job Title"
              value={searchTermClock}
              onChange={(e) => setSearchTermClock(e.target.value)}
            />
          </div>

          <div className="flex gap-2 item-center w-full sm:w-auto">
            <CiLocationOn className="text-[25px] icon text-gray-500" />
            <input
              type="text"
              className="bg-transparent text-[#915EFF] focus:outline-none w-full placeholder:text-gray-400"
              placeholder="Search by Location"
              value={searchTermLocation}
              onChange={(e) => setSearchTermLocation(e.target.value)}
            />
          </div>

          <div className="flex gap-1 items-center w-full sm:w-auto">
            <label htmlFor="type" className="text-gray-500 font-medium">Type:</label>
            <select
              id="type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="text-[#915EFF] bg-white border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent"
            >
              <option value="">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div className="flex gap-1 items-center w-full sm:w-auto">
            <label htmlFor="contact" className="text-gray-500 font-medium">Contract:</label>
            <select
              id="contact"
              value={searchContact}
              onChange={(e) => setSearchContact(e.target.value)}
              className="text-[#915EFF] bg-white border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent"
            >
              <option value="">All</option>
              <option value="freelance">Freelance</option>
              <option value="permanent">Permanent</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="cursor-pointer bg-[#915EFF] hover:bg-[#b69bf0] rounded-[10px] text-white py-3 px-8 h-full transition-colors duration-300"
          >
            Search
          </button>
        </div>

      </form>
    </div>
  );
};

export default Search;