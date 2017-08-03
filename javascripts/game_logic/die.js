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
