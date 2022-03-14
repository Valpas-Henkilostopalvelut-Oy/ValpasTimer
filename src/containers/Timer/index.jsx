import React, { useEffect, useState } from "react";
import "./timer.css";
import "../../App.css"
import { DataStore } from "aws-amplify";
import { ListGroup } from "react-bootstrap";
import { TimeEntry, AllWorkSpaces } from "../../models";
import { onError } from "../../services/errorLib";
import { useAppContext } from "../../services/contextLib";
import Recorder from "./timerComponents/timeTrackerRecorder";
import DeleteIcon from "@mui/icons-material/Delete";
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

  return (
    <div className="Home main">
      <AppContext.Provider value={{ loadTimeList, selectedOption }}>
        <Recorder />
      </AppContext.Provider>
      {timeList != null && (
        <ListGroup>
          {timeList
            .sort((date1, date2) => date1.createdAt - date2.createdAt)
            .map((data, key) => {
              if (data.isActive) return;
              if (data.workspaceId !== selectedOption.id) return;
              const total = new Date(
                Date.parse(data.timeInterval.end) -
                  Date.parse(data.timeInterval.start)
              );
              return (
                <ListGroup.Item className="card" key={key}>
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
                        <p>{data.workspaceId.name}</p>
                      ) : (
                        <p>Without work</p>
                      )}
                    </div>

                    <div className="cardTimeBillable">
                      <div className="timeEndStart">
                        <p className="timeStart">
                          {new Date(data.timeInterval.start).getHours()}:
                          {new Date(data.timeInterval.start).getMinutes()}
                        </p>
                        <p>-</p>
                        <p className="timeEnd">
                          {new Date(data.timeInterval.end).getHours()}:
                          {new Date(data.timeInterval.end).getMinutes()}
                        </p>
                      </div>

                      <div>
                        {data.billable !== "" ? <p>Paid</p> : <p>Unpaid</p>}
                      </div>
                      <div
                        onClick={() => {
                          deleteItem(data.id);
                        }}
                      >
                        <DeleteIcon />
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

export default Timer;
