import React from "react";
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
} from "@mui/material";
import { DataStore, Storage, Auth } from "aws-amplify";
import { Receipt, Currency, PaymentMethod } from "../../../models";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";
import { PropTypes } from "prop-types";

const metodlist = (lang) => [
  { value: PaymentMethod.CASH, label: lang.cash },
  { value: PaymentMethod.OWNCARD, label: lang.card },
  { value: PaymentMethod.COMPANYCARD, label: lang.companycard },
  { value: PaymentMethod.BANKTRANSFER, label: lang.transfer },
  { value: PaymentMethod.OTHER, label: lang.other },
];

const Receiptdate = ({ data, setData, isEmpty, lang }) => {
  const handleDateChange = (value) => {
    setData({ ...data, date: value });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        disabled={!isEmpty}
        disableMaskedInput
        label={lang.date}
        value={data.date}
        onChange={handleDateChange}
        renderInput={(params) => {
          return <TextField {...params} variant="standard" />;
        }}
      />
    </LocalizationProvider>
  );
};

const Receiptnumber = ({ data, setData, isEmpty, lang }) => {
  const handleNumberChange = (value) => {
    setData({ ...data, number: value });
  };
  return <InputBase value={data.number} onChange={(e) => handleNumberChange(e.target.value)} disabled={!isEmpty} />;
};

const Placeofpurchase = ({ data, setData, isEmpty, lang }) => {
  const handlePlaceChange = (value) => {
    setData({ ...data, place: value });
  };
  return <InputBase value={data.place} onChange={(e) => handlePlaceChange(e.target.value)} disabled={!isEmpty} />;
};

const Amount = ({ data, setData, isEmpty, lang }) => {
  const handleAmountChange = (value) => {
    setData({ ...data, amount: value });
  };
  return (
    <InputBase
      id="amount"
      label="Amount"
      value={data.amount}
      onChange={(e) => handleAmountChange(e.target.value)}
      fullWidth
      disabled={!isEmpty}
    />
  );
};

const Selectcurrency = ({ data, setData, isEmpty, lang }) => {
  const handleCurrencyChange = (value) => setData({ ...data, currency: value.target.value });

  const currencies = Object.values(Currency);

  return (
    <FormControl fullWidth>
      <InputLabel id="currency-label">{lang.currency}</InputLabel>
      <Select
        labelId="currency-label"
        id="currency"
        disabled={!isEmpty}
        label={lang.currency}
        value={data.currency}
        onChange={handleCurrencyChange}
        input={<InputBase />}
      >
        {currencies.map((currency) => {
          return (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const Comment = ({ data, setData, isEmpty, lang }) => {
  const handleCommentChange = (value) => {
    setData({ ...data, comment: value });
  };
  return (
    <InputBase
      value={data.comment}
      onChange={(e) => handleCommentChange(e.target.value)}
      multiline
      rows={3}
      disabled={!isEmpty}
    />
  );
};

const Filesave = ({ files, data, isEmpty, lang }) => {
  const handleClick = () => addreceipt(data, files);

  return (
    <Button variant="outlined" onClick={handleClick} disabled={!isEmpty}>
      {lang.add}
    </Button>
  );
};

const Cancelsave = ({ cancel, isEmpty, lang }) => {
  return (
    <Button variant="outlined" onClick={cancel} disabled={!isEmpty}>
      {lang.cancel}
    </Button>
  );
};

const Paymentmethod = ({ data, setData, isEmpty, lang }) => {
  const handleMethodChange = (value) => setData({ ...data, method: value.target.value });

  return (
    <FormControl fullWidth>
      <InputLabel id="method-label">{lang.method}</InputLabel>
      <Select
        labelId="method-label"
        id="method"
        disabled={!isEmpty}
        label={lang.method}
        value={data.method}
        onChange={handleMethodChange}
        input={<InputBase />}
      >
        {metodlist(lang.methodselect).map((method) => {
          return (
            <MenuItem key={method.value} value={method.value}>
              {method.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const Classification = ({ data, setData, isEmpty, lang }) => {};

const onUpload = async (file) => {
  try {
    const result = await Storage.put(file.name, file, {
      contentType: file.type,
      level: "protected",
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });
    console.log("result: ", result);
    return result;
  } catch (error) {
    console.warn("Error uploading file: ", error);
  }
};

const addreceipt = async (data, images) => {
  if (!images) return;
  const keys = [];
  for (const image of images) {
    const result = await onUpload(image);
    keys.push(result.key);
  }

  try {
    const user = await Auth.currentAuthenticatedUser();

    const newReceipt = {
      userId: user.attributes.sub,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      dateOfPurchase: new Date(data.date).toISOString(),
      placeOfPurchase: data.place,
      receiptNumber: data.number,
      receiptType: "INVOICE",
      price: Number(data.amount),
      currency: data.currency,
      receiptImage: keys,
      tax: Number(data.tax),
      paymentMethod: data.method,
      comment: data.comment,
    };

    await DataStore.save(new Receipt(newReceipt));
  } catch (error) {
    console.warn("Error adding receipt: ", error);
  }
};

export const ReceiptTable = ({
  data = {
    date: new Date(),
    number: Number(""),
    amount: Number(""),
    class: "",
    currency: "EUR",
    place: "",
    tax: "",
    method: "CASH",
    category: "",
  },
  setData,
  files,
  cancel,
  isEmpty,
  lang,
}) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>{lang.title}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{lang.date}</TableCell>
            <TableCell colSpan={2}>
              <Receiptdate data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{lang.number}</TableCell>
            <TableCell colSpan={2}>
              <Receiptnumber data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{lang.place}</TableCell>
            <TableCell colSpan={2}>
              <Placeofpurchase data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{lang.method}</TableCell>
            <TableCell colSpan={2}>
              <Paymentmethod data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Classification</TableCell>
            <TableCell colSpan={2}></TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{lang.amount}</TableCell>
            <TableCell>
              <Amount data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
            </TableCell>
            <TableCell>
              <Selectcurrency data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{lang.comment}</TableCell>
            <TableCell colSpan={2}>
              <Comment data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Box display="flex" justifyContent="space-between">
                <Filesave files={files} data={data} lang={lang.buttons} isEmpty={isEmpty} />
                <Cancelsave cancel={cancel} lang={lang.buttons} isEmpty={isEmpty} />
              </Box>
            </TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ReceiptTable.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  files: PropTypes.array,
};
