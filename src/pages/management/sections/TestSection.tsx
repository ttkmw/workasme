import React, {
  Component,
  RefObject, useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Container from "react-bootstrap/Container";
import Selectables from "selectables";
import {createSelectable, DeselectAll, SelectableGroup, SelectAll, TSelectableItemProps} from "react-selectable-fast";
import SelectableComponent from './SomeComponent'

import SelectableSampleComponent from './SampleComponent'
import {unmountComponentAtNode} from "react-dom";
import {TSelectableItem, TSelectableItemState} from "react-selectable-fast/lib/Selectable.types";
import SampleComponent from "./SampleComponent";
import TestPopupContainer from "src/pages/management/sections/TestPopupContainer";
import TriggerButton from "src/pages/management/sections/TriggerButton";
import Modal from "src/pages/management/sections/Mordal";


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
export class TestSection extends Component<any, any> {



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

  // const selectableRefs = useRef([]);
  // useEffect(() => {
  //   selectableRefs.current = selectableRefs.current.slice(0, items.length);
  // }, [items]);

  // selectableRefs.current = items.map(
  //   (ref, index) => selectableRefs.current[index] = React.createRef()
  // )




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
      })}>
        <SelectAll className="selectable-button">
          <button onClick={
            () => {
            }
          }>
            Select all
          </button>
        </SelectAll>
        <DeselectAll className="selectable-button">
          <button onClick={() => {
          }}>Clear selection
          </button>
        </DeselectAll>

        <SelectableGroup
          className="main"
          clickClassName="tick"
          enableDeselect
          tolerance={0}
          globalMouse={false}
          allowClickWithoutSelected={false}
          duringSelection={() => {
          }}
          onSelectionClear={() => {
            console.log("clear!")
          }}
          onSelectionFinish={(haha: any) => {


            const sorted = sort(haha);

            sorted.map((item: TSelectableItem, i: number)=> {
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
            // this.showModal();
          }}
          onSelectedItemUnmount={(event: any) => {
            event.preventDefault(event);
            console.log("unmount!")
          }}
          ignoreList={[]}
          resetOnStart={true}
        >
          {items.map((item, i) => {

            return (
              // @ts-ignore
              <SelectableComponent />
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
