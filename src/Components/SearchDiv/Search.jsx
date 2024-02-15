import React, { useState } from "react";
import { AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const Search = ({ onSearch }) => {
  const [searchTermClock, setSearchTermClock] = useState("");
  const [searchTermHouse, setSearchTermHouse] = useState("");
  const [searchTermLocation, setSearchTermLocation] = useState("");

  const handleSearch = () => {
    // You can customize this logic based on your requirements
    const searchParams = {
      clock: searchTermClock,
      house: searchTermHouse,
      location: searchTermLocation,
    };

    // Callback to the parent component with search parameters
    onSearch(searchParams);
  };

  return (
    <div className="searchDiv grid gap-10 bg-greyIsh rounded-[10px] p-[3rem]">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className="firstDiv flex flex-wrap justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-greyIsh-700">

          <div className="flex gap-2 item-center w-full sm:w-auto">
            <AiOutlineSearch className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-[#915EFF] focus:outline-none w-full"
              placeholder="Search by Job Title"
              value={searchTermClock}
              onChange={(e) => setSearchTermClock(e.target.value)}
            />
            <AiOutlineClockCircle className="text-[30px] text-[#a5a6a6] hover:text-textcolor icon" />
          </div>

          {/* <div className="flex gap-2 item-center w-full sm:w-auto">
            <BsHouseDoor className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-[#915EFF] focus:outline-none w-full"
              placeholder="Search by Company Name"
              value={searchTermHouse}
              onChange={(e) => setSearchTermHouse(e.target.value)}
            />
            <AiOutlineClockCircle className="text-[30px] text-[#a5a6a6] hover:text-textcolor icon" />
          </div> */}

          <div className="flex gap-2 item-center w-full sm:w-auto">
            <CiLocationOn className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-[#915EFF] focus:outline-none w-full"
              placeholder="Search by Location"
              value={searchTermLocation}
              onChange={(e) => setSearchTermLocation(e.target.value)}
            />
            <AiOutlineClockCircle className="text-[30px] text-[#a5a6a6] hover:text-textcolor icon" />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-[#915EFF] hover:bg-[#b69bf0] rounded-[10px] text-white py-5 px-10 h-full"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;