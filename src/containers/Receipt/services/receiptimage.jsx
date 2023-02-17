import React, { useState, useEffect } from "react";
import { Storage, DataStore } from "aws-amplify";
import { Receipt } from "../../../models";
import { Box, Grid, Button, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

const loadimg = async (card, workerdata) => {
  console.log(workerdata);
  try {
    return await Storage.get(card, {
      level: "protected",
      identityId: workerdata ? workerdata.identityId : null,
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });
  } catch (error) {
    console.warn("Error loading image: ", error);
  }
};

const remove = async (key, data, id, setLoading) => {
  try {
    setLoading(true);
    await Storage.remove(key, { level: "protected" });
    await DataStore.query(Receipt, id).then(async (receipt) => {
      await DataStore.save(
        Receipt.copyOf(receipt, (updated) => {
          updated.receiptImage = updated.receiptImage.filter((item) => item !== key);
        })
      );
      setLoading(false);
    });
  } catch (error) {
    setLoading(false);
    console.warn("Error removing file: ", error);
  }
};

const upload = async (file, data, index, dataid, setLoading) => {
  const id = Date.now();
  let end = file.name.split(".").pop();
  let newName = `${id}-${index}.${end}`;

  try {
    const result = await Storage.put(newName, file, {
      contentType: file.type,
      level: "protected",
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        setLoading(progress.loaded !== progress.total);
      },
    });

    await DataStore.query(Receipt, dataid).then(async (receipt) => {
      await DataStore.save(Receipt.copyOf(receipt, (updated) => updated.receiptImage.push(result.key)));
    });
  } catch (error) {
    console.warn("Error uploading file: ", error);
  }
};

export const ReceiptImage = (props) => {
  const { receipt, isEmpty, workerdata } = props;
  const [imgs, setImgs] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImgs = async () => {
      const imgData = await Promise.all(receipt.receiptImage.map((card) => loadimg(card, workerdata)));
      setImgs(imgData);
    };
    fetchImgs();
  }, [receipt.receiptImage]);

  const handleRemove = () => {
    const key = receipt.receiptImage[index];
    const newImgs = imgs.filter((img, i) => i !== index);
    setImgs(newImgs);
    setIndex(0);
    remove(key, receipt, receipt.id, setLoading);
  };

  const handleAdd = (event) => {
    const newFiles = Array.from(event.target.files);
    const newImgs = imgs.concat(newFiles.map((file) => URL.createObjectURL(file)));
    for (let i = 0; i < newFiles.length; i++) {
      upload(newFiles[i], receipt, i, receipt.id, setLoading);
    }
    setImgs(newImgs);
    setIndex(0);
  };

  return (
    <Grid item container xs={12} md={5} spacing={2}>
      <Grid item xs={12}>
        <Swiper
          onSlideChange={(swiper) => {
            setIndex(swiper.activeIndex);
          }}
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true}
          spaceBetween={50}
          slidesPerView={1}
        >
          {imgs.map((img) => (
            <SwiperSlide key={img}>
              <img
                src={img}
                alt="receipt"
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleRemove}
          disabled={imgs.length === 0 || loading || !isEmpty}
        >
          Remove
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" color="primary" fullWidth component="label" disabled={!isEmpty || loading}>
          <input accept="image/*" id="icon-button-file" type="file" hidden onChange={handleAdd} />
          Add
        </Button>
      </Grid>
    </Grid>
  );
};
