import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Button, Collapse } from "@mui/material";
import { Hub } from "aws-amplify";
import { Receiptform } from "./services/receiptform.jsx";
import { Receiptlist } from "./services/receiptlist.jsx";
import { Moreadd } from "./services/moremenu.jsx";
import { Travelform } from "./services/travelform.jsx";
import { Receiptlang as lang } from "./services/lang.jsx";

export const Receipt = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        console.log(data);
        setIsEmpty(data.isEmpty);
      }
    });
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Typography variant="h4">{lang.title}</Typography>
          </Grid>
          <Grid item xs={6} md={1.5}>
            <Button variant="outlined" color="primary" fullWidth>
              {lang.buttons.filter}
            </Button>
          </Grid>
          <Grid item xs={6} md={1.5}>
            <Moreadd
              isEmpty={isEmpty}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              lang={lang.buttons}
            />
          </Grid>
        </Grid>
        <Collapse in={selectedIndex === 0}>
          <Receiptform isEmpty={isEmpty} setSelectedIndex={setSelectedIndex} lang={lang.addreceipt} />
        </Collapse>
        <Collapse in={selectedIndex === 1}>
          <Travelform isEmpty={isEmpty} setSelectedIndex={setSelectedIndex} />
        </Collapse>
        <Receiptlist isEmpty={isEmpty} />
      </Box>
    </Container>
  );
};
