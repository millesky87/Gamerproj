function Villian(name){
  this.name = name;
  this.health = 100;
}

function Squirrel(name){
  Villian.apply(this, arguments);

  this.hasEvilLaugh = true;
  this.hasNuts = true;
}

Squirrel.prototype = Object.create(Villian.prototype);

Squirrel.prototype.useEvilLaugh = function(){
  console.log('Mwahahahahaha!');
};

var Charlie = new Squirrel("Charlie");

Charlie.useEvilLaugh();
