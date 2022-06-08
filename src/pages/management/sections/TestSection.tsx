import React, {Component} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Container from "react-bootstrap/Container";
import Selectables from "selectables";
import {createSelectable, DeselectAll, SelectableGroup, SelectAll, TSelectableItemProps} from "react-selectable-fast";
import SelectableComponent from './SomeComponent'


const TestSection: React.FC = () => {

  return <SelectableGroup
    className="main"
    clickClassName="tick"
    enableDeselect
    tolerance={0}
    globalMouse={false}
    allowClickWithoutSelected={false}
    duringSelection={() => {console.log("selecting")}}
    onSelectionClear={() => {console.log("cleared")}}
    onSelectionFinish={() => {console.log("finished")}}
    onSelectedItemUnmount={() => {console.log("unmount")}}
    ignoreList={[]}
  >
    <List />
  </SelectableGroup>
}


const items = [
  {
    "player": "son",
    "year": "1992"
  },
  {
    "player": "lim",
    "year": "1991"
  }
];

const List = () => (

  <div>
    <SelectAll className="selectable-button">
      <button>Select all</button>
    </SelectAll>
    <DeselectAll className="selectable-button">
      <button>Clear selection</button>
    </DeselectAll>
    {items.map((item, i) => (

      <SelectableComponent key={i} isSelected={true} isSelecting={true} selectableRef={(node => {})}  />
    ))}
  </div>
)

export default TestSection;
