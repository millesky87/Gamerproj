function Character(name){
  this.name = name;
  this.age = 1037;
}

Character.prototype.sayHello = function(){
  console.log("Hi, I'm " + this.name);
};

function Wizard(name) {
  Character.apply(this, arguments);

  this.needsFoodBadly = true;
  this.hasMagic = true;
}

Wizard.prototype = Object.create(Character.prototype);

Wizard.prototype.useMagic = function(){
  console.log('*****~~~~*** BAM');
};

var jake = new Wizard("Jake");


console.log(jake);

jake.sayHello();
jake.useMagic();
