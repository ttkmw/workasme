import React, {Dispatch, SetStateAction, useCallback, useState} from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";
import {TimeCategory, TimeSnippet} from "src/pages/management/sections/parts/dtos/TimeSnippet";
import {Button, ButtonGroup, Container, Dropdown, Table} from "react-bootstrap";
import BasicInputCell from "src/pages/management/sections/parts/components/table/BasicInputCell";
import ButtonComponent from "src/pages/components/ButtonComponent";
import {useDispatch, useSelector} from "react-redux";
import {addTime, selectTime} from "src/context/timeSlice";

// todo: props 따로 빼기
const TimeTrackerPart: React.FC<{ marginVertical: Pixel }> = (props: { marginVertical: Pixel }) => {
  const {marginVertical} = props;

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const timeSnippetsDto: TimeSnippet[] = useSelector(selectTime);
  const [timeSnippets, setTimeSnippets] = useState(timeSnippetsDto);


  return <Container css={css({
    marginTop: marginVertical.value,
    marginBottom: marginVertical.value
  })}>

    <TimeTrackerTable timeSnippets={timeSnippets} isUpdating={isUpdating}/>
    <div css={css({
      display: 'flex',
      flexDirection: "row-reverse"
    })}>
      <TimeTrackerButtons timeSnippets={timeSnippets} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
    </div>
  </Container>
};

const TimeTrackerTable: React.FC<{ timeSnippets: TimeSnippet[], isUpdating: boolean }> = (props: { timeSnippets: TimeSnippet[], isUpdating: boolean } ) => {



  const {timeSnippets, isUpdating} = props;



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
    {timeSnippets.map((row) => {
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
  timeSnippets: TimeSnippet[],
  isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>>
}> =
  (props: { timeSnippets: TimeSnippet[], isUpdating: boolean, setIsUpdating: Dispatch<SetStateAction<boolean>> }) => {
    const {timeSnippets, isUpdating, setIsUpdating} = props;
    if (isUpdating) {
      return <TimeTrackerButtonsWhenUpdating isUpdating={isUpdating} setIsUpdating={setIsUpdating} timeSnippets={timeSnippets}/>
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
  timeSnippets: TimeSnippet[] }> =
  (props: { timeSnippets: TimeSnippet[], isUpdating: boolean, setIsUpdating:  Dispatch<SetStateAction<boolean>>}) => {

    const {timeSnippets, isUpdating, setIsUpdating} = props;
    const dispatch = useDispatch();

    const onAddRowButtonClicked = useCallback(
      () => dispatch(addTime({
        expectedActivity: "Haha",
        expectedTime: "Hoho",
        acutualActivity: "Juju",
        actuaTime: "kkkk",
        timeCategory: TimeCategory.ETC
      })), [dispatch]
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

      <ButtonComponent name={"AddBlankRow"} backgroundColor={Colors.theme.main.work}
                       defaultTextColor={Colors.theme.text.button.default}
                       hoverTextColor={Colors.theme.main.orgasme}
                       width={new Pixel(100)} onClick={onAddRowButtonClicked}>
        Add Blank Row
      </ButtonComponent>

      <ButtonComponent name={"Comnplete"} backgroundColor={Colors.theme.main.work}
                       defaultTextColor={Colors.theme.text.button.default}
                       hoverTextColor={Colors.theme.main.orgasme}
                       width={new Pixel(100)} onClick={onCompleteButtonClicked}>
        Complete
      </ButtonComponent>
    </div>
  };

export default TimeTrackerPart;
