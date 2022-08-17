import React, {Dispatch, SetStateAction, useState} from "react";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";
import TimeBlockEditForm from "src/pages/components/timeblock/TimeBlockEditForm";
import Modal from "src/pages/components/Mordal";
import {Dayjs} from "dayjs";
import {WeekTimes} from "src/model/WeekTimes";




const TimeBlock: React.FC<{ isMatching: boolean, timeBlockDto: TimeBlockDto | undefined, timeCellHeight: Pixel, timeBlockHeightRatio?: Percentage, handleStandardDateChange: (day: Dayjs) => void, updateTimeBlocks: (timeBlocks: WeekTimes) => void}> =
  (props: { isMatching: boolean, timeBlockDto: TimeBlockDto | undefined, timeCellHeight: Pixel, timeBlockHeightRatio?: Percentage, handleStandardDateChange: (day: Dayjs) => void,  updateTimeBlocks: (timeBlocks: WeekTimes) => void }) => {
    const {isMatching, timeBlockDto, timeCellHeight, timeBlockHeightRatio, handleStandardDateChange, updateTimeBlocks} = props;
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    let modal: any = undefined;
    let closeButton: any = undefined;

    const toggleScrollLock = () => {
      // @ts-ignore
      document.querySelector('html').classList.toggle('scroll-lock');
    };
    const onClose = (e) => {
      setIsEditFormOpen(false);
      toggleScrollLock();
    };
    const onKeyDown = (event: any) => {
      if (event.keyCode === 27) {
        onClose(event);
      }
    };
    const onClickOutside = (event: any) => {
      console.log(modal);
      console.log(event.target);
      console.log(modal.contains(event.target));
      if (modal && modal.contains(event.target)) return;
      onClose(event);
    };

    const onCloseModal = (e) => {
      setIsEditFormOpen(false);
      toggleScrollLock();
    };

    const onClickTimeCell = (e) => {
      setIsEditFormOpen((prevState) => !prevState);
      e.stopPropagation();
    }

    if (isMatching && timeBlockDto !== undefined && timeBlockHeightRatio !== undefined) {
      return <div onClick={(e) => {e.stopPropagation();}}
                  onMouseMove={(e) => {
                    e.stopPropagation();
                  }}>
        <TimeCell timeBlockDto={timeBlockDto}
                  timeBlockHeightRatio={timeBlockHeightRatio} timeCellHeight={timeCellHeight} onClick={onClickTimeCell}/>
        {isEditFormOpen && (
          <Modal onClickOutside={onClickOutside} onKeyDown={onKeyDown} modalRef={(n: any) => (modal = n)}
                 buttonRef={(n: any) => (closeButton = n)} closeModal={onCloseModal}>
            <TimeBlockEditForm onSubmit={() => console.log("kkk")} timeBlockDto={timeBlockDto} handleStandardDateChange={handleStandardDateChange} updateTimeBlocks={updateTimeBlocks} closeModal={onCloseModal}/>
          </Modal>
        )}
      </div>;
    }

    return <div/>
  }

const TimeCell: React.FC<{ timeCellHeight: Pixel, timeBlockHeightRatio: Percentage, timeBlockDto: TimeBlockDto, onClick: (e) => void }> =
  (props: { timeCellHeight: Pixel, timeBlockHeightRatio: Percentage, timeBlockDto: TimeBlockDto, onClick: (e) => void }) => {
    const {timeCellHeight, timeBlockHeightRatio, timeBlockDto, onClick} = props;


    return <div
      css={css({
        width: "95%",
        height: timeCellHeight.multiply(timeBlockHeightRatio!).minus(new Pixel(6)).toString(),
        position: "absolute",
        top: new Pixel(3).toString(),
        left: "2.5%",
        background: timeBlockDto!.isGood ? Colors.theme.main.orgasmTimeBLock : Colors.theme.main.workTimeBlock,
        zIndex: 10,
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
        opacity: "80%",
      })}
      onClick={onClick}
    >
      {timeBlockDto!.title}
    </div>
  }


export default TimeBlock;
