
var playerTypes = {
	"users": ["Jake", "Mason"],
	"computer": ["Jonathan", "Skylar", "Mady"]
};

/* ------------------------------------------------
	Add player choices to DOM
*/

userSelect = new Template({
  id: 'select-template',
  where: 'user'
});

computerSelect = new Template({
  id: 'select-template',
  where: 'computer'
});

function displayPlayers(data, constructor){
	_.chain(data).each(function(type){
		constructor.render({"name":type});
	});
}

displayPlayers(playerTypes.users, userSelect);
displayPlayers(playerTypes.computer, computerSelect);

// ------------------------------------------------


/* ------------------------------------------------
	Create Players
*/

function Player(){
	this.health = 100;
	this.autoTurn = false;
}

// Attack prototype
Player.prototype.attack = function(attacked){
	attacked.health = attacked.health - 10;
};


/* ------------------------------------------------
	Create Users (human)
*/

function User(){
	Player.apply(this, arguments);
}
User.prototype = Object.create(Player.prototype);

var jonathan = new User();
var skylar = new User();
var mady = new User();

/* ------------------------------------------------
	Create Computers (enemies)
*/

function Computer(){
	Player.apply(this, arguments);
	this.autoTurn = true;
}
Computer.prototype = Object.create(Player.prototype);

var jake = new Computer();
var mason = new Computer();



$(document).on("click", ".attack", function(e){
	e.preventDefault();
	console.log("Attack!");
	jonathan.attack(jake);
});
