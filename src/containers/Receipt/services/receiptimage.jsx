import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Storage } from "aws-amplify";
import { Box, Grid, Button, Typography } from "@mui/material";

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

export const ReceiptImage = ({ receipt, setReceipt, isEmpty }) => {
  const [imgs, setImgs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchImgs = async () => {
      const imgData = await Promise.all(receipt.receiptImage.map((card) => loadimg(card)));
      setImgs(imgData);
    };
    fetchImgs();
  }, [receipt.receiptImage]);

  return (
    <Box>
      <Carousel autoPlay={false} animation="fade" onChange={setIndex} index={index}>
        {imgs.map((img) => (
          <Image key={img} image={img} />
        ))}
      </Carousel>
    </Box>
  );
};
