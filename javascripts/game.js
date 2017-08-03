var Board = require('./game_logic/board');

document.addEventListener("DOMContentLoaded", function(){
  var boardEl = document.getElementById("board");
  var board = new Board(boardEl);
  window.round = 0

  var submit = document.getElementById("submit");
  submit.addEventListener("click", function(e){
    e.preventDefault();
    window.round = 0;
    var currentWord = document.getElementById("current-word-word")
    if(currentWord.innerHTML.length != 0){
      createScore(currentWord.innerHTML);
    }
    currentWord.innerHTML = "";
    board.clearActiveDice();
  })
})

function createScore(word){
  var newPair = document.createElement("li");
  newPair.classList.add("word-pair");

  var newWord = document.createElement("div");
  newWord.classList.add("word");
  newWord.innerHTML = word;

  var newScore = document.createElement("div");
  newScore.classList.add("value");

  var score = 0;

  if (word.length > 2 && word.length <= 4) {
    score = 1;
  } else if (word.length === 5) {
    score = 2;
  } else if (word.length === 6) {
    score = 3;
  } else if (word.length === 7) {
    score = 5;
  } else if (word.length > 7) {
    score = 11;
  }

  newScore.innerHTML = score;

  newPair.appendChild(newWord);
  newPair.appendChild(newScore);

  document.getElementById("word-pairs").appendChild(newPair);

  document.getElementById("total-score").innerHTML = parseInt(document.getElementById("total-score").innerHTML) + score
}
