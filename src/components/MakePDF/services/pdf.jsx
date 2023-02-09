import { PDFDocument } from "pdf-lib";
import * as contentful from "contentful";

const getYear = (d) => {
  let year = new Date(d[0].arr[0].arr[0].timeInterval.start).getFullYear();
  return year;
};

const getDay = (d) => {
  const date = new Date(d);
  const dayName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][date.getDay()];
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");

  let value = `${day}.${month}`;

  return { dayName, value };
};

const getWorkName = (workplace, works) => {
  const work = works.find((work) => work.id === workplace);
  return work.name;
};

const getTotal = (start, end, data) => {
  var h = 0;
  var m = 0;
  let breakstotal = getTotalBreaks(data);

  let total = Date.parse(end) - Date.parse(start) - breakstotal;
  h = h + Math.floor(total / (1000 * 60 * 60));
  m = m + Math.floor((total / (1000 * 60)) % 60);
  if (m > 59) {
    h++;
    m = m % 60;
  }

  h = parseInt(h, 10);
  m = m ? parseInt(m, 10) : 0;
  return (h + m / 60).toFixed(2);
};

const getTotalBreaks = (breaks) => {
  let total = 0;
  if (breaks === null) return total;
  breaks.forEach((b) => {
    let start = new Date(b.start);
    let end = new Date(b.end);
    total += Date.parse(end) - Date.parse(start);
  });

  return total;
};

const getArrTotal = (arr) => {
  var h = 0;
  var m = 0;
  let breakstotal = 0;

  arr.forEach((a) => {
    breakstotal = getTotalBreaks(a.break);

    let total = Date.parse(a.timeInterval.end) - Date.parse(a.timeInterval.start) - breakstotal;

    h = h + Math.floor(total / (1000 * 60 * 60));
    m = m + Math.floor((total / (1000 * 60)) % 60);
    if (m > 59) {
      h++;
      m = m % 60;
    }
  });

  h = parseInt(h, 10);
  m = m ? parseInt(m, 10) : 0;

  return (h + m / 60).toFixed(2);
};

const check = (arr, sTime, eTime) => {
  var totalSec = 0;
  var totalSec2 = 0;
  var h = 0;
  var m = 0;
  sTime = new Date(sTime);
  eTime = new Date(eTime);

  totalSec2 = (eTime - sTime) / 1000;

  arr.forEach((a) => {
    let start = new Date(a.timeInterval.start);
    let end = new Date(a.timeInterval.end);

    totalSec = totalSec + (end - start) / 1000;
  });

  var diff = totalSec2 - totalSec;

  m = diff / 60;

  while (m > 60) {
    h++;
    m = m - 60;
  }

  if (diff < 3600) return "";
  else if (h === 0) return m.toFixed(0);
  else return h + "h " + m.toFixed(0) + "min muu menoja";
};

const getTotalWeek = (arr, workplace) => {
  var h = 0;
  var m = 0;
  var breakstotal = 0;

  arr.forEach((day) => {
    let arr =
      day.arr.filter((a) => a.workId === workplace).length > 0
        ? day.arr.filter((a) => a.workId === workplace)[0].arr
        : [];
    arr = arr.filter((a) => a.isSent && a.isConfirmed);

    if (arr.length === 0) return;
    arr.forEach((a) => {
      breakstotal = getTotalBreaks(a.break);
      let total = Date.parse(a.timeInterval.end) - Date.parse(a.timeInterval.start) - breakstotal;
      h = h + Math.floor(total / (1000 * 60 * 60));
      m = m + Math.floor((total / (1000 * 60)) % 60);
      if (m > 59) {
        h++;
        m = m % 60;
      }
    });
  });

  h = parseInt(h, 10);
  m = m ? parseInt(m, 10) : 0;

  return (h + m / 60).toFixed(2);
};

const convertBreaks = (breaks) => {
  if (breaks === null) return "";
  let b = new Date(getTotalBreaks(breaks));
  let h = b.getUTCHours();
  let m = b.getUTCMinutes();

  h = parseInt(h, 10);
  m = m ? parseInt(m, 10) : 0;

  return h !== 0 || m !== 0 ? ` - ${(h + m / 60).toFixed(2)}` : "";
};

const convertArrBreaks = (arr) => {
  let h = 0;
  let m = 0;

  arr.forEach((a) => {
    let b = new Date(getTotalBreaks(a.break));
    h += b.getUTCHours();
    m += b.getUTCMinutes();
  });

  h = parseInt(h, 10);
  m = m ? parseInt(m, 10) : 0;

  return h !== 0 || m !== 0 ? ` - ${(h + m / 60).toFixed(2)}` : "";
};

