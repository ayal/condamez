import React from "react";
import "./styles.css";

console.log(window.location);
const rand = x => Math.floor(Math.random() * x);
let cards = [];
if (window.location.hash) {
  cards = JSON.parse(decodeURIComponent(window.location.hash.split("#")[1]));
} else {
  const first = rand(2) === 0 ? "red" : "blue";
  const second = first === "red" ? "blue" : "red";
  console.log("first / second", first, second);

  for (let i = 0; i < 8; ) {
    let x = rand(20);
    if (!cards[x]) {
      cards[x] = first;
      i++;
    }
  }

  for (let i = 0; i < 7; ) {
    let x = rand(20);
    if (!cards[x]) {
      cards[x] = second;
      i++;
    }
  }

  for (let i = 0; i < 4; ) {
    let x = rand(20);
    if (!cards[x]) {
      cards[x] = "yellow";
      i++;
    }
  }

  for (let i = 0; i < 20; i++) {
    if (!cards[i]) {
      cards[i] = "black";
    }
  }
  window.location.hash = JSON.stringify(cards);
}

console.log(cards);

const Cell = props => {
  return <div className={`cell cell-${props.color}`} />;
};

export default function App() {
  const cardels = cards.map((c, i) => {
    return <Cell key={c + "-" + i} color={c} index={i} />;
  });
  return <div className="App">{cardels}</div>;
}
