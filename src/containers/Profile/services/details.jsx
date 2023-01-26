import React, { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, IconButton } from "@mui/material";
import { PropTypes } from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Idnumber } from "./components/id_number";
import { Email } from "./components/email";
import { IBAN } from "./components/iban.jsx";
import { City } from "./components/city";
import { Birthdate } from "./components/birthdate";
import { Nationality } from "./components/nationality";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";

const phone = (phone) => {
  phone = String(phone);
};

const onSave = async (idnumber, phone, IBAN, locale, birthdate, nationality, close) => {
  await Auth.currentAuthenticatedUser()
    .then((user) => {
      Auth.updateUserAttributes(user, {
        "custom:id_number": idnumber,
        "custom:iban": IBAN,
        locale: locale,
        birthdate: birthdate,
        "custom:nationality": nationality,
      }).then((e) => {
        close();
      });
    })
    .catch((err) => console.warn(err));
};

export const Details = ({ cognito, data, lang }) => {
  const [edit, setEdit] = useState(false);
  const [idnumber, setIdnumber] = useState(
    cognito["custom:id_number"] !== undefined ? cognito["custom:id_number"] : ""
  );
  const [phone, setPhone] = useState(cognito.phone_number !== undefined ? cognito.phone_number : "");
  const [iban, setIban] = useState(cognito["custom:iban"] !== undefined ? cognito["custom:iban"] : "");
  const [locale, setLocale] = useState(cognito.locale !== undefined ? cognito.locale : "");
  const [birthdate, setBirthdate] = useState(cognito.birthdate !== undefined ? cognito.birthdate : "");
  const [nationality, setNationality] = useState(
    cognito["custom:nationality"] !== undefined ? cognito["custom:nationality"] : ""
  );

  const handleSave = () => onSave(idnumber, phone, iban, locale, birthdate, nationality, () => setEdit(false));

  return (
    <Box>
      <Box
        sx={{
          height: "120px",
          background:
            "linear-gradient(90deg, rgba(255,102,0,0.2973783263305322) 0%, rgba(0,173,239,0.3029805672268907) 100%)",
          borderRadius: "100px 0px 100px 0px",
        }}
      />
      <TableContainer>
        <Table aria-label="User details table">
          <TableHead>
            <TableRow>
              <TableCell align="right" colSpan={2}>
                {edit ? (
                  <IconButton aria-label="save" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="edit" onClick={() => setEdit(true)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell width={"35%"}>{lang.name}</TableCell>
              <TableCell>
                {cognito.name} {cognito.family_name}
              </TableCell>
            </TableRow>

            <Email data={data} cognito={cognito} lang={lang} />

            <TableRow>
              <TableCell width={"35%"}>{lang.phone}</TableCell>
              <TableCell>{cognito.phone_number}</TableCell>
            </TableRow>

            <Idnumber edit={edit} idnumber={idnumber} setIdnumber={setIdnumber} lang={lang} />

            <IBAN iban={iban} setIban={setIban} edit={edit} lang={lang} />

            <City locale={locale} setLocale={setLocale} edit={edit} lang={lang} />

            <Birthdate birthdate={birthdate} setBirthdate={setBirthdate} edit={edit} lang={lang} />

            <Nationality national={nationality} setNational={setNationality} edit={edit} lang={lang} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

Details.propTypes = {
  cognito: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
