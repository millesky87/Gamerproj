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

function displayPlayers(data, constructor) {
  _.chain(data).each(function(type) {
    constructor.render({
      "name": type
    });
  });
}

displayPlayers(playerTypes.User, userSelect);
displayPlayers(playerTypes.Computer, computerSelect);


/* ------------------------------------------------
	Create Players
*/

function Player(options) {
  this.health = 100;
  this.autoTurn = false;
  this.id = 1;
  this.name = ""
}

// Attack prototype
Player.prototype.attack = function(attacked) {
  var hitPoints = Math.floor(Math.random() * 10);
  //console.log(hitPoints);
  attacked.health = attacked.health - hitPoints;
  if (this instanceof User) {
    $(".human .attack-history").html("<li>Attacked and took " + hitPoints + " health points from " + computer.name + "</li>");
  } else
    $(".computer .attack-history").html("<li>Attacked and took " + hitPoints + " health points from " + user.name + "</li>");
};


/* ------------------------------------------------
	Create Users (human)
*/

function User(options) {
  if (!options) options = {};
  console.log("OPtions:", options);
  Player.apply(this, arguments);
  this.weapon = options.weapon || "";
  this.power = options.power || "";
  this.name = options.name || "";
}
User.prototype = Object.create(Player.prototype);

var mady = new User({
	name: "Mady",
	power: 600,
})

var jonathan = new User({
	name: "Jonathan",
	power: 200,
})

var skylar = new User({
	name: "Skylar",
	power: 900,
})
// function Mady(options){
// 	User.apply(this, arguments);
// }
// Mady.prototype = Object.create(User.prototype);

// var mady = new Mady({
//   power: 200,
//   weapon: "ninja powers",
//   name: "Mady"
// });

// var madyVamire = new Mady();

/* ------------------------------------------------
	Create Computers (enemies)
*/

function Computer(options) {
  Player.apply(this, arguments);
  this.autoTurn = true;
  this.name = options.name;
}
Computer.prototype = Object.create(Player.prototype);

// var user = new User();
// user.id = 231231;
//var computer = new Computer();

var mason = new Computer({
	name: "Mason",
});
var matt = new Computer({
	name: "Matt",
});
var jake = new Computer({
	name: "Jake",
});

//console.log(playerTypes["User"][0]);

// _.each(playerTypes.User, function(type){
// 	console.log(type);
// 	type = new Computer();
// })

// Set Health
//$(".computer .health::after").width(jonathan.health);


$(document).on("click", ".play", function(e) {
  e.preventDefault();
  var userName = $(".user-select").val();
  var computerName = $(".computer-select").val();

  user = window[userName.toLowerCase()];
  computer = window[computerName.toLowerCase()];
  
  console.log("User",user, "Computer",computer);

  $(".human p").html("<p>" + user.name + "</p>");
  $(".computer p").html("<p>" + computer.name + "</p>");
  console.log("User: ", user, "Computer: ", computer);

});

$(document).on("click", ".attack", function(e) {
  e.preventDefault();
  // console.log(jake.health);
  // console.log("Attack!");

  // Attack method
  user.attack(computer);
  computer.attack(user);

  if (user.health <= 0 && user.health < computer.health) {
    $(".attack").addClass("hide");
    $(".main-wrap").addClass("hide");
    $(".you-lose").removeClass("hide");
  }

  if (computer.health <= 0 && computer.health < user.health) {
    $(".attack").addClass("hide");
    $(".main-wrap").addClass("hide");
    $(".you-win").removeClass("hide");
  }

  $(".human .health span").css({
    width: user.health + "%"
  });
  $(".computer .health span").css({
    width: computer.health + "%"
  });

});
