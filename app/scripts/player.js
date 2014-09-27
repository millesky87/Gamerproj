/* ------------------------------------------------
    Player types and players
*/

var playerTypes = {
    "User": [{
        name: "Mady",
        weapon: 'animalMimicry',
        power: 600
    }, {
        name: "Jonathan",
        weapon: 'psychicBlast',
        power: 200
    }, {
        name: "Skylar",
        weapon: 'biologicalManipulation',
        power: 900
    }, ],
    "Computer": [{
        name: "Mason",
        weapon: "intellectualStare",
        power: 1000
    }, {
        name: "Jake",
        weapon: "deathWishCoffee",
        power: 800
    }, {
        name: "Matt",
        weapon: "zenKoan",
        power: 600
    }]
},
    user,
    computer;


function buildConstructors(playerType) {
    _.each(playerTypes[playerType], function(player) {
        if (playerType == "User")
            window[player.name.toLowerCase()] = new User(player);
        else if (playerType == "Computer")
            window[player.name.toLowerCase()] = new Computer(player);
    });
}

function displayPlayers(data, constructor) {
    _.chain(data).each(function(type) {
        constructor.render({
            "name": type.name
        });
    });
}

function updateHealthBar(){

    $(".human .health span").css({
        width: user.health + "%"
    });
    $(".computer .health span").css({
        width: computer.health + "%"
    });

}


/* ------------------------------------------------
    Add player choices to DOM
*/

userSelect = new Template({
    id: 'select-template',
    where: 'user-select'
});

displayPlayers(playerTypes.User, userSelect);
// displayPlayers(playerTypes.Computer, computerSelect);


/* ------------------------------------------------
    Create Players
*/

function Player(options) {
    options = options || {};
    this.health = 100 || options.health;
    this.id = 1 || options.id;
    this.name = "" || options.name;
    this.voodooFactor = "100" || options.voodooFactor;
}

// Attack prototype
Player.prototype.attack = function(attacked) {
    var hitPoints = Math.floor(Math.random() * 10);
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
    Player.apply(this, arguments);
    this.weapon = options.weapon || "";
    this.power = options.power || "";
    this.name = options.name || "";
}
User.prototype = Object.create(Player.prototype);

buildConstructors("User");


/* ------------------------------------------------
    Create Computers (enemies)
*/

function Computer(options) {
    if (!options) options = {};
    Player.apply(this, arguments);
    this.weapon = options.weapon || "";
    this.power = options.power || "";
    this.name = options.name || "";
}
Computer.prototype = Object.create(Player.prototype);

buildConstructors("Computer");


/* ------------------------------------------------
  Click Events
*/

// Play
$(document).on("click", ".play", function(e) {
    e.preventDefault();
    var userName = $(".user-select").val();
    // var computerName = $(".computer-select").val();
    var computerName = playerTypes.Computer.map(function(player){
      return(player.name)
    });

    var computerName = computerName[Math.floor(Math.random() * computerName.length)];

    userSelection = new Template({
        id: 'human-name',
        where: 'human'
    });

    userSelection.render({
      "name":userName
    });

    computerSelection = new Template({
        id: 'computer-name',
        where: 'computer'
    });

    computerSelection.render({
      "name":computerName
    });


    user = window[userName.toLowerCase()];
    computer = window[computerName.toLowerCase()];

    $(".human p").html("<p>" + user.name + "</p>");
    $(".computer p").html("<p>" + computer.name + "</p>");

    $(".main-wrap").removeClass("hide");
    $("#home").addClass("hide");
});


// Attack method
$(document).on("click", ".attack", function(e) {
    e.preventDefault();


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

    updateHealthBar();

});

// Magic button
$(document).on("click", ".magic", function(e) {
    e.preventDefault();
    var magicAffectTime = 5,
        i = 0,
        magicInterval;
    magicInterval = setInterval(function(){
            console.log("Using magic - reduction", computer);
            computer.health = computer.health - 5;
            updateHealthBar();
            if (++i === magicAffectTime) {
                window.clearInterval(magicInterval);
            }
        },2000);
});
