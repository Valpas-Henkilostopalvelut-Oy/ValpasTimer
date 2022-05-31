import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  Tooltip,
  Box,
  TextField,
  Container,
  Popover,
  CssBaseline,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Grid,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import LoaderButton from "../../../components/LoaderButton";
import { DataStore, Auth, API } from "aws-amplify";
import { Tasks, Status, AllWorkSpaces } from "../../../models";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { de } from "date-fns/locale";

export const EnhancedWorks = (props) => {
  const { numOfWorks = 0, anchorEl = null, setAnchorEl } = props;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 2, sm: 1 },
        ...(numOfWorks > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numOfWorks > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numOfWorks} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          Työvuorosuunnittelu
        </Typography>
      )}

      {numOfWorks > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment>
          <Tooltip title="Add">
            <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <CreateTask id={id} open={open} anchorEl={anchorEl} handleClose={handleClose} />
        </Fragment>
      )}
    </Toolbar>
  );
};

const UserSelect = (props) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const { setUser } = props;

  useEffect(() => {
    let isActive = false;

    const loadList = async () => {
      let apiName = "AdminQueries";
      let path = "/ListUsers";
      let myInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };

      let w = (await API.get(apiName, path, myInit)).Users;

      if (w.length > 0) {
        let q = [];

        for (let i = 0; i < w.length; i++) {
          if (w[i].Enabled === true && w[i].UserStatus === "CONFIRMED") {
            q.push({
              userId: w[i].Username,
              name: w[i].Attributes.find((x) => x.Name === "name").Value,
              family_name: w[i].Attributes.find((x) => x.Name === "family_name").Value,
              icon: w[i].Attributes.find((x) => x.Name === "picture").Value,
            });
          }
        }

        setUsers(q);
      }
    };

    !isActive && loadList();

    return () => (isActive = true);
  }, []);

  const handleChange = (event) => {
    setSelected(event.target.value);
    setUser(users.find((x) => x.userId === event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">User</InputLabel>
        <Select labelId="user-select-label" id="user-select" value={selected} label="User" onChange={handleChange}>
          {users.map((u) => (
            <MenuItem value={u.userId} key={u.userId}>
              {u.name} {u.family_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const WorkSelect = (props) => {
  const [works, setWorks] = useState([]);
  const [selected, setSelected] = useState("");
  const { setWork } = props;

  useEffect(() => {
    let isActive = false;

    const loadList = async () => {
      try {
        const list = await DataStore.query(AllWorkSpaces);

        let q = [];

        for (let i = 0; i < list.length; i++) {
          q.push({
            workId: list[i].id,
            name: list[i].name,
          });
        }

        setWorks(q);
      } catch (e) {
        console.warn(e);
      }
    };

    !isActive && loadList();

    return () => (isActive = true);
  }, []);

  const handleChange = (event) => {
    setSelected(event.target.value);
    setWork(works.find((x) => x.workId === event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Work</InputLabel>
        <Select labelId="work-select-label" id="work-select" value={selected} label="Work" onChange={handleChange}>
          {works.map((w) => (
            <MenuItem value={w.workId} key={w.workId}>
              {w.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const SelectStartDate = (props) => {
  const { setStartDate, startDate } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <DatePicker
        mask="__.__.____"
        label="Task Start Date"
        value={startDate}
        onChange={(start) => {
          setStartDate(start);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

const SelectEndDate = (props) => {
  const { setEndDate, endDate } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <DatePicker
        mask="__.__.____"
        label="Task End Date"
        value={endDate}
        onChange={(endDate) => {
          setEndDate(endDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

const SelectDuration = (props) => {
  const { setDuration, duration } = props;

  const duratinList = ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"];
  return (
    <FormControl fullWidth>
      <InputLabel id="duration-select-label">Duration</InputLabel>
      <Select
        labelId="duration-select-label"
        id="duration-select"
        value={duration}
        label="Duration"
        onChange={(event) => {
          setDuration(event.target.value);
        }}
      >
        {duratinList.map((d) => (
          <MenuItem value={d} key={d}>
            {d}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SelectStartTime = (props) => {
  const { setStartTime, startTime } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <DesktopTimePicker
        label="Start Time"
        value={startTime}
        onChange={(newValue) => {
          setStartTime(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

const CreateTask = (props) => {
  const { id, open, anchorEl, handleClose } = props;
  const [user, setUser] = useState(null);
  const [work, setWork] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState("");

  const disableButton = (u, w, sd, ed, d) => {
    return u !== null && w !== null && sd !== null && ed !== null && d !== "";
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Formik
        initialValues={{
          title: "",
          description: "",
          status: Status.INWAITTING,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await DataStore.save(
              new Tasks({
                title: values.title,
                description: values.description,
                username: user.userId,
                user: user,
                time: startDate.toLocaleTimeString(),
                status: Status.INWAITTING,
                workplace: work,
                interval: {
                  start: startDate.toISOString(),
                  end: endDate.toISOString(),
                  duration: duration,
                },
                comments: [],
              })
            );
            setSubmitting(false);
            handleClose();
          } catch (e) {
            setSubmitting(false);
            console.log(e);
          }
        }}
      >
        {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched }) => (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 8,
                mb: 8,
              }}
            >
              <Typography component="h1" variant="h5">
                Lisää työvuoroja
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      autoComplete="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      error={errors.title && touched.title}
                    />
                    {errors.title && touched.title && (
                      <Typography variant="caption" color="error">
                        {errors.title}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      autoComplete="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      error={errors.description && touched.description}
                    />
                    {errors.description && touched.description && (
                      <Typography variant="caption" color="error">
                        {errors.description}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <UserSelect setUser={setUser} />
                  </Grid>
                  <Grid item xs={12}>
                    <WorkSelect setWork={setWork} />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <SelectStartTime setStartTime={setStartDate} startTime={startDate} />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <SelectDuration setDuration={setDuration} duration={duration} />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <SelectStartDate setStartDate={setStartDate} startDate={startDate} />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <SelectEndDate setEndDate={setEndDate} endDate={endDate} />
                  </Grid>
                </Grid>
                <LoaderButton
                  sx={{ mt: 2 }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  text="Create"
                  isLoading={isSubmitting}
                  disabled={!disableButton(user, work, startDate, endDate, duration)}
                />
              </Box>
            </Box>
          </Container>
        )}
      </Formik>
    </Popover>
  );
};
