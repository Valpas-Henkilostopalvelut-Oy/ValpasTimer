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
import { Receipt, Currency } from "../../../models";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";
import { metodlist, classlist, taxlist } from "./arrays";
import { deleteReceipt, updateReceipt } from "./itemfunctions";

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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
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

const Class = ({ receipt, setReceipt, edit = false }) => {
  console.log(receipt.class)
  return edit ? (
    <FormControl fullWidth>
      <Select
        labelId="class-label"
        id="class"
        value={receipt.class}
        onChange={(e) => setReceipt({ ...receipt, class: e.target.value })}
        variant="standard"
      >
        <MenuItem value={null} hidden>
          <em>None</em>
        </MenuItem>
        {classlist().map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        color: "text.secondary",
      }}
    >
      {classlist().find((item) => item.value === receipt.class)?.label}
    </Typography>
  );
};

const Price = ({ receipt, setReceipt, edit = false }) => {
  return edit ? (
    <TextField
      value={receipt.price}
      onChange={(e) => setReceipt({ ...receipt, price: e.target.value })}
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
      {receipt.price}
    </Typography>
  );
};

const CurrencySelect = ({ receipt, setReceipt, edit = false }) => {
  const currencies = Object.values(Currency);

  return edit ? (
    <FormControl fullWidth>
      <Select
        labelId="currency-label"
        id="currency"
        value={receipt.currency}
        onChange={(e) => setReceipt({ ...receipt, currency: e.target.value })}
        variant="standard"
      >
        <MenuItem value={null} hidden>
          <em>None</em>
        </MenuItem>
        {currencies.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        color: "text.secondary",
      }}
    >
      {receipt.currency}
    </Typography>
  );
};

const TaxSelect = ({ receipt, setReceipt, edit = false }) => {
  return edit ? (
    <FormControl fullWidth>
      <Select
        labelId="tax-label"
        id="tax"
        value={receipt.tax}
        onChange={(e) => setReceipt({ ...receipt, tax: e.target.value })}
        variant="standard"
      >
        <MenuItem value={null} hidden>
          <em>None</em>
        </MenuItem>
        {taxlist.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        color: "text.secondary",
      }}
    >
      {receipt.tax}
    </Typography>
  );
};

const PaymentMethod = ({ receipt, setReceipt, edit = false }) => {
  return edit ? (
    <FormControl fullWidth>
      <Select
        labelId="payment-method-label"
        id="payment-method"
        value={receipt.paymentMethod}
        onChange={(e) => setReceipt({ ...receipt, paymentMethod: e.target.value })}
        variant="standard"
      >
        <MenuItem value={null} hidden>
          <em>None</em>
        </MenuItem>
        {metodlist().map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        color: "text.secondary",
      }}
    >
      {metodlist().find((item) => item.value === receipt.paymentMethod)?.label}
    </Typography>
  );
};

const Comment = ({ receipt, setReceipt, edit = false }) => {
  return edit ? (
    <TextField
      value={receipt.comment}
      onChange={(e) => setReceipt({ ...receipt, comment: e.target.value })}
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
      {receipt.comment}
    </Typography>
  );
};

export const ItemTable = ({ receipt, oldReceipt, setReceipt, lang }) => {
  const [edit, setEdit] = useState(false);
  const createdAt = new Date(receipt.created).toLocaleDateString("fi-FI");
  const updateAt = new Date(receipt.updated).toLocaleDateString("fi-FI");
  const handleCancel = () => {
    setReceipt(oldReceipt);
    setEdit(false);
  };
  const handleDelete = () => {
    deleteReceipt(oldReceipt, receipt, oldReceipt.id);
  };
  const handleSave = () => {
    updateReceipt(oldReceipt, receipt, oldReceipt.id);
    setEdit(false);
  };
  const handleEdit = () => setEdit(true);

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
            <TableCell colSpan={2}>
              <Class receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>
              <Price receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
            <TableCell>
              <CurrencySelect receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell colSpan={2}>
              <TaxSelect receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Payment method</TableCell>
            <TableCell colSpan={2}>
              <PaymentMethod receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Comment</TableCell>
            <TableCell colSpan={2}>
              <Comment receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          {edit ? (
            <TableRow>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleCancel}>
                  Cancel
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleSave}>
                  Save
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleDelete} color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleEdit}>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleDelete} color="error">
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
