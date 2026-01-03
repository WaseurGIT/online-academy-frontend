import React from "react";
import Banner from "../Banner/Banner";
import Courses from "../CourseRoutes/Courses/Courses";
import About from "../About/About";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Courses></Courses>
    </div>
  );
};

export default Home;
