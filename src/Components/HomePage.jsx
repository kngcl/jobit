import React from 'react';
import Footer from "./FooterDiv/Footer";
import ParentComponent from "./JobSearch/JobSearch";
import NavBar from "./NavBar/NavBar";


function HomePage() {
  return (
    <div className="w-[90%] m-auto bg-white">
        <NavBar/>
        <ParentComponent />
        <Footer />
    </div>
  );
}

export default HomePage;