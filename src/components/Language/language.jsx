import React, { useEffect, useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { eng } from "./langs/eng.js";
import { fin } from "./langs/fin.js";
import { useAppContext } from "../../services/contextLib.jsx";

export const Language = ({ lang, setLang }) => {
  const { langValue, setLanguage } = useAppContext();
  const [langs, setLangs] = useState(null);
  const handleChange = (event) => {
    setLang(event.target.value);
    localStorage.setItem("lang", event.target.value);
  };

  useEffect(() => {
    let isActive = false;

    const loadLangs = () => {
      let l = [];
      l.push(eng);
      l.push(fin);

      console.log(langValue);

      const lang = localStorage.getItem("lang");

      if (lang !== null) {
        setLanguage(lang);
      } else {
        setLanguage("English");
      }

      setLangs(l);
    };

    !isActive && loadLangs();

    return () => (isActive = true);
  }, []);

  return (
    langs !== null && (
      <FormControl fullWidth>
        <InputLabel id="language-select-label">{langValue.lang_select}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={lang}
          label={langValue.lang_select}
          onChange={handleChange}
        >
          {langs.map((language) => (
            <MenuItem key={language.name} value={language.name}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};
