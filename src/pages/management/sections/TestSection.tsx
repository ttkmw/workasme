import React, {Dispatch, RefObject, SetStateAction, useEffect, useRef, useState} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

import {createSelectable} from 'react-selectable';

import Selectable from "src/pages/management/sections/Selectable";
import ReactSelectableGroup from "src/pages/management/sections/selectable/react-selectable/ReactSelectableGroup";
import Percentage from "src/graphic/size/percentage";
import {WeekTimes} from "src/model/WeekTimes";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import dayjs, {Dayjs} from "dayjs";
import {TimeRecord} from "src/model/TimeRecord";
import {parseDayOfWeekAlias} from "src/util/DayofweekParser"
import {TimeRecordTemplate} from "src/model/TimeRecordTemplate";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";
import CheckBox from "src/pages/management/sections/parts/components/box/CheckBox";
import fontConfig from "src/graphic/text/font";
import NumberBox from "src/pages/management/sections/parts/components/box/NumberBox";
import {RelativeDay} from "src/model/RelativeDay";
import Modal from "src/pages/components/Mordal";
import TimeBlockRegisterForm from "src/pages/components/timeblock/TimeBlockRegisterForm";
import {TodoDto} from "src/dtos/TodoDto";
import {addBlankTodoAtThisWeek, someDayIsFullOfContents} from "src/service/TodoListService";
import {IoMdClose} from "react-icons/all";


const SelectableComponent = createSelectable(Selectable);

const serverData: WeekTimes = new WeekTimes(
  new Map<string, TimeBlockDto[]>([
    ["2022-08-07", [
      {
        id: 1,
        title: "엣지타임",
        startDateTime: {dateTime: "2022-08-07T23:00"},
        endDateTime: {dateTime: "2022-08-08T01:00"},
        isGood: true,
        category: "NONE",
        memo: "엣지타임"
      }
    ]],
    ["2022-08-08", [
      {
        id: 2,
        title: "영화 보고 친구랑 잠깐 수다떨음",
        startDateTime: {dateTime: "2022-08-08T01:00"},
        endDateTime: {dateTime: "2022-08-08T04:00"},
        isGood: false,
        category: "SOCIAL",
        memo: undefined
      },
      {
        id: 3,
        title: "일했지",
        startDateTime: {dateTime: "2022-08-08T15:00"},
        endDateTime: {dateTime: "2022-08-08T19:00"},
        isGood: false,
        category: "INTELLECTUAL",
        memo: undefined
      },
    ]],
    ["2022-08-19", [
      {
        id: 4,
        title: "샤워하고 밥먹고 전화하다가 엄마한테 등짝맞고 공부하다가 플스함",
        startDateTime: {dateTime: "2022-08-09T01:00"},
        endDateTime: {dateTime: "2022-08-09T04:00"},
        isGood: false,
        category: "NONE",
        memo: "why should id live like this"
      },
    ]],
    ["2022-08-10", [
      {
        id: 5,
        title: "코딩함",
        startDateTime: {dateTime: "2022-08-10T01:00"},
        endDateTime: {dateTime: "2022-08-10T05:00"},
        isGood: true,
        category: "INTELLECTUAL",
        memo: undefined
      },
      {
        id: 6,
        title: "카페에 왔다",
        startDateTime: {dateTime: "2022-08-10T10:00"},
        endDateTime: {dateTime: "2022-08-10T13:00"},
        isGood: true,
        category: "INTELLECTUAL",
        memo: undefined
      },
    ]],
    ["2022-08-11", [
      {
        id: 7,
        title: "베라 피티를 함",
        startDateTime: {dateTime: "2022-08-11T01:00"},
        endDateTime: {dateTime: "2022-08-11T04:00"},
        isGood: true,
        category: "PHYSICAL",
        memo: "개힘들다"
      },
    ]],
    ["2022-08-12", [
      {
        id: 8,
        title: "산책을 함",
        startDateTime: {dateTime: "2022-08-12T01:00"},
        endDateTime: {dateTime: "2022-08-12T04:00"},
        isGood: false,
        category: "SPIRITUAL",
        memo: "개운하다"
      },
    ]],

    ["2022-08-13", [
      {
        id: 9,
        title: "잠을 뒤척임",
        startDateTime: {dateTime: "2022-08-13T02:00"},
        endDateTime: {dateTime: "2022-08-13T05:00"},
        isGood: false,
        category: "NONE",
        memo: "힘들다"
      },
    ]],

    ["2022-08-14", [
      {
        id: 10,
        title: "sleep bad",
        startDateTime: {dateTime: "2022-08-14T00:00"},
        endDateTime: {dateTime: "2022-08-14T05:00"},
        isGood: false,
        category: "NONE",
        memo: "힘들다"
      },
    ]]
  ]),

  undefined,
  new Map<string, TodoDto[]>([
    ["2022-08-14", [
      {
        id: 1,
        isChecked: false,
        content: "해야하는데 아직 못함"
      },
      {
        id: 3,
        isChecked: true,
        content: "쉽게 함"
      },
      {
        id: 4,
        isChecked: true,
        content: "하는중"
      },
      {
        id: 5,
        isChecked: true,
        content: "고고"
      }
    ]],
    ["2022-08-15", [
      {
        id: 2,
        isChecked: true,
        content: "다했음!"
      }
    ]],
    ["2022-08-16", []],
    ["2022-08-17", []],
    ["2022-08-18", []],
    ["2022-08-19", []],
    ["2022-08-20", []]
  ])
);

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


