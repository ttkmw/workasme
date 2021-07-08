import React, {ReactNode} from "react";
import {Button as BootstrapButton} from "react-bootstrap";
import {Size} from "src/graphic/size/Size";
import Colors from "src/constants/Colors";

interface ButtonComponentProps {
  children: ReactNode;
  name: string;
  backgroundColor: string;
  defaultTextColor: string;
  hoverTextColor: string;
  borderColor?: string;
  width: Size;
  onClick: () => void,
  size?: "sm" | "lg"
}

//todo: customize 를 스트링으로 하다보니, 아쉬움. 스트링 대신 다른 방법 찾아보기.
const ButtonComponent: React.FC<ButtonComponentProps> = ({
                                                           children,
                                                           name,
                                                           backgroundColor,
                                                           defaultTextColor,
                                                           hoverTextColor,
                                                           borderColor,
                                                           width,
                                                           onClick,
                                                           size
                                                         }: ButtonComponentProps) => {

  //todo: refac - 클릭했을 시 글씨 색상 주황색으로 바꾸기. - btn:hover
  return <>
    <style type="text/css"> {`
            .btn-${name} {
              background-color: ${backgroundColor};
              border-color: ${getBorderColor(borderColor)};
              color: ${defaultTextColor};
              width: ${width.toString()};¸
            }
            
            .btn-${name}:hover {
              background-color: ${backgroundColor};
              border-color: ${getBorderColor(borderColor)};
              color: ${hoverTextColor};
              width: ${width.toString()};¸   
             }
            
            
          `}
    </style>
    <BootstrapButton onClick={onClick} variant={name} size={size}>{children}</BootstrapButton>
  </>
};

function getBorderColor(borderColor?: string) {
  if (borderColor === undefined) {
    return "transparent";
  }

  return borderColor;

}

export default ButtonComponent;
