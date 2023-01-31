import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { ReceiptTable } from "./table.jsx";

const Image = (props) => {
  const { image } = props;
  const img = URL.createObjectURL(image);
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <img
        src={img}
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

export const Receiptform = ({ isEmpty, setSelectedIndex, lang }) => {
  const [images, setImages] = useState(null);
  const [receipt, setReceipt] = useState({
    date: new Date(),
    number: Number(""),
    amount: Number(""),
    class: "",
    currency: "EUR",
    place: "",
    tax: 0.24,
    method: "CASH",
    category: "",
  });
  const handleSelectimage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const cancel = () => {
    setReceipt({
      date: new Date(),
      number: Number(""),
      amount: Number(""),
      currency: "EUR",
      place: "",
      tax: 0.24,
      method: "CASH",
      category: "",
    });
    setImages(null);
    setSelectedIndex(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item md={4} xs={12}>
          {images ? (
            <Carousel autoPlay={false} animation="slide" indicators={false}>
              {images.map((image, i) => (
                <Image key={i} image={image} />
              ))}
            </Carousel>
          ) : (
            <Box
              sx={{
                height: 400,
                width: "100%",
                backgroundColor: "carnaval.gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "carnaval.gray",
                  opacity: 0.5,
                },
              }}
              component="label"
            >
              <input type="file" multiple onChange={handleSelectimage} hidden disabled={!isEmpty} />
            </Box>
          )}
        </Grid>
        <Grid item md={8} xs={12}>
          <ReceiptTable
            data={receipt}
            setData={setReceipt}
            files={images}
            cancel={cancel}
            lang={lang}
            isEmpty={isEmpty}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
