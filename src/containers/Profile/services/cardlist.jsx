import React from "react";
import { TableCell, TableRow, Tooltip, Typography, IconButton } from "@mui/material";
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
      console.log(a);
      return a;
    })
    .catch((err) => {
      console.warn(err);
    });
};

export const Carditem = ({ data, card, isEmpty = false, lang }) => {
  return (
    <>
      <TableRow>
        <TableCell>{card.type === Cardtype.WORKCARD ? card.workcard : card.type}</TableCell>
        <TableCell>
          <Enddate card={card} />
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="download card" disabled={!isEmpty} onClick={() => downloadimage(card)}>
            <Tooltip title={lang.uploadcardinfo}>
              <FileDownloadIcon
                sx={{
                  color: "gray",
                }}
              />
            </Tooltip>
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete card" disabled={!isEmpty} onClick={() => deleteimage(card, data)}>
            <Tooltip title={lang.delete}>
              <DeleteForeverIcon
                sx={{
                  color: "gray",
                }}
              />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
      {card.type === Cardtype.DRIVING && (
        <TableRow>
          <TableCell colSpan={4}>
            <Typography variant="body2" color="text.secondary" component="p">
              {lang.category}: {card.drivinglicense.toString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="p">
              {lang.owncar}: {card.owncar ? "Kyllä" : "Ei"}
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

Carditem.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  card: PropTypes.object,
  id: PropTypes.string,
  isEmpty: PropTypes.bool,
};
