import React, { useState, useEffect } from "react";
import {
  Tooltip,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  InputBase,
  Box,
} from "@mui/material";
import { Cardtype } from "../../../models";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { Storage, DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";

const upload = async (file) => {
  let type = String(file.name).split(".").pop();
  console.log(file.name);

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
        label="Select end date"
        disablePast
        disableMaskedInput
        value={date}
        onChange={(newValue) => setDate(newValue)}
        renderInput={(params) => {
          const { InputProps, ...otherProps } = params;
          return <InputBase {...otherProps} />;
        }}
      />
    </LocalizationProvider>
  );
};

const onUpload = async (images, date, workcards, card, data) => {
  if (!images) return;
  let id = Date.now();
  let filenames = [];
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    await upload(file).then((e) => {
      filenames.push(e.key);
    });
  }

  console.log(filenames);

  if (filenames.length === images.length) {
    const carddata = {
      id: String(id),
      type: card.id,
      cardend: new Date(date).toISOString(),
      drivinglicense: null,
      owncar: null,
      files: filenames,
    };
    const user = await DataStore.query(UserCredentials, data.id);
    await DataStore.save(
      UserCredentials.copyOf(user, (updated) => {
        workcards !== null ? (updated.workcards = [...workcards, carddata]) : (updated.workcards = [carddata]);
      })
    ).then((e) => {
      console.log(e);
    });
  }
};

export const Notaddedcard = ({ lang, data, workcards, card, isEmpty }) => {
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const img = card.img;

  const handleUpload = async () => {
    onUpload(image, date, workcards, card, data);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
      }}
    >
      <CardMedia image={image ? URL.createObjectURL(image[0]) : img} alt="card">
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
      </CardMedia>

      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="p">{card.name}</Typography>
        <Selectend date={date} setDate={setDate} />
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
