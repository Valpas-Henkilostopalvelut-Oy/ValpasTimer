import React, { useEffect, useState } from "react";
import "./timer.css";
import { DataStore, Auth } from "aws-amplify";
import { ListGroup, Button } from "react-bootstrap";
import { TimeEntry, UserCredentials, AllWorkSpaces } from "../../models";
import { onError } from "../../services/errorLib";
import { useAppContext } from "../../services/contextLib";
import Recorder from "./timerComponents/timeTrackerRecorder";

const Home = () => {
  const [timeList, setTimeList] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [descriptionList, setDescriptionList] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [timer, setTimer] = useState(1);

  const updateDescription = (id, newDescription) => {};

  useEffect(() => {
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
    loadTimeList();
  }, []);

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
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log("Ref");
    }, 1000);
  }, []);

  return (
    <div className="Home">
      <Recorder />
      {timeList != null && (
        <ListGroup>
          {timeList
            .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
            .map((data, i) => {
              const total = new Date(
                Date.parse(data.timeInterval.end) -
                  Date.parse(data.timeInterval.start)
              );
              return (
                <ListGroup.Item className="card">
                  <div className="cardDateTotal">
                    <div className="cardDate">
                      <p>{new Date(data.timeInterval.start).toDateString()}</p>
                    </div>

                    <div className="cardTotal">
                      <p>
                        {total.getUTCHours()}:
                        {String("0" + total.getUTCMinutes()).slice(-2)}:
                        {String("0" + total.getUTCSeconds()).slice(-2)}
                      </p>
                    </div>
                  </div>

                  <div className="cardTrackerEntry">
                    <p className="cardDescription">{data.description}</p>

                    <div className="cardWorkStatus">
                      {workList.length !== 0 && data.workspaceId !== null ? (
                        <p>
                          {workList.find((w) => w.id === data.workspaceId).name}
                        </p>
                      ) : (
                        <p>Without work</p>
                      )}
                    </div>

                    <div className="cardTimeBillable">
                      <div className="timeEndStart">
                        <p className="timeStart">
                          {new Date(data.timeInterval.start).getUTCHours()}:
                          {new Date(data.timeInterval.start).getUTCMinutes()}
                        </p>
                        <p>-</p>
                        <p className="timeEnd">
                          {new Date(data.timeInterval.end).getUTCHours()}:
                          {new Date(data.timeInterval.end).getUTCMinutes()}
                        </p>
                      </div>

                      <div>
                        {data.billable != "" ? <p>Paid</p> : <p>Unpaid</p>}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      )}
    </div>
  );
};

export default Home;
