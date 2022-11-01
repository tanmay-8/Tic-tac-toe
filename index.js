// Audios
const clickAudio = new Audio("click.mp3")
const winAudio = new Audio("win.mp3")

// All required html elements
let after_st = document.getElementById("after-st");
let before_st = document.getElementById("before-st");
let after_finish = document.getElementById("after-complete");

let stbt = document.getElementById("st-bt");
let restartbt = document.getElementById("restart");

let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");

let boxes = document.querySelectorAll(".box");

// Whose turn is 
let who = "Player 1";

// to change turn
const changeTurn = () => {
  player1.classList.toggle("hide-p");
  player2.classList.toggle("hide-p");
  return who==="Player 1"?"Player 2":"Player 1"
}

// to start game
stbt.addEventListener("click", (e) => {
  before_st.classList.toggle("hide-p");
  after_st.classList.toggle("hide-p");
});

// Reset function
const reset = () => {
  who = "Player 1";
  try {
    player2.classList.add("hide-p");
    player1.classList.remove("hide-p");
  } catch {}
  Array.from(boxes).forEach((e) => {
    e.innerText = "";
  });
  counter = 0;
};

// restart game
restartbt.addEventListener("click", (e) => {
  after_st.classList.toggle("hide-p");
  after_finish.classList.toggle("hide-p");
  reset()
});

// to check if someone won
const isWon = () => {
  let winning_comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  flag = false
  winning_comb.forEach((e) => {
    if (
      boxes[e[0]].innerText === boxes[e[1]].innerText &&
      boxes[e[2]].innerText === boxes[e[1]].innerText &&
      boxes[e[0]].innerText !== ""
    ) {
      flag = true
    }
  });
  return flag
};

// to check if all boxes filled or someone won and do further
const check = ()=>{
  let who_win = document.getElementById("who-win");
  if(isWon()){
    after_st.classList.toggle("hide-p");
    after_finish.classList.toggle("hide-p");
    who_win.innerText = who + " Won";
    winAudio.play()
  }
  else if(isWon() && counter===9){
    after_st.classList.toggle("hide-p");
    after_finish.classList.toggle("hide-p");
    who_win.innerText = "It's Draw";
  }
}


// counter for filled boxes
let counter = 0;

// on click boxes
for (let k = 0; k < boxes.length; k++) {
  boxes[k].addEventListener("click", () => {
    if (boxes[k].innerHTML === "") {
      clickAudio.play()
      counter = counter + 1;
      if (who === "Player 1") {
        boxes[k].innerHTML = "❌";
      } 
      else {
        boxes[k].innerHTML = "🟢";
      }
      check()
      who=changeTurn()
    }
  });
}
