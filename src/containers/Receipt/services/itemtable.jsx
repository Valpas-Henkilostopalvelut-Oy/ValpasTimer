import React, { useEffect, useState } from "react";
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
  Collapse,
  InputAdornment,
} from "@mui/material";
import { DataStore, Storage, Auth } from "aws-amplify";
import { Receipt, Currency, PaymentMethod as PaymentData } from "../../../models";
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
      type={"number"}
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
  const [tax, setTax] = useState(receipt.tax);
  const [manual, setManual] = useState(0);

  const handleChange = (event) => {
    setTax(event.target.value);
  };

  const handleChangeManual = (event) => {
    let tax = event.target.value;
    let taxlength = tax.length;
    if (taxlength > 2) tax = tax.slice(0, 2);
    setManual(tax);
  };

  useEffect(() => {
    let tax = manual / 100;
    setReceipt({ ...receipt, tax: tax });
  }, [manual]);

  useEffect(() => setReceipt({ ...receipt, tax: tax }), [tax]);

  return edit ? (
    <>
      <FormControl fullWidth>
        <Select labelId="tax-label" id="tax" value={receipt.tax} onChange={handleChange} variant="standard">
          <MenuItem value={null} hidden>
            <em>None</em>
          </MenuItem>
          <MenuItem value={receipt.tax}>{receipt.tax * 100} %</MenuItem>
          {taxlist.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Collapse in={tax === 0}>
        <TextField
          value={manual}
          onChange={handleChangeManual}
          id="tax"
          label="Manualinen vero"
          mt={1}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Collapse>
    </>
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
  const [paymentMethod, setPaymentMethod] = useState(receipt.paymentMethod);
  const [manual, setManual] = useState("");
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleChangeManual = (event) => {
    setManual(event.target.value);
  };

  useEffect(() => setReceipt({ ...receipt, otherPayment: manual }), [manual]);
  useEffect(() => setReceipt({ ...receipt, paymentMethod: paymentMethod }), [paymentMethod]);

  return edit ? (
    <Box>
      <FormControl fullWidth>
        <Select
          labelId="payment-method-label"
          id="payment-method"
          value={paymentMethod}
          onChange={handleChange}
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
      <Collapse in={paymentMethod === "OTHER"}>
        <TextField
          value={manual}
          id="other-payment"
          onChange={handleChangeManual}
          label="Muu maksutapa"
          mt={1}
          variant="standard"
          fullWidth
        />
      </Collapse>
    </Box>
  ) : (
    <>
      <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.secondary" }}>
        {metodlist().find((item) => item.value === receipt.paymentMethod)?.label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.secondary" }} hidden={receipt.otherPayment}>
        {receipt.otherPayment}
      </Typography>
    </>
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

const ItemTable = (props) => {
  const { receipt, oldReceipt, setReceipt } = props;
  const [edit, setEdit] = useState(false);
  const createdAt = new Date(receipt.created).toLocaleDateString("fi-FI");
  const updateAt = new Date(receipt.updated).toLocaleDateString("fi-FI");

  const handleCancel = () => {
    setReceipt(oldReceipt);
    setEdit(false);
  };
  const handleDelete = () => deleteReceipt(oldReceipt, receipt, oldReceipt.id);
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
            <TableCell width={"40%"}>Kuitin tiedot</TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>Kuitin luonti</TableCell>
            <TableCell colSpan={2}>{createdAt}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kuittin päivitys</TableCell>
            <TableCell colSpan={2}>{updateAt}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ostopäivä</TableCell>
            <TableCell colSpan={2}>
              <DateOfPurchase receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ostopaikka</TableCell>
            <TableCell colSpan={2}>
              <Placeofpurchase receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kuitin numero</TableCell>
            <TableCell colSpan={2}>
              <ReceiptNumber receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Typpi</TableCell>
            <TableCell colSpan={2}>
              <Class receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hinta</TableCell>
            <TableCell>
              <Price receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
            <TableCell>
              <CurrencySelect receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vero</TableCell>
            <TableCell colSpan={2}>
              <TaxSelect receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ostotapa</TableCell>
            <TableCell colSpan={2}>
              <PaymentMethod receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kuvaus</TableCell>
            <TableCell colSpan={2}>
              <Comment receipt={receipt} setReceipt={setReceipt} edit={edit} />
            </TableCell>
          </TableRow>
          {edit ? (
            <TableRow>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleCancel}>
                  Peruuta
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleSave}>
                  Tallenna
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleDelete} color="error">
                  Poista
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleEdit}>
                  Muokkaa
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" fullWidth onClick={handleDelete} color="error">
                  Poista
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
