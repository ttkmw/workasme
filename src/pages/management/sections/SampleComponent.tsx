import React, {forwardRef, ReactNode, useImperativeHandle, useState} from "react";
import {css} from "@emotion/react";
import {createSelectable, TSelectableItemProps} from "react-selectable-fast";


const SampleComponent = forwardRef((props:TSelectableItemProps, ref) => {

  const [child, setChild] = useState<ReactNode>(null);

  const {selectableRef, isSelected, isSelecting} = props;

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(isSelected);
  console.log(isSelecting);

  useImperativeHandle(ref, () => ({

    getAlert() {
      console.log("getAlert!!!!!")

      setChild(
        <div css={css({
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.7,
          background: "orange",
          zIndex: 9,
          margin: "10px"
        })}>
          hoho
        </div>
      )
    }
  }));

  return <div css={css({
    width: "100px",
    height: "100px",
    backgroundColor: 'red'
  })} ref={selectableRef}>
    <div css={css({
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0.7,
      background: "red"
    })}>
      haha
    </div>
    {
      child === null ? null :
        child
    }
  </div>
})

export default createSelectable(SampleComponent);
