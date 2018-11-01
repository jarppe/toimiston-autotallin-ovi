"use strict";

const 
  query = window
    .location
    .search
    .substring(1)
    .split("&")
    .reduce((params, param) => {
      let [key, value] = param.split("=");
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : null;
      return params;
    }, {}),
  passkey = query["passkey"],
  fetchOpts = {
    mode: "no-cors",
    method: "POST",
    body: JSON.stringify({passkey: passkey}),
    headers: {
      "Content-Type": "application/json"
    }
  },
  url = "https://0u41eh32ei.execute-api.eu-central-1.amazonaws.com/default/autohalli",
  message = document.getElementById("message");

const
  READY = "CLICK TO OPEN",
  OPENING = "...",
  DONE = "DOOR OPENING",
  ERROR = "FAIL";

var state = null;

const setState = newState => {
  state = newState;
  message.innerText = state;
};

const openDoor = () => {
  setState(OPENING);
  fetch(url, fetchOpts)
    .then(_ => setState(DONE))
    .catch(e => { 
      console.log("error:", e); 
      setState(ERROR); 
    });
};

const click = () => {
  if (state === READY) {
    openDoor();
  } else {
    setState(READY);
  }
};

document.getElementById("button").onclick = click;
setState(READY);
