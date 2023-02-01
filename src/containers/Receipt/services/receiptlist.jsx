import React, { useState, useEffect } from "react";
import { DataStore, Storage } from "aws-amplify";
import { Box, Grid, Collapse, Typography, Button } from "@mui/material";
import { Receipt, Currency, PaymentMethod } from "../../../models";
import Carousel from "react-material-ui-carousel";
import { PropTypes } from "prop-types";

/*
{
    "id": "1701d6a1-e4ce-43e9-8b91-7c78b15683e0",
    "userId": "669172d6-f6c2-44a1-95fd-43255acdf6b4",
    "created": "2023-01-31T09:20:05.051Z",
    "updated": "2023-01-31T09:20:05.051Z",
    "dateOfPurchase": "2023-01-31T09:19:41.531Z",
    "placeOfPurchase": "Turku",
    "receiptNumber": "12345678",
    "receiptType": "INVOICE",
    "price": 12,
    "currency": "EUR",
    "receiptImage": [
        "Toimistosiivous.jpg",
        "työntekijä.jpg"
    ],
    "tax": 0.24,
    "paymentMethod": "CASH",
    "comment": null,
    "createdAt": "2023-01-31T09:20:05.582Z",
    "updatedAt": "2023-01-31T09:20:05.582Z",
    "_version": 1,
    "_lastChangedAt": 1675156805605,
    "_deleted": null
}
*/

const loadimg = async (card) => {
  try {
    return await Storage.get(card, {
      level: "protected",
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });
  } catch (error) {
    console.warn("Error loading image: ", error);
  }
};

const Image = (props) => {
  const { image } = props;
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <img
        src={image}
        alt="receipt"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export const Receiptlist = ({ isEmpty, lang }) => {
  const [receipts, setReceipts] = useState([]);
  useEffect(() => {
    const fetchReceipts = async () => {
      const receiptData = await DataStore.query(Receipt);
      console.log("receiptData: ", receiptData);
      setReceipts(receiptData);
    };
    fetchReceipts();
  }, [isEmpty]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4">{
        lang.titlelist
      }</Typography>
      {receipts.map((receipt) => (
        <Items key={receipt.id} receipt={receipt} />
      ))}
    </Box>
  );
};

const Items = ({ receipt }) => {
  const date = new Date(receipt.dateOfPurchase).toLocaleDateString();
  const time = new Date(receipt.dateOfPurchase).toLocaleTimeString();
  const [open, setOpen] = useState(false);
  const [imgs, setImgs] = useState([]);
  const handleClick = () => setOpen(!open);

  useEffect(() => {
    const fetchImgs = async () => {
      const imgData = await Promise.all(receipt.receiptImage.map((card) => loadimg(card)));
      setImgs(imgData);
    };
    fetchImgs();
  }, [receipt.receiptImage]);

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

        <Grid item xs={12} md={2}>
          <Typography variant="p">{receipt.placeOfPurchase}</Typography>
        </Grid>

        <Grid item xs={6} md={1.5}>
          <Typography variant="p">{date}</Typography>
        </Grid>

        <Grid item xs={6} md={1.5}>
          <Typography variant="p">{time}</Typography>
        </Grid>

        <Grid item xs={6} md={2.5}>
          <Typography variant="p">
            {receipt.price} {Currency[receipt.currency]} (alv. {(receipt.tax * 100).toFixed(0)}%)
          </Typography>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography variant="p">{PaymentMethod[receipt.paymentMethod]}</Typography>
        </Grid>

        <Grid item xs={12} md={1}>
          <Button variant="outlined" fullWidth onClick={handleClick}>
            Show
          </Button>
        </Grid>
      </Grid>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          mt: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Carousel autoPlay={false} animation="slide" indicators={false}>
              {imgs.map((img) => (
                <Image key={img} image={img} />
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};
