import React, {Component} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";
import {ReactSelectableComponentProps} from "react-selectable";
import Colors from "src/constants/Colors";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import TimeBlock from "src/pages/components/timeblock/TimeBlock";
import {WeekTimes} from "src/model/WeekTimes";

interface SelectableProps extends ReactSelectableComponentProps {
  selectableRef: any,
  isSelected: boolean,
  isMatching: boolean,
  timeBlockDto: TimeBlockDto | undefined,
  timeBlockHeightRatio?: Percentage
  timeCellHeight: Pixel,
  timeBlocks: WeekTimes,
  updateTimeBlocks: (timeBlocks: WeekTimes) => void;
}

class Selectable extends Component<SelectableProps> {
  render() {
    const {selectableRef, isSelected, isMatching, timeBlockDto, timeBlockHeightRatio, timeCellHeight, timeBlocks, updateTimeBlocks} = this.props

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
                   timeBlockHeightRatio={timeBlockHeightRatio} timeBlocks={timeBlocks} updateTimeBlocks={updateTimeBlocks}/>
      </div>
    </div>;
  }
}

export default Selectable;


