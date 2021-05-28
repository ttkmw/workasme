import React from "react";
import {css} from "@emotion/react";
import Colors from "src/pages/constants/Colors";
import Sizes from "src/pages/constants/Sizes";
import TopNavigationBar from "src/pages/components/bars/navigation/Top";
import {ReactComponent as Logo} from "src/pages/home/logo.svg";
import Pixel from "src/graphic/size/pixel";

const TopNavigationSection: React.FC = () => {
  const topNavigationContainerStyle = css({
    backgroundColor: Colors.theme.bar.top,
    height: Sizes.layout.bar.top.value
  });
  return <div>
    <Logo width={new Pixel(100).value} height={new Pixel(100).value} />
    <TopNavigationBar containerStyle={topNavigationContainerStyle}/>
  </div>;
};

export default TopNavigationSection;
