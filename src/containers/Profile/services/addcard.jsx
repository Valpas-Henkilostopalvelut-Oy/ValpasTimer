import React, { useState, useEffect } from "react";
import {
  IconButton,
  styled,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  Grid,
  Button,
  ListSubheader,
  TextField,
  Tooltip,
  Badge,
} from "@mui/material";
import { Storage, DataStore } from "aws-amplify";
import { UserCredentials, Cardtype, Workcardtype } from "../../../models";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Driverlicense } from "./driverlicense.jsx";
import { SelectEnd } from "./date.jsx";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Input = styled("input")({
  display: "none",
});

const upload = async (file, id) => {
  let type = String(file.name).split(".").pop();

  try {
    return await Storage.put(`${id}.${type}`, file, {
      level: "private",
      contentType: file.type,
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

const cardtypes = [
  { id: Cardtype.ID, name: "ID Card", disabled: false },
  { id: Cardtype.PASSPORT, name: "Passport", disabled: false },
  { id: Cardtype.DRIVING, name: "Driving License", disabled: false },
  { id: "workcard", name: "Work Card", disabled: true },
  { id: Workcardtype.HYGIENEPASS, name: "Hygieniapassi" },
  { id: Workcardtype.WORKSAFETYPASS, name: "Työturvallisuuskortti" },
  { id: Workcardtype.FIREWORKCARD, name: "Tulityökortti" },
  { id: Workcardtype.ELECTRICALSAFETYPASS, name: "Sähköturvallisuuskortti" },
  { id: Cardtype.OTHER, name: "Other", disabled: false },
];

const SelectCardType = ({ selected, setSelect }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="card-type-label">Card Type</InputLabel>
      <Select
        labelId="card-type-label"
        id="card-type"
        value={selected}
        label="Card Type"
        onChange={(e) => setSelect(e.target.value)}
        variant="standard"
      >
        {cardtypes.map((type) =>
          type.disabled ? (
            <ListSubheader key={type.id}>{type.name}</ListSubheader>
          ) : (
            <MenuItem key={type.id} value={type.id} disabled={type.disabled}>
              {type.name}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export const AddCard = ({ data, workcards, id, open, isEmpty }) => {
  const [selected, setSelected] = useState(Cardtype.ID);
  const [card, setCard] = useState(null);
  const [cardEnd, setCardEnd] = useState(new Date());
  const [checked, setChecked] = useState([]);
  const [ownCar, setOwnCar] = useState(false);
  const [isError, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setSelected(Cardtype.ID);
      setCard(null);
      setCardEnd(new Date());
      setChecked([]);
      setOwnCar(false);
    }
  }, [open]);

  useEffect(() => {
    if (selected !== Cardtype.DRIVING) {
      setOwnCar(false);
      setChecked([]);
    }
  }, [selected]);

  const isWorkCard = Object.keys(Workcardtype).includes(selected);

  const onUpload = async () => {
    if (card === null) return;
    let id = Date.now();
    const cardfield = await upload(card, id);
    const carddata = {
      id: cardfield.key,
      type: isWorkCard ? Cardtype.WORKCARD : selected,
      cardend: new Date(cardEnd).toISOString(),
      drivinglicense: checked,
      owncar: ownCar,
      workcard: isWorkCard ? selected : null,
    };
    await DataStore.save(
      UserCredentials.copyOf(data, (updated) => {
        workcards !== null ? updated.workcards.push(carddata) : (updated.workcards = [carddata]);
      })
    ).then(() => {
      setSelected(Cardtype.ID);
      setCard(null);
      setCardEnd(new Date());
      setChecked([]);
      setOwnCar(false);
    });
  };

  const isDisabled = () => {
    if (selected === Cardtype.DRIVING) {
      return !(card && cardEnd && checked.length > 0) || !isEmpty || !!isError;
    } else {
      return !(card && cardEnd) || !isEmpty || !!isError;
    }
  };

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <SelectEnd date={cardEnd} setDate={setCardEnd} setError={setError} />
        </Grid>

        <Grid item xs={7}>
          <SelectCardType selected={selected} setSelect={setSelected} />
        </Grid>

        <Grid item xs={1} component="label" htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              setCard(e.target.files[0]);
            }}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{
              color: !card ? "grey" : "primary.main",
            }}
          >
            <Tooltip title="Upload Card">
              <Badge badgeContent={card ? 1 : 0} color="primary">
                <AttachFileIcon />
              </Badge>
            </Tooltip>
          </IconButton>
        </Grid>

        <Grid item xs={1}>
          <IconButton onClick={onUpload} disabled={isDisabled()}>
            <Tooltip title="Add Card">
              <FileUploadIcon />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={selected === Cardtype.DRIVING} timeout="auto" unmountOnExit>
        <Driverlicense data={data} checked={checked} setChecked={setChecked} ownCar={ownCar} setOwnCar={setOwnCar} />
      </Collapse>
    </Collapse>
  );
};
