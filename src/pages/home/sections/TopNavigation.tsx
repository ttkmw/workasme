import React from "react";
import {css} from "@emotion/react";
import TopNavigationBar from "src/pages/components/bars/navigation/Top";
import Colors from "src/constants/Colors";
import Sizes from "src/constants/Sizes";

const TopNavigationSection: React.FC = () => {
  const topNavigationContainerStyle = css({
    backgroundColor: Colors.theme.bar.top,
    height: Sizes.layout.bar.top.value
  });
  return <div>
    <TopNavigationBar containerStyle={topNavigationContainerStyle}/>
  </div>;
};

export default TopNavigationSection;
