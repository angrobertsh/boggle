var Die = require('./die');

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
