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
import { Cardtype, Workcardtype } from "../../../models";
import img from "../assets/tyoturvallisuuskortti-2022.png";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { Storage, DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";

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

export const Nosatefycard = ({ lang, data, workcards }) => {
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);

  const handleUpload = async () => onUpload();

  const onUpload = async () => {
    if (!image) return;
    let id = Date.now();
    const cardfield = await upload(image, id);
    if (cardfield) {
      const carddata = {
        id: cardfield.key,
        type: Cardtype.WORKCARD,
        cardend: new Date(date).toISOString(),
        drivinglicense: null,
        owncar: null,
        workcard: Workcardtype.WORKSAFETYPASS,
      };
      const user = await DataStore.query(UserCredentials, data.id);
      await DataStore.save(
        UserCredentials.copyOf(user, (updated) => {
          workcards !== null ? (updated.workcards = [...workcards, carddata]) : (updated.workcards = [carddata]);
        })
      );
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
      }}
    >
      <CardMedia image={image ? URL.createObjectURL(image) : img} alt="card">
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
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            hidden
          />
        </Box>
      </CardMedia>

      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="p">{Workcardtype.WORKSAFETYPASS}</Typography>
        <Selectend date={date} setDate={setDate} />
      </CardContent>
      <CardActions>
        <IconButton aria-label="Save" onClick={handleUpload}>
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
