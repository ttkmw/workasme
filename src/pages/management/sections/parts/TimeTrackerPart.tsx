import React, {Dispatch, SetStateAction, useCallback, useState} from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";
import {Button, ButtonGroup, Col, Container, Dropdown, Form, Row, Table} from "react-bootstrap";
import BasicInputCell from "src/pages/management/sections/parts/components/table/BasicInputCell";
import ButtonComponent from "src/pages/components/ButtonComponent";
import {useDispatch, useSelector} from "react-redux";
import {addTime, selectTime} from "src/context/timeSlice";
import TitleComponent from "src/pages/management/sections/parts/components/TitleComponent";
import Percentage from "src/graphic/size/percentage";
import {TimeSnippet} from "src/dtos/TimeSnippet";

// todo: props 따로 빼기
const TimeTrackerPart: React.FC<{ marginVertical: Pixel }> = (props: { marginVertical: Pixel }) => {
  const {marginVertical} = props;

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const timeSnippets: TimeSnippet[] = useSelector(selectTime);

  return <Container css={css({
    marginTop: marginVertical.value,
    marginBottom: marginVertical.value
  })}>
    <TitleComponent cssObj={{
      marginBottom: new Pixel(20).value
    }}>
      <h2>
        Time Track
      </h2>
    </TitleComponent>
    <TimeTrackerForm />
    <TimeTrackerTable timeSnippets={timeSnippets} isUpdating={isUpdating}/>
  {/*  타임트래커 버튼을 아예 없애버*/}
  </Container>
};

const TimeTrackerForm: React.FC = () => {
  const [expectedActivity, setExpectedActivity] = useState("");
  const [expectedTime, setExpectedTime] = useState("");
  const [actualActivity, setActualActivity] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [timeCategory, setTimeCategory] = useState("");

  const timeSnippets: TimeSnippet[] = useSelector(selectTime);

  const dispatch = useDispatch();


  return <div css={css({
    marginBottom: new Pixel(30).value,
  })}>
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="formExpectedActivity">
            <Form.Label>ExpectedActivity</Form.Label>
            <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setExpectedActivity(e.target.value)}}
                          type="text" />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="formExpectedTime">
            <Form.Label>ExpectedTime</Form.Label>
            <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setExpectedTime(e.target.value)}} type="text" />
            <Form.Text className="text-muted">
              You have to write Number(Hour)
            </Form.Text>
          </Form.Group>

        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="formActualActivity">
            <Form.Label>ActualActivity</Form.Label>
            <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setActualActivity(e.target.value)}}
                          type="text" />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="formActualTime">
            <Form.Label>ActualTime</Form.Label>
            <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setActualTime(e.target.value)}} type="text" />
            <Form.Text className="text-muted">
              You have to write Number(Hour)
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row css={css({
        marginBottom: new Pixel(10).value
      })}>
        <Col>
          <Form.Label>Time Category</Form.Label>
          <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTimeCategory(e.target.value)}} as="select" multiple>
            <option>Intellectual</option>
            <option>Physical</option>
            <option>Mental</option>
            <option>ETC</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col css={css({
          display: 'flex',
          flexDirection: "row-reverse"
        })}>
          <ButtonComponent
            name={"join"}
            backgroundColor={Colors.theme.main.work}
            defaultTextColor={Colors.theme.text.button.default}
            hoverTextColor={Colors.theme.main.orgasme}
            width={new Pixel(100)}
            onClick={() => dispatch(addTime({
              expectedActivity: expectedActivity,
              expectedTime: expectedTime,
              actualActivity: actualActivity,
              actualTime: actualTime,
              timeCategory: timeCategory
            }))}
          >
            Register
          </ButtonComponent>
        </Col>
      </Row>
    </Form>
  </div>
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
        <td><BasicInputCell initialValue={row.expectedActivity} isUpdating={isUpdating} timeSnippets={timeSnippets}/></td>
        <td><BasicInputCell initialValue={row.expectedTime} isUpdating={isUpdating} timeSnippets={timeSnippets}/></td>
        <td><BasicInputCell initialValue={row.actualActivity} isUpdating={isUpdating} timeSnippets={timeSnippets}/></td>
        <td><BasicInputCell initialValue={row.actualTime} isUpdating={isUpdating} timeSnippets={timeSnippets}/></td>
        <td><BasicInputCell initialValue={row.timeCategory} isUpdating={isUpdating} timeSnippets={timeSnippets}/></td>
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
      () => addTime({
        expectedActivity: "Haha",
        expectedTime: "Hoho",
        acutualActivity: "Juju",
        actuaTime: "kkkk",
        timeCategory: ""
      }), [dispatch]
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
