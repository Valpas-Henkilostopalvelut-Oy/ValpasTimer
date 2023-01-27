import React, { useState } from "react";
import {
  Tooltip,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Collapse,
  TextField,
  Stack,
} from "@mui/material";
import { Cardtype } from "../../../models";
import SaveIcon from "@mui/icons-material/Save";
import { Storage, DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";
import { Driverlicense } from "./driverlicense";
import { PropTypes } from "prop-types";
import teamplate from "../assets/template.jpg";

const upload = async (file) => {
  try {
    return await Storage.put(file.name, file, {
      level: "protected",
      contentType: file.type,
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });
  } catch (e) {
    console.warn(e);
    return null;
  }
};

const Selectend = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        label="Voimassa"
        disablePast
        disableMaskedInput
        value={date}
        onChange={(newValue) => setDate(newValue)}
        renderInput={(params) => {
          return <TextField variant="standard" {...params} />;
        }}
      />
    </LocalizationProvider>
  );
};

const onUpload = async (images, date, workcards, card, data, drivinglicense, owncar) => {
  if (!images) return;
  let id = Date.now();
  let filenames = [];
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    await upload(file).then((e) => {
      filenames.push(e.key);
    });
  }

  if (filenames.length === images.length) {
    const carddata = {
      id: String(id),
      type: card.id,
      cardend: new Date(date).toISOString(),
      drivinglicense: card.id === Cardtype.DRIVING ? drivinglicense : null,
      owncar: card.id === Cardtype.DRIVING ? owncar : null,
      files: filenames,
    };
    const user = await DataStore.query(UserCredentials, data.id);
    await DataStore.save(
      UserCredentials.copyOf(user, (updated) => {
        workcards !== null ? (updated.workcards = [...workcards, carddata]) : (updated.workcards = [carddata]);
      })
    );
  }
};

export const Notaddedcard = ({ lang, data, workcards, card, isEmpty }) => {
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const img = card.img || teamplate;
  const [checked, setChecked] = useState([]);
  const [ownCar, setOwnCar] = useState(false);

  const handleUpload = async () => {
    onUpload(image, date, workcards, card, data, checked, ownCar);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
      }}
    >
      <Box
        component="label"
        sx={{
          //when hover, show plus icon
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          },
          height: "140px",
          display: "flex",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={image ? URL.createObjectURL(image[0]) : img}
          alt="Paikkamerkki"
          sx={{
            objectFit: "contain",
          }}
        />
        <input
          accept="image/*"
          type="file"
          multiple
          onChange={(e) => {
            setImage(e.target.files);
          }}
          hidden
        />
      </Box>

      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Stack spacing={2}>
          <Typography variant="p">{card.name}</Typography>
          <Selectend date={date} setDate={setDate} />
          {card.id === Cardtype.DRIVING && (
            <Collapse in={image !== null}>
              <Box height={150} sx={{ overflow: "auto" }}>
                <Driverlicense
                  checked={checked}
                  setChecked={setChecked}
                  ownCar={ownCar}
                  setOwnCar={setOwnCar}
                  lang={lang}
                />
              </Box>
            </Collapse>
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Save" onClick={handleUpload} disabled={!image}>
          <Tooltip title="Save">
            <SaveIcon
              sx={{
                color: "gray",
              }}
            />
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  );
};

Notaddedcard.propTypes = {
  lang: PropTypes.object,
  data: PropTypes.object,
  workcards: PropTypes.array,
  card: PropTypes.object,
  isEmpty: PropTypes.bool,
};

Selectend.propTypes = {
  date: PropTypes.object,
  setDate: PropTypes.func,
};
