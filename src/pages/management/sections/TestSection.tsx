import React, {useEffect, useState} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

import {createSelectable} from 'react-selectable';

import Modal from "src/pages/management/sections/Mordal";
import SomeComponent from "./SomeComponent";
import ReactSelectableGroup from "src/pages/management/sections/selectable/react-selectable/ReactSelectableGroup";
import Percentage from "src/graphic/size/percentage";
import {WeekTimes} from "src/model/WeekTimes";
import {TimeDto} from "src/dtos/TimeDto";
import {DateTime} from "src/model/DateTime";
import dayjs, {Dayjs} from "dayjs";
import {TimeRecordOnWeekView} from "src/model/TimeRecordOnWeekView";
import {parseDayOfWeek, parseDayOfWeekAlias} from "src/util/DayofweekParser"
import {TimeRecordTemplate} from "src/model/TimeRecordTemplate";
import {MdNavigateBefore} from  'react-icons/md'
import {MdNavigateNext} from 'react-icons/md'
import ButtonComponent from "src/pages/components/ButtonComponent";
import Pixel from "src/graphic/size/pixel";
import {inspect} from "util";
import colors from "src/constants/Colors";
import Colors from "src/constants/Colors";
import CheckBox from "src/pages/management/sections/parts/components/box/CheckBox";
import {number} from "prop-types";
import fontConfig from "src/graphic/text/font";
import NumberBox from "src/pages/management/sections/parts/components/box/NumberBox";



const SelectableComponent = createSelectable(SomeComponent);

const timeRecordTemplates: TimeRecordTemplate[] = [
  new TimeRecordTemplate("03:00"),
  new TimeRecordTemplate("04:00"),
  new TimeRecordTemplate("05:00"),
  new TimeRecordTemplate("06:00"),
  new TimeRecordTemplate("07:00"),
  new TimeRecordTemplate("08:00"),
  new TimeRecordTemplate("09:00"),
  new TimeRecordTemplate("10:00"),
  new TimeRecordTemplate("11:00"),
  new TimeRecordTemplate("12:00"),
  new TimeRecordTemplate("13:00"),
  new TimeRecordTemplate("14:00"),
  new TimeRecordTemplate("15:00"),
  new TimeRecordTemplate("16:00"),
  new TimeRecordTemplate("17:00"),
  new TimeRecordTemplate("18:00"),
  new TimeRecordTemplate("19:00"),
  new TimeRecordTemplate("20:00"),
  new TimeRecordTemplate("21:00"),
  new TimeRecordTemplate("22:00"),
  new TimeRecordTemplate("23:00"),
  new TimeRecordTemplate("00:00"),
  new TimeRecordTemplate("01:00"),
  new TimeRecordTemplate("02:00"),
]


const isNodeInRoot = (node, root) => {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};

function exceedsYesterday(lastOfYesterdayData: TimeDto | undefined) {
  if (lastOfYesterdayData === undefined) {
    return false;
  }

  const yesterdayDate = lastOfYesterdayData.endDateTime.getDate();
  const comparable = new Date(yesterdayDate + "T" + "02:00");
  const endDateTime = new Date(lastOfYesterdayData.endDateTime.getDateTime());
  return comparable.getTime() < endDateTime.getTime();
}

function getLastOfYesterdayData(yesterdayData: TimeDto[]): TimeDto {
  return yesterdayData[yesterdayData.length - 1];
}

function match(serverData: WeekTimes, recordStartTime: DateTime, todayDayOfWeek: string) {

  const yesterdayData = serverData.getYesterdayTimesOf(todayDayOfWeek);

  const lastOfYesterdayData = getLastOfYesterdayData(yesterdayData);

  if (recordStartTime.getTime() === '03:00' && exceedsYesterday(lastOfYesterdayData)) {
    return true;
  }


  const todayData = serverData.getTimesOf(todayDayOfWeek);
  for (let i = 0; i < todayData.length; i++) {
    const data = todayData[i];
    // const startTimePieces = data.endDateTime.toISOString().split("T")[1].split(".")[0].split(":");
    const startTime = data.startDateTime.getTime();
    if (recordStartTime.getTime() === startTime) {
      return true
    }
  }

  return false;

}

