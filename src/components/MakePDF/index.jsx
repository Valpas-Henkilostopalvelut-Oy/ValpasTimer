import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { fillWeek } from "./services/pdf.jsx";
import { PropTypes } from "prop-types";
import { groupBy } from "../../containers/Timer/services/group.jsx";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

export const MakePDF = ({ data, isEmpty, works }) => {
  /* one week item is {week: 52, period: '26.12 - 1.1.2023', arr: Array(2)}*/
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedWork, setSelectedWork] = useState("");
  const [newData, setNewData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      Auth.currentAuthenticatedUser().then((user) => {
        const toPdf = data.filter((a) => !a.isActive && a.workspaceId === selectedWork && a.isConfirmed && a.isSent);
        setCurrentUser(user);
        setNewData(groupBy(toPdf));
      });
    };
    if (isMounted) load();

    return () => (isMounted = false);
  }, [selectedWork]);

  const handleSave = () => fillWeek(selected, selectedWork, works, currentUser);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeWork = (event) => setSelectedWork(event.target.value);
  const handleChange = (event) => {
    //max selected is 2
    const { value } = event.target;
    setSelected(value.length > 2 ? value.slice(0, 2) : value);
  };

  return (
    <>
      <Button onClick={handleOpen} disabled={!isEmpty} variant="contained">
        <Typography variant="p">PDF</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>PDF</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="works-select" aria-label="works-select">
              Works
            </InputLabel>
            <Select
              labelId="works-select"
              id="works-select"
              label="Works"
              value={selectedWork}
              onChange={handleChangeWork}
            >
              {works.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" disabled={selectedWork === "" && !!newData}>
            <InputLabel id="weeks-select" aria-label="weeks-select">
              Weeks
            </InputLabel>
            <Select
              labelId="weeks-select"
              id="weeks-select"
              label="Weeks"
              multiple
              value={selected}
              onChange={handleChange}
              renderValue={(selected) => selected.map((item) => item.week).join(", ")}
              MenuProps={MenuProps}
            >
              {newData &&
                newData.map((item) => {
                  let isSelected = selected.indexOf(item) > -1;
                  let isFull = selected.length > 1 && !isSelected;
                  return (
                    <MenuItem key={item.period} value={item} disabled={isFull}>
                      <Checkbox checked={selected.indexOf(item) > -1} />
                      <ListItemText secondary={item.period} primary={`${item.week} työviikko`} />
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>

          <Button onClick={handleSave} color="primary" disabled={selected.length < 1}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

MakePDF.propTypes = {
  data: PropTypes.array,
  isEmpty: PropTypes.bool,
  selected: PropTypes.string,
  works: PropTypes.array,
};
