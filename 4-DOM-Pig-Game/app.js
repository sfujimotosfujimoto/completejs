/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
  roundScore,
  activePlayer,
  gamePlaying,
  prevDice,
  winningNumber,
  activeDice;

init();

// ROLL DICE
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Random number
    var dice[activeDice] = Math.floor(Math.random() * 6) + 1;

    // 2. display result
    var diceDOM1 = document.querySelector(".dice1");
    diceDOM1.style.display = "block";
    diceDOM1.src = "dice-" + dice[activeDice] + ".png";

    var diceDOM2 = document.querySelector(".dice2");
    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice[activeDice] + ".png";

    if (dice === prevDice) {
      console.log("prevDice", prevDice, "  dice ", dice);
      console.log("score: ", scores[activePlayer]);

      scores[activePlayer] = 0;
      // update ui
      updateScore(scores, activePlayer);
      // document.querySelector("#score-" + activePlayer).textContent =
      //   scores[activePlayer];
      nextPlayer();
    }
    // 3. Update the round score
    if (dice !== 1) {
      // add score
      roundScore += dice;
      updateCurrent(roundScore, activePlayer);
      // document.querySelector(
      //   "#current-" + activePlayer
      // ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
    prevDice = dice;
  }
});
function updateScore(scores, player) {
  document.querySelector("#score-" + player).textContent = scores[player];
}
function updateCurrent(score, player) {
  document.querySelector("#current-" + player).textContent = score;
}

//HOLD BUTTON
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add current socre to global score
    // let activeScore = scores[activePlayer];
    scores[activePlayer] += roundScore;

    // update the ui
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= winningNumber) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  prevDice = 0;
  winningNumber = 20;
  activeDice = 0;

  if (winningNumber) {
    winningNumber = document.querySelector("#winningNumber").value;
  }

  document.querySelector(".dice1").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
