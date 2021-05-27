import React from "react";
import {css} from "@emotion/react";
import Colors from "src/pages/constants/Colors";
import Sizes from "src/pages/constants/Sizes";
import TopNavigationBar from "src/pages/components/bars/navigation/Top";

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
