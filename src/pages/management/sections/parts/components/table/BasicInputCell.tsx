import React from "react";

const BasicInputCell: React.FC<{ initialValue: string, isUpdating: boolean  }> = (props: { initialValue: string, isUpdating: boolean  }) => {
  const {initialValue, isUpdating} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
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

  return <input disabled={isNotUpdating()} value={value} onKeyPress={handleOnlyEnterKeyPressed} onChange={onChange} ref={inputRef}/>
};

export default BasicInputCell;
