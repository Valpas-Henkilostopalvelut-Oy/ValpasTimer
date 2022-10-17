import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry } from "../../../models";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import WorkspaceSelect from "../../../components/WorkSpaceSelect/index.jsx";
import { timeMaker } from "../../../services/time.jsx";

const ManualEditing = ({ time, setTime, label = "Time" }) => {
  const d = new Date(time);

  const [value, setValue] = useState(
    `${String("0" + d.getHours()).slice(-2)}:${String("0" + d.getMinutes()).slice(-2)}`
  );
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => {
        let val = timeMaker(e, time);
        setValue(`${String("0" + val.h).slice(-2)}:${String("0" + val.m).slice(-2)}`);
        setTime(new Date().setHours(val.h, val.m, 0, 0));
      }}
    />
  );
};

const Manual = ({ reload }) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("");
  const [description, setDescription] = useState("");

  const total = new Date(Math.abs(end - start));

  const addNewTime = async () => {
    if (Date.parse(start) !== Date.parse(end)) {
      const currentUser = await Auth.currentAuthenticatedUser();

      try {
        await DataStore.save(
          new TimeEntry({
            description: description,
            userId: currentUser.username,
            workspaceId: selectedOption,
            timeInterval: {
              duration: "",
              start: new Date(start).toISOString(),
              end: new Date(end).toISOString(),
            },
            isActive: false,
            isLocked: false,
            isSent: false,
            isConfirmed: false,
            billable: false,
          })
        );

        reload();
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8} lg={4}>
        <TextField
          label="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={4} lg={2}>
        <WorkspaceSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </Grid>

      <Grid item xs={4} md={2} lg={2} sx={{ display: "flex", justifyContent: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
          <DatePicker
            label="Date picker"
            mask="__.__.____"
            value={start}
            onChange={(newValue) => {
              setStart(new Date(newValue));
              setEnd(new Date(newValue));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={4} md={3} lg={1} sx={{ display: "flex", justifyContent: "center" }}>
        <ManualEditing time={start} setTime={setStart} label="Start" />
      </Grid>

      <Grid item xs={4} md={3} lg={1} sx={{ display: "flex", justifyContent: "center" }}>
        <ManualEditing time={end} setTime={setEnd} label="End" />
      </Grid>

      <Grid item xs={6} md={2} lg={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">
          {String("0" + total.getUTCHours()).slice(-2)}:{String("0" + total.getUTCMinutes()).slice(-2)}:
          {String("0" + total.getUTCMilliseconds()).slice(-2)}
        </Typography>
      </Grid>

      <Grid item xs={6} md={2} lg={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={addNewTime} variant="contained">
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

const Timer = ({ reload }) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [started, setStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    let isActive = false;

    const checkActiveTime = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user.attributes["custom:RuningTimeEntry"] !== "null") {
          const ongoingTime = await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"]);

          const timeDiff = new Date(Date.parse(new Date()) - Date.parse(ongoingTime.timeInterval.start));
          setTime({
            seconds: timeDiff.getUTCSeconds(),
            minutes: timeDiff.getUTCMinutes(),
            hours: timeDiff.getUTCHours(),
          });

          setStarted(true);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && checkActiveTime();

    return () => (isActive = true);
  }, []);

  useEffect(() => {
    let isCanceled = false;

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

        !isCanceled && setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    started && advanceTime();

    return () => (isCanceled = true);
  }, [time, started]);

  const addItem = async () => {
    setStarted(!started);
    setTimeout(() => {
      setTime({
        seconds: 0,
        minutes: 0,
        hours: 0,
      });
    }, 1000);
    try {
      const user = await Auth.currentAuthenticatedUser();

      const startTimeEntry = async () => {
        const newStartTime = await DataStore.save(
          new TimeEntry({
            description: description,
            userId: user.username,
            workspaceId: selectedOption,
            timeInterval: {
              duration: "",
              end: new Date(new Date().setMilliseconds(0)).toISOString(),
              start: new Date(new Date().setMilliseconds(0)).toISOString(),
            },
            isActive: true,
            isLocked: false,
            isSent: false,
            isConfirmed: false,
            billable: true,
          })
        );

        const original = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);

        await DataStore.save(
          UserCredentials.copyOf(original, (updated) => {
            updated.activeTimeEntry = newStartTime.id;
          })
        );

        await Auth.updateUserAttributes(user, {
          "custom:RuningTimeEntry": newStartTime.id,
        });
      };

      const endTimeEntry = async () => {
        const oldActiveTime = await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"]);

        await DataStore.save(
          TimeEntry.copyOf(oldActiveTime, (updated) => {
            updated.isActive = false;
            updated.timeInterval.end = new Date().toISOString();
          })
        );

        const original = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);

        await DataStore.save(
          UserCredentials.copyOf(original, (updated) => {
            updated.activeTimeEntry = "null";
          })
        );

        await Auth.updateUserAttributes(user, {
          "custom:RuningTimeEntry": "null",
        });

        reload();
      };

      if (user.attributes["custom:RuningTimeEntry"] === "null") {
        startTimeEntry();
      } else {
        endTimeEntry();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //description, workselect, start stop
  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <WorkspaceSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </Grid>
      <Grid item xs={6} md={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">
          {String("0" + time.hours).slice(-2)}:{String("0" + time.minutes).slice(-2)}:
          {String("0" + time.seconds).slice(-2)}
        </Typography>
      </Grid>

      <Grid item xs={6} md={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={addItem} variant="contained">
          {!started ? "Start" : "Stop"}
        </Button>
      </Grid>
    </Grid>
  );
};

const Recorder = ({ loadTimeList }) => {
  const [value, setValue] = React.useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value} sx={{}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChangeTab} aria-label="Manual and Timer Tabs">
            <Tab label="Timer" value="1" />
            <Tab label="Manual" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Timer reload={loadTimeList} />
        </TabPanel>
        <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Manual reload={loadTimeList} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Recorder;
