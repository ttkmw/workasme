import React, {
  Component, createRef,
  RefObject, useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

import {SelectableGroup, createSelectable} from 'react-selectable';

import {TSelectableItem} from "react-selectable-fast/lib/Selectable.types";
import Modal from "src/pages/management/sections/Mordal";
import SomeComponent from "./SomeComponent";
import {number, string} from "prop-types";
import ExampleApp from "src/pages/management/sections/selectable/example/ExampleApp";
import data from "src/pages/management/sections/selectable/example/sample-data";


const items = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "1", "2"]

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

export class TestSection extends Component<any> {

  // selectionRef = createRef<any>();


  constructor (props) {
    super(props)
    this.selectableRef = React.createRef();
    this.state = {
      isShown: false,
      selectedKeys: [string],
      selectOnMouseMove: false
    };

    this.setSelectedKeys = this.setSelectedKeys.bind(this);
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

  selectableRef;


  componentDidMount () {
    document.addEventListener('click', this.clearItems);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.clearItems);
  }

  setSelectedKeys = (selectedKeys) => {
    console.log("setSelectedKeys")
    console.log(selectedKeys)
    this.state.selectedKeys = selectedKeys;
  }

  clearItems (e) {
    if(!isNodeInRoot(e.target, this.selectableRef)) {
      this.setSelectedKeys([]);
    }
  }

  handleToleranceChange (e) {
    this.setState({
      tolerance: parseInt(e.target.value)
    });
  }

  toggleSelectOnMouseMove () {
    this.setState({
      selectOnMouseMove: !this.state.selectOnMouseMove
    });
  }


  state;

  showModal = () => {
    console.log('showModal');
    this.setState({isShown: true}, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({isShown: false});
    this.toggleScrollLock();
  };
  onKeyDown = (event: any) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = (event: any) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    // @ts-ignore
    document.querySelector('html').classList.toggle('scroll-lock');
  };
  private closeButton: any;
  private TriggerButton: any;
  private modal: any;



  handleSelection (selectedKeys) {
    this.setSelectedKeys(selectedKeys);
  }

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
          backgroundColor: 'blue'
        },
        '.selectingSelectable': {
          backgroundColor: 'yellow'
        }
      })}
      >
        <SelectableGroup onSelection={this.setSelectedKeys}
                         className={"selectable"}
                         ref={this.selectableRef}
                         selectingClassName={"selectingSelectable"}>
          {this.props.items.map((item, i) => {
            console.log("rendering!")
            let selected = this.state.selectedKeys.indexOf(item) > -1;
            console.log("selected?");
            console.log(selected);
            return (
              <SelectableComponent
                selectableKey={i}
                key={i}
                selected={selected}
                >
                {item}
              </SelectableComponent>
            );
          })}
        </SelectableGroup>

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
          {/*<TriggerButton*/}
          {/*  showModal={this.showModal}*/}
          {/*  buttonRef={(n: any) => (this.TriggerButton = n)}*/}
          {/*  triggerText={this.props.triggerText}*/}
          {/*/>*/}
          {this.state.isShown ? (
            <Modal
              onSubmit={this.props.onSubmit}
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
