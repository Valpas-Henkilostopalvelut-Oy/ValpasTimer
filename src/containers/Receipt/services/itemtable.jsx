import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputBase,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { DataStore, Storage, Auth } from "aws-amplify";
import { Receipt, Currency, PaymentMethod, Classification } from "../../../models";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";

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

const DateOfPurchase = ({ receipt, setReceipt, edit = false }) => {
  const [dateOfPurchase, setDateOfPurchase] = useState(new Date(receipt.dateOfPurchase));

  return edit ? (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
      <DatePicker
        label="Date of purchase"
        value={dateOfPurchase}
        disableMaskedInput
        onChange={(newValue) => {
          setDateOfPurchase(newValue);
          setReceipt({ ...receipt, dateOfPurchase: newValue.toISOString() });
        }}
        renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
      />
    </LocalizationProvider>
  ) : (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        color: "text.secondary",
      }}
    >
      {new Date(receipt.dateOfPurchase).toLocaleDateString("fi-FI")}
    </Typography>
  );
};

const Placeofpurchase = ({ receipt, setReceipt, edit = false }) => {
  return edit ? (
    <TextField
      label="Place of purchase"
      value={receipt.placeOfPurchase}
      onChange={(e) => setReceipt({ ...receipt, placeOfPurchase: e.target.value })}
      variant="standard"
      fullWidth
    />
  ) : (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        color: "text.secondary",
      }}
    >
      {receipt.placeOfPurchase}
    </Typography>
  );
};

const ReceiptNumber = ({ receipt, setReceipt, edit = false }) => {
  return edit ? (
    <TextField
      label="Receipt number"
      value={receipt.receiptNumber}
      onChange={(e) => setReceipt({ ...receipt, receiptNumber: e.target.value })}
      variant="standard"
      fullWidth
    />
  ) : (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        color: "text.secondary",
      }}
    >
      {receipt.receiptNumber}
    </Typography>
  );
};

export const ItemTable = ({ oldReceipt, lang }) => {
  const [receipt, setReceipt] = useState(oldReceipt);
  const [edit, setEdit] = useState(false);
  const createdAt = new Date(receipt.created).toLocaleDateString("fi-FI");
  const updateAt = new Date(receipt.updated).toLocaleDateString("fi-FI");

  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell width={"40%"}>Receipt details</TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>Receipt created</TableCell>
            <TableCell colSpan={2}>{createdAt}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Receipt updated</TableCell>
            <TableCell colSpan={2}>{updateAt}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date of purchase</TableCell>
            <TableCell colSpan={2}>
              <DateOfPurchase receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Place of purchase</TableCell>
            <TableCell colSpan={2}>
              <Placeofpurchase receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Receipt number</TableCell>
            <TableCell colSpan={2}>
              <ReceiptNumber receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Class</TableCell>
            <TableCell colSpan={2}>{receipt.class}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>{receipt.price}</TableCell>
            <TableCell>{receipt.currency}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell colSpan={2}>{receipt.tax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Payment method</TableCell>
            <TableCell colSpan={2}>{receipt.paymentMethod}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Comment</TableCell>
            <TableCell colSpan={2}>{receipt.comment}</TableCell>
          </TableRow>
          {edit ? (
            <TableRow>
              <TableCell>
                <Button variant="outlined" onClick={() => setEdit(false)} fullWidth>
                  Cancel
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => setEdit(false)} fullWidth>
                  Save
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={() => setEdit(true)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" fullWidth>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