function calculateHeightTimes(serverData: WeekTimes, recordTemplate: TimeRecordOnWeekView, todayDayOfWeek) {

  const yesterdayData = serverData.getYesterdayTimesOf(todayDayOfWeek);
  const lastOfYesterdayData = getLastOfYesterdayData(yesterdayData);

  let itemStartDateTime = new Date();
  itemStartDateTime.setHours(parseInt(recordTemplate.getAlias()));

  const itemEndDateTime = new Date();
  itemEndDateTime.setHours(parseInt(recordTemplate.getAlias()) + 1);

  if (lastOfYesterdayData !== undefined && recordTemplate.startDateTime.getTime() === '03:00' && exceedsYesterday(lastOfYesterdayData)) {
    const endDate = lastOfYesterdayData.endDateTime.getDate();
    const comparable = new Date(endDate + "T" + "03:00");
    const endDateTime = new Date(lastOfYesterdayData.endDateTime.getDateTime());
    return new Percentage((endDateTime.getTime() - comparable.getTime()) / (itemEndDateTime.getTime() - itemStartDateTime.getTime()) * 100);
  }

  const todayData = serverData.getTimesOf(todayDayOfWeek);
  for (let i = 0; i < todayData.length; i++) {
    const data = todayData[i];

    const startDateTime = new Date(data.startDateTime.getDateTime());
    // const startTimePieces = data.endDateTime.toISOString().split("T")[1].split(".")[0].split(":");
    const startTime = data.startDateTime.getTime();
    if (recordTemplate.startDateTime.getTime() === startTime) {

      const endDate = data.endDateTime.getDate();
      const comparable = new Date(endDate + "T" + "03:00");
      const endDateTime = new Date(data.endDateTime.getDateTime());
      // 일단 끄트머리(2시)에서 끊는거까진 함. 남은걸 다음 요일에 뿌려주는걸 안함.

      if (comparable.getTime() < endDateTime.getTime()) {
        // console.log("kkkkkkkk");
        // console.log(comparable.getDate());
        // console.log(startDateTime.getDate());
        // console.log(endDateTime.getDate());
        // console.log((comparable.getTime() - startDateTime.getTime()) / (itemEndDateTime.getTime() - itemStartDateTime.getTime()) * 100)

        return new Percentage((comparable.getTime() - startDateTime.getTime()) / (itemEndDateTime.getTime() - itemStartDateTime.getTime()) * 100);
      }

      return new Percentage((endDateTime.getTime() - startDateTime.getTime()) / (itemEndDateTime.getTime() - itemStartDateTime.getTime()) * 100);

    }
  }
}

function isIdInSelectedKeys(id, selectedKeys: number[]) {
  function getBiggest(selectedKeys: number[]) {
    let biggest: number | undefined = undefined;
    for (let i = 0; i < selectedKeys.length; i++) {
      const selectedKey = selectedKeys[i];
      if (biggest === undefined || biggest < selectedKey) {
        biggest = selectedKey;
      }
    }


    return biggest!;
  }

  function getSmallest(selectedKeys: number[]) {
    let smallest: number | undefined = undefined;

    for (let i = 0; i < selectedKeys.length; i++) {
      const selectedKey = selectedKeys[i];
      if (smallest === undefined || selectedKey < smallest) {
        smallest = selectedKey;
      }
    }

    return smallest!;
  }

  const biggest = getBiggest(selectedKeys);


  const smallest = getSmallest(selectedKeys);

  return id <= biggest && smallest <= id;
}

const WeekView: React.FC<{ weekDays: Dayjs[] }> = (props: { weekDays: Dayjs[] }) => {
  const {weekDays} = props;
  // const [timeRecordsOnWeekView, setTimeRecordsOnWeekView] = useState<TimeRecordOnWeekView[]>([]);

  return <div></div>;
}

function createAllTimeRecordsOnWeekView(day: Dayjs): TimeRecordOnWeekView[] {
  const allTimeRecordsOnWeekView: TimeRecordOnWeekView[] = [];
  const weekdays = calculateWeekdaysForView(day);

  weekdays.map((day, i) => {
    timeRecordTemplates.map((timeRecordTemplate, j) => {
      allTimeRecordsOnWeekView.push(new TimeRecordOnWeekView(Number(i.toString() + getIdOfTemplate(j)), day, timeRecordTemplate))
    })
  })
  return allTimeRecordsOnWeekView;
}

function getEarliestRecord(selectedTimeRecords: TimeRecordOnWeekView[]): TimeRecordOnWeekView {
  let earliest: TimeRecordOnWeekView | undefined = undefined;

  selectedTimeRecords.map((selectedTimeRecord) => {
    if (earliest === undefined || new Date(selectedTimeRecord.endDateTime.getDateTime()).getTime() < new Date(earliest.startDateTime.getDateTime()).getTime()) {
      earliest = selectedTimeRecord;
    }
  })

  return earliest!;
}

