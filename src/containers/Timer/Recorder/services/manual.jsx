import React, { useState } from "react";
import { Grid } from "@mui/material";
import { EditDescription } from "./editdescription.jsx";
import { EditWorkplaceManual } from "./editworkplace.jsx";
import { Editdate, Edittime, Edetime, Totaltime, Createtimeentry } from "./times.jsx";
import { PropTypes } from "prop-types";
import { EditWorkitemManual } from "./editworkitem.jsx";

const findWork = (w, workitem) => {
  return w.forEach((element) => {
    return element.works && element.works.find((work) => work.id === workitem);
  });
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
        <Edittime time={sTime} setTime={setSTime} label={lang.start_time} date={date} />
      </Grid>
      <Grid item xs={4} md={2.4}>
        <Edittime time={eTime} setTime={setETime} label={lang.end_time} date={date} />
      </Grid>
      <Grid item xs={12} md={2.4}>
        <Totaltime sTime={sTime} eTime={eTime} />
      </Grid>
      <Grid item xs={12} md={2.4}>
        <Createtimeentry
          description={description}
          sel={sel}
          sTime={sTime}
          eTime={eTime}
          workit={workit}
          lang={lang}
          setWorkit={setWorkitem}
          setDescription={setDescription}
          setSel={setSel}
          setSTime={setSTime}
          setETime={setETime}
        />
      </Grid>
    </Grid>
  );
};

Manual.propTypes = {
  description: PropTypes.string,
  setDescription: PropTypes.func,
  sel: PropTypes.string,
  setSel: PropTypes.func,
  works: PropTypes.array,
  lang: PropTypes.object,
  workitems: PropTypes.array,
  workitem: PropTypes.string,
  setWorkitem: PropTypes.func,
};
