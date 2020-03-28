import React from "react";
import "./styles.css";

console.log(window.location);
const rand = x => Math.floor(Math.random() * x);
let first;
let second;
let cards = [];

if (window.location.hash) {
  try {
      const obj = JSON.parse(decodeURIComponent(window.location.hash.split("#")[1]));
      cards = obj.cards
      first = obj.first;
      second = obj.second;
      console.log('from hash', cards, first, second);
  }
  catch (ex) {
    
  }

  if (!first || !cards) {
    window.history.pushState(null, null, window.location.href.split('#')[0]);
    setTimeout(()=>{
      window.location.reload()
    })
  }

} else {
  first = rand(2) === 0 ? "r" : "b";
  second = first === "r" ? "b" : "r";
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
      cards[x] = "y";
      i++;
    }
  }

  for (let i = 0; i < 20; i++) {
    if (!cards[i]) {
      cards[i] = "x";
    }
  }
  window.location.hash = JSON.stringify({cards, first, second});
}

console.log(cards);

const Cell = props => {
  return <div className={`cell cell-${props.color}`} />;
};

export default function App() {
  if (!first || !cards) {
    return null;
  }
  const cardels = cards.map((c, i) => {
    return <Cell key={c + "-" + i} color={c} index={i} />;
  });
  return (<div>
      <div className="App">
        <div className="board">{cardels}</div>
      <div>{`first to play: ${first}`}</div>
      <button onClick={x=>{
        window.history.pushState(null, null, window.location.href.split('#')[0]);
        window.location.reload()
      }}>new</button>
    </div>
    </div>);
}