function getLatestRecord(selectedTimeRecords: TimeRecordOnWeekView[]): TimeRecordOnWeekView {
  let latest: TimeRecordOnWeekView | undefined = undefined;

  selectedTimeRecords.map((selectedTimeRecord) => {
    if (latest === undefined || new Date(latest.startDateTime.getDateTime()).getTime() < new Date(selectedTimeRecord.startDateTime.getDateTime()).getTime()) {
      latest = selectedTimeRecord;
    }
  })

  return latest!;
}

const serverData: WeekTimes = new WeekTimes(
  {
    week: {
      "LAST_SATURDAY": [],
      "SUNDAY": [
        {
          startDateTime: new DateTime("2022-07-11T01:00"),
          endDateTime: new DateTime("2022-07-11T04:00"),
          type: "FREE"
        },
      ],

      "MONDAY": [
        {
          startDateTime: new DateTime("2022-07-12T01:00"),
          endDateTime: new DateTime("2022-07-12T04:00"),
          type: "FREE"
        },
      ],
      "TUESDAY": [
        {
          startDateTime: new DateTime("2022-07-13T01:00"),
          endDateTime: new DateTime("2022-07-13T04:00"),
          type: "FREE"
        },
      ],
      "WEDNESDAY": [
        {
          startDateTime: new DateTime("2022-07-14T01:00"),
          endDateTime: new DateTime("2022-07-14T04:00"),
          type: "FREE"
        },
      ],
      "THURSDAY": [
        {
          startDateTime: new DateTime("2022-07-15T01:00"),
          endDateTime: new DateTime("2022-07-15T04:00"),
          type: "FREE"
        },
      ],
      "FRIDAY": [
        {
          startDateTime: new DateTime("2022-07-16T01:00"),
          endDateTime: new DateTime("2022-07-16T04:00"),
          type: "FREE"
        },
      ],
      "SATURDAY": []
    }
  }
);

