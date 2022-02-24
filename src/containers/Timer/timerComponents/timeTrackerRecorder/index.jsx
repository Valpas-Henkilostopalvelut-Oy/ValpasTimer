import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "./timeRecorder.css";
import { Switch, Select, Input, InputGroup, Button } from "@chakra-ui/react";

const Recorder = () => {
  const [manual, setManual] = useState(false);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [works, setWorks] = useState(["work1", "work2", "work3", "work4"]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        let nHours = time.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    started && advanceTime();
  }, [time, started]);

  const StartForm = () => (
    <Formik
      initialValues={{ desk: "" }}
      onSubmit={(values) => {
        setStarted(!started);
        setTime({
          seconds: 0,
          minutes: 0,
          hours: 0,
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <div className="startForm">
          <InputGroup>
            <Input
              placeholder="Description"
              onChange={handleChange("desk")}
              onBlur={handleBlur("desk")}
              value={values.desk}
            />
          </InputGroup>

          <Select placeholder="Select workspace" width={"280px"}>
            {works.map((data) => (
              <option>{data}</option>
            ))}
          </Select>
          <div className="formTimeStartSwitch">
            <p className="formTime">
              {String("0" + time.minutes).slice(-2)}:
              {String("0" + time.minutes).slice(-2)}:
              {String("0" + time.seconds).slice(-2)}
            </p>
            <Button onClick={handleSubmit}>
              {!started ? "Start" : "Stop"}
            </Button>
            <Switch
              size={"sm"}
              className="formSwitch"
              value={manual}
              onChange={() => setManual(!manual)}
            />
          </div>
        </div>
      )}
    </Formik>
  );

  return <div>{!manual && <StartForm />}</div>;
};

export default Recorder;