function onRegister() {
  return e => {
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


  };
}

export class TestSection extends React.Component<any> {
  selectableRef;
  state;
  timeBlocks;
  wrapperRef;

  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: [],
      tolerance: 0,
      selectOnMouseMove: false,
      standardDate: dayjs(),
      timeBlocks: new WeekTimes(new Map<string, TimeBlockDto[]>([]), undefined, new Map<string, TodoDto[]>([]))
    };
    this.selectableRef = React.createRef();
    this.wrapperRef = React.createRef();

    this.handleSelection = this.handleSelection.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.handleToleranceChange = this.handleToleranceChange.bind(this);
    this.toggleSelectOnMouseMove = this.toggleSelectOnMouseMove.bind(this);
  }

  updateTimeBlocks(timeBlocks: WeekTimes) {
    this.setState({
      timeBlocks: timeBlocks
    })
  }


  // clearSelectionUsingRef = () => {
  //   if (this.selectionRef) {
  //     this.selectionRef.current.clearSelection();
  //   }
  // }


  componentDidMount() {
    console.log("!!!!!!!!!!!!!! did mount!!!!!!!!!!!!")
    this.setState({
      timeBlocks: serverData
    })
  }


  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any) {
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
            // left: 17,
            marginBottom: 25,
            ".arrow-prev, .arrow-next": {
              position: "relative",
              float: "left",
              width: "20px",
              height: "20px"
            },

            ".arrow-prev::after": {
              position: "absolute",
              top: "3px",
              left: "2.5px",
              content: '""',
              width: "15px", /* 사이즈 */
              height: "15px", /* 사이즈 */
              "border-top": `4px solid ${Colors.theme.text.box.default}`, /* 선 두께 */
              "border-right": `4px solid ${Colors.theme.text.box.default}`, /* 선 두께 */
              transform: "rotate(225deg)", /* 각도 */
            },

            ".arrow-next::after": {
              position: "absolute",

              top: "3px",
              left: "2.5px",
              content: '""',
              width: "15px", /* 사이즈 */
              height: "15px", /* 사이즈 */
              "border-top": `4px solid ${Colors.theme.text.box.default}`, /* 선 두께 */
              "border-right": `4px solid ${Colors.theme.text.box.default}`, /* 선 두께 */
              transform: "rotate(45deg)", /* 각도 */
            }
          })}>
            <div css={css({
              display: "flex",
              alignItems: "center",
            })}>
              <span className="arrow-prev" onClick={() => {
                this.setState({
                  // todo: while이 문제인듯
                  standardDate: this.state.standardDate.subtract(7, 'day')
                });
              }}/>
            </div>

            <div css={css({
              display: "flex",
              alignItems: "center",
              '.button': {
                backgroundColor: "transparent",
                borderRadius: 10,
                borderWidth: "2px",
                borderColor: Colors.theme.text.box.default,
                borderStyle: "solid",
                color: Colors.theme.text.box.default,
                paddingLeft: 0,
                paddingRight: 0,
              }
            })}>
              <button
                css={css({
                  width: new Pixel(60).toString(),

                  height: new Pixel(30).toString(),
                  fontFamily: fontConfig.web.medium.fontFamily,

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
            <div css={css({
              display: "flex",
              alignItems: "center",
            })}>
              <span className="arrow-next" onClick={() => {
                this.setState({
                  standardDate: this.state.standardDate.add(7, 'day')
                });
              }}/>
            </div>


          </div>
        </div>
        <TodoListSection weekdays={weekdays} checkBoxSize={this.checkBoxSize} timeBlocks={this.state.timeBlocks}
                         updateTimeBlocks={this.updateTimeBlocks.bind(this)}/>

        <ReactSelectableGroup onSelection={this.handleSelection}
                              onEndSelection={() => this.showModal(this.state.selectedKeys)}
                              className={"selectable"}
                              ref={this.selectableRef}
                              selectOnMouseMove={this.state.selectOnMouseMove}
                              selectingClassName={"selectingSelectable"}

        >

          <div css={css({
            flexDirection: "row",
            display: "flex",
          })}>
            {
              weekdays.map((day, i) => {

                const timeRecords: TimeRecord[] = [];


                timeTemplates.map((recordTemplate, j) => {
                  timeRecords.push(new TimeRecord(Number(i.toString() + getIdOfTemplate(j)), day, recordTemplate))
                })

                return <div css={css({})}>

                  <div css={css({
                    width: "160px",
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
                        const isMatching = timeCell.match(this.state.timeBlocks, this.state.standardDate);
                        const timeBlockHeightRatio = timeCell.calculateHeightTimes(this.state.timeBlocks, isMatching, this.state.standardDate)
                        const timeBlockDto: TimeBlockDto | undefined = timeCell.getMatching(this.state.timeBlocks, this.state.standardDate);
                        return (
                          <div>
                            <SelectableComponent
                              selectableKey={timeCell.id}
                              key={timeCell.id}
                              isSelected={selected}
                              isMatching={isMatching}
                              timeBlockDto={timeBlockDto}
                              timeBlockHeightRatio={timeBlockHeightRatio}
                              timeCellHeight={this.timeCellHeight}
                              timeBlocks={this.state.timeBlocks}
                              updateTimeBlocks={this.updateTimeBlocks.bind(this)}
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
                modalRef={(n: any) => (this.modal = n)}
                buttonRef={(n: any) => (this.closeButton = n)}
                closeModal={this.onClose}
                onKeyDown={this.onKeyDown}
                onClickOutside={this.onClickOutside}
              >
                <TimeBlockRegisterForm onSubmit={onRegister} earliestRecord={earliestRecord}
                                       latestRecord={latestRecord}/>
              </Modal>
            ) : null}
        </React.Fragment>

      </div>
    )
  }
}


const TodoList: React.FC<{ checkBoxSize: Pixel, todoDtos: TodoDto[], day: Dayjs, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void }> =
  (props: { checkBoxSize: Pixel, todoDtos: TodoDto[], day: Dayjs, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void }) => {

    const {checkBoxSize, todoDtos, day, timeBlocks, updateTimeBlocks} = props;

    return <div css={css({
      display: "flex",
      // alignItems: "center",
      marginLeft: "5px",
      marginRight: "10px",
      flexDirection: "column",
      paddingTop: checkBoxSize.multiply(new Percentage(50)).toString(),
      paddingBottom: checkBoxSize.multiply(new Percentage(50)).toString(),
      // "-webkit-align-items": ""
    })}>
      {todoDtos.map((todo, index) => {
        return <Todo checkBoxSize={checkBoxSize} todoDto={todo} day={day} index={index} timeBlocks={timeBlocks}
                     updateTimeBlocks={updateTimeBlocks}/>
      })}
    </div>
  }

function handleClickOutside(event: any, ref: RefObject<any>, day: Dayjs, index: number, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void, setIsFocused: Dispatch<SetStateAction<any>>) {



  // console.log("contains", !ref.current.contains(event.target))
  if (ref.current && !ref.current.contains(event.target)) {
    if ((ref.current.value != ref.current.defaultValue) && (ref.current.value != '' && ref.current.value != undefined)) {

      let todoDtosAtDate: TodoDto[] | undefined = timeBlocks.todoWithinThisWeek.get(TimeRecord.getFormattedDate(day, RelativeDay.TODAY));
      alert("should api call modified")

      let newTodoDtos: TodoDto[] | undefined = todoDtosAtDate!.map((todoDto, todoDtoIndex) => {
        if (todoDtoIndex == index) {
          //여기에서 api 콜한 결과를 리턴
          return {id: todoDto.id, isChecked: todoDto.isChecked, content: ref.current.value}
        } else {
          return todoDto;
        }
      })

      timeBlocks.todoWithinThisWeek.set(TimeRecord.getFormattedDate(day, RelativeDay.TODAY), newTodoDtos === undefined ? [] : newTodoDtos)
      updateTimeBlocks(timeBlocks);

      if (someDayIsFullOfContents(timeBlocks.todoWithinThisWeek)) {
        addBlankTodoAtThisWeek(timeBlocks.todoWithinThisWeek)
        updateTimeBlocks(timeBlocks);
      }
    }
    setIsFocused(false);
    // ref.current.defaultValue = ref.current.value;
  }
}

function useOutsideAlerter(ref: RefObject<any>, day: Dayjs, index: number, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void, setIsFocused: Dispatch<SetStateAction<any>>) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // Bind the event listener
    document.addEventListener("mousedown", (e) => handleClickOutside(e, ref, day, index, timeBlocks, updateTimeBlocks, setIsFocused));
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", (e) => handleClickOutside(e, ref, day, index, timeBlocks, updateTimeBlocks, setIsFocused));
    };
  }, [ref]);
}

//https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
const Todo: React.FC<{ checkBoxSize: Pixel, todoDto: TodoDto, day: Dayjs, index: number, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlock: WeekTimes) => void }> =
  (props: { checkBoxSize: Pixel, todoDto: TodoDto, day: Dayjs, index: number, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlock: WeekTimes) => void }) => {
    const {checkBoxSize, todoDto, day, index, timeBlocks, updateTimeBlocks} = props;
    const [onHover, setOnHover] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, day, index, timeBlocks, updateTimeBlocks, setIsFocused);

    const onDelete = (e, day, index, timeBlocks, updateTimeBlocks) => {
      let todoDtosAtDate: TodoDto[] | undefined = timeBlocks.todoWithinThisWeek.get(TimeRecord.getFormattedDate(day, RelativeDay.TODAY));
      const removeTarget = todoDtosAtDate!.filter((todoDto, todoDtoIndex) => todoDtoIndex === index)[0];
      alert("should api call deleted")
      let newTodoDtos = todoDtosAtDate!.filter((todoDto) => {
        return todoDto !== removeTarget});
      timeBlocks.todoWithinThisWeek.set(TimeRecord.getFormattedDate(day, RelativeDay.TODAY), newTodoDtos === undefined ? [] : newTodoDtos);
      // todo: 여기서 지운게 제일 긴거였으면, 등등 로직에 다라 다 하나씩 지워야 함.
      updateTimeBlocks(timeBlocks);
    }

    const onKeyPress = (event, day, index, setIsFocused) => {
      // todo: 엔티티가 아니면, 즉 아이디가 없으면 생성 콜을 해야함.
      if (event.charCode == 13 && !event.shiftKey) {
        event.preventDefault();
        let todoDtosAtDate: TodoDto[] | undefined = timeBlocks.todoWithinThisWeek.get(TimeRecord.getFormattedDate(day, RelativeDay.TODAY));
        const target = event.target as HTMLInputElement;
        if (target.defaultValue !== target.value) {
          alert("should api call modified")

          let newTodoDtos: TodoDto[] | undefined = todoDtosAtDate!.map((todoDto, todoDtoIndex) => {
            if (todoDtoIndex == index) {
              //여기에서 api 콜한 결과를 리턴
              return {id: todoDto.id, isChecked: todoDto.isChecked, content: target.value}
            } else {
              return todoDto;
            }
          })

          timeBlocks.todoWithinThisWeek.set(TimeRecord.getFormattedDate(day, RelativeDay.TODAY), newTodoDtos === undefined ? [] : newTodoDtos)
          updateTimeBlocks(timeBlocks);

          if (someDayIsFullOfContents(timeBlocks.todoWithinThisWeek)) {
            addBlankTodoAtThisWeek(timeBlocks.todoWithinThisWeek)
            updateTimeBlocks(timeBlocks);
          }
          // target.defaultValue = target.value;
        }
        setIsFocused(false);
      }
    };



    return <div
      css={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: checkBoxSize.multiply(new Percentage(25)).toString(),
        marginBottom: checkBoxSize.multiply(new Percentage(25)).toString(),
      })}
      onMouseEnter={() => {
        if (todoDto.content == undefined || todoDto.content == '') {
          return
        }
        setOnHover(true);
      }}
      onMouseLeave={() => {
        if (todoDto.content == undefined || todoDto.content == '') {
          return
        }
        setOnHover(false);
      }}
    >
      <CheckBox size={checkBoxSize} borderWidth={new Pixel(1.5)}
                borderColor={Colors.theme.table.innerLine} beforeColor={Colors.theme.screen.background}
                afterColor={Colors.theme.table.innerLine}
                todoDto={todoDto}
                index={index}
                day={day}
                timeBlocks={timeBlocks}
                updateTimeBlocks={updateTimeBlocks}
      />
      <div
        css={css({
          display: 'flex',
          flexDirection: 'row',
          position: "relative",
          width: "100%",
          height: 15
        })}
      >

        {
          isFocused ? <textarea ref={wrapperRef} css={css({
              position: "absolute",
              top: "0px",
              left: "0px",
              zIndex: 50,
              width: "200%",
              marginLeft: "5%"

            })} onKeyPress={(e) => onKeyPress(e, day, index, setIsFocused)} defaultValue={todoDto.content}
            /> :
            <input ref={wrapperRef} css={css({
            border: 0,
            borderBottom: 1,
            borderBottomStyle: "solid",
            borderBottomColor: Colors.theme.table.innerLine,
            marginLeft: "5%",
            width: "90%"
          })} key={TimeRecord.getFormattedDate(day, RelativeDay.TODAY) + index + todoDto.content} onFocus={() => setIsFocused(true)} onKeyPress={(e) => onKeyPress(e, day, index, setIsFocused)} defaultValue={todoDto.content} type={"text"}/>
        }
        {onHover && !isFocused && (
          <button
            css={css({
              paddingLeft: 0,
              paddingRight: 0,
              backgroundColor: 'transparent',
              ":focus-visible": {
                outline: "0px"
              },
              borderWidth: "0px",
              display: "flex",
              alignItems: "center"
            })}
            onClick={event => onDelete(event, day, index, timeBlocks, updateTimeBlocks)}

          >
            {/*<span id="close-modal" className="_hide-visual">*/}
            {/*  Close*/}
            {/*</span>*/}
            <IoMdClose css={css({
              backgroundColor: Colors.theme.main.work,
            })} size={new Pixel(15).toString()} color={"white"}
                       onClick={() => {
                       }}/>
            {/*<svg className="_modal-close-icon" viewBox="0 0 40 40">*/}
            {/*  <path d="M 10,10 L 30,30 M 30,10 L 10,30"/>*/}
            {/*</svg>*/}
          </button>
        )}
      </div>

      {/*다음으로 할 작업은 인풋 api 콜 되는부분에서 setTodos를 해서 defaultValue를 수정하는것. 마찬가지로 check에서도 체크했을때 api 콜 가정하여 setTodos 호출해서 check 수정하*/}
    </div>
  }

