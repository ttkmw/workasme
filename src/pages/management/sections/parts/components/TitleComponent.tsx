import React, {ReactNode} from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

interface TitleComponentProps {
  cssObj: any
  children: ReactNode
}

const TitleComponent: React.FC<TitleComponentProps> = ({
  cssObj,
  children,
                                                       }: TitleComponentProps) => {

  return <div css={css(cssObj)}>
    {children}
  </div>
};

export default TitleComponent;
