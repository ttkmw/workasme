import React from "react";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";

const TimeBlock: React.FC<{ isMatching: boolean, timeBlockDto: TimeBlockDto | undefined, timeCellHeight: Pixel, timeBlockHeightRatio?: Percentage }> =
  (props: { isMatching: boolean, timeBlockDto: TimeBlockDto | undefined, timeCellHeight: Pixel, timeBlockHeightRatio?: Percentage }) => {
    const {isMatching, timeBlockDto, timeCellHeight, timeBlockHeightRatio} = props
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

    return <div/>
}

export default TimeBlock;
