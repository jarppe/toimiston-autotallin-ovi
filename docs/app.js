"use strict";

const
  url = "https://0u41eh32ei.execute-api.eu-central-1.amazonaws.com/default/autohalli",
  message = document.getElementById("message"),
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
  body = JSON.stringify({passkey: passkey}),
  fetchOpts = {
    mode: "no-cors",
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json"
    }
  };

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
    .then(resp => { 
      console.log("resp:", resp); 
      setState(DONE);
    })
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
