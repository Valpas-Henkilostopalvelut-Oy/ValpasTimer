import { PDFDocument } from "pdf-lib";
import * as contentful from "contentful";
import { Auth } from "aws-amplify";

const getWorkerName = async () => {
  const user = await Auth.currentAuthenticatedUser();
  var first_name = user.attributes.name;
  var last_name = user.attributes.family_name;

  return first_name + " " + last_name;
};

const getYear = (d) => {
  return d.getFullYear();
};

const getDay = (d) => {
  const date = new Date(d);
  const day = date.getDay();
  const dayName = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"][day];
  const value = `${date.getDate()}.${date.getMonth()}`;

  return { dayName, value };
};

const getWorkName = (workplace, works) => {
  const work = works.find((work) => work.id === workplace);
  return work.name;
};

const getTotal = (start, end) => {
  var h = 0;
  var m = 0;

  let total = Date.parse(end) - Date.parse(start);
  h = h + Math.floor(total / (1000 * 60 * 60));
  m = m + Math.floor((total / (1000 * 60)) % 60);
  if (m > 59) {
    h++;
    m = m % 60;
  }

  h = parseInt(h, 10);
  m = m ? parseInt(m, 10) : 0;
  return h + m / 60;
};

const getArrTotal = (arr) => {
  var h = 0;
  var m = 0;

  arr.forEach((a) => {
    let total = Date.parse(a.timeInterval.end) - Date.parse(a.timeInterval.start);
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

export const fillWeek = async (data, workplace, works) => {
  if (data === undefined) return;
  var client = await contentful.createClient({
    space: "pqh23768z4fv",
    accessToken: "P58WCeZ_VJ2LViEsyZ0JoFPe6lMnNy66ZUXhEeV41e4",
  });
  const pdf = "https:" + (await client.getAsset("1f8M5YAdHt4MIqVXIjZf8T")).fields.file.url;
  const existingPdfBytes = await fetch(pdf).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = await pdfDoc.getForm();
  const days = data.arr;

  form.getField("week").setText(String(data.week));
  form.getField("year").setText(String(getYear(new Date())));
  form.getField("client").setText(getWorkName(workplace, works));
  form.getField("worker").setText(await getWorkerName());

  days.forEach((day) => {
    let arr = day.arr.find((a) => a.workId === workplace).arr.filter((a) => a.isSent && a.isConfirmed);
    if (arr.length === 0) return;
    let values = getDay(arr[0].timeInterval.start);
    form.getField(values.dayName).setText(values.value);
    if (arr.length === 1) {
      let start = new Date(arr[0].timeInterval.start);
      let end = new Date(arr[0].timeInterval.end);
      form.getField(values.dayName + "-start-time").setText(String(start.getHours()) + ":" + String(start.getMinutes()));
      form.getField(values.dayName + "-end-time").setText(String(end.getHours()) + ":" + String(end.getMinutes()));
      form.getField(values.dayName + "-total").setText(String(getTotal(arr[0].timeInterval.start, arr[0].timeInterval.end)));
    } else {
      var sTimes = arr.map((a) => Date.parse(a.timeInterval.start));
      var sTime = sTimes.sort((a, b) => a - b)[0];

      var eTimes = arr.map((a) => Date.parse(a.timeInterval.end));
      var eTime = eTimes.sort((a, b) => b - a)[0];

      form.getField(values.dayName + "-start-time").setText(String(new Date(sTime).getHours()) + ":" + String(new Date(sTime).getMinutes()));
      form.getField(values.dayName + "-end-time").setText(String(new Date(eTime).getHours()) + ":" + String(new Date(eTime).getMinutes()));
      form.getField(values.dayName + "-total").setText(String(getArrTotal(arr)));
      form.getField(values.dayName + "-description").setText(check(arr, sTime, eTime));
    }
  });

  const pdfBytes = await pdfDoc.save();
  //download pdf
  if (true) {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "test.pdf";
    link.click();
  }
};
