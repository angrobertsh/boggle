class Die{
  constructor(values){
    this.values = values;
    this.face = Math.floor(Math.random()*6);
    this.currentValue = this.values[this.face];
  }

  shake(){
    this.face = Math.floor(Math.random()*6);
    this.currentValue = this.values[this.face];
  }

  onClick(){
    
  }

  render(){

  }

}
