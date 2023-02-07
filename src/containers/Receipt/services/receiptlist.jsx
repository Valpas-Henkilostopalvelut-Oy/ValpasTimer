import React, { useState, useEffect } from "react";
import { DataStore, Storage } from "aws-amplify";
import { Box, Grid, Collapse, Typography, Button } from "@mui/material";
import { Receipt, Currency, PaymentMethod } from "../../../models";
import { PropTypes } from "prop-types";
import { ItemTable } from "./itemtable";
import { metodlist } from "./arrays";
import { ReceiptImage } from "./receiptimage";

/*
{
    "id": "04ffc059-80e5-473c-b64f-97d290f6fb29",
    "userId": "669172d6-f6c2-44a1-95fd-43255acdf6b4",
    "created": "2023-01-31T12:55:34.205Z",
    "updated": "2023-01-31T12:55:34.205Z",
    "dateOfPurchase": "2023-01-24T12:53:30.000Z",
    "placeOfPurchase": "Turku",
    "receiptNumber": "12345678",
    "class": null,
    "price": 12,
    "currency": "EUR",
    "receiptImage": [
        "Toimistosiivous.jpg",
        "työntekijä.jpg"
    ],
    "tax": 0.24,
    "paymentMethod": "CASH",
    "comment": "Comment",
    "createdAt": "2023-01-31T12:55:34.532Z",
    "updatedAt": "2023-01-31T12:55:34.532Z",
    "_version": 1,
    "_lastChangedAt": 1675169734554,
    "_deleted": null
}
*/

export const Receiptlist = ({ isEmpty, lang }) => {
  const [receipts, setReceipts] = useState([]);
  useEffect(() => {
    const fetchReceipts = async () => {
      const receiptData = await DataStore.query(Receipt);
      console.log("receiptData: ", receiptData);
      setReceipts(receiptData);
    };
    fetchReceipts();

    console.log(lang);
  }, [isEmpty]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4">{lang.titlelist}</Typography>
      {receipts.map((receipt) => (
        <Items key={receipt.id} oldReceipt={receipt} lang={lang} isEmpty={isEmpty} />
      ))}
    </Box>
  );
};

const Items = ({ oldReceipt, lang, isEmpty }) => {
  const [receipt, setReceipt] = useState(oldReceipt);
  const date = new Date(receipt.dateOfPurchase).toLocaleDateString("fi-FI");
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "default.valpas",
        borderRadius: 1,
        p: 2,
        mt: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} md={1.5}>
          <Typography variant="p">{receipt.receiptNumber}</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="p">{receipt.placeOfPurchase}</Typography>
        </Grid>

        <Grid item xs={6} md={1.5}>
          <Typography variant="p">{date}</Typography>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography variant="p">
            {receipt.price} {Currency[receipt.currency]} (alv. {(receipt.tax * 100).toFixed(0)}%)
          </Typography>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography variant="p">{metodlist().find((p) => p.value === receipt.paymentMethod).label}</Typography>
        </Grid>

        <Grid item xs={12} md={1}>
          <Button variant="outlined" fullWidth onClick={handleClick}>
            Show
          </Button>
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container spacing={2} alignItems="center">
          <ReceiptImage
            receipt={receipt}
            oldReceipt={oldReceipt}
            setReceipt={setReceipt}
            lang={lang}
            isEmpty={isEmpty}
          />

          <Grid item xs={12} md={7}>
            <ItemTable
              receipt={receipt}
              oldReceipt={oldReceipt}
              setReceipt={setReceipt}
              lang={lang}
              isEmpty={isEmpty}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};
