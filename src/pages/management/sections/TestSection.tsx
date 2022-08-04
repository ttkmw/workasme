import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

import {createSelectable} from 'react-selectable';

import {TSelectableItem} from "react-selectable-fast/lib/Selectable.types";
import Modal from "src/pages/management/sections/Mordal";
import SomeComponent from "./SomeComponent";
import ReactSelectableGroup from "src/pages/management/sections/selectable/react-selectable/ReactSelectableGroup";
import Percentage from "src/graphic/size/percentage";
import {WeekTimes} from "src/model/WeekTimes";
import {TimeDto} from "src/dtos/TimeDto";
import {DateTime} from "src/model/DateTime";


const SelectableComponent = createSelectable(SomeComponent);

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

function match(serverData: WeekTimes, item, todayDayOfWeek: string, yesterdayDayOfWeek) {

  const yesterdayData = serverData.getYesterdayTimesOf(todayDayOfWeek);

  const lastOfYesterdayData = getLastOfYesterdayData(yesterdayData);

  if (item.startTime === '03:00' && exceedsYesterday(lastOfYesterdayData)) {
    return true;
  }


  const todayData = serverData.getTimesOf(todayDayOfWeek);
  for (let i = 0; i < todayData.length; i++) {
    const data = todayData[i];
    // const startTimePieces = data.endDateTime.toISOString().split("T")[1].split(".")[0].split(":");
    const startTime = data.startDateTime.getTime();
    if (item.startTime === startTime) {
      if (todayDayOfWeek === 'SUNDAY') {
        console.log("sunday!!")
        console.log(item.startTime, startTime)
      }
      return true
    }
  }

  return false;

}

function calculateHeightTimes(serverData: WeekTimes, item, todayDayOfWeek, yesterdayDayOfWeek) {

  const yesterdayData = serverData.getYesterdayTimesOf(todayDayOfWeek);
  const lastOfYesterdayData = getLastOfYesterdayData(yesterdayData);

  let itemStartDateTime = new Date();
  itemStartDateTime.setHours(parseInt(item.alias));

  const itemEndDateTime = new Date();
  itemEndDateTime.setHours(parseInt(item.alias) + 1);

  if (lastOfYesterdayData !== undefined && item.startTime === '03:00' && exceedsYesterday(lastOfYesterdayData)) {
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
    if (item.startTime === startTime) {

      const endDate = data.endDateTime.getDate();
      const comparable = new Date(endDate + "T" + "03:00");
      const endDateTime = new Date(data.endDateTime.getDateTime());
      // 일단 끄트머리(2시)에서 끊는거까진 함. 남은걸 다음 요일에 뿌려주는걸 안함.

      if (todayDayOfWeek === 'MONDAY') {
        console.log("here!")
      }

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
    // this.state = {
    //   isShown: false,
    //   selectedKeys: []
    // }
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
                              css={css({
                                flexDirection: "row",
                                display: "flex"
                              })}
        >
          <div>

            {

              this.props.items['SUNDAY'].map((item, i) => {
                let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

                const isMatching = match(this.serverData, item, 'SUNDAY', 'LAST_SATURDAY');

                const heightTimes = calculateHeightTimes(this.serverData, item, 'SUNDAY', 'LAST_SATURDAY');
                if (isMatching) {
                  console.log(heightTimes)
                }

                return (
                  <div>
                    <SelectableComponent
                      selectableKey={item.id}
                      key={item.id}
                      isSelected={selected}
                      isMatching={isMatching}
                      heightTimes={heightTimes}
                    >
                      {item.alias}
                    </SelectableComponent>
                  </div>
                );
              })}
          </div>
          <div>
            {this.props.items['MONDAY'].map((item, i) => {

              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'MONDAY', 'SUNDAY');

              const heightTimes = calculateHeightTimes(this.serverData, item, 'MONDAY', 'SUNDAY');

              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={item.id}
                    isSelected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </div>
          <div>
            {this.props.items['TUESDAY'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'TUESDAY', 'MONDAY');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'TUESDAY', 'MONDAY');

              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={item.id}
                    isSelected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </div>
          <div>
            {this.props.items['WEDNESDAY'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'WEDNESDAY', 'TUESDAY');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'WEDNESDAY', 'TUESDAY');


              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={item.id}
                    isSelected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </div>
          <div>
            {this.props.items['THURSDAY'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'THURSDAY', 'WEDNESDAY');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'THURSDAY', 'WEDNESDAY');


              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={item.id}
                    isSelected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </div>
          <div>
            {this.props.items['FRIDAY'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'FRIDAY', 'THURSDAY');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'FRIDAY', 'THURSDAY');


              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={item.id}
                    isSelected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </div>
          <div>
            {this.props.items['SATURDAY'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'SATURDAY', 'SUNDAY');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'SATURDAY', 'SUNDAY');

              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={item.id}
                    isSelected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </div>
        </ReactSelectableGroup>
        <React.Fragment>
          {this.state.isShown ? (
            <Modal
              onSubmit={e => {
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

function sort(haha: TSelectableItem[]) {
  // @ts-ignore
  return haha.sort((a, b) => {
    // @ts-ignore
    if (a.bounds[0].top < b.bounds[0].top) {
      return -1;
    }
    return 1;
  })
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
