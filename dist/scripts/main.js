//console.log('The Iron Yard Rocks');



$(document).on("click", ".attack", function(){
	console.log("Attack!")
});

var playTypes = {
	"human": ["Jake", "Mason", "Eric", "Peter", "Roy"],
	"enemy": ["Jonathan", "Skylar", "Mady", "Sara", "Jess"]
};

function Player(){
	this.health = 100;
	this.autoTurn = false;
};

Player.prototype.attack = function(){

};


function User(){
	Player.apply(this, arguments);
};
User.prototype = Object.create(Player.prototype);

var user1 = new User();
var user2 = new User();
var user3 = new User();
var user4 = new User();



function Computer(){
	Player.apply(this, arguments);
	this.autoTurn = true;
};
Computer.prototype = Object.create(Player.prototype);

var computer1 = new Computer();
var computer2 = new Computer();
var computer3 = new Computer();
var computer4 = new Computer();