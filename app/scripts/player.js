
var playerTypes = {
	"User": ["Jonathan", "Skylar", "Mady"],
	"Computer": ["Jake", "Mason", "Matt"]
},
user,
computer;

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

function Player(options){
	this.health = 100;
	this.autoTurn = false;
	this.id = 1;
}

// Attack prototype
Player.prototype.attack = function(attacked){
	var hitPoints = Math.floor(Math.random()*10);
	//console.log(hitPoints);
	attacked.health = attacked.health - hitPoints;
	if (this instanceof User){
		$(".human .attack-history").append("<li>Attacked and took "+hitPoints+" health points from " +computer.name+"</li>");
	}
	else 
		$(".computer .attack-history").append("<li>Attacked and took "+hitPoints+" health points from "+user.name+"</li>");
};

/* ------------------------------------------------
	Create Users (human)
*/

function User(options){
	if(!options) options = {};
	console.log("OPtions:",options);
	Player.apply(this, arguments);
	this.weapon = options.weapon || "";
	this.power = options.power || "";
	this.name = options.name || "";
}
<<<<<<< Updated upstream
User.prototype = Object.create(Player.prototype);

var mady = new User({
	power : 200,
	weapon: "ninja powers",
	name: "Mady"
});
=======
User.prototype = Object.create(Player.prototype)	;

var jonathan = new User({"tools": "sword"});
var skylar = new User({});
var mady = new User({});
>>>>>>> Stashed changes

/* ------------------------------------------------
	Create Computers (enemies)
*/

function Computer(){
	Player.apply(this, arguments);
	this.autoTurn = true;
}
Computer.prototype = Object.create(Player.prototype);

// var user = new User();
// user.id = 231231;
var computer = new Computer();

//console.log(playerTypes["User"][0]);

// _.each(playerTypes.User, function(type){
// 	console.log(type);
// 	type = new Computer();
// })

// Set Health
//$(".computer .health::after").width(jonathan.health);


$(document).on("click", ".play", function(e){
	e.preventDefault();
	var userName = $(".user-select").val();
	var computerName = $(".computer-select").val();

	user = new User();
	user.name = userName;
	computer = new Computer();
	computer.name = computerName;

	if(userName == "Mady"){
		user = mady;
	}

	$(".human p").html("<p>"+user.name+"</p>");
	$(".computer p").html("<p>"+computer.name+"</p>");
	console.log("User: ", user, "Computer: ", computer);

});

$(document).on("click", ".attack", function(e){
	e.preventDefault();
<<<<<<< Updated upstream
	// console.log(jake.health);
	// console.log("Attack!");

	// Attack method
	user.attack(computer);
	computer.attack(user);
=======
	console.log("Attack!");
	var user = $(".user-select").val();
	var computer = $(".computer-select").val();

	jonathan.attack(jake);
	jake.attack(jonathan);
>>>>>>> Stashed changes

	$(".human .health span").css({width: user.health+"%"});
	$(".computer .health span").css({width: computer.health+"%"});

<<<<<<< Updated upstream
=======
	if(jonathan.health <= 0 && jonathan.health < jake.health) {
		$(".attack").addClass("hide");
		$(".main-wrap").addClass("hide");
		$(".you-lose").removeClass("hide");
	}

	if(jake.health <=0 && jake.health < jonathan.health) {
		$(".attack").addClass("hide");
		$(".main-wrap").addClass("hide");
		$(".you-win").removeClass("hide");
	}

	//console.log(user,computer)
	//user.attack(computer);
>>>>>>> Stashed changes
});


