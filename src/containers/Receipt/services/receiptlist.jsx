import React, { useState, useEffect } from "react";
import { DataStore, Storage, Auth } from "aws-amplify";
import { Box, Grid, Collapse, Typography, Button } from "@mui/material";
import { Receipt, Currency, PaymentMethod } from "../../../models";
import { PropTypes } from "prop-types";
import ItemTable from "./ItemTable";
import { metodlist } from "./arrays";
import ReceiptImage from "./ReceiptImage";

const ReceiptList = (props) => {
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
  const metod = metodlist().find((p) => p.value === receipt.paymentMethod)?.label;
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
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <ReceiptImage receipt={receipt} setReceipt={setReceipt} {...props} />

            <Grid item xs={12} md={7}>
              <ItemTable receipt={receipt} setReceipt={setReceipt} {...props} />
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ReceiptList;
