import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { EditDescription } from "./editdescription.jsx";
import { EditWorkplaceManual } from "./editworkplace.jsx";
import { Editdate, Edittime, Totaltime, Createtimeentry } from "./times.jsx";
import { PropTypes } from "prop-types";
import { EditWorkitemManual } from "./editworkitem.jsx";

const findWork = (w, workitem) => {
  return w.forEach((element) => {
    return element.works && element.works.find((work) => work.id === workitem);
  });
};

const maxRange = (d, date) => {
  /*{date: 'Ti 10.1', id: 'Tue Jan 10 2023', arr: Array(1)}*/

  if (d.length > 0) {
    let q = d[0].arr.filter((item) => item.id === new Date(date).toDateString());
    if (q.length > 0) {
      //sort by end time, latest first
      q[0].arr[0].arr.sort((a, b) => {
        return new Date(b.timeInterval.end) - new Date(a.timeInterval.end);
      });

      return q[0].arr[0].arr[0].timeInterval.end;
    } else return null;
  } else return null;
};

const minRange = (d, date) => {
  /*{date: 'Ti 10.1', id: 'Tue Jan 10 2023', arr: Array(1)}*/

  if (d.length > 0) {
    let q = d[0].arr.filter((item) => item.id === new Date(date).toDateString());
    if (q.length > 0) {
      //sort by start time, latest first
      q[0].arr[0].arr.sort((a, b) => {
        return new Date(a.timeInterval.start) - new Date(b.timeInterval.start);
      });

      return q[0].arr[0].arr[0].timeInterval.start;
    } else return null;
  } else return null;
};

export const Manual = ({
  thisweek,
  description,
  sel,
  setDescription,
  setSel,
  works,
  lang,
  workitems,
  workitem,
  setWorkitem,
}) => {
  const [date, setDate] = useState(new Date());
  const [sTime, setSTime] = useState(new Date());
  const [eTime, setETime] = useState(new Date());
  const workit = workitem ? findWork(works, workitem) : null;
  const [error, setError] = useState(false);
  const maxTime = new Date(maxRange(thisweek, date));
  const minTime = new Date(minRange(thisweek, date));

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
        <Edittime
          time={sTime}
          time2={eTime}
          setTime={setSTime}
          label={lang.start_time}
          date={date}
          minTime={minTime}
          maxTime={maxTime}
          error={error}
          setError={setError}
        />
      </Grid>
      <Grid item xs={4} md={2.4}>
        <Edittime
          time={eTime}
          time2={sTime}
          setTime={setETime}
          label={lang.end_time}
          date={date}
          minTime={minTime}
          maxTime={maxTime}
          error={error}
          setError={setError}
        />
      </Grid>
      <Grid item xs={12} md={2.4}>
        <Totaltime sTime={sTime} eTime={eTime} />
      </Grid>
      <Grid item xs={12} md={2.4}>
        <Createtimeentry
          error={error}
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
          date={date}
        />
      </Grid>
    </Grid>
  );
};

Manual.propTypes = {
  thisweek: PropTypes.array,
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
