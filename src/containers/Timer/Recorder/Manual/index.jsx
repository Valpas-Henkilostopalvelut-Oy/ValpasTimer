import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import WorkspaceSelect from "../../../../components/WorkSpaceSelect/index.jsx";
import { timeMaker } from "../../../../services/time.jsx";

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
export const Manual = ({ reload }) => {
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
