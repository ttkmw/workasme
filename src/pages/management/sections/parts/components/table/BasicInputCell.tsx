import React from "react";
import {TimeSnippet} from "src/pages/management/sections/parts/dtos/TimeSnippet";
import { addTime } from "src/context/timeSlice";

const BasicInputCell: React.FC<{ initialValue: any, isUpdating: boolean, timeSnippets: TimeSnippet[]  }> = (props: { initialValue: string, isUpdating: boolean, timeSnippets: TimeSnippet[]}) => {
  const {initialValue, isUpdating, timeSnippets} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(initialValue);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    //여기서 디스패치는 안하고, setState만
    addTime({
      // @ts-ignore
      expectedActivity: inputRef.current.value,
      expectedTime: "Hoho",
      acutualActivity: "Juju",
      actuaTime: "kkkk",
      timeCategory: "ETC"
    })
  };

  const handleOnlyEnterKeyPressed = (e: any) => {
    if (isEnterPressed()) {
      // @ts-ignore
      inputRef.current.blur()
    }




    function isEnterPressed() {
      return e.key === "Enter";
    }
  };

  function isNotUpdating() {
    return !isUpdating;
  }

  return <input onInput={() => { console.log("인풋됨.")}} disabled={isNotUpdating()} value={value} onKeyPress={handleOnlyEnterKeyPressed} onChange={onChange} ref={inputRef}/>
};

export default BasicInputCell;
