import React, { useState, useEffect } from "react";
import { Tooltip, Typography, IconButton, Card, CardMedia, CardContent, CardActions, Grid } from "@mui/material";
import { Cardtype } from "../../../models";
import { Enddate } from "./date.jsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Storage, DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { PropTypes } from "prop-types";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const deleteimage = async (card, data) => {
  const workcards = data.workcards.filter((e) => e.id !== card.id);
  await DataStore.save(
    UserCredentials.copyOf(data, (updated) => {
      updated.workcards = workcards;
    })
  )
    .then(async () => {
      await Storage.remove(card.id, { level: "private" }).catch((err) => {
        console.warn(err);
      });
    })
    .catch((err) => {
      console.warn(err);
    });
};

const downloadimage = async (card) => {
  await Storage.get(card.id, { download: true, level: "private" })
    .then((e) => {
      let blod = e.Body;
      let filename = card.id;

      const url = URL.createObjectURL(blod);
      console.log(url);
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
};

const loadimg = async (card) => {
  return await Storage.get(card.id, { level: "private" });
};

export const Carditem = ({ data, card, isEmpty = false, lang }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    loadimg(card).then((e) => {
      setUrl(e);
    });
  }, [card]);

  console.log(url);
  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" image={url} alt="card" />
        <CardContent>
          <Typography gutterBottom variant="p">
            {card.type === Cardtype.WORKCARD ? card.workcard : card.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.type === Cardtype.DRIVING ? (
              card.drivinglicense.map((e) => {
                return <DirectionsCarIcon key={e} />;
              })
            ) : (
              <Enddate card={card} />
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="download card" disabled={!isEmpty} onClick={() => downloadimage(card)}>
            <Tooltip title={lang.uploadcardinfo}>
              <FileDownloadIcon
                sx={{
                  color: "gray",
                }}
              />
            </Tooltip>
          </IconButton>
          <IconButton aria-label="delete card" disabled={!isEmpty} onClick={() => deleteimage(card, data)}>
            <Tooltip title={lang.delete}>
              <DeleteForeverIcon
                sx={{
                  color: "gray",
                }}
              />
            </Tooltip>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

Carditem.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  card: PropTypes.object,
  id: PropTypes.string,
  isEmpty: PropTypes.bool,
};
