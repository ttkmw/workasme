import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css} from "@emotion/react";

import {createSelectable} from 'react-selectable';

import {TSelectableItem} from "react-selectable-fast/lib/Selectable.types";
import Modal from "src/pages/management/sections/Mordal";
import SomeComponent from "./SomeComponent";
import ReactSelectableGroup from "src/pages/management/sections/selectable/react-selectable/ReactSelectableGroup";
import Percentage from "src/graphic/size/percentage";


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

function exceedsYesterday(lastOfYesterdayData: { startTime: string; endTime: string; type: string } | undefined) {
  if (lastOfYesterdayData === undefined) {
    return false;
  }


  const yesterdayDate = lastOfYesterdayData.endTime.split("T")[0];
  const comparable = new Date(yesterdayDate + "T" + "02:00");
  const endDateTime = new Date(lastOfYesterdayData.endTime);
  return comparable.getTime() < endDateTime.getTime();
}

function getLastOfYesterdayData(yesterdayData: { startTime: string; endTime: string; type: string }[]) {
  return yesterdayData[yesterdayData.length - 1];
}

function match(serverData: {
  EX_SUN: { startTime: string; endTime: string; type: string }[];
  MON: { startTime: string; endTime: string; type: string }[];
  TUE: { startTime: string; endTime: string; type: string }[];
  WED: { startTime: string; endTime: string; type: string }[];
  THU: { startTime: string; endTime: string; type: string }[];
  FRI: { startTime: string; endTime: string; type: string }[];
  SAT: { startTime: string; endTime: string; type: string }[];
  SUN: { startTime: string; endTime: string; type: string }[];
}, item, todayDayOfWeek, yesterdayDayOfWeek) {

  const yesterdayData = serverData[yesterdayDayOfWeek];

  const lastOfYesterdayData = getLastOfYesterdayData(yesterdayData);

  if (item.startTime === '03:00' && exceedsYesterday(lastOfYesterdayData)) {
    return true;
  }

  {
    "week": {
    "MONDAY":[],
      "TUESDAY": []
  },
    "lastDayOfLasyWeek": {

  }
  }


  const todayData = serverData[todayDayOfWeek];
  for (let i = 0; i < todayData.length; i++) {
    const data = todayData[i];
    const startTime = data.startTime.split("T")[1];
    if (item.startTime === startTime) {
      return true
    }
  }

  return false;

}

