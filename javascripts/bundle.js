/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Board = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Die = __webpack_require__(2);

var BOGGLE_DICE_VALUES = [
  "aaafrs".toUpperCase().split(""),
  "aaeeee".toUpperCase().split(""),
  "aafirs".toUpperCase().split(""),
  "adennn".toUpperCase().split(""),
  "aeeeem".toUpperCase().split(""),
  "aeegmu".toUpperCase().split(""),
  "aegmnn".toUpperCase().split(""),
  "afirsy".toUpperCase().split(""),
  ["B", "J", "K", "Qu", "X", "Z"],
  "ccenst".toUpperCase().split(""),
  "ceiilt".toUpperCase().split(""),
  "ceilpt".toUpperCase().split(""),
  "ceipst".toUpperCase().split(""),
  "ddhnot".toUpperCase().split(""),
  "dhhlor".toUpperCase().split(""),
  "dhlnor".toUpperCase().split(""),
  "dhlnor".toUpperCase().split(""),
  "eiiitt".toUpperCase().split(""),
  "emottt".toUpperCase().split(""),
  "ensssu".toUpperCase().split(""),
  "fiprsy".toUpperCase().split(""),
  "gorrvw".toUpperCase().split(""),
  "iprrry".toUpperCase().split(""),
  "nootuw".toUpperCase().split(""),
  "ooottu".toUpperCase().split("")
]


class Board{
  constructor(boardEl){
    this.positions = [[], [], [], [] ,[]];
    this.boardEl = boardEl;
    this.initializeDice();
    this.shake();
  }

  initializeDice(){
    var that = this;
    BOGGLE_DICE_VALUES.forEach(function(value, idx){
      that.positions[idx % 5].push(new Die(value));
    })
  }

  shake(){
    this.scrambleDice();
    this.scramblePositions();
    this.render(this.boardEl);
  }

  scrambleDice(){
    this.positions.forEach(function(position){
      position.forEach(function(die){
        die.roll();
      })
    })
  }

  scramblePositions(){
    var x1;
    var y1;
    var x2;
    var y2;
    for(var i = 0; i < Math.random*25 + 25; i += 1){
      x1 = Math.random() * 5;
      y1 = Math.random() * 5;
      x2 = Math.random() * 5;
      y2 = Math.random() * 5;
      this.positions[x1][y1] = [this.positions[x2][y2], this.positions[x2][y2] = this.positions[x1][y1]][0];
    }
  }

  setAllNeighbors(){
    var currentNeighbors = [];
    var a = [];
    for(var i = 0; i < this.positions.length; i += 1){
      for(var j = 0; j < this.positions[i].length; j += 1){
        currentNeighbors = [];
        currentNeighbors.push(document.getElementsByClassName("row")[i].children[j+1]);
        currentNeighbors.push(document.getElementsByClassName("row")[i].children[j-1]);
        if(this.positions[i+1]){
          currentNeighbors.push(document.getElementsByClassName("row")[i+1].children[j+1]);
          currentNeighbors.push(document.getElementsByClassName("row")[i+1].children[j-1]);
          currentNeighbors.push(document.getElementsByClassName("row")[i+1].children[j]);
        }
        if(this.positions[i-1]){
          currentNeighbors.push(document.getElementsByClassName("row")[i-1].children[j+1]);
          currentNeighbors.push(document.getElementsByClassName("row")[i-1].children[j-1]);
          currentNeighbors.push(document.getElementsByClassName("row")[i-1].children[j]);
        }
        this.positions[i][j].setNeighbors(currentNeighbors.filter(function(el){return el!==undefined }));
      }
    }
  }

  clearActiveDice(){
    var rows = document.getElementsByClassName("row");
    for(var i = 0; i < rows.length; i += 1){
      for(var j = 0; j < rows[i].children.length; j += 1){
        rows[i].children[j].classList.remove("active")
      }
    }
  }

  render(boardEl){
    this.positions.forEach(function(positions, idx){
      var row = document.createElement("div");
      row.classList.add("row")
      positions.forEach(function(die, idx){
        die.render(row);
      })
      boardEl.appendChild(row);
    })
    this.setAllNeighbors();
  }

}

module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Die{
  constructor(values){
    this.values = values;
    this.face = Math.floor(Math.random()*6);
    this.currentValue = this.values[this.face];
    this.neighbors = [];
  }

  setNeighbors(neighbors){
    this.neighbors = neighbors;
  }

  roll(){
    this.face = Math.floor(Math.random()*6);
    this.currentValue = this.values[this.face];
  }

  onClick(e){
    var lastNeighbor = this.isValidClick();
    if(lastNeighbor){
      window.round += 1;
      lastNeighbor.classList.remove("last");
      document.getElementById("current-word-word").innerHTML = document.getElementById("current-word-word").innerHTML + e.currentTarget.innerHTML
      e.currentTarget.classList.add("last");
      e.currentTarget.classList.add("active");
    } else if (window.round === 0) {
      window.round += 1;
      document.getElementById("current-word-word").innerHTML = document.getElementById("current-word-word").innerHTML + e.currentTarget.innerHTML
      e.currentTarget.classList.add("last");
      e.currentTarget.classList.add("active");
    }
  }

  isValidClick(){
    var neighbors = this.neighbors;
    var neighborMap = neighbors.map(function(el){
      return el.classList.contains("last");
    })
    return neighbors[neighborMap.indexOf(true)];
  }

  render(el){
    var die = document.createElement("div");
    die.classList.add("die");
    die.classList.add("bold");
    die.innerHTML = this.currentValue;
    die.addEventListener("click", this.onClick.bind(this))
    el.appendChild(die);
  }
}

module.exports = Die;


/***/ })
/******/ ]);