import React, { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ReceiptTable from "./ReceiptTable.jsx";
import FileUploadIcon from "@mui/icons-material/FileUpload";

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

const Imgcarousel = ({ images, setImages, lang }) => {
  const [index, setIndex] = useState(0);
  const handleRemove = () => {
    const newImages = images.filter((image, i) => i !== index);
    setImages(newImages);
  };

  const handleAdd = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Carousel autoPlay={false} indicators={false} onChange={setIndex} index={index}>
          {images.map((image, i) => (
            <Image key={i} image={image} />
          ))}
        </Carousel>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" color="primary" fullWidth onClick={handleRemove}>
          {lang.buttons.remove}
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Button variant="outlined" color="primary" fullWidth component="label">
          <input accept="image/*" id="icon-button-file" type="file" hidden onChange={handleAdd} multiple />
          {lang.buttons.add}
        </Button>
      </Grid>
    </Grid>
  );
};

const receiptTemp = {
  date: new Date(),
  number: "",
  amount: Number(0),
  class: "",
  currency: "EUR",
  place: "",
  tax: 0.24,
  method: "",
  otherMethod: "",
  category: "",
};

const ReceiptForm = ({ isEmpty, setSelectedIndex, lang }) => {
  lang = lang.addreceipt;
  const [images, setImages] = useState([]);
  const [receipt, setReceipt] = useState(receiptTemp);

  const handleSelectimage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const cancel = () => {
    setReceipt(receiptTemp);
    setImages([]);
    setSelectedIndex(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item md={4} xs={12}>
          {images.length > 0 ? (
            <Imgcarousel images={images} setImages={setImages} lang={lang.carousel} />
          ) : (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "carnaval.gray",
                  opacity: 0.5,
                },
              }}
              component="label"
            >
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                hidden
                onChange={handleSelectimage}
                multiple
                disabled={!isEmpty}
              />
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <FileUploadIcon sx={{ fontSize: 100 }} />
                <Typography variant="h5" sx={{}}>
                  {lang.buttons.upload}
                </Typography>
              </Box>
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

export default ReceiptForm;
