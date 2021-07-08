import React, {Dispatch, KeyboardEventHandler, MutableRefObject, SetStateAction, useCallback, useState} from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {Button, Dropdown, Table} from "react-bootstrap";
import {TaskListRowDto} from "src/pages/management/sections/parts/dtos/TaskListRowDto";
import BasicInputCell from "src/pages/management/sections/parts/components/table/BasicInputCell";
import Colors from "src/constants/Colors";
import ButtonComponent from "src/pages/components/ButtonComponent";

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

    <PartTitle marginBottom={new Pixel(20)}/>
    <TaskTable rows={rows} isUpdating={isUpdating}/>

    <div css={css({
      display: 'flex',
      flexDirection: "row-reverse"
    })}>
      <TaskButtons rows={rows} setRows={setRows} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
    </div>

  </div>
};

const PartTitle: React.FC<{ marginBottom: Pixel }> = (props: { marginBottom: Pixel }) => {
  const {marginBottom} = props;
  return <div css={css({
    marginBottom: marginBottom.value
  })}>
    <h2>
      Task List
    </h2>
  </div>
};

const TaskButtons: React.FC<{
  rows: TaskListRowDto[], setRows: Dispatch<SetStateAction<TaskListRowDto[]>>,
  isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>>
}> =
  (props: { rows: TaskListRowDto[], setRows: Dispatch<SetStateAction<TaskListRowDto[]>>, isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>> }) => {
    const {rows, setRows, isUpdating, setIsUpdating} = props;

    if (isUpdating) {
      return <TaskButtonsWhenUpdating isUpdating={isUpdating} setIsUpdating={setIsUpdating} rows={rows}
                                      setRows={setRows}/>
    }

    return <TaskButtonsWhenNotUpdating isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
  };


const TaskButtonsWhenNotUpdating: React.FC<{ isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>> }> = (
  props: { isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>> }
) => {
  const {isUpdating, setIsUpdating} = props;

  const onUpdateButtonClicked = useCallback(
    () => {
      setIsUpdating(true)
    }, [setIsUpdating]
  );

  return <div css={css({
    display: 'flex',
    flexDirection: "row-reverse"
  })}>

    <ButtonComponent name={"Update"} backgroundColor={Colors.theme.main.work}
                     defaultTextColor={Colors.theme.text.button.default}
                     hoverTextColor={Colors.theme.main.orgasme}
                     width={new Pixel(100)} onClick={onUpdateButtonClicked}>
      Update
    </ButtonComponent>

  </div>
};

const TaskButtonsWhenUpdating: React.FC<{
  isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>>,
  rows: TaskListRowDto[], setRows: Dispatch<SetStateAction<TaskListRowDto[]>>
}> =
  (props: { rows: TaskListRowDto[], setRows: Dispatch<SetStateAction<TaskListRowDto[]>>, isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>> }) => {

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
        width: 220,
        display: 'flex',
        justifyContent: "space-between",
      })}
    >

      <ButtonComponent name={"Update"} backgroundColor={Colors.theme.main.work}
                       defaultTextColor={Colors.theme.text.button.default}
                       hoverTextColor={Colors.theme.main.orgasme}
                       width={new Pixel(100)} onClick={onAddRowButtonClicked}>
        Add Row
      </ButtonComponent>

      <ButtonComponent name={"Update"} backgroundColor={Colors.theme.main.work}
                       defaultTextColor={Colors.theme.text.button.default}
                       hoverTextColor={Colors.theme.main.orgasme}
                       width={new Pixel(100)} onClick={onCompleteButtonClicked}>
        Complete
      </ButtonComponent>
    </div>
  };

const TaskTable: React.FC<{ rows: TaskListRowDto[], isUpdating: boolean }> = (props: { rows: TaskListRowDto[], isUpdating: boolean }) => {
  const {rows, isUpdating} = props;


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
        <td onClick={row.onClick}><BasicInputCell isUpdating={isUpdating} initialValue={row.name}/></td>
        <td onClick={row.onClick}><BasicInputCell isUpdating={isUpdating} initialValue={row.importanceLevel}/></td>
        <td onClick={row.onClick}><BasicInputCell isUpdating={isUpdating} initialValue={row.stuckOn}/></td>
        <td onClick={row.onClick}><BasicInputCell isUpdating={isUpdating} initialValue={row.checkPriority}/></td>
      </tr>
    })}
    </tbody>
  </Table>
};

export default TaskListPart;
