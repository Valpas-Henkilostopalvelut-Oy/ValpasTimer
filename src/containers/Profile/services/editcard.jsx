import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Stack,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  CircularProgress,
  Tooltip,
  IconButton,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";
import { parseISO } from "date-fns";
import { DataStore, Storage } from "aws-amplify";
import { UserCredentials } from "../../../models";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { cardtypes } from "./cards";

const Changetype = ({ card, setItem, lang }) => {
  const [type, setType] = useState(card.type);
  const cards = cardtypes(lang.types);

  const handleChange = (event) => {
    setType(event.target.value);
    setItem({ ...card, type: event.target.value });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="type-label">{lang.type}</InputLabel>
      <Select labelId="type-label" id="type" value={type} label={lang.type} onChange={handleChange}>
        {cards.map((card) => (
          <MenuItem key={card.id} value={card.id}>
            {card.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

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

const onUpload = async (item, data, images, setCard, close) => {
  if (!images) return;
  for (let i = 0; i < images.length; i++) {
    await upload(images[i]).then(async (e) => {
      if (e !== null) {
        const cards = data.workcards.filter((card) => card.id !== item.id);
        cards.push(item);
        console.log(cards);
        await DataStore.save(
          UserCredentials.copyOf(data, (updated) => {
            updated.workcards = cards;
          })
        ).then((e) => {
          setCard(e.workcards.find((card) => card.id === item.id));
          close();
        });
      }
    });
  }
};

export const Editform = ({ setCard, data, card, lang, setEdit }) => {
  const [item, setItem] = useState(card);
  const [date, setDate] = useState(parseISO(item.cardend));
  const images = item.files;
  const [imgUrls, setImgUrls] = useState([]);
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getImgUrls = async () => {
      const urls = await Promise.all(
        images.map(async (image) => {
          const url = await Storage.get(image, { level: "protected" });
          return {
            url: url,
            key: image,
          };
        })
      );
      setImgUrls(urls);
    };
    getImgUrls();
  }, []);

  const handleRemoveImage = (image) => {
    setItem({ ...item, files: item.files.filter((file) => file !== image) });
    setImgUrls(imgUrls.filter((url) => url.key !== image));
  };

  const handleClose = () => {
    setEdit(false);
    setFiles(null);
  };

  const handleSave = () => {
    console.log(item);
    onUpload(item, data, files, setCard, handleClose);
  };
  const handleCancel = () => handleClose();

  const handleSelect = (e) => {
    setFiles(e.target.files);
    Object.entries(e.target.files).forEach((file) => {
      let url = URL.createObjectURL(file[1]);
      setImgUrls([...imgUrls, { url: url, key: file[1].name }]);
      setItem({ ...item, files: [...item.files, file[1].name] });
    });
  };

  return (
    <Box>
      <Stack spacing={2}>
        <ImageList
          variant="quilted"
          cols={3}
          sx={{
            height: 150,
          }}
        >
          {imgUrls.map((url) => (
            <ImageListItem key={url.key}>
              <ImageListItemBar
                position="top"
                actionIcon={
                  <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }} onClick={() => handleRemoveImage(url.key)}>
                    <Tooltip title="Poista">
                      <ClearIcon />
                    </Tooltip>
                  </IconButton>
                }
              />
              <img src={url.url} srcSet={url.url} alt="img" loading="lazy" />
            </ImageListItem>
          ))}

          <ImageListItem>
            <ImageListItemBar
              position="top"
              actionIcon={
                <Tooltip title="Lisää">
                  <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }} component="label">
                    <input accept="image/*" type="file" onChange={handleSelect} hidden />
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              }
            ></ImageListItemBar>
          </ImageListItem>
        </ImageList>

        <Changetype card={card} setItem={setItem} lang={lang} />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DatePicker
            label="End date"
            value={date}
            disablePast
            disableMaskedInput
            onChange={(newDate) => {
              setDate(newDate);
              let e = isNaN(newDate) || newDate === null;
              setItem({ ...item, cardend: e ? null : newDate.toISOString() });
            }}
            onError={(error) => setError(!!error)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSave} disabled={error}>
          Save
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
