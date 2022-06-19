import React, {Component} from "react";
import {createSelectable, TSelectableItemProps} from "react-selectable-fast";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

interface SelectableProps  {
  selectableRef: any,
  isSelected: boolean,
  isSelecting: boolean
}

class SomeComponent extends Component<SelectableProps> {
  haha(): void {

  }

  render() {
    const {selectableRef, isSelected, isSelecting} = this.props

    function getBackgroundColor(isSelected: boolean, isSelecting: boolean) {
      if (isSelected) {
        return 'yellow'
      } else if (isSelecting) {
        return 'blue'
      } else
        return 'white'
    }

    const backgroundColor = getBackgroundColor(isSelected, isSelecting);


    return <div  css={css({
      position: "relative",
      width: "150px",
      height: "150px",
      margin: "30px",
      backgroundColor: backgroundColor
    })} ref={selectableRef}>
      {this.props.children}
    </div>;
  }
}

// <div css={css({
//   width: "100%",
//   height: "100%",
//   position: "absolute",
//   top: 0,
//   left: 0,
//   opacity: 0.7,
//   background: "#009938",
//   zIndex: 9,
//   margin: "30px"
// })}>
//   hoho
// </div>

export default SomeComponent;
