import React, { useState, useEffect } from "react";
import { DataStore, Storage, Auth } from "aws-amplify";
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

export const Receiptlist = (props) => {
  const { isEmpty, workerdata } = props;
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      await DataStore.query(Receipt)
        .then((res) => setReceipts(res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
        .catch((err) => console.warn(err));
    };
    fetchReceipts();
  }, [isEmpty]);

  useEffect(() => {
    const filterReceipts = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const filtered = receipts.filter((i) => {
        if (workerdata) return i.userId === workerdata.userId;
        if (user) return i.userId === user.attributes.sub;
      });

      console.log(filtered);
      setFilteredReceipts(filtered);
    };

    filterReceipts();
  }, [receipts, workerdata]);

  return (
    <Box sx={{ mt: 2 }}>
      {filteredReceipts.length !== 0 ? (
        filteredReceipts.map((receipt) => <Items key={receipt.id} oldReceipt={receipt} {...props} />)
      ) : (
        <Typography variant="h4">Ei ole kuittia</Typography>
      )}
    </Box>
  );
};

const Items = (props) => {
  const { oldReceipt } = props;
  const [receipt, setReceipt] = useState(oldReceipt);
  const date = new Date(receipt.dateOfPurchase).toLocaleDateString("fi-FI");
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  const metod = metodlist().find((p) => p.value === receipt.paymentMethod).label;
  const other = receipt.paymentMethod === "OTHER" ? `(${receipt.otherPayment})` : "";

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
          <Typography variant="p">
            {metod} {other}
          </Typography>
        </Grid>

        <Grid item xs={12} md={1}>
          <Button variant="outlined" fullWidth onClick={handleClick}>
            {open ? "Piilota" : "Näytä"}
          </Button>
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container spacing={2} alignItems="center">
          <ReceiptImage receipt={receipt} setReceipt={setReceipt} {...props} />

          <Grid item xs={12} md={7}>
            <ItemTable receipt={receipt} setReceipt={setReceipt} {...props} />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};
