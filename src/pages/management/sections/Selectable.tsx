import React, {Component, ReactElement} from "react";
import {createSelectable, TSelectableItemProps} from "react-selectable-fast";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";
import {ReactSelectableComponentProps} from "react-selectable";
import Colors from "src/constants/Colors";
import assert from "assert";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";

interface SelectableProps extends ReactSelectableComponentProps {
  selectableRef: any,
  isSelected: boolean,
  isMatching: boolean,
  timeBlockDto: TimeBlockDto | undefined,
  timeBlockHeightRatio?: Percentage
  timeCellHeight: Pixel
}

function getBackgroundColor(isSelected: boolean) {
  if (isSelected) {
    return 'orange'
  } else
    return 'white'
}

class Selectable extends Component<SelectableProps> {
  render() {
    const {selectableRef, isSelected, isMatching, timeBlockDto, timeBlockHeightRatio, timeCellHeight} = this.props


    return <div css={css({
      ".unselected": {
        backgroundColor: "white",
        borderBottom: 1,
        borderBottomStyle: "solid",
        borderBottomColor: Colors.theme.table.innerLine,
      },
      ".selected": {
        backgroundColor: Colors.theme.main.workTimeBlock,

        borderBottom: 0
      }
    })}>
      <div className={!isSelected ? 'unselected' : 'selected'} css={css({
        position: "relative",
        // width: this.width.toString(),
        height: timeCellHeight.toString(),
        // margin: "30px",
      })} ref={selectableRef}>
        {this.props.children}
        {Selectable.getTimeBlock(isMatching, timeBlockDto, timeCellHeight, timeBlockHeightRatio)}
      </div>
    </div>;

    // timeCellHeight.multiply(timeBlockHeightRatio == null ? new Percentage(100) : timeBlockHeightRatio)
  }

  private static getTimeBlock(isMatching: boolean, timeBlockDto: TimeBlockDto | undefined, timeCellHeight: Pixel, timeBlockHeightRatio?: Percentage) {


    if (isMatching && timeBlockDto !== undefined && timeBlockHeightRatio !== undefined) {
      // height.minus(new Pixel(6)).toString(),
      return <div css={css({
        width: "95%",
        height: timeCellHeight.multiply(timeBlockHeightRatio!).minus(new Pixel(6)).toString(),
        position: "absolute",
        top: new Pixel(3).toString(),
        left: "2.5%",
        background: timeBlockDto!.isGood ? Colors.theme.main.orgasmTimeBLock : Colors.theme.main.workTimeBlock,
        zIndex: 9,
        color: timeBlockDto!.isGood ? Colors.theme.main.orgasme : Colors.theme.main.work,
        paddingLeft: "25px",
        paddingRight: "5px",
        paddingTop: "3px",
        fontSize: "12px",
        fontFamily: "Gaegu-Regular",
        "text-overflow": "ellipsis",
        overflow: "hidden",
        "-webkit-line-clamp": 1,
        "word-break": "break-all",
        "white-space": "nowrap",
        borderRadius: "5px",
        opacity: "80%"

        // "-webkit-box-orient": "vertical"
      })}>
        {timeBlockDto!.title}
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


