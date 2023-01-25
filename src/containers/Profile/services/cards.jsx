import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddCard } from "./addcard.jsx";
import { Carditem } from "./cardlist.jsx";
import { PropTypes } from "prop-types";

/*[
    {
        "id": "1673952638760.jpg",
        "cardend": "2023-01-17T10:50:31.551Z",
        "type": "ID",
        "drivinglicense": [],
        "owncar": false,
        "workcard": null
    },
    {
        "id": "1673952668251.png",
        "cardend": "2023-01-17T10:50:41.723Z",
        "type": "DRIVING",
        "drivinglicense": [
            "A",
            "A1",
            "A2",
            "B",
            "B1"
        ],
        "owncar": false,
        "workcard": null
    },
    {
        "id": "1673952694107.png",
        "cardend": "2023-01-17T10:51:11.620Z",
        "type": "WORKCARD",
        "drivinglicense": [],
        "owncar": false,
        "workcard": "WORKSAFETYPASS"
    }
]*/

export const Cards = ({ data, workcards, id, isEmpty = false, lang }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} align="right">
          <Button variant="contained" color="primary" size="small" onClick={handleClick} fullWidth>
            Lisää
          </Button>
        </Grid>
        <Grid item xs={12}>
          <AddCard
            open={open}
            setOpen={setOpen}
            id={id}
            workcards={workcards}
            data={data}
            isEmpty={isEmpty}
            lang={lang}
          />
        </Grid>
        {workcards &&
          workcards.map((card) => <Carditem key={card.id} card={card} data={data} isEmpty={isEmpty} lang={lang} />)}
      </Grid>
    </Box>
  );
};

Cards.propTypes = {
  data: PropTypes.object,
  workcards: PropTypes.array,
  id: PropTypes.string,
  isEmpty: PropTypes.bool,
};
