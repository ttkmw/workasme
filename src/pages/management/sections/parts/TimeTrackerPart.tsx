import React, {Dispatch, SetStateAction, useCallback, useState} from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";
import {TimeTrackerRowDto} from "src/pages/management/sections/parts/dtos/TimeTrackerRowDto";
import {Button, Table, Toast} from "react-bootstrap";
import {TaskListRowDto} from "src/pages/management/sections/parts/dtos/TaskListRowDto";
import BasicInputCell from "src/pages/management/sections/parts/components/table/BasicInputCell";
import {Container} from "react-bootstrap";
import Percentage from "src/graphic/size/percentage";
import ButtonComponent from "src/pages/components/ButtonComponent";

// todo: props 따로 빼기
const TimeTrackerPart: React.FC<{ marginVertical: Pixel }> = (props: { marginVertical: Pixel }) => {
  const {marginVertical} = props;

  const [isUpdating, setIsUpdating] = useState<boolean>(false);


  const [rows, setRows] = useState<TimeTrackerRowDto[]>([
    {
      expectedActivity: "TimTrakerPart",
      expectedTime: "2 hour",
      acutualActivity: "TimeTrackerPart",
      actuaTime: "3 hour",
      timeCategory: "Intellectual",
    },
    {
      expectedActivity: "pray",
      expectedTime: "2 hour",
      acutualActivity: "pray",
      actuaTime: "3 hour",
      timeCategory: "Mental",
    }
  ]);


  return <Container css={css({
    marginTop: marginVertical.value,
    marginBottom: marginVertical.value
  })}>

    <TimeTrackerTable rows={rows} isUpdating={isUpdating}/>
    <div css={css({
      display: 'flex',
      flexDirection: "row-reverse"
    })}>
      <TimeTrackerButtons rows={rows} setRows={setRows} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
    </div>


  </Container>
};

const TimeTrackerTable: React.FC<{ rows: TimeTrackerRowDto[], isUpdating: boolean }> = (props: { rows: TimeTrackerRowDto[], isUpdating: boolean } ) => {
  const {rows, isUpdating} = props;

  return <Table>
    <thead>
    <tr>
      <th>ExpectedTime</th>
      <th>ExpectedPeriiod</th>
      <th>AcutualTime</th>
      <th>ActualPeriod</th>
      <th>Time Category</th>
    </tr>
    </thead>
    <tbody>
    {rows.map((row) => {
      return <tr>
        <td><BasicInputCell initialValue={row.expectedActivity} isUpdating={isUpdating}/></td>
        <td><BasicInputCell initialValue={row.expectedTime} isUpdating={isUpdating}/></td>
        <td><BasicInputCell initialValue={row.acutualActivity} isUpdating={isUpdating}/></td>
        <td><BasicInputCell initialValue={row.actuaTime} isUpdating={isUpdating}/></td>
        <td><BasicInputCell initialValue={row.timeCategory} isUpdating={isUpdating}/></td>
      </tr>
    })}
    </tbody>
  </Table>
};

const TimeTrackerButtons: React.FC<{
  rows: TimeTrackerRowDto[], setRows: Dispatch<SetStateAction<TimeTrackerRowDto[]>>,
  isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>>
}> =
  (props: { rows: TimeTrackerRowDto[], setRows: Dispatch<SetStateAction<TimeTrackerRowDto[]>>, isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>> }) => {
    const {rows, setRows, isUpdating, setIsUpdating} = props;
    if (isUpdating) {
      return <TimeTrackerButtonsWhenUpdating isUpdating={isUpdating} setIsUpdating={setIsUpdating} rows={rows} setRows={setRows}/>
    }

    return <TimeTrackerButtonsWhenNotUpdating isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
  };



const TimeTrackerButtonsWhenNotUpdating: React.FC<{isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>}> = (
  props: { isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>}
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

const TimeTrackerButtonsWhenUpdating: React.FC<{ isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>,
  rows: TimeTrackerRowDto[], setRows: Dispatch<SetStateAction<TimeTrackerRowDto[]>> }> =
  (props: { rows: TimeTrackerRowDto[], setRows: Dispatch<SetStateAction<TimeTrackerRowDto[]>>, isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>}) => {

    const {rows, setRows, isUpdating, setIsUpdating} = props;

    const onAddRowButtonClicked = useCallback(
      () => {
        setRows(rows.concat({
          expectedActivity: "", expectedTime: "", acutualActivity: "", actuaTime: "", timeCategory: ""
        }))
      }, [rows, setRows]
    );

    const onCompleteButtonClicked = useCallback(
      () => {
        setIsUpdating(false)
      }, [setIsUpdating]
    );


    return <div
      css={css({
        width: 220,
        display: "flex",
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

export default TimeTrackerPart;
