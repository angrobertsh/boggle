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
  constructor(){
    this.positions = [[], [], [], [] ,[]];
    this.initializeDice();
  }

  initializeDice(){
    BOGGLE_DICE_VALUES.forEach((value, idx) => {
      this.positions[idx % 5].push(new Dice(value));
    })
  }

  shake(){
    this.scrambleDice();
    this.scramblePositions();
  }

  scrambleDice(){
    this.positions.forEach((position) => {
      position.forEach((die) => {
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

  render(){

  }

}
