import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Checkbox,
  Tooltip,
  IconButton,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataStore, Auth } from "aws-amplify";
import { Worktravel, Receipt } from "../../../models";
import fi from "date-fns/locale/fi";
import { Route } from "./travelroute";

const Receiptitem = (props) => {
  const { travel, setTravel, isEmpty, receipt, select } = props;
};

export const Attachments = (props) => {
  const { travel, setTravel, isEmpty } = props;
  const [receipts, setReceipts] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  /**
   * attachedReceipt: {
    "id": Date.now(),
    "receiptId": "1",
    "userId": "669172d6-f6c2-44a1-95fd-43255acdf6b4",
    "placeOfPurchase": "",
    "price": 0,
    "currency": "EUR",
    "tax": 0.24,
    "isTravel": null,
}
   */
  useEffect(() => {
    const fetchReceipts = async () => {
      const user = await Auth.currentAuthenticatedUser();
      await DataStore.query(Receipt).then((res) => {
        console.log(res);
        setReceipts(
          res
            .filter((receipt) => receipt.userId === user.attributes.sub)
            .map((receipt) => ({
              id: String(Date.now()),
              receiptId: receipt.id,
              userId: receipt.userId,
              placeOfPurchase: receipt.placeOfPurchase,
              dateOfPurchase: receipt.dateOfPurchase,
              price: receipt.price,
              currency: receipt.currency,
              tax: receipt.tax,
              isTravel: receipt.isTravel,
            }))
        );
      });
    };
    fetchReceipts();
  }, [isEmpty]);

  const handleClick = () => setIsAdding(true);
  const handleToggle = (value) => {
    const currentIndex = travel.attachments.indexOf(value);
    const newChecked = [...travel.attachments];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setTravel({
      ...travel,
      attachments: newChecked,
    });
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.500",
        borderRadius: 1,
        p: 2,
        mb: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box hidden={!isAdding}>
            <Typography variant="h6">Lisää liite</Typography>
            {receipts.length !== 0 ? (
              <List>
                {receipts.map((receipt) => {
                  const labelId = `checkbox-list-label-${receipt.id}`;
                  let date = new Date(receipt.dateOfPurchase).toLocaleDateString("fi-FI");
                  let price = receipt.price;
                  let place = receipt.placeOfPurchase;
                  let currency = receipt.currency;
                  const checked = travel.attachments.indexOf(receipt) !== -1;
                  return (
                    <ListItem key={receipt.id} disablePadding hidden={checked}>
                      <ListItemButton role={undefined} onClick={() => handleToggle(receipt)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${date} ${price} ${currency} ${place}`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Typography variant="body1">Ei liitteitä</Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box hidden={!isAdding}>
            <Typography variant="h6">Valitut</Typography>
            <List>
              {travel.attachments.map((receipt) => {
                const labelId = `checkbox-list-label-${receipt.id}`;
                let date = new Date(receipt.dateOfPurchase).toLocaleDateString("fi-FI");
                let price = receipt.price;
                let place = receipt.placeOfPurchase;
                let currency = receipt.currency;
                const checked = travel.attachments.indexOf(receipt) !== -1;
                return (
                  <ListItem key={receipt.id} disablePadding hidden={!checked}>
                    <ListItemButton role={undefined} onClick={() => handleToggle(receipt)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${date} ${price} ${currency} ${place}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" disabled={!isEmpty && isAdding} onClick={handleClick} hidden={isAdding}>
            <Typography variant="body1">Valitse liite</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
