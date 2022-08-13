import React, {Component, ReactElement} from "react";
import {createSelectable, TSelectableItemProps} from "react-selectable-fast";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";
import {ReactSelectableComponentProps} from "react-selectable";
import Colors from "src/constants/Colors";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import TimeBlock from "src/pages/components/timeblock/TimeBlock";

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

    return <div
      css={css({
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
      })}

    >
      <div className={!isSelected ? 'unselected' : 'selected'} css={css({
        position: "relative",
        height: timeCellHeight.toString(),
      })} ref={selectableRef}
      >
        {this.props.children}
        <TimeBlock isMatching={isMatching} timeBlockDto={timeBlockDto} timeCellHeight={timeCellHeight}
                   timeBlockHeightRatio={timeBlockHeightRatio}/>
      </div>
    </div>;
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


