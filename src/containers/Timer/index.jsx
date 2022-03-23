import React, { useEffect, useState } from "react";
import "./timer.css";
import "../../App.css";
import { DataStore } from "aws-amplify";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { TimeEntry, AllWorkSpaces } from "../../models";
import { onError } from "../../services/errorLib";
import { useAppContext } from "../../services/contextLib";
import Recorder from "./timerComponents/timeTrackerRecorder";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { AppContext } from "../../services/contextLib";

const Timer = () => {
  const [timeList, setTimeList] = useState([]);
  const [workList, setWorkList] = useState([]);
  const { isAuthenticated, selectedOption } = useAppContext();

  const deleteItem = async (id) => {
    try {
      const itemToDelete = await DataStore.query(TimeEntry, id);
      await DataStore.delete(itemToDelete);
      loadTimeList();
      alert("Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const loadTimeList = async () => {
    if (isAuthenticated) {
      try {
        const databaseTimeList = await DataStore.query(TimeEntry);

        setTimeList(databaseTimeList);
      } catch (error) {
        onError(error);
      }
    }
  };

  useEffect(() => {
    loadTimeList();
  }, [isAuthenticated]);

  useEffect(() => {
    const loadWorkList = async () => {
      if (isAuthenticated) {
        try {
          const databaseWorkList = await DataStore.query(AllWorkSpaces);

          setWorkList(databaseWorkList);
        } catch (error) {
          onError(error);
        }
      }
    };
    loadWorkList();
  }, [isAuthenticated]);

  const lockTimeEntry = async (d) => {
    try {
      await DataStore.save(
        TimeEntry.copyOf(d, (updated) => {
          updated.isLocked = true;
        })
      );
      loadTimeList();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Container fluid>
      <Row md={1} xs={1}>
        <Col>
          <AppContext.Provider value={{ loadTimeList, selectedOption }}>
            <Recorder />
          </AppContext.Provider>
        </Col>
        <Col>
          {timeList != null && (
            <ListGroup>
              {timeList
                .sort((date1, date2) => date1.createdAt - date2.createdAt)
                .map((data, key) => {
                  if (selectedOption === null) return;
                  if (data.isActive) return;
                  if (data.workspaceId !== selectedOption.id) return;
                  const total = new Date(
                    Date.parse(data.timeInterval.end) -
                      Date.parse(data.timeInterval.start)
                  );
                  return (
                    <ListGroup.Item className="card" key={key}>
                      <Row md={1}>
                        <Col>
                          {new Date(data.timeInterval.start).toDateString()}
                        </Col>
                        <Col>
                          <Row>
                            <Col>Description</Col>
                            <Col>Send</Col>
                            <Col>
                              {data.billable !== "" ? (
                                <p>Paid</p>
                              ) : (
                                <p>Unpaid</p>
                              )}
                            </Col>
                            <Col>
                              {workList.length !== 0 &&
                              data.workspaceId !== null ? (
                                <p>{data.workspaceId.name}</p>
                              ) : (
                                <p>Without work</p>
                              )}
                            </Col>
                            <Col>
                              <Row xs={3}>
                                <Col>
                                  {new Date(data.timeInterval.start).getHours()}
                                  :
                                  {new Date(
                                    data.timeInterval.start
                                  ).getMinutes()}
                                </Col>
                                <Col>-</Col>
                                <Col>
                                  {new Date(data.timeInterval.end).getHours()}:
                                  {new Date(data.timeInterval.end).getMinutes()}
                                </Col>
                              </Row>
                            </Col>

                            <Col>
                              {total.getUTCHours()}:
                              {String("0" + total.getUTCMinutes()).slice(-2)}:
                              {String("0" + total.getUTCSeconds()).slice(-2)}
                            </Col>
                            <Col
                              onClick={() => {
                                deleteItem(data.id);
                              }}
                            >
                              <DeleteIcon />
                            </Col>
                            <Col>
                              {data.isLocked !== true ? (
                                <CheckCircleOutlinedIcon
                                  onClick={() => lockTimeEntry(data)}
                                />
                              ) : (
                                <CheckCircleRoundedIcon
                                  color="primary"
                                />
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Timer;
