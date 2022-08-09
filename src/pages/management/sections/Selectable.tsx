import React, {Component} from "react";
import {createSelectable, TSelectableItemProps} from "react-selectable-fast";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";
import {ReactSelectableComponentProps} from "react-selectable";
import Colors from "src/constants/Colors";
import assert from "assert";

interface SelectableProps extends ReactSelectableComponentProps {
  selectableRef: any,
  isSelected: boolean,
  isSelecting: boolean,
  isMatching: boolean
  heightTimes ?: Percentage
  height: Pixel
}

function getBackgroundColor(isSelected: boolean) {
  if (isSelected) {
    return 'orange'
  }  else
    return 'white'
}

class Selectable extends Component<SelectableProps> {
  render() {
    const {selectableRef, isSelected, isMatching, heightTimes, height} = this.props


    return <div css={css({
      ".unselected": {
          backgroundColor: "white",
        borderBottom: 1,
        borderBottomStyle: "solid",
        borderBottomColor: Colors.theme.table.innerLine,
      },
      ".selected": {
        backgroundColor: Colors.theme.main.work,

        borderBottom: 0
      }
    })}>
      <div className={!isSelected ? 'unselected' : 'selected'} css={css({
        position: "relative",
        // width: this.width.toString(),
        height: height.toString(),
        // margin: "30px",
      })} ref={selectableRef}>
        {this.props.children}
        {Selectable.getDiv(isMatching, height.multiply(heightTimes == null ? new Percentage(100) : heightTimes))}
      </div>
    </div>;
  }

  private static getDiv(isMatching: boolean, height: Pixel) {

    console.log(getTextWidth("kkkkfdajdfkladjfk ...", "ObjectSans-Slanted"));
    if (isMatching) {

      return <div css={css({
        width: "95%",
        height: height.minus(new Pixel(6)).toString(),
        position: "absolute",
        top: new Pixel(3).toString(),
        left: "2.5%",
        background: Colors.theme.main.orgasme,
        zIndex: 9,
        color: "white",
        paddingLeft: "5px",
        paddingRight: "5px",
        fontSize: "12px",
        fontFamily: "ObjectSans-Slanted",
        "text-overflow": "ellipsis",
        overflow: "hidden",
        "-webkit-line-clamp": 1,
        "word-break": "break-all",
        "white-space": "nowrap",
        borderRadius: "5px"
        // "-webkit-box-orient": "vertical"
      })}>
        kkkkf
      </div>;
    }
  }
}

function getTextWidth(text, font) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');


  // @ts-ignore
  context.font = font || getComputedStyle(document.body).font;

  // @ts-ignore
  return context.measureText(text).width;
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

export default Selectable;


