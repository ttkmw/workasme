import React, {
  Component, createRef, ReactNode,
  RefObject, useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

import {createSelectable} from 'react-selectable';

import {TSelectableItem} from "react-selectable-fast/lib/Selectable.types";
import Modal from "src/pages/management/sections/Mordal";
import SomeComponent from "./SomeComponent";
import {number, string} from "prop-types";
import ExampleApp from "src/pages/management/sections/selectable/example/ExampleApp";
import data from "src/pages/management/sections/selectable/example/sample-data";
import ReactSelectableGroup from "src/pages/management/sections/selectable/react-selectable/ReactSelectableGroup";
import {start} from "repl";
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

function match(serverData: {
  MON: { startTime: string; endTime: string; type: string }[];
  TUE: { startTime: string; endTime: string; type: string }[];
  WED: { startTime: string; endTime: string; type: string }[];
  THU: { startTime: string; endTime: string; type: string }[];
  FRI: { startTime: string; endTime: string; type: string }[];
  SAT: { startTime: string; endTime: string; type: string }[];
  SUN: { startTime: string; endTime: string; type: string }[];
}, item, dayOfWeek) {
  const mondayData = serverData[dayOfWeek];


  for (let i = 0; i < mondayData.length; i++) {
    const data = mondayData[i];
    const startTime = data.startTime.split("T")[1];
    if (item.startTime === startTime) {
      console.log("TRUETRUETRUE")
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
}, item, dayOfWeek) {
  const mondayData = serverData[dayOfWeek];

  for (let i = 0; i < mondayData.length; i++) {
    const data = mondayData[i];

    const startDateTime = new Date(data.startTime);
    const startTime = data.startTime.split("T")[1];
    if (item.startTime === startTime) {
      const endDate = data.endTime.split("T")[0];
      const comparable = new Date(endDate + "T" + "03:00");
      const endDateTime = new Date(data.endTime);
      console.log("comparable");
      console.log(comparable.getTime());
      console.log("endDateTime");
      console.log(endDateTime.getTime());
      // 일단 끄트머리(2시)에서 끊는거까진 함. 남은걸 다음 요일에 뿌려주는걸 안함.




      let itemStartDateTime = new Date();
      itemStartDateTime.setHours(parseInt(item.alias));

      const itemEndDateTime = new Date();
      itemEndDateTime.setHours(parseInt(item.alias) + 1);

      if (comparable.getTime() < endDateTime.getTime()) {
        return new Percentage((comparable.getTime() - startDateTime.getTime()) / (itemEndDateTime.getTime() - itemStartDateTime.getTime()) * 100);
      }

      return new Percentage((endDateTime.getTime() - startDateTime.getTime()) / (itemEndDateTime.getTime() - itemStartDateTime.getTime()) * 100);

    }
  }
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
    console.log("componentDidMount")
    console.log(this.state.haha)
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
    console.log("CLEAR ITEMS!!!!!!!!")
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
  closeModal = (e) => {
    this.clearItems(e)
    this.setState({isShown: false});
    this.toggleScrollLock();
  };
  onKeyDown = (event: any) => {
    if (event.keyCode === 27) {
      this.closeModal(event);
    }
  };
  onClickOutside = (event: any) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal(event);
  };

  toggleScrollLock = () => {
    // @ts-ignore
    document.querySelector('html').classList.toggle('scroll-lock');
  };
  private closeButton: any;
  private TriggerButton: any;
  private modal: any;

  private serverData = {
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
        {/*<div>*/}
        {/*  <ul>*/}
        {/*    {this.state.selectedKeys.map((key, i) => {*/}
        {/*      console.log("key^^^^^^^")*/}
        {/*      console.log(key)*/}
        {/*      // return null;*/}

        {/*      let result = this.props.items.find(item => item.id === key);*/}
        {/*      console.log('result!!!!!!!!!!!')*/}
        {/*      console.log(result);*/}
        {/*      return <li key={i}>{result.value}</li>*/}
        {/*    })}*/}
        {/*  </ul>*/}
        {/*</div>*/}
        <div
          css={css({
            flexDirection: "row",
            display: "flex"
          })}
        >
          <ReactSelectableGroup onSelection={this.handleSelection}
                                onEndSelection={this.showModal}
                                className={"selectable"}
                                ref={this.selectableRef}
                                selectOnMouseMove={this.state.selectOnMouseMove}
                                selectingClassName={"selectingSelectable"}>
            {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
            {this.props.items.map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1;

              const isMatching = match(this.serverData, item, 'MON');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'MON');

              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={i}
                    selected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </ReactSelectableGroup>
          <ReactSelectableGroup onSelection={this.handleSelection}
                                onEndSelection={this.showModal}
                                className={"selectable"}
                                ref={this.selectableRef}
                                selectOnMouseMove={this.state.selectOnMouseMove}
                                selectingClassName={"selectingSelectable"}>
            {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
            {this.props.items.map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1;

              const isMatching = match(this.serverData, item, 'TUE');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'TUE');

              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={i}
                    selected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </ReactSelectableGroup>
          <ReactSelectableGroup onSelection={this.handleSelection}
                                onEndSelection={this.showModal}
                                className={"selectable"}
                                ref={this.selectableRef}
                                selectOnMouseMove={this.state.selectOnMouseMove}
                                selectingClassName={"selectingSelectable"}>
            {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
            {this.props.items.map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1;

              const isMatching = match(this.serverData, item, 'WED');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'WED');

              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={i}
                    selected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </ReactSelectableGroup>

          <ReactSelectableGroup onSelection={this.handleSelection}
                                onEndSelection={this.showModal}
                                className={"selectable"}
                                ref={this.selectableRef}
                                selectOnMouseMove={this.state.selectOnMouseMove}
                                selectingClassName={"selectingSelectable"}>
            {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
            {this.props.items.map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1;

              const isMatching = match(this.serverData, item, 'THU');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'THU');


              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={i}
                    selected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </ReactSelectableGroup>
          <ReactSelectableGroup onSelection={this.handleSelection}
                                onEndSelection={this.showModal}
                                className={"selectable"}
                                ref={this.selectableRef}
                                selectOnMouseMove={this.state.selectOnMouseMove}
                                selectingClassName={"selectingSelectable"}>
            {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
            {this.props.items.map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1;

              const isMatching = match(this.serverData, item, 'FRI');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'FRI');


              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={i}
                    selected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </ReactSelectableGroup>
          <ReactSelectableGroup onSelection={this.handleSelection}
                                onEndSelection={this.showModal}
                                className={"selectable"}
                                ref={this.selectableRef}
                                selectOnMouseMove={this.state.selectOnMouseMove}
                                selectingClassName={"selectingSelectable"}>
            {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
            {this.props.items.map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1;

              const isMatching = match(this.serverData, item, 'SAT');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'SAT');


              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={i}
                    selected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </ReactSelectableGroup>
          <ReactSelectableGroup onSelection={this.handleSelection}
                                onEndSelection={this.showModal}
                                className={"selectable"}
                                ref={this.selectableRef}
                                selectOnMouseMove={this.state.selectOnMouseMove}
                                selectingClassName={"selectingSelectable"}>
            {/*여기 for문 돌 때 요일, 날짜, 시간 정보를 다 가지고 있음. 그래서 서버에서 얻은 정보와 match할 수 있음. match 결과에 따라 몇시간짜리인지를 넘겨주면, 그에 따라 차일드가 보임.*/}
            {this.props.items.map((item, i) => {
              let selected = this.state.selectedKeys.indexOf(item.id) > -1;

              const isMatching = match(this.serverData, item, 'SUN');
              const heightTimes = calculateHeightTimes(this.serverData, item, 'SUN');

              return (
                <div>
                  <SelectableComponent
                    selectableKey={item.id}
                    key={i}
                    selected={selected}
                    isMatching={isMatching}
                    heightTimes={heightTimes}
                  >
                    {item.alias}
                  </SelectableComponent>
                </div>
              );
            })}
          </ReactSelectableGroup>
        </div>


        {/*<SelectAll className="selectable-button">*/}
        {/*  <button onClick={this.clearSelectionUsingRef}>Clear Selection using Ref</button>*/}
        {/*</SelectAll>*/}
        {/*<DeselectAll className="selectable-button">*/}
        {/*  <button onClick={() => {*/}
        {/*  }}>Clear selection*/}
        {/*  </button>*/}
        {/*</DeselectAll>*/}


        {/*<div css={css({})}*/}
        {/*     onMouseDown={() => {*/}
        {/*       console.log("mouseDown")*/}
        {/*     }}*/}
        {/*     onMouseMove={() => console.log("kkkkkk")}*/}
        {/*>*/}
        {/*  Selectable*/}
        {/*</div>*/}
        {/*<SelectableGroup*/}
        {/*  className="main"*/}
        {/*  clickClassName="tick"*/}
        {/*  enableDeselect={false}*/}
        {/*  tolerance={0}*/}
        {/*  globalMouse={false}*/}
        {/*  allowClickWithoutSelected={true}*/}
        {/*  // duringSelection={() => {*/}
        {/*  // }}*/}
        {/*  onSelectionClear={() => {*/}
        {/*    console.log("clear!")*/}
        {/*  }}*/}
        {/*  ref={this.selectionRef}*/}
        {/*  onSelectionFinish={(haha: any) => {*/}
        {/*    const sorted = sort(haha);*/}

        {/*    sorted.map((item: TSelectableItem, i: number) => {*/}
        {/*      if (i == 0) {*/}
        {/*        // @ts-ignore*/}
        {/*        item.node.classList.add('first');*/}
        {/*      } else if (i == sorted.length - 1) {*/}
        {/*        // @ts-ignore*/}
        {/*        item.node.classList.add('last');*/}
        {/*      } else {*/}
        {/*        // @ts-ignore*/}
        {/*        item.node.classList.add('middle');*/}
        {/*      }*/}
        {/*    })*/}

        {/*    console.log('finish');*/}
        {/*    this.showModal();*/}
        {/*  }}*/}
        {/*  onSelectedItemUnmount={(event: any) => {*/}
        {/*    event.preventDefault(event);*/}
        {/*    console.log("unmount!")*/}
        {/*  }}*/}
        {/*  ignoreList={[]}*/}
        {/*  resetOnStart={false}*/}
        {/*>*/}
        {/*  {items.map((item, i) => {*/}

        {/*    return (*/}
        {/*      // @ts-ignore*/}
        {/*      <SelectableComponent/>*/}
        {/*    )*/}
        {/*  })}*/}
        {/*</SelectableGroup>*/}

        <React.Fragment>
          {this.state.isShown ? (
            <Modal
              onSubmit={e => {
                this.setState({
                  haha: "kkkkkkkkkkkkk"
                })
              }}
              modalRef={(n: any) => (this.modal = n)}
              buttonRef={(n: any) => (this.closeButton = n)}
              closeModal={this.closeModal}
              onKeyDown={this.onKeyDown}
              onClickOutside={this.onClickOutside}
            />
          ) : null}
        </React.Fragment>

      </div>
    )
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
