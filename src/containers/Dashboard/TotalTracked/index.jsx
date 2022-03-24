import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { onError } from "../../../services/errorLib";

const TotalLatest = ({ data, selOption }) => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const loadTime = async () => {
      try {
        const times = (await DataStore.query(TimeEntry))
          .filter((u) => u.userId === data.owner)
          .filter((t) => t.workspaceId === selOption.id)
          .filter((a) => !a.isActive);

        setTime(times);
      } catch (error) {
        onError(error);
      }
    };

    loadTime();
  }, [data]);

  const Total = () => {
    if (time !== null) {
      let t = 0;
      for (let i = 0; i < time.length; i++) {
        t +=
          Date.parse(time[i].timeInterval.end) -
          Date.parse(time[i].timeInterval.start);
      }
      return (
        new Date(t).getUTCHours() +
        ":" +
        String("0" + new Date(t).getUTCMinutes()).slice(-2) +
        ":" +
        String("0" + new Date(t).getUTCSeconds()).slice(-2)
      );
    }
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col>
          {data.profile.first_name} {data.profile.last_name}
        </Col>
        <Col>Latest Activity</Col>
        <Col>{time != null && <Total />}</Col>
      </Row>
    </ListGroup.Item>
  );
};

export default TotalLatest;