export class TestSection extends React.Component<any> {
  selectableRef;
  state;

  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: [],
      tolerance: 0,
      selectOnMouseMove: false,
      standardDate: dayjs()
    };
    this.selectableRef = React.createRef();

    this.handleSelection = this.handleSelection.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.handleToleranceChange = this.handleToleranceChange.bind(this);
    this.toggleSelectOnMouseMove = this.toggleSelectOnMouseMove.bind(this);
  }


  // clearSelectionUsingRef = () => {
  //   if (this.selectionRef) {
  //     this.selectionRef.current.clearSelection();
  //   }
  // }


  componentDidMount() {
    // document.addEventListener('click', this.clearItems);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clearItems);
  }

  handleSelection(keys) {

    this.setState({
      selectedKeys: keys
    });
  }

  clearItems(e) {
    if (!isNodeInRoot(e.target, this.selectableRef)) {
      this.setState({
        selectedKeys: []
      });
    }
  }

  handleToleranceChange(e) {
    this.setState({
      tolerance: parseInt(e.target.value)
    });
  }

  toggleSelectOnMouseMove() {
    this.setState({
      selectOnMouseMove: !this.state.selectOnMouseMove
    });
  }

  showModal = (selectedKeys: number[]) => {
    if (selectedKeys.length == 0) {
      return
    }
    this.setState({isShown: true}, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  onClose = (e) => {
    this.clearItems(e)
    this.setState({isShown: false});
    this.toggleScrollLock();
  };
  onKeyDown = (event: any) => {
    if (event.keyCode === 27) {
      this.onClose(event);
    }
  };
  onClickOutside = (event: any) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.onClose(event);
  };

  toggleScrollLock = () => {
    // @ts-ignore
    document.querySelector('html').classList.toggle('scroll-lock');
  };
  private closeButton: any;
  private TriggerButton: any;
  private modal: any;

  private checkBoxSize = new Pixel(15);
  private recordSize = new Pixel(30);
  private outlineBorder = new Pixel(1);
  private noBorder = new Pixel(0);


  render() {
    const weekdays = calculateWeekdaysForView(this.state.standardDate);

    const allTimeRecordsOnWeekView: TimeRecordOnWeekView[] = createAllTimeRecordsOnWeekView(this.state.standardDate);
    const selectedTimeRecords: TimeRecordOnWeekView[] = [];
    allTimeRecordsOnWeekView.map((timeRecordOnWeekView, i) => {
      if (isIdInSelectedKeys(timeRecordOnWeekView.id, this.state.selectedKeys)) {
        selectedTimeRecords.push(timeRecordOnWeekView);
      }
    });

    const earliestRecord = getEarliestRecord(selectedTimeRecords);
    const latestRecord = getLatestRecord(selectedTimeRecords);

    return (
      <div>
        <div css={css({
          display: "flex",
          justifyContent: "flex-end"
        })}>
          <div css={css({
            display: "flex",
            flexDirection: "row",
            position: "relative",
            left: 17
          })}>
            <MdNavigateBefore size={new Pixel(50).toString()} color={colors.theme.navigator.default} onClick={() => {
              this.setState({
                standardDate: this.state.standardDate.subtract(7, 'day')
              });
            }}/>
            <div css={css({
              display: "flex",
              alignItems: "center",
              '.button': {
                backgroundColor: Colors.theme.main.work,
                border: "none",
                color: Colors.theme.button.default,
              },
              '.button:hover': {
                color: Colors.theme.main.orgasme
              }
            })}>
              <button
                css={css({
                  width: new Pixel(100).toString(),
                  borderRadius: 10,
                  height: new Pixel(30).toString()
                })}
                className={"button"}
                onClick={() => {
                  this.setState({
                    standardDate: dayjs()
                  });
                }}
              >today</button>
            </div>


            <MdNavigateNext css={css({

            })} size={new Pixel(50).toString()} color={colors.theme.navigator.default} onClick={() => {
              this.setState({
                standardDate: this.state.standardDate.add(7, 'day')
              });
            }} />
          </div>
        </div>
        <ReactSelectableGroup onSelection={this.handleSelection}
                              onEndSelection={() => this.showModal(this.state.selectedKeys)}
                              className={"selectable"}
                              ref={this.selectableRef}
                              selectOnMouseMove={this.state.selectOnMouseMove}
                              selectingClassName={"selectingSelectable"}

        >
          <div css={css({
            flexDirection: "row",
            display: "flex"
          })}>
            {
              weekdays.map((day, i) => {

                const timeRecordsOnWeekView: TimeRecordOnWeekView[] = [];


                timeRecordTemplates.map((recordTemplate, j) => {
                  timeRecordsOnWeekView.push(new TimeRecordOnWeekView(Number(i.toString() + getIdOfTemplate(j)), day, recordTemplate))
                })

                return <div>
                  <DateGuide day={day}/>
                  <TodoList checkBoxSize={this.checkBoxSize}/>
                  <div css={css({
                    borderRight: this.outlineBorder.toString(),
                    borderLeft: this.noBorder.toString(),
                    borderTop: this.outlineBorder.toString(),
                    borderBottom: this.outlineBorder.toString(),
                    borderStyle: "solid",
                    borderColor: Colors.theme.table.outLine
                  })}>

                    {

                      timeRecordsOnWeekView.map((record) => {
                        let selected = this.state.selectedKeys.indexOf(record.id) > -1 || isIdInSelectedKeys(record.id, this.state.selectedKeys);
                        const isMatching = match(serverData, record.startDateTime, parseDayOfWeek(day.day()));
                        const heightTimes = calculateHeightTimes(serverData, record, parseDayOfWeek(day.day()));
                        return (
                          <div css={css({
                            borderBottom: 1,
                            borderBottomStyle: "solid",
                            borderBottomColor: Colors.theme.table.innerLine,
                          })}>

                            <SelectableComponent
                              selectableKey={record.id}
                              key={record.id}
                              isSelected={selected}
                              isMatching={isMatching}
                              heightTimes={heightTimes}
                              height={this.recordSize}
                            >
                              <NumberBox number={record.getAlias()} numberSize={this.checkBoxSize} numberFont={fontConfig.web.medium.fontFamily}
                                         numberColor={Colors.theme.text.box.default} boxWidth={new Pixel(14)} boxHeight={new Pixel(35)}
                                         boxRadius={0}/>
                            </SelectableComponent>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              })
            }
          </div>
        </ReactSelectableGroup>
        <React.Fragment>
          {

            this.state.isShown ? (
            <Modal
              onSubmit={e => {

                let title = e.currentTarget[0];
                let startDate = e.currentTarget[1];
                let startTime = e.currentTarget[2];
                let endDate = e.currentTarget[3];
                let endTime = e.currentTarget[4];
                let isGood = e.currentTarget[5];

                assertIsFormFieldElement(title);
                assertIsFormFieldElement(startDate);
                assertIsFormFieldElement(startTime);
                assertIsFormFieldElement(endDate);

                console.log("title", title, title.value);
                console.log("startDate", startDate, startDate.value);
                console.log("startTime", startTime, startTime.value);
                console.log("endDate", endDate, endTime.value);
                console.log("isGood", isGood, isGood.checked);

                // console.log(title.value);
                // console.log(earliestRecord.startDateTime.getDateTime());
                // console.log(latestRecord.endDateTime.getDateTime());
                // console.log(isGood.value);
                // console.log(category.value);
                // console.log(memo.value);


              }}

              modalRef={(n: any) => (this.modal = n)}
              buttonRef={(n: any) => (this.closeButton = n)}
              closeModal={this.onClose}
              onKeyDown={this.onKeyDown}
              onClickOutside={this.onClickOutside}
              startDateTime={earliestRecord.startDateTime}
              endDateTime={latestRecord.endDateTime}
            />
          ) : null}
        </React.Fragment>

      </div>
    )
  }
}
const TodoList: React.FC<{checkBoxSize: Pixel}> = (props: {checkBoxSize: Pixel}) => {
  const {checkBoxSize} = props;
  let percent = new Percentage(100);
  return <div>
    <div css={css({
      display: "flex",
      alignItems: "center",
      marginLeft: "5px",
      marginRight: "10px",
      flexDirection: "column",
      paddingTop: checkBoxSize.multiply(new Percentage(50)).toString(),
      paddingBottom: checkBoxSize.multiply(new Percentage(50)).toString()
    })}>
      <Todo checkBoxSize={checkBoxSize}/>
      <Todo checkBoxSize={checkBoxSize}/>
      <Todo checkBoxSize={checkBoxSize}/>
    </div>
  </div>
}

const Todo: React.FC<{checkBoxSize: Pixel}> = (props: {checkBoxSize: Pixel}) => {
  const {checkBoxSize} = props;
  return <div css={css({
    display: "flex",
    alignItems: "center",

    marginTop: checkBoxSize.multiply(new Percentage(25)).toString(),
    marginBottom: checkBoxSize.multiply(new Percentage(25)).toString()
  })}>
    <CheckBox size={checkBoxSize} borderWidth={new Pixel(1.5)}
              borderColor={Colors.theme.table.innerLine} beforeColor={Colors.theme.screen.background}
              afterColor={Colors.theme.table.innerLine}
    />
    <input css={css({
      border: 0,
      borderBottom: 1,
      borderBottomStyle: "solid",
      borderBottomColor: Colors.theme.table.innerLine,
      marginLeft: "5%",
      width: "90%"
    })} type={"text"}/>
  </div>
}


const DateGuide: React.FC<{day: Dayjs}> = (props: {day: Dayjs}) => {
  const {day} = props;


  const fontSize = new Pixel(20);
  return <div css={css({
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: "5px",
    display: 'flex',
    justifyContent: "space-between",
    fontSize: "12px"
  })}>
    <div css={css({
      // width: "50%",
      color: Colors.theme.text.box.default,
      fontSize: fontSize.toString()
    })}>{parseDayOfWeekAlias(day.day())}</div>
    <div css={css({
      color: Colors.theme.text.box.default,
      fontSize: fontSize.toString()
    })}>{String(day.month() + 1) + "." + String(day.date())}</div>
  </div>
}

function assertIsFormFieldElement(element: Element): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
// Customize this list as necessary −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  if (!("value" in element)) {
    throw new Error(`Element is not a form field element`);
  }
}


function getIdOfTemplate(j: number) {
  if (j < 10) {
    return "0" + j.toString();
  }
  return j.toString();
}

function calculateWeekdaysForView(day: dayjs.Dayjs): Dayjs[] {
  function getStartDate(day: dayjs.Dayjs) {
    if (day.day() == 0) {
      return day;
    }

    if (day.day() == 1) {
      return day.subtract(1, 'day')
    }

    if (day.day() == 2) {
      return day.subtract(2, 'day')
    }

    if (day.day() == 3) {
      return day.subtract(3, 'day')
    }

    if (day.day() == 4) {
      return day.subtract(4, 'day')
    }

    if (day.day() == 5) {
      return day.subtract(5, 'day')
    }

    return day.subtract(6, 'day')
  }

  const startDate = getStartDate(day);
  const result: Dayjs[] = [];
  for (let i = 0; i < 7; i++) {
    result.push(startDate.add(i, 'day'))
  }

  return result;
}

// const items = [
//   {
//     "player": "son",
//     "year": "1992"
//   },
//   {
//     "player": "lim",
//     "year": "1991"
//   }
// ];


export default TestSection;
