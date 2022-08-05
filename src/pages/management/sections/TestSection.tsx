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
import {parseDayOfWeek} from "src/util/DayofweekParser"
import {TimeRecordTemplate} from "src/model/TimeRecordTemplate";

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

export class TestSection extends React.Component<any> {
  selectableRef;
  state;

  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: [],
      tolerance: 0,
      selectOnMouseMove: false,
      haha: ""
    };
    this.selectableRef = React.createRef();

    this.handleSelection = this.handleSelection.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.handleToleranceChange = this.handleToleranceChange.bind(this);
    this.toggleSelectOnMouseMove = this.toggleSelectOnMouseMove.bind(this);
  }

  private weekDays: Dayjs[] = calculateWeekdaysForView(dayjs());

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

  showModal = () => {
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

  private serverData: WeekTimes = new WeekTimes(
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

  render() {
    return (
      <div css={css({
        '.middle': {
          borderWidth: 5,
          borderColor: "red",
          borderStyle: "solid"
        },
        '.first': {
          borderWidth: 5,
          borderColor: "black",
          borderStyle: "solid"
        },
        '.last': {
          borderWidth: 5,
          borderColor: "blue",
          borderStyle: "solid"
        },
        '.selectable': {
          backgroundColor: 'blue',
          width: "150px"
        },
        '.selectingSelectable': {
          backgroundColor: 'yellow'
        }
      })}
      >
        <ReactSelectableGroup onSelection={this.handleSelection}
                              onEndSelection={this.showModal}
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
              this.weekDays.map((day, i) => {

                const timeRecordsOnWeekView: TimeRecordOnWeekView[] = [];

                function getDateTime(recordTemplate: TimeRecordTemplate): DateTime {
                  return new DateTime(day.year() + "-" + String(day.month() + 1) + "-" + day.date() + "T" + recordTemplate)
                }

                timeRecordTemplates.map((recordTemplate, j) => {
                  getDateTime(recordTemplate);
                  timeRecordsOnWeekView.push(new TimeRecordOnWeekView(Number(i.toString() + getIdOfTemplate(j)),day, recordTemplate))
                })

                return <div>
                  {
                    timeRecordsOnWeekView.map((record) => {
                      let selected = this.state.selectedKeys.indexOf(record.id) > -1 || isIdInSelectedKeys(record.id, this.state.selectedKeys);
                      const isMatching = match(this.serverData, record.startDateTime, parseDayOfWeek(day.day()));
                      const heightTimes = calculateHeightTimes(this.serverData, record, parseDayOfWeek(day.day()));
                      return (
                        <div>
                          <SelectableComponent
                            selectableKey={record.id}
                            key={record.id}
                            isSelected={selected}
                            isMatching={isMatching}
                            heightTimes={heightTimes}
                          >
                            {record.getAlias()}
                          </SelectableComponent>
                        </div>
                      )
                    })
                  }
                </div>
              })
            }
            {/*<WeekView weekDays={this.weekDays}/>*/}
          </div>
          {/*<div>*/}
          {/*  {*/}
          {/*    this.props.items['SUNDAY'].map((item, i) => {*/}
          {/*      let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);*/}

          {/*      const isMatching = match(this.serverData, item.startTime, 'SUNDAY');*/}

          {/*      const heightTimes = calculateHeightTimes(this.serverData, new TimeRecordOnWeekView(item.id, item.startTime), 'SUNDAY');*/}
          {/*      if (isMatching) {*/}
          {/*        console.log(heightTimes)*/}
          {/*      }*/}

          {/*      return (*/}
          {/*        <div>*/}
          {/*          <SelectableComponent*/}
          {/*            selectableKey={item.id}*/}
          {/*            key={item.id}*/}
          {/*            isSelected={selected}*/}
          {/*            isMatching={isMatching}*/}
          {/*            heightTimes={heightTimes}*/}
          {/*          >*/}
          {/*            {item.alias}*/}
          {/*          </SelectableComponent>*/}
          {/*        </div>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  {this.props.items['MONDAY'].map((item, i) => {*/}

          {/*    let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);*/}

          {/*    const isMatching = match(this.serverData, item.startTime, 'MONDAY');*/}

          {/*    const heightTimes = calculateHeightTimes(this.serverData, new TimeRecordOnWeekView(item.id, item.startTime), 'MONDAY');*/}

          {/*    return (*/}
          {/*      <div>*/}
          {/*        <SelectableComponent*/}
          {/*          selectableKey={item.id}*/}
          {/*          key={item.id}*/}
          {/*          isSelected={selected}*/}
          {/*          isMatching={isMatching}*/}
          {/*          heightTimes={heightTimes}*/}
          {/*        >*/}
          {/*          {item.alias}*/}
          {/*        </SelectableComponent>*/}
          {/*      </div>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  {this.props.items['TUESDAY'].map((item, i) => {*/}
          {/*    let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);*/}

          {/*    const isMatching = match(this.serverData, item.startTime, 'TUESDAY');*/}
          {/*    const heightTimes = calculateHeightTimes(this.serverData, new TimeRecordOnWeekView(item.id, item.startTime), 'TUESDAY');*/}

          {/*    return (*/}
          {/*      <div>*/}
          {/*        <SelectableComponent*/}
          {/*          selectableKey={item.id}*/}
          {/*          key={item.id}*/}
          {/*          isSelected={selected}*/}
          {/*          isMatching={isMatching}*/}
          {/*          heightTimes={heightTimes}*/}
          {/*        >*/}
          {/*          {item.alias}*/}
          {/*        </SelectableComponent>*/}
          {/*      </div>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  {this.props.items['WEDNESDAY'].map((item, i) => {*/}
          {/*    let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);*/}

          {/*    const isMatching = match(this.serverData, item.startTime, 'WEDNESDAY');*/}
          {/*    const heightTimes = calculateHeightTimes(this.serverData, new TimeRecordOnWeekView(item.id, item.startTime), 'WEDNESDAY');*/}


          {/*    return (*/}
          {/*      <div>*/}
          {/*        <SelectableComponent*/}
          {/*          selectableKey={item.id}*/}
          {/*          key={item.id}*/}
          {/*          isSelected={selected}*/}
          {/*          isMatching={isMatching}*/}
          {/*          heightTimes={heightTimes}*/}
          {/*        >*/}
          {/*          {item.alias}*/}
          {/*        </SelectableComponent>*/}
          {/*      </div>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  {this.props.items['THURSDAY'].map((item, i) => {*/}
          {/*    let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);*/}

          {/*    const isMatching = match(this.serverData, item.startTime, 'THURSDAY');*/}
          {/*    const heightTimes = calculateHeightTimes(this.serverData, new TimeRecordOnWeekView(item.id, item.startTime), 'THURSDAY');*/}


          {/*    return (*/}
          {/*      <div>*/}
          {/*        <SelectableComponent*/}
          {/*          selectableKey={item.id}*/}
          {/*          key={item.id}*/}
          {/*          isSelected={selected}*/}
          {/*          isMatching={isMatching}*/}
          {/*          heightTimes={heightTimes}*/}
          {/*        >*/}
          {/*          {item.alias}*/}
          {/*        </SelectableComponent>*/}
          {/*      </div>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  {this.props.items['FRIDAY'].map((item, i) => {*/}
          {/*    let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);*/}

          {/*    const isMatching = match(this.serverData, item.startTime, 'FRIDAY');*/}
          {/*    const heightTimes = calculateHeightTimes(this.serverData, new TimeRecordOnWeekView(item.id, item.startTime), 'FRIDAY');*/}


          {/*    return (*/}
          {/*      <div>*/}
          {/*        <SelectableComponent*/}
          {/*          selectableKey={item.id}*/}
          {/*          key={item.id}*/}
          {/*          isSelected={selected}*/}
          {/*          isMatching={isMatching}*/}
          {/*          heightTimes={heightTimes}*/}
          {/*        >*/}
          {/*          {item.alias}*/}
          {/*        </SelectableComponent>*/}
          {/*      </div>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  {this.props.items['SATURDAY'].map((item, i) => {*/}
          {/*    let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);*/}

          {/*    const isMatching = match(this.serverData, item.startTime, 'SATURDAY');*/}
          {/*    const heightTimes = calculateHeightTimes(this.serverData, new TimeRecordOnWeekView(item.id, item.startTime), 'SATURDAY');*/}

          {/*    return (*/}
          {/*      <div>*/}
          {/*        <SelectableComponent*/}
          {/*          selectableKey={item.id}*/}
          {/*          key={item.id}*/}
          {/*          isSelected={selected}*/}
          {/*          isMatching={isMatching}*/}
          {/*          heightTimes={heightTimes}*/}
          {/*        >*/}
          {/*          {item.alias}*/}
          {/*        </SelectableComponent>*/}
          {/*      </div>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</div>*/}
        </ReactSelectableGroup>
        <React.Fragment>
          {this.state.isShown ? (
            <Modal
              onSubmit={e => {
                console.log("kkkkk!!!")
                const allSelectKeys: number[] = [];
                for (let key in this.props.items) {
                  this.props.items[key].map((item, i) => {
                    if (isIdInSelectedKeys(item.id, this.state.selectedKeys)) {
                      allSelectKeys.push(item.id);
                    }
                  })
                }

                let firstField = e.currentTarget[0];
                assertIsFormFieldElement(firstField);
              }}
              onClick={() => console.log("kkkkk")}
              modalRef={(n: any) => (this.modal = n)}
              buttonRef={(n: any) => (this.closeButton = n)}
              closeModal={this.onClose}
              onKeyDown={this.onKeyDown}
              onClickOutside={this.onClickOutside}
            />
          ) : null}
        </React.Fragment>

      </div>
    )
  }
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
