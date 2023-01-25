import React, { useState, useEffect } from "react";
import {
  IconButton,
  styled,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  ListSubheader,
  Tooltip,
  Badge,
  Button,
} from "@mui/material";
import { Storage, DataStore } from "aws-amplify";
import { UserCredentials, Cardtype, Workcardtype } from "../../../models";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Driverlicense } from "./driverlicense.jsx";
import { SelectEnd } from "./date.jsx";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { PropTypes } from "prop-types";

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

export const cardtypes = (lang) => {
  return [
    { id: Cardtype.ID, name: lang.id, disabled: false },
    { id: Cardtype.PASSPORT, name: lang.passport, disabled: false },
    { id: Cardtype.DRIVING, name: lang.driving, disabled: false },
    { id: "workcard", name: lang.workcard, disabled: true },
    { id: Workcardtype.HYGIENEPASS, name: lang.hygienepass },
    { id: Workcardtype.WORKSAFETYPASS, name: lang.worksafetypass },
    { id: Workcardtype.FIREWORKCARD, name: lang.fireworkcard },
    { id: Workcardtype.ELECTRICALSAFETYPASS, name: lang.electricalsafetypass },
    { id: Cardtype.OTHER, name: lang.other, disabled: false },
  ];
};

const SelectCardType = ({ selected, setSelect, lang }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="card-type-label">{lang.cardtype}</InputLabel>
      <Select
        labelId="card-type-label"
        id="card-type"
        value={selected}
        label="Card Type"
        onChange={(e) => setSelect(e.target.value)}
        variant="standard"
      >
        {cardtypes(lang.types).map((type) =>
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

export const AddCard = ({ data, workcards, open, isEmpty, lang }) => {
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
    <Collapse in={open}>
      <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
        <Grid item xs={5}>
          <SelectCardType selected={selected} setSelect={setSelected} lang={lang} />
        </Grid>

        <Grid item xs={4}>
          <SelectEnd date={cardEnd} setDate={setCardEnd} setError={setError} lang={lang} />
        </Grid>

        <Grid item xs={1}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{
              color: !card ? "grey" : "primary.main",
            }}
          >
            <input
              accept="image/*"
              type="file"
              onChange={(e) => {
                setCard(e.target.files[0]);
              }}
              hidden
            />
            <Tooltip title={lang.uploadcardinfo}>
              <Badge badgeContent={card ? 1 : 0} color="primary">
                <AttachFileIcon />
              </Badge>
            </Tooltip>
          </IconButton>
        </Grid>

        <Grid item xs={2}>
          <Button onClick={onUpload} disabled={isDisabled()} variant="contained" color="primary" size="small" fullWidth>
            {lang.uploadcard}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={selected === Cardtype.DRIVING} timeout="auto" unmountOnExit>
            <Driverlicense
              data={data}
              checked={checked}
              setChecked={setChecked}
              ownCar={ownCar}
              setOwnCar={setOwnCar}
              lang={lang}
            />
          </Collapse>
        </Grid>
      </Grid>
    </Collapse>
  );
};

SelectCardType.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelect: PropTypes.func.isRequired,
};

AddCard.propTypes = {
  data: PropTypes.object.isRequired,
  workcards: PropTypes.array,
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
};
