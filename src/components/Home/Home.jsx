import React from "react";
import Banner from "../Banner/Banner";
import Courses from "../CourseRoutes/Courses/Courses";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Teachers from "../Teachers/Teachers";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Courses></Courses>
      <Teachers></Teachers>
      <Contact></Contact>
    </div>
  );
};

export default Home;