function calculateHeightTimes(serverData: {
  MON: { startTime: string; endTime: string; type: string }[];
  TUE: { startTime: string; endTime: string; type: string }[];
  WED: { startTime: string; endTime: string; type: string }[];
  THU: { startTime: string; endTime: string; type: string }[];
  FRI: { startTime: string; endTime: string; type: string }[];
  SAT: { startTime: string; endTime: string; type: string }[];
  SUN: { startTime: string; endTime: string; type: string }[];
}, item, todayDayOfWeek, yesterdayDayOfWeek) {

  const yesterdayData = serverData[yesterdayDayOfWeek];
  const lastOfYesterdayData = getLastOfYesterdayData(yesterdayData);

  let itemStartDateTime = new Date();
  itemStartDateTime.setHours(parseInt(item.alias));

  const itemEndDateTime = new Date();
  itemEndDateTime.setHours(parseInt(item.alias) + 1);

  if (lastOfYesterdayData !== undefined && item.startTime === '03:00' && exceedsYesterday(lastOfYesterdayData)) {
    const endDate = lastOfYesterdayData.endTime.split("T")[0];
    const comparable = new Date(endDate + "T" + "03:00");
    const endDateTime = new Date(lastOfYesterdayData.endTime);
    return new Percentage((endDateTime.getTime() - comparable.getTime()) / (itemEndDateTime.getTime() - itemStartDateTime.getTime()) * 100);
  }

  const todayData = serverData[todayDayOfWeek];

  for (let i = 0; i < todayData.length; i++) {
    const data = todayData[i];

    const startDateTime = new Date(data.startTime);
    const startTime = data.startTime.split("T")[1];
    if (item.startTime === startTime) {
      const endDate = data.endTime.split("T")[0];
      const comparable = new Date(endDate + "T" + "03:00");
      const endDateTime = new Date(data.endTime);
      // 일단 끄트머리(2시)에서 끊는거까진 함. 남은걸 다음 요일에 뿌려주는걸 안함.


      if (comparable.getTime() < endDateTime.getTime()) {
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
      if (smallest === undefined || selectedKey < smallest ) {
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

  // selectionRef = createRef<any>();


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

  private serverData = {
    "EX_SUN": [],
    "MON": [
      // {
      //   startTime: "2022-07-11T10:00",
      //   endTime: "2022-07-11T12:00",
      //   type: "FREE"
      // },
      // {
      //   startTime: "2022-07-11T23:00",
      //   endTime: "2022-07-12T01:00",
      //   type: "FREE"
      // }
    ],
    "TUE": [
      {
        startTime: "2022-07-12T01:00",
        endTime: "2022-07-12T04:00",
        type: "FREE"
      },
      // {
      //   startTime: "2022-07-12T10:00",
      //   endTime: "2022-07-12T12:00",
      //   type: "FREE"
      // },
      // {
      //   startTime: "2022-07-12T23:00",
      //   endTime: "2022-07-13T01:00",
      //   type: "FREE"
      // }
    ],
    "WED": [
      {
        startTime: "2022-07-13T01:00",
        endTime: "2022-07-13T04:00",
        type: "FREE"
      },
      // {
      //   startTime: "2022-07-13T10:00",
      //   endTime: "2022-07-13T12:00",
      //   type: "FREE"
      // },
      // {
      //   startTime: "2022-07-13T23:00",
      //   endTime: "2022-07-14T01:00",
      //   type: "FREE"
      // }
    ],
    "THU": [
      {
        startTime: "2022-07-14T01:00",
        endTime: "2022-07-14T04:00",
        type: "FREE"
      },
      // {
      //   startTime: "2022-07-14T10:00",
      //   endTime: "2022-07-14T12:00",
      //   type: "FREE"
      // },
      // {
      //   startTime: "2022-07-14T23:00",
      //   endTime: "2022-07-15T01:00",
      //   type: "FREE"
      // }
    ],
    "FRI": [
      {
        startTime: "2022-07-15T01:00",
        endTime: "2022-07-15T04:00",
        type: "FREE"
      },
      // {
      //   startTime: "2022-07-15T10:00",
      //   endTime: "2022-07-15T12:00",
      //   type: "FREE"
      // },
      // {
      //   startTime: "2022-07-15T23:00",
      //   endTime: "2022-07-16T01:00",
      //   type: "FREE"
      // }
    ],
    "SAT": [
      {
        startTime: "2022-07-16T01:00",
        endTime: "2022-07-16T04:00",
        type: "FREE"
      },
      // {
      //   startTime: "2022-07-16T10:00",
      //   endTime: "2022-07-16T12:00",
      //   type: "FREE"
      // },
      // {
      //   startTime: "2022-07-16T23:00",
      //   endTime: "2022-07-17T01:00",
      //   type: "FREE"
      // }
    ],
    "SUN": [
      {
        startTime: "2022-07-17T01:00",
        endTime: "2022-07-17T04:00",
        type: "FREE"
      },
      // {
      //   startTime: "2022-07-17T10:00",
      //   endTime: "2022-07-17T12:00",
      //   type: "FREE"
      // },
      // {
      //   startTime: "2022-07-17T23:00",
      //   endTime: "2022-07-18T01:00",
      //   type: "FREE"
      // }
    ],
  };

  render() {
    return (
      // <ExampleApp items={data}/>
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
          {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
          <div>

            {

              this.props.items['MON'].map((item, i) => {
                let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

                const isMatching = match(this.serverData, item, 'MON', 'EX_SUN');

                const heightTimes = calculateHeightTimes(this.serverData, item, 'MON', 'EX_SUN');

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
          {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
          <div>
            {this.props.items['TUE'].map((item, i) => {

              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'TUE', 'MON');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'TUE', 'MON');

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
          {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
          <div>
            {this.props.items['WED'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'WED', 'TUE');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'WED', 'TUE');

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
          {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
          <div>
            {this.props.items['THU'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'THU', 'WED');

              const heightTimes = calculateHeightTimes(this.serverData, item, 'THU', 'WED');


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
          {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
          <div>
            {this.props.items['FRI'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'FRI', 'THU');

              const heightTimes = calculateHeightTimes(this.serverData, item, 'FRI', 'THU');


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
          {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
          <div>
            {this.props.items['SAT'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'SAT', 'FRI');

              const heightTimes = calculateHeightTimes(this.serverData, item, 'SAT', 'FRI');


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
          {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
          <div>
            {this.props.items['SUN'].map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1 || isIdInSelectedKeys(item.id, this.state.selectedKeys);

              const isMatching = match(this.serverData, item, 'SUN', 'SAT');

              const heightTimes = calculateHeightTimes(this.serverData, item, 'SUN', 'SAT');

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
                console.log("allSelectedKeys")

                    let firstField = e.currentTarget[0];
                    assertIsFormFieldElement(firstField);
                    console.log(firstField.value);
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
