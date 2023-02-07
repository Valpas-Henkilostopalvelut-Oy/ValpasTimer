import React, { useState, useEffect } from "react";
import { DataStore, Storage } from "aws-amplify";
import { Box, Grid, Collapse, Typography, Button } from "@mui/material";
import { Receipt, Currency, PaymentMethod } from "../../../models";
import Carousel from "react-material-ui-carousel";
import { PropTypes } from "prop-types";
import { ItemTable } from "./itemtable";

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
    <img
      src={image}
      alt="receipt"
      style={{
        height: "100%",
        width: "100%",
        objectFit: "contain",
      }}
    />
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

    console.log(lang);
  }, [isEmpty]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4">{lang.titlelist}</Typography>
      {receipts.map((receipt) => (
        <Items key={receipt.id} receipt={receipt} lang={lang} />
      ))}
    </Box>
  );
};

const Items = ({ receipt, lang }) => {
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
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <Carousel autoPlay={false} animation="slide" indicators={false}>
              {imgs.map((img) => (
                <Image key={img} image={img} />
              ))}
            </Carousel>
          </Grid>

          <Grid item xs={12} md={7}>
            <ItemTable oldReceipt={receipt} lang={lang} />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};
