import React, {Dispatch, KeyboardEventHandler, MutableRefObject, SetStateAction, useCallback, useState} from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {Button, Dropdown, Table} from "react-bootstrap";
import {TaskListRowDto} from "src/pages/management/sections/parts/dtos/TaskListRowDto";

const TaskListPart: React.FC<{ marginVertical: Pixel }> = (props: { marginVertical: Pixel }) => {
  const {marginVertical} = props;
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const onClick: () => void = () => {
  };
  const [rows, setRows] = useState<TaskListRowDto[]>([
    {
      name: "task1",
      importanceLevel: "HIGH",
      stuckOn: "BOTTLENeck1",
      checkPriority: "checkit",
      onClick: onClick
    },
    {
      name: "task2",
      importanceLevel: "MIDDLE",
      stuckOn: "BOTTLENeck2",
      checkPriority: "checkit",
      onClick: onClick
    }
  ]);


  return <div css={css({
    marginTop: marginVertical.value,
    marginBottom: marginVertical.value
  })}>

    {/* TODO: 서버랑 연동할 때 JSon 신경써야 할듯. */}

    <TaskTable rows={rows} isUpdating={isUpdating}/>

    {/*is Updating*/}
    <TaskButtons rows={rows} setRows={setRows} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
  </div>
};

const TaskButtons: React.FC<{
  rows: TaskListRowDto[], setRows: Dispatch<SetStateAction<TaskListRowDto[]>>,
  isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>>
}> =
  (props: { rows: TaskListRowDto[], setRows: Dispatch<SetStateAction<TaskListRowDto[]>>, isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>> }) => {
    const {rows, setRows, isUpdating, setIsUpdating} = props;

    if (isUpdating) {
      return <TaskButtonsWhenUpdating isUpdating={isUpdating} setIsUpdating={setIsUpdating} rows={rows} setRows={setRows}/>
    }

    return <TaskButtonsWhenNotUpdating isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
  };


const TaskButtonsWhenNotUpdating: React.FC<{isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>}> = (
  props: { isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>}
) => {
  const {isUpdating, setIsUpdating} = props;

  const onUpdateButtonClicked = useCallback(
    () => {
      setIsUpdating(true)
    }, [isUpdating]
  );

  return <div css={css({
    display: 'flex',
    flexDirection: "row-reverse"
  })}>

    <Button
      onClick={onUpdateButtonClicked}
    >
      Update
    </Button>

  </div>
};

const TaskButtonsWhenUpdating: React.FC<{ isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>,
  rows: TaskListRowDto[], setRows: Dispatch<SetStateAction<TaskListRowDto[]>> }> =
  (props: { rows: TaskListRowDto[], setRows: Dispatch<SetStateAction<TaskListRowDto[]>>, isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>}) => {

  const {rows, setRows, isUpdating, setIsUpdating} = props;

  const onAddRowButtonClicked = useCallback(
    () => {
      setRows(rows.concat({
        checkPriority: "", importanceLevel: "", name: "", onClick: function () {
        }, stuckOn: ""
      }))
    }, [rows]
  );

    const onCompleteButtonClicked = useCallback(
      () => {
        setIsUpdating(false)
      }, [isUpdating]
    );


    return <div
    css={css({
      display: 'flex',
      flexDirection: "row-reverse"
    })}
  >
    <Button
      onClick={onCompleteButtonClicked}
      css={css({
        marginLeft: '10px'
      })}
    >
      Complete
    </Button>
    <Button
      onClick={onAddRowButtonClicked}
    >
      Add Row
    </Button>
  </div>
};

const TaskTable: React.FC<{ rows: TaskListRowDto[], isUpdating: boolean }> = (props: { rows: TaskListRowDto[], isUpdating: boolean }) => {
  const {rows, isUpdating} = props;

  const Cell: React.FC<{ initialValue: string }> = (props: { initialValue: string }) => {
    const {initialValue} = props;
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


  return <Table striped bordered hover>
    <thead>
    <tr>
      <th>Task Name</th>
      <th>Importance Level</th>
      <th>BottleNeck</th>
      <th>Check Priority</th>
    </tr>
    </thead>
    <tbody>
    {rows.map((row) => {
      return <tr>
        <td onClick={row.onClick}><Cell initialValue={row.name}/></td>
        <td onClick={row.onClick}><Cell initialValue={row.importanceLevel}/></td>
        <td onClick={row.onClick}><Cell initialValue={row.stuckOn}/></td>
        <td onClick={row.onClick}><Cell initialValue={row.checkPriority}/></td>
      </tr>
    })}
    </tbody>
  </Table>
};

export default TaskListPart;
