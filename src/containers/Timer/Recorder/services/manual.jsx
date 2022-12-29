import React, { useState } from "react";
import { Grid } from "@mui/material";
import { EditDescription } from "./editdescription.jsx";
import { EditWorkplaceManual } from "./editworkplace.jsx";
import { Editdate, Editstime, Edetime, Totaltime, Createtimeentry } from "./times.jsx";
import { PropTypes } from "prop-types";
import { EditWorkitemManual } from "./editworkitem.jsx";

const findWork = (w, workitem) => {
  let q;
  w.forEach((element) => {
    q = element.works.find((work) => work.id === workitem);
  });

  return q;
};

export const Manual = ({ description, sel, setDescription, setSel, works, lang, workitems, workitem, setWorkitem }) => {
  const [date, setDate] = useState(new Date());
  const [sTime, setSTime] = useState(new Date());
  const [eTime, setETime] = useState(new Date());
  const workit = workitem ? findWork(works, workitem) : null;

  return (
    <Grid container spacing={2} display="flex" alignItems="center" justifyContent="space-around">
      <Grid item xs={6}>
        <EditWorkplaceManual sel={sel} setSel={setSel} works={works} lang={lang} />
      </Grid>
      <Grid item xs={6}>
        <EditWorkitemManual workitem={workitem} setWorkitem={setWorkitem} workitems={workitems} lang={lang} />
      </Grid>

      <Grid item xs={12}>
        <EditDescription description={description} setDescription={setDescription} lang={lang} />
      </Grid>

      <Grid item xs={4} md={2.4}>
        <Editdate
          date={date}
          setDate={setDate}
          sTime={sTime}
          eTime={eTime}
          setSTime={setSTime}
          setETime={setETime}
          lang={lang}
        />
      </Grid>
      <Grid item xs={4} md={2.4}>
        <Editstime sTime={sTime} setSTime={setSTime} lang={lang} date={date} />
      </Grid>
      <Grid item xs={4} md={2.4}>
        <Edetime eTime={eTime} setETime={setETime} lang={lang} date={date} />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Totaltime sTime={sTime} eTime={eTime} />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Createtimeentry description={description} sel={sel} sTime={sTime} eTime={eTime} workit={workit} lang={lang} />
      </Grid>
    </Grid>
  );
};

Manual.propTypes = {
  description: PropTypes.string,
  sel: PropTypes.string,
  setDescription: PropTypes.func,
  setSel: PropTypes.func,
  works: PropTypes.array,
  lang: PropTypes.object,
};
