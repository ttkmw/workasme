import React, {Component} from "react";
import {createSelectable, TSelectableItemProps} from "react-selectable-fast";

class SomeComponent extends Component<TSelectableItemProps> {
  render() {
    const { selectableRef, isSelected, isSelecting } = this.props


    return <div ref={selectableRef}>haha</div>;
  }
}

export default createSelectable(SomeComponent);
