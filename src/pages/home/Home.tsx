import React from "react";
import TopNavigationSection from "src/pages/home/sections/TopNavigation";
import IntroductionSection from "src/pages/home/sections/Introduction";
import logo from './logo.svg';

const HomePage: React.FC = () => {


  return <div>
    <img src={logo} className="App-logo" alt="logo" />
    <TopNavigationSection />
    <IntroductionSection />

  </div>;
};

export default HomePage;
