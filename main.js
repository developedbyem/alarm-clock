const selects = document.querySelectorAll("select");
const controls = document.querySelector(".controls");
const time = document.querySelector(".time");
const alarmBtn = document.querySelector(".alarm-btn");

let alarmTime,
  alarmState = "noset";
const rington = new Audio("./alarm.mp3"); //make an audio obj

// add options to select tags-------------------

function createOption(tag, txt) {
  const opt = document.createElement(tag);
  const text = document.createTextNode(txt);
  opt.appendChild(text);
  return opt;
}

for (let i = 0; i < 24; i++) {
  const num = `${i < 10 ? "0" : ""}${i}`;
  const hourOpt = createOption("option", num);
  hourOpt.setAttribute("value", num);
  selects[0].appendChild(hourOpt);
}

for (let i = 0; i < 60; i++) {
  const num = `${i < 10 ? "0" : ""}${i}`;
  const minOpt = createOption("option", num);
  minOpt.setAttribute("value", num);
  selects[1].appendChild(minOpt);
}

// set current time-------------------

let timer = setInterval(function () {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  time.textContent = `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${
    s < 10 ? "0" : ""
  }${s}`;

  if (time.textContent === alarmTime) {
    rington.play(); //play rington
    rington.loop = true; //continue
  }
}, 1000);

// set alarm-------------------
function checkState(state) {
  if (state === "noset") {
    alarmBtn.textContent = "clear alarm";
    controls.classList.add("disable");
    alarmState = "set";
  } else {
    rington.pause(); //pause rington

    alarmBtn.textContent = "set alarm";
    controls.classList.remove("disable");
    alarmState = "noset";

    alarmTime = "";
    selects[0].value = "hour";
    selects[1].value = "minute";
  }
}
function setAlarm() {
  alarmTime = `${selects[0].value}:${selects[1].value}:00`;

  if (alarmTime.includes("hour") || alarmTime.includes("minute")) {
    return alert("Set time, please!");
  }
  checkState(alarmState);
}

alarmBtn.addEventListener("click", setAlarm);
