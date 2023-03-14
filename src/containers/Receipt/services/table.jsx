import React, { useState, useEffect } from "react";
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
  Collapse,
  InputAdornment,
} from "@mui/material";
import { DataStore, Storage, Auth } from "aws-amplify";
import { Receipt, Currency, PaymentMethod, Classification } from "../../../models";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";
import { PropTypes } from "prop-types";
import { metodlist, classlist, taxlist } from "./arrays";

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
      type="number"
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

const Filesave = ({ files, data, isEmpty, lang, setLoading, cancel }) => {
  const handleClick = async () => addreceipt(data, files, setLoading).then(() => cancel());

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
  const [method, setMethod] = useState("");
  const [other, setOther] = useState("");

  const handleMethodChange = (value) => {
    let method = value.target.value;
    setMethod(method);
  };

  const handleChange = (value) => {
    let method = value.target.value;
    setOther(method);
  };

  useEffect(() => setData({ ...data, otherMethod: other }), [other]);

  useEffect(() => setData({ ...data, method: method }), [method]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="method-label">{lang.method}</InputLabel>
        <Select
          labelId="method-label"
          id="method"
          disabled={!isEmpty}
          label={lang.method}
          value={method}
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
      <Collapse in={method === PaymentMethod.OTHER}>
        <TextField id="other" value={other} label={"toinen"} onChange={handleChange} disabled={!isEmpty} />
      </Collapse>
    </>
  );
};

const ClassificationSelect = ({ data, setData, isEmpty, lang }) => {
  const handleClassificationChange = (value) => setData({ ...data, class: value.target.value });

  return (
    <FormControl fullWidth>
      <InputLabel id="class-label">{lang.class}</InputLabel>
      <Select
        labelId="class-label"
        id="class"
        disabled={!isEmpty}
        label={lang.class}
        value={data.class}
        onChange={handleClassificationChange}
        input={<InputBase />}
      >
        {classlist(lang.classes).map((classi) => {
          return (
            <MenuItem key={classi.value} value={classi.value}>
              {classi.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const Taxselect = ({ data, setData, isEmpty, lang }) => {
  const [tax, setTax] = useState(0.24);
  const [otherManualTax, setOtherManualTax] = useState(0);

  const handleTaxChange = (value) => setTax(value.target.value);
  const handleChange = (value) => {
    let tax = value.target.value;
    let taxlength = tax.length;

    if (taxlength > 2) tax = tax.slice(0, 2);
    setOtherManualTax(tax);
  };

  useEffect(() => {
    let tax = otherManualTax / 100;
    setData({ ...data, tax: tax });
  }, [otherManualTax]);

  useEffect(() => setData({ ...data, tax: tax }), [tax]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="tax-label">{lang.tax}</InputLabel>
        <Select
          labelId="tax-label"
          id="tax"
          disabled={!isEmpty}
          label={lang.tax}
          value={tax}
          onChange={handleTaxChange}
          input={<InputBase />}
        >
          {taxlist.map((tax) => {
            return (
              <MenuItem key={tax.value} value={tax.value}>
                {tax.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Collapse in={tax === 0}>
        <TextField
          id="tax"
          label="Manualinen vero"
          mt={1}
          value={otherManualTax}
          onChange={handleChange}
          disabled={!isEmpty}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Collapse>
    </>
  );
};

const onUpload = async (file, id, index, setLoading) => {
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
    return result;
  } catch (error) {
    console.warn("Error uploading file: ", error);
  }
};

const addreceipt = async (data, images, setLoading) => {
  if (!images) return;
  const keys = [];
  const id = Date.now();
  for (let i = 0; i < images.length; i++) {
    const result = await onUpload(images[i], id, i, setLoading);
    keys.push(result.key);
  }

  try {
    console.log(data);

    const user = await Auth.currentAuthenticatedUser();

    const newReceipt = {
      userId: user.attributes.sub,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      dateOfPurchase: new Date(data.date).toISOString(),
      placeOfPurchase: data.place,
      receiptNumber: data.number,
      receiptType: "INVOICE",
      price: Number.parseFloat(data.amount),
      currency: data.currency,
      receiptImage: keys,
      tax: Number(data.tax),
      paymentMethod: data.method,
      otherPayment: data.otherMethod,
      comment: data.comment,
      isTravel: false,
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
    otherMethod: "",
    category: "",
  },
  setData,
  files,
  cancel,
  isEmpty,
  lang,
  setLoading,
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
            <TableCell>{lang.class}</TableCell>
            <TableCell colSpan={2}>
              <ClassificationSelect data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
            </TableCell>
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
            <TableCell>{lang.tax}</TableCell>
            <TableCell colSpan={2}>
              <Taxselect data={data} setData={setData} lang={lang} isEmpty={isEmpty} />
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
                <Filesave
                  files={files}
                  data={data}
                  lang={lang.buttons}
                  isEmpty={isEmpty}
                  setLoading={setLoading}
                  cancel={cancel}
                />
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
