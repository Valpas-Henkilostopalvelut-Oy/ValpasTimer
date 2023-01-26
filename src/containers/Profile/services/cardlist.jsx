import React, { useState, useEffect } from "react";
import { Tooltip, Typography, IconButton, Card, CardMedia, CardContent, CardActions, Grid, Stack } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Storage, DataStore } from "aws-amplify";
import { UserCredentials, Cardtype } from "../../../models";
import { PropTypes } from "prop-types";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Carousel from "react-material-ui-carousel";
import { cardtypes } from "./cards";
import EditIcon from "@mui/icons-material/Edit";

const deleteimage = async (card, data) => {
  const workcards = data.workcards.filter((e) => e.id !== card.id);
  await DataStore.save(
    UserCredentials.copyOf(data, (updated) => {
      updated.workcards = workcards;
    })
  )
    .then(() => {
      card.files.forEach(async (file) => {
        await Storage.remove(file, { level: "protected" }).catch((err) => {
          console.warn(err);
        });
      });
    })
    .catch((err) => {
      console.warn(err);
    });
};

const downloadimage = async (card) => {
  card.files.forEach(async (file, i) => {
    await Storage.get(file, { download: true, level: "protected" })
      .then((e) => {
        console.log(e);
        let blod = e.Body;
        let filename = `${Cardtype[card.type]}_${i}.${
          e.ContentType.split("/").pop() === "jpeg" ? "jpg" : e.ContentType.split("/").pop()
        }`;

        const url = URL.createObjectURL(blod);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;

        const clickHandler = () => {
          setTimeout(() => {
            URL.revokeObjectURL(url);
            a.removeEventListener("click", clickHandler);
          }, 150);
        };
        a.addEventListener("click", clickHandler, false);
        a.click();
        return a;
      })
      .catch((err) => {
        console.warn(err);
      });
  });
};

const loadimg = async (card) => {
  return await Storage.get(card, {
    level: "protected",
    progressCallback(progress) {
      console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    },
  });
};

const Enddate = ({ date }) => {
  date = new Date(date);
  return date.toLocaleDateString("fi-FI");
};

export const Carditem = ({ data, card, isEmpty = false, lang }) => {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      let imgs = [];
      for (let i = 0; i < card.files.length; i++) {
        imgs.push(await loadimg(card.files[i]));
      }
      setImgs(imgs);
    };

    if (isActive) load();
    return () => (isActive = false);
  }, [card]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 600 }}>
        {imgs.length > 1 ? (
          <Carousel autoPlay={false} animation="slide" indicators={false} navButtonsAlwaysVisible={false} swipe={true}>
            {imgs.map((img, i) => (
              <CardMedia key={i} component="img" height="140" image={img} alt="card" />
            ))}
          </Carousel>
        ) : (
          <CardMedia component="img" height="140" image={imgs[0]} alt="card" />
        )}

        <CardContent>
          <Stack spacing={1}>
            <Typography gutterBottom variant="p">
              {cardtypes(lang.types).find((e) => e.id === card.type).name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.owncar && card.type === Cardtype.DRIVING && <DirectionsCarIcon />}{" "}
              {card.type === Cardtype.DRIVING && card.drivinglicense.join(", ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Valid until:
              <Enddate date={card.cardend} />
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <IconButton aria-label="download card" disabled={!isEmpty} onClick={() => downloadimage(card)}>
            <Tooltip title={lang.uploadcardinfo}>
              <FileDownloadIcon sx={{ color: "gray" }} />
            </Tooltip>
          </IconButton>
          <IconButton aria-label="delete card" disabled={!isEmpty} onClick={() => deleteimage(card, data)}>
            <Tooltip title={lang.delete}>
              <DeleteForeverIcon sx={{ color: "gray" }} />
            </Tooltip>
          </IconButton>
          <IconButton aria-label="edit card" disabled={!isEmpty} onClick={() => console.log("edit")}>
            <Tooltip title="Edit">
              <EditIcon sx={{ color: "gray" }} />
            </Tooltip>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

Carditem.propTypes = {
  data: PropTypes.object,
  card: PropTypes.object,
  isEmpty: PropTypes.bool,
  lang: PropTypes.object,
};
