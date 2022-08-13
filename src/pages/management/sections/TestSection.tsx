import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

import {createSelectable} from 'react-selectable';

import Modal from "src/pages/management/sections/Mordal";
import Selectable from "src/pages/management/sections/Selectable";
import ReactSelectableGroup from "src/pages/management/sections/selectable/react-selectable/ReactSelectableGroup";
import Percentage from "src/graphic/size/percentage";
import {WeekTimes} from "src/model/WeekTimes";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import {DateTime} from "src/model/DateTime";
import dayjs, {Dayjs} from "dayjs";
import {TimeRecord} from "src/model/TimeRecord";
import {parseDayOfWeek, parseDayOfWeekAlias} from "src/util/DayofweekParser"
import {TimeRecordTemplate} from "src/model/TimeRecordTemplate";
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md'
import Pixel from "src/graphic/size/pixel";
import colors from "src/constants/Colors";
import Colors from "src/constants/Colors";
import CheckBox from "src/pages/management/sections/parts/components/box/CheckBox";
import fontConfig from "src/graphic/text/font";
import NumberBox from "src/pages/management/sections/parts/components/box/NumberBox";
import {RelativeDay} from "src/model/RelativeDay";


const SelectableComponent = createSelectable(Selectable);

const timeTemplates: TimeRecordTemplate[] = [
  new TimeRecordTemplate("03:00", RelativeDay.TODAY),
  new TimeRecordTemplate("04:00", RelativeDay.TODAY),
  new TimeRecordTemplate("05:00", RelativeDay.TODAY),
  new TimeRecordTemplate("06:00", RelativeDay.TODAY),
  new TimeRecordTemplate("07:00", RelativeDay.TODAY),
  new TimeRecordTemplate("08:00", RelativeDay.TODAY),
  new TimeRecordTemplate("09:00", RelativeDay.TODAY),
  new TimeRecordTemplate("10:00", RelativeDay.TODAY),
  new TimeRecordTemplate("11:00", RelativeDay.TODAY),
  new TimeRecordTemplate("12:00", RelativeDay.TODAY),
  new TimeRecordTemplate("13:00", RelativeDay.TODAY),
  new TimeRecordTemplate("14:00", RelativeDay.TODAY),
  new TimeRecordTemplate("15:00", RelativeDay.TODAY),
  new TimeRecordTemplate("16:00", RelativeDay.TODAY),
  new TimeRecordTemplate("17:00", RelativeDay.TODAY),
  new TimeRecordTemplate("18:00", RelativeDay.TODAY),
  new TimeRecordTemplate("19:00", RelativeDay.TODAY),
  new TimeRecordTemplate("20:00", RelativeDay.TODAY),
  new TimeRecordTemplate("21:00", RelativeDay.TODAY),
  new TimeRecordTemplate("22:00", RelativeDay.TODAY),
  new TimeRecordTemplate("23:00", RelativeDay.TODAY),
  new TimeRecordTemplate("00:00", RelativeDay.TOMORROW),
  new TimeRecordTemplate("01:00", RelativeDay.TOMORROW),
  new TimeRecordTemplate("02:00", RelativeDay.TOMORROW),
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

function exceedsYesterday(lastOfYesterdayData: TimeBlockDto | undefined, comparableRecord: TimeRecord) {
  if (lastOfYesterdayData === undefined) {
    return false;
  }

  const yesterdayDate = lastOfYesterdayData.endDateTime.getDate();
  const comparable = new Date(yesterdayDate + "T" + "02:00");
  const endDateTime = new Date(lastOfYesterdayData.endDateTime.getDateTime());

  return lastOfYesterdayData.endDateTime.getDate() === comparableRecord.getEndDate() && comparable.getTime() < endDateTime.getTime();
}

function getFirstTimeOfTheDayAfterTargetDay(yesterdayData: TimeBlockDto[]): TimeBlockDto {
  return yesterdayData[0];
}

function match(serverData: WeekTimes, record: TimeRecord, targetDayOfWeek: string) {

  const targetTimes = serverData.getTimesOf(targetDayOfWeek);
  for (let i = 0; i < targetTimes.length; i++) {
    const targetTime = targetTimes[i];
    // const startTimePieces = data.endDateTime.toISOString().split("T")[1].split(".")[0].split(":");
    if (record.getStartDateTime() === targetTime.startDateTime.getDateTime()) {
      return true
    }
  }

  // const theDayAfterTargetDayTimes = serverData.getTimesOfheDayAfterTargetDay(targetDayOfWeek);

  // const firstOftheDayAfterTargetDay = getFirstTimeOfTheDayAfterTargetDay(theDayAfterTargetDayTimes);
  // if (firstOftheDayAfterTargetDay === undefined) {
  //   return false;
  // }
  // return (record.getStartTime() === '00:00' || record.getStartTime() === '01:00') || record.getStartTime() === '02:00' &&
  //   record.getStartDateTime() === firstOftheDayAfterTargetDay.startDateTime.getDateTime();
  return false;
}

function calculateHeightTimes(serverData: WeekTimes, record: TimeRecord, todayDayOfWeek) {

  // const yesterdayData = serverData.getTimesOfheDayAfterTargetDay(todayDayOfWeek);
  const lastOfYesterdayData = getFirstTimeOfTheDayAfterTargetDay([]);

  let itemStartDateTime = new Date();
  itemStartDateTime.setHours(parseInt(record.getAlias()));

  const itemEndDateTime = new Date();
  itemEndDateTime.setHours(parseInt(record.getAlias()) + 1);

  if (lastOfYesterdayData !== undefined && record.getStartTime() === '03:00' && exceedsYesterday(lastOfYesterdayData, record)) {
    const endDate = lastOfYesterdayData.endDateTime.getDate();
    const comparable = new Date(endDate + "T" + "03:00");
    const endDateTime = new Date(lastOfYesterdayData.endDateTime.getDateTime());
    return new Percentage((endDateTime.getTime() - comparable.getTime()) / (itemEndDateTime.getTime() - itemStartDateTime.getTime()) * 100);
  }

  const todayData = serverData.getTimesOf(todayDayOfWeek);
  // todo: check!!! 왜 undefined야
  if (todayData === undefined) {
    return null;
  }
  for (let i = 0; i < todayData.length; i++) {
    const data = todayData[i];

    const startDateTime = new Date(data.startDateTime.getDateTime());
    // const startTimePieces = data.endDateTime.toISOString().split("T")[1].split(".")[0].split(":");
    const startTime = data.startDateTime.getTime();
    if (record.getStartTime() === startTime) {

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

function createAllTimeRecords(day: Dayjs): TimeRecord[] {
  const allTimeRecords: TimeRecord[] = [];
  const weekdays = calculateWeekdaysForView(day);

  weekdays.map((day, i) => {
    timeTemplates.map((timeTemplate, j) => {
      allTimeRecords.push(new TimeRecord(Number(i.toString() + getIdOfTemplate(j)), day, timeTemplate))
    })
  })
  return allTimeRecords;
}

function getEarliestRecord(selectedTimeRecords: TimeRecord[]): TimeRecord {
  let earliest: TimeRecord | undefined = undefined;

  selectedTimeRecords.map((selectedTimeRecord) => {
    if (earliest === undefined || new Date(selectedTimeRecord.getEndDateTime()).getTime() < new Date(earliest.getStartDateTime()).getTime()) {
      earliest = selectedTimeRecord;
    }
  })

  return earliest!;
}

function getLatestRecord(selectedTimeRecords: TimeRecord[]): TimeRecord {
  let latest: TimeRecord | undefined = undefined;

  selectedTimeRecords.map((selectedTimeRecord) => {
    if (latest === undefined || new Date(latest.getStartDateTime()).getTime() < new Date(selectedTimeRecord.getStartDateTime()).getTime()) {
      latest = selectedTimeRecord;
    }
  })

  return latest!;
}

const serverData: WeekTimes = new WeekTimes(
  new Map<string, TimeBlockDto[]>([
    ["2022-08-07", [
      {
        id: 1,
        title: "엣지타임",
        startDateTime: new DateTime("2022-08-07T23:00"),
        endDateTime: new DateTime("2022-08-08T01:00"),
        isGood: true,
        category: "NONE",
        memo: "엣지타임"
      }
    ]],
    ["2022-08-08", [
      {
        id: 2,
        title: "영화 보고 친구랑 잠깐 수다떨음",
        startDateTime: new DateTime("2022-08-08T01:00"),
        endDateTime: new DateTime("2022-08-08T04:00"),
        isGood: false,
        category: "SOCIAL",
        memo: undefined
      },
      {
        id: 3,
        title: "일했지",
        startDateTime: new DateTime("2022-08-08T15:00"),
        endDateTime: new DateTime("2022-08-08T19:00"),
        isGood: false,
        category: "INTELLECTUAL",
        memo: undefined
      },
    ]],
    ["2022-08-19", [
      {
        id: 4,
        title: "샤워하고 밥먹고 전화하다가 엄마한테 등짝맞고 공부하다가 플스함",
        startDateTime: new DateTime("2022-08-09T01:00"),
        endDateTime: new DateTime("2022-08-09T04:00"),
        isGood: false,
        category: "NONE",
        memo: "why should id live like this"
      },
    ]],
    ["2022-08-10", [
      {
        id: 5,
        title: "코딩함",
        startDateTime: new DateTime("2022-08-10T01:00"),
        endDateTime: new DateTime("2022-08-10T05:00"),
        isGood: true,
        category: "INTELLECTUAL",
        memo: undefined
      },
      {
        id: 6,
        title: "카페에 왔다",
        startDateTime: new DateTime("2022-08-10T10:00"),
        endDateTime: new DateTime("2022-08-10T13:00"),
        isGood: true,
        category: "INTELLECTUAL",
        memo: undefined
      },
    ]],
    ["2022-08-11", [
      {
        id: 7,
        title: "베라 피티를 함",
        startDateTime: new DateTime("2022-08-11T01:00"),
        endDateTime: new DateTime("2022-08-11T04:00"),
        isGood: true,
        category: "PHYSICAL",
        memo: "개힘들다"
      },
    ]],
    ["2022-08-12", [
      {
        id: 8,
        title: "산책을 함",
        startDateTime: new DateTime("2022-08-12T01:00"),
        endDateTime: new DateTime("2022-08-12T04:00"),
        isGood: false,
        category: "SPIRITUAL",
        memo: "개운하다"
      },
    ]],

    ["2022-08-13", [
      {
        id: 9,
        title: "잠을 뒤척임",
        startDateTime: new DateTime("2022-08-13T02:00"),
        endDateTime: new DateTime("2022-08-13T05:00"),
        isGood: false,
        category: "NONE",
        memo: "힘들다"
      },
    ]],

    ["2022-08-14", [
      {
        id: 10,
        title: "잠을 뒤척임",
        startDateTime: new DateTime("2022-08-14T00:00"),
        endDateTime: new DateTime("2022-08-14T05:00"),
        isGood: false,
        category: "NONE",
        memo: "힘들다"
      },
    ]]
  ]),
  undefined
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
  private timeCellHeight = new Pixel(30);
  private outlineBorder = new Pixel(1);
  private noBorder = new Pixel(0);


  render() {
    const weekdays = calculateWeekdaysForView(this.state.standardDate);

    const allTimeRecords: TimeRecord[] = createAllTimeRecords(this.state.standardDate);
    const selectedTimeRecords: TimeRecord[] = [];
    allTimeRecords.map((timeRecord, i) => {
      if (isIdInSelectedKeys(timeRecord.id, this.state.selectedKeys)) {
        selectedTimeRecords.push(timeRecord);
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
                // todo: while이 문제인듯
                standardDate: this.state.standardDate.subtract(7, 'day')
              });

              // console.log("kkkkjakldfjladjklda")
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
              >today
              </button>
            </div>


            <MdNavigateNext css={css({})} size={new Pixel(50).toString()} color={colors.theme.navigator.default}
                            onClick={() => {
                              this.setState({
                                standardDate: dayjs(this.state.standardDate.add(7, 'day'))
                              });

                              console.log("kqwwjerlqjekqler")
                              console.log();
                            }}/>
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

                const timeRecords: TimeRecord[] = [];


                timeTemplates.map((recordTemplate, j) => {
                  timeRecords.push(new TimeRecord(Number(i.toString() + getIdOfTemplate(j)), day, recordTemplate))
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
                      timeRecords.map((timeCell) => {

                        let selected = this.state.selectedKeys.indexOf(timeCell.id) > -1 || isIdInSelectedKeys(timeCell.id, this.state.selectedKeys);
                        const isMatching = timeCell.match(serverData, this.state.standardDate);
                        const timeBlockHeightRatio = timeCell.calculateHeightTimes(serverData, isMatching, this.state.standardDate)
                        const timeBlockDto: TimeBlockDto | undefined = timeCell.getMatching(serverData, this.state.standardDate);
                        if (isMatching && timeBlockHeightRatio === undefined) {
                          console.log("jkladfj;slkafjadfl;aj;lksjf;")
                        }
                        // const heightTimes = calculateHeightTimes(serverData, timeRecord, parseDayOfWeek(day.day()));
                        return (
                          <div>

                            {/*timeBlockHeightRatio ?: Percentage*/}
                            {/*timeCellHeight: Pixel*/}
                            <SelectableComponent
                              selectableKey={timeCell.id}
                              key={timeCell.id}
                              isSelected={selected}
                              isMatching={isMatching}
                              timeBlockDto={timeBlockDto}
                              timeBlockHeightRatio={timeBlockHeightRatio}
                              timeCellHeight={this.timeCellHeight}
                            >
                              <NumberBox number={timeCell.getAlias()} numberSize={this.checkBoxSize}
                                         numberFont={fontConfig.web.medium.fontFamily}
                                         numberColor={!selected ? Colors.theme.text.box.default : "white"}
                                         boxWidth={new Pixel(14)} boxHeight={new Pixel(35)}
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
                  let category = e.currentTarget[6];

                  assertIsFormFieldElement(title);
                  assertIsFormFieldElement(startDate);
                  assertIsFormFieldElement(startTime);
                  assertIsFormFieldElement(endDate);

                  console.log("title", title, title.value);
                  console.log("startDate", startDate, startDate.value);
                  console.log("startTime", startTime, startTime.value);
                  console.log("endDate", endDate, endTime.value);
                  console.log("isGood", isGood, isGood.checked);
                  console.log("category", category, category.value)


                }}

                modalRef={(n: any) => (this.modal = n)}
                buttonRef={(n: any) => (this.closeButton = n)}
                closeModal={this.onClose}
                onKeyDown={this.onKeyDown}
                onClickOutside={this.onClickOutside}
                earliestRecord={earliestRecord}
                latestRecord={latestRecord}
              />
            ) : null}
        </React.Fragment>

      </div>
    )
  }
}

const TodoList: React.FC<{ checkBoxSize: Pixel }> = (props: { checkBoxSize: Pixel }) => {
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

const Todo: React.FC<{ checkBoxSize: Pixel }> = (props: { checkBoxSize: Pixel }) => {
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


const DateGuide: React.FC<{ day: Dayjs }> = (props: { day: Dayjs }) => {
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
