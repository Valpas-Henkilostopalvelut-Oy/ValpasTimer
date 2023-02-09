import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  Grid,
} from "@mui/material";
import { fillWeek } from "../../../components/MakePDF/services/pdf";
import { groupBy } from "../../Timer/services/group";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const Selectwork = ({ works, handleChangeWork, selectedWork }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Valitse asiakas</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedWork}
        label="Valitse asiakas"
        onChange={handleChangeWork}
      >
        {works.map((work) => (
          <MenuItem key={work.id} value={work.id}>
            {work.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Selectworker = ({ workers, handleChangeWorker, selectedWorker }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Työntekijä</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedWorker}
        label="Työntekijä"
        onChange={handleChangeWorker}
      >
        {workers.map((worker) => (
          <MenuItem key={worker.id} value={worker.id}>
            {worker.last_name} {worker.first_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Selectweeks = ({ weeks, handleChangeWeek, selectedWeek, idDisable }) => {
  return (
    <FormControl fullWidth margin="dense" disabled={idDisable}>
      <InputLabel id="weeks-select" aria-label="weeks-select">
        Työviikot
      </InputLabel>
      <Select
        labelId="weeks-select"
        id="weeks-select"
        label="Työviikot"
        multiple
        value={selectedWeek}
        onChange={handleChangeWeek}
        renderValue={(selected) => selected.map((item) => item.week).join(", ")}
        MenuProps={MenuProps}
      >
        {weeks &&
          weeks.map((item) => {
            let isSelected = selectedWeek.indexOf(item) > -1;
            let isFull = selectedWeek.length > 1 && !isSelected;
            return (
              <MenuItem key={item.period} value={item} disabled={isFull}>
                <Checkbox checked={selectedWeek.indexOf(item) > -1} />
                <ListItemText secondary={item.period} primary={`${item.week} työviikko`} />
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export const Pdf = ({ workers, works, data }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [paid, setPaid] = useState(false);
  const [selectedWork, setSelectedWork] = useState("");
  const [selecredWorker, setSelectedWorker] = useState("");
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await DataStore.query(TimeEntry)
        .then((data) => {
          data = data.filter(
            (item) =>
              item.userId === selecredWorker &&
              item.workspaceId === selectedWork &&
              (paid ? item.isLocked : true)
          );
          data = groupBy(data);
          setNewData(data);
        })
        .catch((err) => console.warn(err));
    };
    selecredWorker && selectedWork && fetchData();
  }, [paid, selectedWork, selecredWorker]);
  const user = workers.find((item) => item.id === selecredWorker);

  useEffect(() => {
    setSelected([]);
  }, [setSelectedWorker, setSelectedWork]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeWork = (event) => setSelectedWork(event.target.value);
  const handleChangeWorker = (event) => setSelectedWorker(event.target.value);
  const handleChangeWeek = (event) => {
    //max selected is 2
    const { value } = event.target;
    setSelected(value.length > 2 ? value.slice(0, 2) : value);
  };
  const handleChangePaid = (event) => setPaid(!paid);
  const handleSave = () =>
    fillWeek(selected, selectedWork, works, { attributes: { name: user.first_name, family_name: user.last_name } });

  return (
    <>
      <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
        PDF
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>PDF</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Selectwork works={works} handleChangeWork={handleChangeWork} selectedWork={selectedWork} />
            </Grid>
            <Grid item xs={12}>
              <Selectworker workers={workers} handleChangeWorker={handleChangeWorker} selectedWorker={selecredWorker} />
            </Grid>

            <Grid item xs={12}>
              <MenuItem onClick={handleChangePaid}>
                <Checkbox checked={paid} />
                <ListItemText primary="Maksettu vain" />
              </MenuItem>
            </Grid>

            <Grid item xs={12}>
              <Selectweeks
                weeks={newData}
                handleChangeWeek={handleChangeWeek}
                selectedWeek={selected}
                idDisable={selecredWorker && selectedWork ? false : true}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={handleSave}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