const getDate = (item) => {
  let arr = item.arr;
  let date = new Date();
  for (let i = 0; i < arr.length; i++) {
    arr = arr[i].arr;
    for (let j = 0; j < arr.length; j++) {
      arr = arr[j].arr;
      for (let k = 0; k < arr.length; k++) {
        if (arr[k].isSent && arr[k].isConfirmed && arr[k].confirmedAt) {
          date = new Date(arr[k].confirmedAt);
        } else return "Ilman päivämäärää";
      }
    }
  }

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const setToPDF = async (form, data, workplace, works, user, page = "") => {
  const days = data.arr;

  form.getField("year" + page).setText(String(getYear(days)));
  form.getField("client" + page).setText(getWorkName(workplace, works));
  form.getField("worker" + page).setText(user.last_name + " " + user.first_name);
  form.getField("total" + page).setText(String(getTotalWeek(days, workplace)));
  form.getField("week" + page).setText(String(data.week));
  form.getField("signature" + page).setText("Allekirjoitettu sähköisesti");
  form.getField("date" + page).setText(getDate(data));

  days.forEach((day) => {
    let arr =
      day.arr.filter((a) => a.workId === workplace).length > 0
        ? day.arr.filter((a) => a.workId === workplace)[0].arr
        : [];

    arr = arr.filter((a) => a.isSent && a.isConfirmed);

    if (arr.length === 0) return;
    let values = getDay(arr[0].timeInterval.start);

    form.getField(values.dayName + page).setText(values.value);

    if (arr.length === 1) {
      let start = new Date(arr[0].timeInterval.start);
      let end = new Date(arr[0].timeInterval.end);

      let startTime = `${
        String(start.getHours()).length > 1 ? String(start.getHours()) : "0" + String(start.getHours())
      }:${String(start.getMinutes()).length > 1 ? String(start.getMinutes()) : "0" + String(start.getMinutes())}`;

      let endTime = `${String(end.getHours()).length > 1 ? String(end.getHours()) : "0" + String(end.getHours())}:${
        String(end.getMinutes()).length > 1 ? String(end.getMinutes()) : "0" + String(end.getMinutes())
      }`;

      form.getField(values.dayName + "-start-time" + page).setText(startTime);
      form.getField(values.dayName + "-end-time" + page).setText(endTime);
      form
        .getField(values.dayName + "-total" + page)
        .setText(String(getTotal(arr[0].timeInterval.start, arr[0].timeInterval.end, arr[0].break)));

      form.getField(values.dayName + "-description" + page).setText(convertBreaks(arr[0].break));
    } else {
      var sTimes = arr.map((a) => Date.parse(a.timeInterval.start));
      var sTime = sTimes.sort((a, b) => a - b)[0];

      var eTimes = arr.map((a) => Date.parse(a.timeInterval.end));
      var eTime = eTimes.sort((a, b) => b - a)[0];

      let startTime = `${
        String(new Date(sTime).getHours()).length > 1
          ? String(new Date(sTime).getHours())
          : "0" + String(new Date(sTime).getHours())
      }:${
        String(new Date(sTime).getMinutes()).length > 1
          ? String(new Date(sTime).getMinutes())
          : "0" + String(new Date(sTime).getMinutes())
      }`;

      let endTime = `${
        String(new Date(eTime).getHours()).length > 1
          ? String(new Date(eTime).getHours())
          : "0" + String(new Date(eTime).getHours())
      }:${
        String(new Date(eTime).getMinutes()).length > 1
          ? String(new Date(eTime).getMinutes())
          : "0" + String(new Date(eTime).getMinutes())
      }`;

      form.getField(values.dayName + "-start-time" + page).setText(startTime);
      form.getField(values.dayName + "-end-time" + page).setText(endTime);
      form.getField(values.dayName + "-total" + page).setText(String(getArrTotal(arr)));
      form.getField(values.dayName + "-description" + page).setText(check(arr, sTime, eTime));
      form.getField(values.dayName + "-description" + page).setText(convertArrBreaks(arr));
    }
  });
};

export const fillWeek = async (data, workplace, works, user) => {
  if (data === undefined) return;
  user = { last_name: user.attributes.family_name, first_name: user.attributes.name };

  var client = await contentful.createClient({
    space: "pqh23768z4fv",
    accessToken: "P58WCeZ_VJ2LViEsyZ0JoFPe6lMnNy66ZUXhEeV41e4",
  });
  const pdf = "https:" + (await client.getAsset("1f8M5YAdHt4MIqVXIjZf8T")).fields.file.url;
  const existingPdfBytes = await fetch(pdf).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  if (data.length >= !0) {
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        await setToPDF(form, data[i], workplace, works, user);
      } else {
        await setToPDF(form, data[i], workplace, works, user, "-2");
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  //download pdf

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${user.last_name}-${user.first_name}.pdf`;
  link.click();
};
