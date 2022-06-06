import React, { useState, useEffect, Fragment } from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { AgreementToolbar } from "./Toolbar";
import { AdminPanel } from "./AdminPanel";
import { DataStore } from "aws-amplify";
import { Agreement } from "../../models";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AgreementPage = () => {
  const [agreements, setAgreements] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const loadAgreements = async () => {
    await DataStore.query(Agreement)
      .then((agreements) => {
        setAgreements(agreements.sort((a, b) => a.title.localeCompare(b.title)));
      })
      .catch((error) => console.log(error));
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
      <AgreementToolbar isAdmin={false} reload={loadAgreements} />
      {agreements &&
        agreements.map((item, k) => (
          <Fragment key={k}>
            <Accordion expanded={expanded === k} onChange={handleChange(k)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={item.title} id={item.title}>
                <Typography sx={{ width: "33%", flexShrink: 0 }}>{item.title}</Typography>
                <Typography sx={{ pr: 4, pl: 4 }}>3/4 complete (example)</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <AdminPanel id={item.id} data={item} reload={loadAgreements} onOpen={expanded === k} />
                {item.subInfo.map((subItem, k) => (
                  <Accordion key={k}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={subItem.title} id={subItem.title}>
                      <Typography>{subItem.title}</Typography>
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
