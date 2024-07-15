import React from 'react';
import Footer from "./FooterDiv/Footer";
import ParentComponent from "./JobSearch/JobSearch";
import NavBar from "./NavBar/NavBar";


function HomePage() {
  return (
    <div className="m-auto bg-white">
      <div className='w-[90%] m-auto'>
        <NavBar />
        <ParentComponent />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;