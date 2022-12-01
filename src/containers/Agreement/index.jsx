import React, { useState, useEffect, Fragment } from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Toolbar, Paper } from "@mui/material";
import { DataStore } from "aws-amplify";
import { Agreement } from "../../models";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AgreementPage = () => {
  const [agreements, setAgreements] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const loadAgreements = async () => {
    await DataStore.query(Agreement)
      .then((agreements) => {
        setAgreements(agreements.sort((a, b) => a.name.localeCompare(b.title)));
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    let isActive = false;
    !isActive && loadAgreements();
    return () => (isActive = true);
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          bgcolor: "default.white",
          borderRadius: "4px 4px 0 0",
        }}
        component={Paper}
      >
        <Typography color="inherit" variant="subtitle1" component="div" sx={{ flex: "1 1 100%" }}>
          Perehdykset
        </Typography>
      </Toolbar>
      {agreements &&
        agreements.map((item, k) => (
          <Fragment key={k}>
            <Accordion expanded={expanded === k} onChange={handleChange(k)} sx={{}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={item.name} id={item.name}>
                <Typography sx={{ width: "33%", flexShrink: 0 }}>{item.name}</Typography>
                <Typography sx={{ pr: 4, pl: 4 }}>3/4 complete (example)</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                {item.aditionalInfo.map((subItem, k) => (
                  <Accordion key={k}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={subItem.name} id={subItem.name}>
                      <Typography>{subItem.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{subItem.description}</AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          </Fragment>
        ))}
    </Container>
  );
};