const TodoListSection: React.FC<{ weekdays: Dayjs[], checkBoxSize: Pixel, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void }> =
  (props: { weekdays: Dayjs[], checkBoxSize: Pixel, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void }) => {
    const {weekdays, checkBoxSize, timeBlocks, updateTimeBlocks} = props;

    return <div
      css={css({
        flexDirection: "row",
        display: "flex"
      })}>
      {

        weekdays.map((day, i) => {
          const todoListAtDate: TodoDto[] | undefined = timeBlocks.todoWithinThisWeek.get(TimeRecord.getFormattedDate(day, RelativeDay.TODAY));
          return <div css={css({
            width: "160px"
          })}>
            <DateGuide day={day}/>
            <TodoList checkBoxSize={checkBoxSize} todoDtos={todoListAtDate === undefined ? [] : todoListAtDate!}
                      day={day} timeBlocks={timeBlocks} updateTimeBlocks={updateTimeBlocks}/>
          </div>
        })
      }
    </div>
  }


const DateGuide: React.FC<{ day: Dayjs }> = (props: { day: Dayjs }) => {
  const {day} = props;


  const fontSize = new Pixel(20);
  return <div css={css({
    width: "160px",
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: "5px",
    display: 'flex',
    justifyContent: "space-between",
    fontSize: "12px",
    fontFamily: fontConfig.web.medium.fontFamily
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
