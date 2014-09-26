
var playerTypes = {
	"User": ["Jonathan", "Skylar", "Mady"],
	"Computer": ["Jake", "Mason"]
};

/* ------------------------------------------------
	Add player choices to DOM
*/

userSelect = new Template({
  id: 'select-template',
  where: 'user-select'
});

computerSelect = new Template({
  id: 'select-template',
  where: 'computer-select'
});

function displayPlayers(data, constructor){
	_.chain(data).each(function(type){
		constructor.render({"name":type});
	});
}

displayPlayers(playerTypes.User, userSelect);
displayPlayers(playerTypes.Computer, computerSelect);


/* ------------------------------------------------
	Create Players
*/

function Player(){
	this.health = 100;
	this.autoTurn = false;
}

// Attack prototype
Player.prototype.attack = function(attacked){
	var hitPoints = Math.floor(Math.random()*10);
	console.log(hitPoints);
	attacked.health = attacked.health - hitPoints;

};


/* ------------------------------------------------
	Create Users (human)
*/

function User(){
	Player.apply(this, arguments);
}
User.prototype = Object.create(Player.prototype)	;

var jonathan = new User({"tools": "sword"});

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


//console.log(playerTypes["User"][0]);

// _.each(playerTypes.User, function(type){
// 	console.log(type);
// 	type = new Computer();
// })

// Set Health
$(".computer .health::after").width(jonathan.health);


var jake = new Computer();
var mason = new Computer();


$(document).on("click", ".attack", function(e){
	e.preventDefault();
	console.log("Attack!");
	var user = $(".user-select").val();
	var computer = $(".computer-select").val();
	
	jonathan.attack(jake);

	jake.attack(jonathan);

	console.log(jake.health);
	$(".human .health span").css({width: jonathan.health+"%"});
	$(".computer .health span").css({width: jake.health+"%"});

	//console.log(user,computer)
	//user.attack(computer);
});
