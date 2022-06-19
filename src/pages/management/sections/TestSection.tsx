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
import {DeselectAll, SelectableGroup, SelectAll, TSelectableItemProps} from "react-selectable-fast";
import SelectableComponent from './SomeComponent'

import {TSelectableItem, TSelectableItemState} from "react-selectable-fast/lib/Selectable.types";
import Modal from "src/pages/management/sections/Mordal";
import {VanillaSelectableGroup} from "./selectable";
import {ReactSelectableGroup} from "src/pages/management/sections/selectable";


const Example: React.FC = () => {
  return <div css={css({
    backgroundColor: 'blue',
    width: 200,
    height: 200
  })}>
    aaaa
  </div>
}

const items = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "1", "2"]

function mousedown(e: any) {
  console.log("mouseDown!")
}

export class TestSection extends Component<any, any> {

  selectionRef = createRef<any>();

  componentDidMount() {
  }

  clearSelectionUsingRef = () => {
    if (this.selectionRef) {
      this.selectionRef.current.clearSelection();
    }
  }

  // [top, setTop] = useState<TSelectableItem>();
  // [size, setSize] = useState<number>();

  state = {isShown: false};
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


  triggerText = 'Open form';
  onSubmit = (event: any) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };

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
      })}
           onMouseDown={mousedown}
      >
        <ReactSelectableGroup />

        <SelectAll className="selectable-button">
          <button onClick={this.clearSelectionUsingRef}>Clear Selection using Ref</button>
        </SelectAll>
        <DeselectAll className="selectable-button">
          <button onClick={() => {
          }}>Clear selection
          </button>
        </DeselectAll>


        <div css={css({})}
             onMouseDown={() => {
               console.log("mouseDown")
             }}
             onMouseMove={() => console.log("kkkkkk")}
        >
          Selectable
        </div>

        {/*document.addEventListener('mousemove', _this.updateSelectBox);*/}
        {/*document.addEventListener('touchmove', _this.updateSelectBox);*/}
        {/*document.addEventListener('mouseup', _this.mouseUp);*/}
        {/*document.addEventListener('touchend', _this.mouseUp);*/}
        <SelectableGroup
          className="main"
          clickClassName="tick"
          enableDeselect={false}
          tolerance={0}
          globalMouse={false}
          allowClickWithoutSelected={true}
          // duringSelection={() => {
          // }}
          onSelectionClear={() => {
            console.log("clear!")
          }}
          ref={this.selectionRef}
          onSelectionFinish={(haha: any) => {
            const sorted = sort(haha);

            sorted.map((item: TSelectableItem, i: number) => {
              if (i == 0) {
                // @ts-ignore
                item.node.classList.add('first');
              } else if (i == sorted.length - 1) {
                // @ts-ignore
                item.node.classList.add('last');
              } else {
                // @ts-ignore
                item.node.classList.add('middle');
              }
            })

            console.log('finish');
            this.showModal();
          }}
          onSelectedItemUnmount={(event: any) => {
            event.preventDefault(event);
            console.log("unmount!")
          }}
          ignoreList={[]}
          resetOnStart={false}
        >
          {items.map((item, i) => {

            return (
              // @ts-ignore
              <SelectableComponent/>
            )
          })}
        </SelectableGroup>

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

const List = () => (

  <div>
    <SelectAll className="selectable-button">
      <button>Select all</button>
    </SelectAll>
    <DeselectAll className="selectable-button">
      <button>Clear selection</button>
    </DeselectAll>
    {items.map((item, i) => (

      <SelectableComponent key={i} selectableRef={() => {
      }} isSelected={true} isSelecting={true}/>
    ))}
  </div>
)

export default TestSection;
