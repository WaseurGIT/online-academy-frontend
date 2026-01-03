import React from "react";
import Banner from "../Banner/Banner";
import Courses from "../CourseRoutes/Courses/Courses";
import About from "../About/About";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Courses></Courses>
      <Contact></Contact>
    </div>
  );
};

export default Home;
